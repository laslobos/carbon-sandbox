#!/usr/bin/env node
/**
 * Accessibility scan: runs axe-core and IBM Equal Access against the running
 * dev server and writes one JSON file per route to src/a11y/.
 *
 * Scope: only the v12 component under test is reported, not the whole page. A demo
 * opts in by wrapping itself in an element with data-a11y-scope="v12" (see
 * src/components/*Demo.jsx). Page chrome (header, sidenav, skip link, the status
 * panel itself) and page-level <style> findings are excluded. A route with no scope
 * element fails, so a missing wrapper is never silently reported as "no issues".
 *
 * Open state: components that show a popup (menu, calendar) are scanned twice, closed
 * and open, and the results are merged. The scope element declares how to open it:
 *   data-a11y-open-trigger  selector of the element to click, relative to the scope element
 *   data-a11y-popup         selector of the popup, resolved on the whole document because
 *                           Carbon renders popups in a portal outside the scope element
 * If the popup does not appear after the click, the scan fails.
 *
 * Usage (dev server must be running, `npm run dev`):
 *   npm run a11y:scan                      # refresh every route that already has a file in src/a11y/
 *   npm run a11y:scan -- /v12/date-picker  # scan specific route(s), creating the file if needed
 *   npm run a11y:scan -- --all             # scan every route in src/routes.js
 *   npm run a11y:scan -- --base=http://localhost:3001
 *
 * Environment:
 *   A11Y_BASE_URL  base URL of the dev server (default http://localhost:3000)
 *   CHROME_PATH    path to a Chrome/Chromium binary (default: macOS Google Chrome)
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';
import { v11Routes, v12Routes, experimentsRoutes } from '../src/routes.js';

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'src', 'a11y');

const DEFAULT_CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const AXE_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'];
const MAX_AXE_NODES = 5;
const SCOPE_SELECTOR = '[data-a11y-scope="v12"]';
const POPUP_TIMEOUT_MS = 5000;
const SETTLE_MS = 500;

const slugFor = (route) => route.replace(/^\//, '').replace(/\//g, '-');
const fileFor = (route) => path.join(outDir, `${slugFor(route)}.json`);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
// Keep scan-only and dev-only attributes out of reported snippets: the scan's own
// data-a11y-trigger-id, and ibm-a11y-debug added by the dev-server accessibility preprocessor.
const clean = (html) => html
  ?.replace(/ data-a11y-trigger-id="\d+"/g, '')
  .replace(/ ibm-a11y-debug="[^"]*"/g, '');

function fail(message) {
  console.error(`a11y-scan: ${message}`);
  process.exit(1);
}

// ─── Arguments ──────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const flags = args.filter((a) => a.startsWith('--'));
const baseUrl = (
  flags.find((f) => f.startsWith('--base='))?.slice('--base='.length) ||
  process.env.A11Y_BASE_URL ||
  'http://localhost:3000'
).replace(/\/$/, '');
const allRoutes = [...v11Routes, ...v12Routes, ...experimentsRoutes].map((r) => r.path);

let routes;
const explicit = args.filter((a) => a.startsWith('/'));
if (flags.includes('--all')) {
  routes = allRoutes;
} else if (explicit.length) {
  const unknown = explicit.filter((r) => !allRoutes.includes(r));
  if (unknown.length) fail(`Unknown route(s): ${unknown.join(', ')}. See src/routes.js.`);
  routes = explicit;
} else {
  routes = allRoutes.filter((r) => fs.existsSync(fileFor(r)));
  if (!routes.length) {
    fail('No existing scan files in src/a11y/. Pass a route (e.g. /v12/date-picker) or --all.');
  }
}

// ─── IBM Equal Access metadata (toolkit level + WCAG checkpoint per rule) ──
async function loadIbmRuleInfo() {
  try {
    const libDir = path.join(path.dirname(require.resolve('accessibility-checker')), '..', 'lib');
    const { ACEngineManager } = require(path.join(libDir, 'ACEngineManager.js'));
    const ruleset = await ACEngineManager.getRuleset('IBM_Accessibility');
    const info = {};
    for (const cp of ruleset.checkpoints) {
      for (const rule of cp.rules) {
        info[rule.id] ??= { levels: new Set(), checkpoints: [] };
        info[rule.id].levels.add(Number(rule.toolkitLevel));
        info[rule.id].checkpoints.push(`${cp.num} ${cp.name}`);
      }
    }
    return info;
  } catch (e) {
    console.warn(`a11y-scan: could not load IBM rule metadata (${e.message}); levels and checkpoints will be omitted.`);
    return {};
  }
}

// ─── Result mapping ─────────────────────────────────────────────────────────
const IBM_TYPE = {
  violation: 'Violation',
  potentialviolation: 'Needs review',
  manual: 'Needs review',
  recommendation: 'Recommendation',
  potentialrecommendation: 'Recommendation',
};
const IBM_TYPE_ORDER = ['Violation', 'Needs review', 'Recommendation'];

// IBM results that are inside the scope (by DOM path) and not ignored.
function ibmInScope(report, scopePaths) {
  const inScope = (domPath) => scopePaths.some((p) => domPath === p || domPath.startsWith(`${p}/`));
  return report.results.filter(
    (r) => (IBM_TYPE[r.level] || r.level === 'pass') && !r.ignored && inScope(r.path?.dom ?? ''),
  );
}

// Identical findings (same rule + message) are grouped into one entry with a count.
function groupIbm(results, ruleInfo) {
  const groups = new Map();
  for (const r of results) {
    const key = `${r.ruleId}|${r.message}`;
    const existing = groups.get(key);
    if (existing) {
      existing.count += 1;
      continue;
    }
    const info = ruleInfo[r.ruleId];
    groups.set(key, {
      ruleId: r.ruleId,
      type: IBM_TYPE[r.level],
      level: info ? Math.min(...info.levels) : undefined,
      checkpoint: info ? [...new Set(info.checkpoints)].join('; ') : r.ruleId,
      issue: r.message,
      element: clean(r.snippet),
      helpUrl: r.help?.split('#')[0],
      count: 1,
    });
  }
  return [...groups.values()]
    .map(({ count, ...rest }) => (count > 1 ? { ...rest, count } : rest))
    .sort(
      (a, b) =>
        IBM_TYPE_ORDER.indexOf(a.type) - IBM_TYPE_ORDER.indexOf(b.type) ||
        (a.level ?? 9) - (b.level ?? 9),
    );
}

// IBM passes, one entry per rule with the number of elements that passed it.
function groupIbmPasses(results, nls, ruleInfo) {
  const groups = new Map();
  for (const r of results) {
    const existing = groups.get(r.ruleId);
    if (existing) {
      existing.count += 1;
      continue;
    }
    const info = ruleInfo[r.ruleId];
    groups.set(r.ruleId, {
      id: r.ruleId,
      description: nls[r.ruleId]?.['0'] ?? r.ruleId,
      checkpoint: info ? [...new Set(info.checkpoints)].join('; ') : undefined,
      helpUrl: r.help?.split('#')[0],
      count: 1,
    });
  }
  return [...groups.values()].sort((a, b) => a.id.localeCompare(b.id));
}

// Merge axe results from several states: one entry per rule, nodes de-duplicated by target + html.
function mergeAxe(resultSets) {
  const merged = new Map();
  for (const items of resultSets) {
    for (const v of items) {
      const entry = merged.get(v.id) ?? {
        id: v.id,
        impact: v.impact,
        description: v.description,
        helpUrl: v.helpUrl,
        nodes: [],
        seen: new Set(),
      };
      for (const n of v.nodes) {
        const target = n.target.flat().join(' ');
        const key = `${target}|${n.html}`;
        if (entry.seen.has(key)) continue;
        entry.seen.add(key);
        entry.nodes.push({ html: clean(n.html), target, failureSummary: n.failureSummary });
      }
      merged.set(v.id, entry);
    }
  }
  return [...merged.values()].map(({ seen, nodes, ...rest }) => ({
    ...rest,
    nodeCount: nodes.length,
    nodes: nodes.slice(0, MAX_AXE_NODES),
  }));
}

// ─── Page helpers (run in the browser) ──────────────────────────────────────
// XPaths of all elements matching the selectors, in the same format as IBM result paths.
function xpathsOf(selectors) {
  const xpath = (el) => {
    const parts = [];
    for (let n = el; n && n.nodeType === 1; n = n.parentNode) {
      let i = 1;
      for (let s = n.previousElementSibling; s; s = s.previousElementSibling) {
        if (s.localName === n.localName) i += 1;
      }
      parts.unshift(`${n.localName}[${i}]`);
    }
    return `/${parts.join('/')}`;
  };
  return selectors.flatMap((sel) => [...document.querySelectorAll(sel)].map(xpath));
}

// Scan the current state of the page with both tools, limited to the given selectors.
async function scanState({ page, axeSource, label, selectors }) {
  const scopePaths = await page.evaluate(xpathsOf, selectors);
  const ibm = await aChecker.getCompliance(page, label);
  if (!ibm?.report?.results) throw new Error('IBM Equal Access returned no results');

  await page.evaluate(axeSource);
  const axe = await page.evaluate(
    (tags, sels) => window.axe.run({ include: sels.map((s) => [s]) }, { runOnly: { type: 'tag', values: tags } }),
    AXE_TAGS,
    selectors,
  );
  return { axe, ibm: ibm.report, ibmResults: ibmInScope(ibm.report, scopePaths) };
}

// ─── Run ────────────────────────────────────────────────────────────────────
const chromePath = process.env.CHROME_PATH || DEFAULT_CHROME;
if (!fs.existsSync(chromePath)) fail(`Chrome not found at ${chromePath}. Set CHROME_PATH.`);

try {
  const res = await fetch(baseUrl, { signal: AbortSignal.timeout(5000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
} catch {
  fail(`Cannot reach ${baseUrl}. Start the dev server with "npm run dev" (or pass --base=URL).`);
}

const aChecker = require('accessibility-checker');
const axeSource = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const axeVersion = JSON.parse(
  fs.readFileSync(path.join(path.dirname(require.resolve('axe-core/axe.min.js')), 'package.json'), 'utf8'),
).version;
const ibmVersion = JSON.parse(
  fs.readFileSync(path.join(root, 'node_modules', 'accessibility-checker', 'package.json'), 'utf8'),
).version;
const ruleInfo = await loadIbmRuleInfo();

fs.mkdirSync(outDir, { recursive: true });
const browser = await puppeteer.launch({ executablePath: chromePath, headless: true });
let failures = 0;

try {
  for (const route of routes) {
    process.stdout.write(`Scanning ${route} … `);
    const page = await browser.newPage();
    try {
      await page.goto(`${baseUrl}${route}`, { waitUntil: 'load' });
      await page.waitForSelector('main');
      await sleep(SETTLE_MS);

      const scopeCount = await page.evaluate((sel) => document.querySelectorAll(sel).length, SCOPE_SELECTOR);
      if (!scopeCount) {
        throw new Error(`no element matches ${SCOPE_SELECTOR}; wrap the demo in it (see src/components/*Demo.jsx)`);
      }

      // Popups declared by the scope element(s). Each trigger is tagged with a unique
      // attribute so it can be clicked by a plain selector.
      const popups = await page.evaluate((sel) => {
        return [...document.querySelectorAll(`${sel}[data-a11y-popup]`)].map((el, i) => {
          const triggerSel = el.getAttribute('data-a11y-open-trigger');
          const trigger = triggerSel ? el.querySelector(triggerSel) : null;
          if (trigger) trigger.setAttribute('data-a11y-trigger-id', String(i));
          return {
            popup: el.getAttribute('data-a11y-popup'),
            trigger: trigger ? `[data-a11y-trigger-id="${i}"]` : null,
            triggerSel,
          };
        });
      }, SCOPE_SELECTOR);
      for (const p of popups) {
        if (!p.trigger) throw new Error(`open trigger "${p.triggerSel}" not found inside ${SCOPE_SELECTOR}`);
      }

      const common = { page, axeSource };
      const states = [];

      // 1. Closed (resting) state
      states.push(await scanState({ ...common, label: `${slugFor(route)}-closed`, selectors: [SCOPE_SELECTOR] }));
      const scannedStates = ['closed'];

      // 2. Open state: click each trigger, wait for its popup, scan scope + popups
      if (popups.length) {
        for (const p of popups) {
          await page.click(p.trigger);
          try {
            await page.waitForSelector(p.popup, { visible: true, timeout: POPUP_TIMEOUT_MS });
          } catch {
            throw new Error(`popup "${p.popup}" did not appear after clicking the trigger`);
          }
        }
        await sleep(SETTLE_MS);
        states.push(
          await scanState({
            ...common,
            label: `${slugFor(route)}-open`,
            selectors: [SCOPE_SELECTOR, ...popups.map((p) => p.popup)],
          }),
        );
        scannedStates.push('open');
      }

      // Merge states. IBM results are de-duplicated by rule + DOM path + message so an
      // element present in both states is counted once.
      const ibmSeen = new Set();
      const ibmMerged = [];
      for (const s of states) {
        for (const r of s.ibmResults) {
          const key = `${r.ruleId}|${r.path?.dom}|${r.message}`;
          if (ibmSeen.has(key)) continue;
          ibmSeen.add(key);
          ibmMerged.push(r);
        }
      }
      const ibmIssueResults = ibmMerged.filter((r) => r.level !== 'pass');
      const ibmPassResults = ibmMerged.filter((r) => r.level === 'pass');
      const ibmNls = Object.assign({}, ...states.map((s) => s.ibm.nls));
      const axePassed = mergeAxe(states.map((s) => s.axe.passes))
        .map(({ nodes, impact, ...rest }) => rest)
        .sort((a, b) => a.id.localeCompare(b.id));

      const scanDate = new Date().toISOString();
      const data = {
        route,
        scanDate,
        scope: SCOPE_SELECTOR,
        states: scannedStates,
        axe: {
          version: axeVersion,
          tags: AXE_TAGS,
          scanDate,
          passed: axePassed,
          violations: mergeAxe(states.map((s) => s.axe.violations)),
          incomplete: mergeAxe(states.map((s) => s.axe.incomplete)),
        },
        ibm: {
          version: ibmVersion,
          ruleArchive: states[0].ibm.summary.ruleArchive,
          scanDate,
          issues: groupIbm(ibmIssueResults, ruleInfo),
          passed: groupIbmPasses(ibmPassResults, ibmNls, ruleInfo),
        },
      };
      fs.writeFileSync(fileFor(route), `${JSON.stringify(data, null, 2)}\n`);
      const ibmTotal = data.ibm.issues.reduce((n, i) => n + (i.count ?? 1), 0);
      console.log(
        `[${scannedStates.join('+')}] axe: ${data.axe.violations.length} violations, ${data.axe.incomplete.length} to review, ${data.axe.passed.length} rules passed | IBM: ${ibmTotal} items, ${data.ibm.passed.length} rules passed`,
      );
    } catch (e) {
      failures += 1;
      console.log(`FAILED (${e.message})`);
    } finally {
      await page.close();
    }
  }
} finally {
  await aChecker.close();
  await browser.close();
}

if (failures) fail(`${failures} of ${routes.length} scan(s) failed.`);
console.log(`Done. Wrote ${routes.length} file(s) to src/a11y/.`);
