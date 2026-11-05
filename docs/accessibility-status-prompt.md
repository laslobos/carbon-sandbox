# Accessibility status prompt

Reusable prompt for adding an "Accessibility status" section (axe-core, IBM Equal Access, manual tests) to a component page.

Replace `[Component]` and `[route]` as needed.

## Automated scans (axe-core + IBM Equal Access)

Start the dev server (`npm run dev`), then:

```bash
npm run a11y:scan -- /v12/[route]   # scan one route (creates or refreshes src/a11y/v12-[route].json)
npm run a11y:scan                   # refresh every route that already has a file
npm run a11y:scan -- --all          # scan every route in src/routes.js
```

Options: `--base=http://localhost:3001` or `A11Y_BASE_URL` for a different port; `CHROME_PATH` for a different Chrome.

The panel shows the scan age and marks it "Out of date" after 30 days (`STALE_AFTER_DAYS` in `AccessibilityPanel.jsx`). Scan snippets have the dev-only `ibm-a11y-debug` attribute removed.

### Scope: the v12 component only

Both scanners report only what is inside an element marked `data-a11y-scope="v12"`. Page chrome (header, sidenav, skip link, the status panel itself) is excluded. Each demo component must wrap its output in that element:

```jsx
<FeatureFlags enableV12Release enableV12DynamicFloatingStyles>
  <div data-a11y-scope="v12">
    {/* the v12 component(s) */}
  </div>
</FeatureFlags>
```

If a route has no such element the scan fails with a message, rather than reporting "no issues". The scope is saved in each JSON file as `scope`.

### Open state (menus, calendars, other popups)

Components that show a popup are scanned twice, closed and open, and the results are merged (de-duplicated). The scope element declares how to open it:

```jsx
<div
  data-a11y-scope="v12"
  data-a11y-open-trigger="button"            // element to click, searched inside the scope element
  data-a11y-popup=".cds--menu"               // the popup, searched on the whole document
>
```

Carbon renders popups in a portal on `<body>`, outside the scope element, which is why the popup has its own selector. Both are included in the scan. If the trigger is missing or the popup does not appear within 5 seconds the scan fails rather than silently scanning the closed state. Each JSON file records which states were scanned in `states`.

Omit both attributes for components with no popup; only the closed state is scanned.

Known limits: only one open state is scanned (for example, not each item focused, or a date selected), and interaction results (focus return, key handling) still need the manual tests.

## Prompt (add the panel to a new page)

```text
For the [Component] page (route /v12/[route]), run `npm run a11y:scan -- /v12/[route]` so that
src/a11y/v12-[route].json exists (the demo must be wrapped in data-a11y-scope="v12", plus
data-a11y-open-trigger and data-a11y-popup if it has a popup). In
src/pages/v12/[Component]Page.jsx, import that JSON as `scan` and render
<AccessibilityPanel scan={scan} componentChecks={componentChecks} standardNotes={standardNotes} omit={omit} />
below the demo, as in MenuButtonsPage.jsx.
Write componentChecks for behaviour specific to this component, put any headless pre-check results in
`note` (never as a pass), and use `omit` for standard checks that do not apply. Do not tick anything
as resolved: the person doing the manual testing does that in the panel.
```

## How the panel works

**Automated tab** shows axe-core and IBM Equal Access results in three clearly separated groups: **Failed**, **Needs human review**, **Passed**. The header shows the number of automated failures.

**Manual checklist tab** is a list a person completes by hand. It is built from three sources (`src/a11y/checklist.js`):

1. **Standard checks** (`STANDARD_CHECKS`): things no scanner can do, for every component. Keyboard, focus, contrast, forced-colors, truncation, zoom and reflow, text spacing, screen reader, status messages, voice control, names, instructions, errors, target size, reduced motion.
2. **Scanner findings**: one item for every axe violation/incomplete and every IBM violation/needs-review, merged by rule id. The "how to test" text comes from `RULE_GUIDANCE` for known rules, and is generic otherwise. Add an entry to `RULE_GUIDANCE` when a new rule turns up.
3. **Component checks**: the `componentChecks` prop.

Every item shows *How to test* and *Why a person is needed*, and has a **Status** (To do / Resolved / Accepted) and a **Comment** box. The panel header counts "N of M manual checks done" (resolved or accepted). Filter with All / To do / Resolved / Accepted.

- **Resolved**: tested by hand; it passed, or the outcome is recorded in the comment.
- **Accepted (known issue)**: the team has decided to live with it. The comment is required and is the reason. An accepted scanner finding moves out of Failed / Needs review into its own "Accepted known issues" group on the Automated tab (with the reason shown) and stops counting as a failure. Use it for expected findings, such as the 42 flatpickr day buttons, or a popup that a library attaches outside `<main>`.
- **Stale after 90 days** (`MANUAL_STALE_AFTER_DAYS` in `src/a11y/checklist.js`): a Resolved or Accepted item older than that counts as to do again, an accepted finding returns to Failed / Needs review, and the item shows "Re-test needed". The "Confirm this is still …" button re-dates it without changing it.

Saved state lives in `src/a11y/manual/<route-slug>.json` as `{ items: { [itemId]: { resolved, accepted, comment, updatedAt } } }`.

- Written by a dev-only Vite plugin (`scripts/a11y-manual-plugin.mjs`): loopback clients only, same-origin only, validated ids, comment capped at 2000 characters, atomic write. It does not exist in `vite build`.
- A production build shows the committed file read-only.
- **Commit `src/a11y/manual/*.json`** so ticks and comments are kept. The dev server ignores that folder so saving does not reload the page.
- `resolved` and `accepted` are mutually exclusive, and the server rejects an accepted item with no comment. Entries saved before `accepted` existed are read as not accepted.
- Item ids are stable: `std.*` for standard checks, `tool.axe.<rule>` / `tool.ibm.<rule>` for scanner findings, `<route-slug>.<id>` for component checks. If a rescan makes a scanner item disappear, its saved note is kept and the panel says so.
- Clearing a comment and unticking an item removes its entry.

### Marking results

Resolved means "I tested this by hand and either it passed or I recorded the outcome in the comment". Use the comment for failures too: a failure that you have recorded but not fixed is still resolved as far as the checklist goes, so write "FAIL:" at the start so it can be found. Pre-check results from scripted browser tests go in the item's `note` and are labelled as such in the panel; they never count as resolved.

Quick checks can be scripted with `puppeteer-core` against the dev server (key presses, `getComputedStyle`, `page.emulateMediaFeatures([{ name: 'forced-colors', value: 'active' }])`, `page.setViewport`).

## What is and is not covered

Automated tools cover roughly a third of WCAG success criteria, and only partly. The checklist exists for the rest.

| Area | Automated | Manual checklist |
|---|---|---|
| Names, roles, ARIA validity, labels, alt text, duplicate ids, landmarks, headings | axe + IBM | Names are meaningful (std.names-meaningful) |
| Colour contrast of normal text | axe (when it can sample the background) | std.text-contrast for gradients, empty fields, states, themes |
| Non-text contrast, use of colour | not reliably | std.nontext-contrast, std.colour-alone |
| Keyboard operation, traps, focus order | only "is it focusable" | std.keyboard-*, std.focus-order |
| Focus visibility and not obscured | IBM asks you to check | std.focus-visible, std.focus-not-obscured |
| Zoom, reflow, text spacing, truncation | no | std.zoom-200, std.reflow-320, std.text-spacing, std.truncation |
| Forced colours | no | std.forced-colors |
| Screen reader output, status messages | no | std.screen-reader, std.status-messages |
| Voice control, label in name | partly (IBM) | std.voice-control |
| Errors, instructions | no | std.errors, std.instructions |
| Target size, motion, hover/focus content | partly (axe `target-size`) | std.pointer-target, std.reduced-motion, std.hover-focus-content |

Not covered at all, by design: testing with real users, other browsers and devices (the scan uses Chrome only), other screen reader and browser combinations beyond what the tester tries, other Carbon themes unless the tester switches them, and anything outside the `data-a11y-scope` element or the single scanned open state.

## Reference

- Scan script: `scripts/a11y-scan.mjs`
- Scan output: `src/a11y/<route>.json` (generated, commit it)
- Route list shared by the sidenav and the script: `src/routes.js`
- IBM checker config: `.achecker.yml`
- Panel component: `src/components/AccessibilityPanel.jsx` (styles in `AccessibilityPanel.scss`)
- Checklist data and builder: `src/a11y/checklist.js`; state hook: `src/a11y/useManualState.js`; save endpoint: `scripts/a11y-manual-plugin.mjs`
- Manual state: `src/a11y/manual/<route-slug>.json` (commit it)
- Working example: `src/pages/v12/MenuButtonsPage.jsx`
- axe-core rules and CLI commands: `docs/axe-core-rules.md`
- IBM accessibility MCP config: `.bob/mcp.json`
- Ignored issues: `.accessibility-rejected.json`

## Data shapes

- `scan.axe`: `{ version, tags, scanDate, passed: [], violations: [], incomplete: [] }`. Each violation or incomplete item is `{ id, impact, description, helpUrl, nodeCount, nodes: [{ html, target, failureSummary }] }`. Each `passed` item is `{ id, description, helpUrl, nodeCount }`.
- `scan.ibm`: `{ version, ruleArchive, scanDate, issues: [], passed: [] }`. Each issue is `{ type, level, checkpoint, issue, element, helpUrl, count? }`. Each `passed` item is `{ id, description, checkpoint, helpUrl, count }`.
- `scan.ibm` issues also carry `ruleId`, which the checklist uses to merge and to look up guidance.
- `componentChecks`: `[{ id, category?, title, how, why, wcag, note? }]`. `category` is one of `CATEGORIES` in `checklist.js` (default "Component-specific").
- `standardNotes`: `{ 'std.focus-visible': 'hint for this component' }`. `omit`: `['std.errors']`.
- Manual state file: `{ items: { [itemId]: { resolved, accepted, comment, updatedAt } } }`.
