// Manual accessibility checklist shared by every component page.
//
// A checklist item is:
//   { id, category, title, how, why, wcag, source, evidence?, helpUrl?, note? }
//     id        stable key used to store the tester's comment / resolved flag
//     how       what the tester should do, step by step
//     why       why a human is needed (what the automated tools cannot judge)
//     source    'standard' | 'tool' | 'component'
//     note      optional, component-specific hint (for example an earlier pre-check)
//
// buildChecklist() merges three sources:
//   1. STANDARD_CHECKS    – things no scanner can do, for every component
//   2. tool findings      – one item for every axe "incomplete" / violation and every
//                           IBM "needs review" / violation in the scan, so nothing the tools
//                           could not decide is left without a human check
//   3. component checks   – supplied by the page (component-specific behaviour)

export const CATEGORIES = [
  'Keyboard',
  'Focus',
  'Visual and colour',
  'Zoom and layout',
  'Assistive technology',
  'Content and forms',
  'Pointer and motion',
  'Tool findings to confirm',
  'Component-specific',
];

export const STANDARD_CHECKS = [
  // ── Keyboard ──────────────────────────────────────────────────────────────
  {
    id: 'std.keyboard-operable',
    category: 'Keyboard',
    title: 'Every interactive part can be reached and operated with the keyboard alone',
    how: 'Unplug or ignore the mouse. Use Tab, Shift+Tab, Enter, Space, Escape and the arrow keys to do everything the component offers.',
    why: 'Scanners read a static page; they never press keys.',
    wcag: '2.1.1 Keyboard (A)',
  },
  {
    id: 'std.keyboard-no-trap',
    category: 'Keyboard',
    title: 'Keyboard focus is never trapped',
    how: 'Tab into the component, open any popup, then confirm you can leave again using only the keyboard.',
    why: 'Only a person can tell whether focus can escape.',
    wcag: '2.1.2 No Keyboard Trap (A)',
  },
  {
    id: 'std.keyboard-shortcuts',
    category: 'Keyboard',
    title: 'Keyboard shortcuts are discoverable and do not clash with assistive technology',
    how: 'List any shortcut the component uses (for example Ctrl+Arrow). Confirm it is described somewhere, and does not override a browser or screen reader key.',
    why: 'Discoverability and conflicts cannot be detected automatically.',
    wcag: '2.1.4 Character Key Shortcuts (A)',
  },
  // ── Focus ─────────────────────────────────────────────────────────────────
  {
    id: 'std.focus-order',
    category: 'Focus',
    title: 'Focus order is logical, including after a popup closes',
    how: 'Tab through the component. Open and close each popup and note where focus goes; it should return to the control that opened it.',
    why: 'Order and focus return are only visible while interacting.',
    wcag: '2.4.3 Focus Order (A)',
  },
  {
    id: 'std.focus-visible',
    category: 'Focus',
    title: 'The focus indicator is clearly visible on every focusable part, in every state',
    how: 'Tab to each control. The indicator must be easy to see against every background it can appear on, and have at least 3:1 contrast with its surroundings.',
    why: 'Scanners can only ask you to check; they cannot judge visibility or measure the indicator.',
    wcag: '2.4.7 Focus Visible (AA), 1.4.11 Non-text Contrast (AA)',
  },
  {
    id: 'std.focus-not-obscured',
    category: 'Focus',
    title: 'The focused element is not hidden behind sticky headers, popups or other content',
    how: 'Tab through the component with the page scrolled in different positions and confirm the focused item is never fully covered.',
    why: 'Overlap depends on the live layout.',
    wcag: '2.4.11 Focus Not Obscured (AA, WCAG 2.2)',
  },
  {
    id: 'std.no-context-change',
    category: 'Focus',
    title: 'Moving focus or entering a value does not cause an unexpected change',
    how: 'Tab onto each control and change each value. Nothing should open, submit or navigate unless the user asked for it.',
    why: 'Unexpected changes are behaviour, not markup.',
    wcag: '3.2.1 On Focus (A), 3.2.2 On Input (A)',
  },
  // ── Visual and colour ─────────────────────────────────────────────────────
  {
    id: 'std.text-contrast',
    category: 'Visual and colour',
    title: 'Text contrast is at least 4.5:1 (3:1 for large text) in every state',
    how: 'With a contrast checker, measure the label, value, placeholder, helper text, disabled and hover states against their real background, including gradients and images. Repeat in each Carbon theme you ship (White, g10, g90, g100).',
    why: 'Scanners cannot sample gradients, empty fields or states that are not on screen.',
    wcag: '1.4.3 Contrast (Minimum) (AA)',
  },
  {
    id: 'std.nontext-contrast',
    category: 'Visual and colour',
    title: 'Borders, icons and state indicators have at least 3:1 contrast',
    how: 'Measure the input or button border, icons, the selected state and any state that is shown only by a graphic.',
    why: 'Tools rarely evaluate borders and graphics.',
    wcag: '1.4.11 Non-text Contrast (AA)',
  },
  {
    id: 'std.colour-alone',
    category: 'Visual and colour',
    title: 'Nothing is communicated by colour alone',
    how: 'View the component in greyscale. Selected, disabled, error and hover states must still be distinguishable by another cue (text, icon, shape).',
    why: 'A scanner cannot know what a colour is meant to say.',
    wcag: '1.4.1 Use of Color (A)',
  },
  {
    id: 'std.forced-colors',
    category: 'Visual and colour',
    title: 'The component is usable in Windows High Contrast (forced-colors) mode',
    how: 'Turn on High Contrast on Windows, or emulate "forced-colors: active" in Chrome DevTools (Rendering tab). Borders, focus and states must remain visible.',
    why: 'No tool renders and judges forced-colors mode.',
    wcag: '1.4.11 Non-text Contrast (AA), 1.4.1 Use of Color (A)',
  },
  {
    id: 'std.truncation',
    category: 'Visual and colour',
    title: 'No text is cut off or hidden without a way to read it',
    how: 'Use long labels and values. Anything shown with an ellipsis or clipped must be readable another way (wrap, tooltip, expand).',
    why: 'Visual clipping is not detected by scanners.',
    wcag: '1.4.4 Resize Text (AA), 1.4.10 Reflow (AA)',
  },
  // ── Zoom and layout ───────────────────────────────────────────────────────
  {
    id: 'std.zoom-200',
    category: 'Zoom and layout',
    title: 'At 200% browser zoom nothing is lost or overlaps',
    how: 'Zoom the browser to 200%. All content and functions must remain available, and popups must stay on screen.',
    why: 'Scanners do not resize the page.',
    wcag: '1.4.4 Resize Text (AA)',
  },
  {
    id: 'std.reflow-320',
    category: 'Zoom and layout',
    title: 'At 320 CSS px wide (400% zoom) the component works without sideways scrolling',
    how: 'Narrow the window to 320 px or zoom to 400%. Test in a page without the sandbox side navigation, which itself prevents this check.',
    why: 'Needs a different viewport and layout.',
    wcag: '1.4.10 Reflow (AA)',
  },
  {
    id: 'std.text-spacing',
    category: 'Zoom and layout',
    title: 'Content survives increased text spacing',
    how: 'Apply a text-spacing bookmarklet or extension (line height 1.5, paragraph 2em, letter 0.12em, word 0.16em). Nothing may be clipped or overlap.',
    why: 'Requires changing the page styles and looking at the result.',
    wcag: '1.4.12 Text Spacing (AA)',
  },
  {
    id: 'std.hover-focus-content',
    category: 'Zoom and layout',
    title: 'Content that appears on hover or focus can be dismissed, hovered and stays visible',
    how: 'For tooltips and popovers: press Escape to dismiss, move the pointer onto the content without it vanishing, and confirm it stays until dismissed.',
    why: 'Behavioural. Remove this item if the component has no such content.',
    wcag: '1.4.13 Content on Hover or Focus (AA)',
  },
  // ── Assistive technology ──────────────────────────────────────────────────
  {
    id: 'std.screen-reader',
    category: 'Assistive technology',
    title: 'A screen reader announces the name, role, state and value of every control',
    how: 'Test with VoiceOver + Safari, and ideally NVDA + Firefox/Chrome or JAWS. Move through the component and open every popup. Listen for: what it is, its name, expanded/selected/checked state, and position in a list.',
    why: 'No automated tool reports what a screen reader actually says.',
    wcag: '4.1.2 Name, Role, Value (A), 1.3.1 Info and Relationships (A)',
  },
  {
    id: 'std.status-messages',
    category: 'Assistive technology',
    title: 'Changes in state and messages are announced without moving focus',
    how: 'With a screen reader running, trigger results, errors, selections or loading. Confirm they are announced.',
    why: 'Live-region output can only be heard.',
    wcag: '4.1.3 Status Messages (AA)',
  },
  {
    id: 'std.voice-control',
    category: 'Assistive technology',
    title: 'Every control can be targeted by voice using its visible label',
    how: 'Turn on Voice Control (macOS/iOS) or Dragon. Say "click" followed by each visible label; each should activate the right control.',
    why: 'Depends on how voice software matches accessible names to visible text.',
    wcag: '2.5.3 Label in Name (A)',
  },
  {
    id: 'std.names-meaningful',
    category: 'Assistive technology',
    title: 'Accessible names and descriptions are meaningful, not just present',
    how: 'Inspect names in the DevTools Accessibility pane. Names such as "calendar-container" or "button" are present but unhelpful.',
    why: 'Scanners check that a name exists, not whether it makes sense.',
    wcag: '4.1.2 Name, Role, Value (A), 2.4.6 Headings and Labels (AA)',
  },
  // ── Content and forms ─────────────────────────────────────────────────────
  {
    id: 'std.instructions',
    category: 'Content and forms',
    title: 'Labels and instructions (such as the required format) are visible and persistent',
    how: 'Check that the label and any format hint are still visible once the field has a value (a placeholder disappears).',
    why: 'Whether the instructions are adequate is a judgement.',
    wcag: '3.3.2 Labels or Instructions (A)',
  },
  {
    id: 'std.errors',
    category: 'Content and forms',
    title: 'Errors are identified in text, explained, and announced',
    how: 'Enter invalid, empty and out-of-range values. An error message must appear, say what is wrong and how to fix it, be linked to the field, and be announced. Remove this item if the component takes no input.',
    why: 'Error handling only appears after bad data is entered.',
    wcag: '3.3.1 Error Identification (A), 3.3.3 Error Suggestion (AA)',
  },
  // ── Pointer and motion ────────────────────────────────────────────────────
  {
    id: 'std.pointer-target',
    category: 'Pointer and motion',
    title: 'Pointer targets are large enough and spaced out',
    how: 'Measure clickable areas (DevTools box model). Each should be at least 24 × 24 CSS px, or have enough space around it. Try with a touch screen.',
    why: 'Scanners only measure a subset and skip many widgets.',
    wcag: '2.5.8 Target Size (Minimum) (AA, WCAG 2.2)',
  },
  {
    id: 'std.reduced-motion',
    category: 'Pointer and motion',
    title: 'Animation and transitions respect "reduce motion"',
    how: 'Turn on Reduce motion in the operating system (or emulate prefers-reduced-motion in DevTools) and confirm nothing flashes, slides or animates unnecessarily.',
    why: 'Needs the preference to be set and the result watched.',
    wcag: '2.3.1 Three Flashes (A), 2.2.2 Pause, Stop, Hide (A)',
  },
];

// ── Guidance for the rules the tools commonly cannot decide ──────────────────
// Keyed by rule id (axe or IBM). Anything not listed gets generic guidance.
const RULE_GUIDANCE = {
  'color-contrast': {
    how: 'Measure the contrast of the flagged text against the real background, with a value typed in and with the placeholder showing. Check in each Carbon theme.',
    why: 'axe cannot sample gradients, images, or text that is empty or overlapped.',
  },
  'target-size': {
    how: 'Measure the flagged element. It should be at least 24 × 24 CSS px, or have 24 px of clear space around it.',
    why: 'axe cannot decide when an undersized target is an acceptable exception.',
  },
  'aria-valid-attr-value': {
    how: 'In DevTools open the trigger, expand it, and confirm aria-controls equals the id of the element it controls (and that the element exists).',
    why: 'The controlled element lives in a portal outside the scanned area, so axe cannot resolve the reference.',
  },
  aria_keyboard_handler_exists: {
    how: 'Use the keyboard on the flagged widget. Enter, Space, arrow keys and Escape should all behave as expected for its role.',
    why: 'IBM sees a role that needs key handling but cannot see whether the handler works.',
  },
  widget_tabbable_single: {
    how: 'Tab through the widget. Only one item should be tabbable at a time (arrow keys move within it). Confirm Tab then leaves the widget.',
    why: 'Whether roving focus is implemented correctly can only be judged by using it.',
  },
  widget_tabbable_exists: {
    how: 'Tab into the widget and confirm exactly one item takes focus, then move between items with the arrow keys. Every item shown flagged by IBM is expected to be reachable that way.',
    why: 'IBM cannot tell roving focus (intended) from items that are unreachable.',
  },
  style_focus_visible: {
    how: 'Tab to the flagged element and confirm a clearly visible focus indicator, with at least 3:1 contrast.',
    why: 'IBM can see that a style removes the default outline, not whether the replacement is visible.',
  },
  application_content_accessible: {
    how: 'With a screen reader, confirm everything inside the role="application" region can be read and operated. Application mode can switch off normal reading commands.',
    why: 'Depends on the screen reader and how the region behaves.',
  },
  input_label_visible: {
    how: 'Confirm the visible label text appears in the input\'s accessible name so voice-control users can say it.',
    why: 'IBM cannot always match the visible label to the accessible name.',
  },
  aria_content_in_landmark: {
    how: 'The element sits outside any landmark (usually a popup attached to <body>). Decide whether to accept this as a library limitation and record it in the comment, or report it upstream.',
    why: 'A person has to decide if the finding is acceptable for this component.',
  },
  'scrollable-region-focusable': {
    how: 'Confirm the scrollable area can be scrolled with the keyboard.',
    why: 'axe cannot tell whether other controls inside provide keyboard access.',
  },
};

const trim = (text, max = 220) => {
  const clean = String(text ?? '').replace(/\s+/g, ' ').trim();
  return clean.length > max ? `${clean.slice(0, max)}…` : clean;
};

const unique = (list) => [...new Set(list.filter(Boolean))];

function axeItems(axe = {}) {
  const make = (rule, kind) => {
    const guide = RULE_GUIDANCE[rule.id];
    return {
      id: `tool.axe.${rule.id}`,
      category: 'Tool findings to confirm',
      title: `axe-core ${kind}: ${rule.description ?? rule.id}`,
      how: guide?.how ?? 'Inspect the elements listed under "Found at" and decide whether the rule\'s requirement is met. Follow the guidance link for the exact test.',
      why: guide?.why ?? (kind === 'violation'
        ? 'The tool reports a failure; a person must fix it or record why it is accepted.'
        : 'axe could not decide pass or fail automatically.'),
      wcag: `axe rule: ${rule.id}`,
      source: 'tool',
      evidence: unique((rule.nodes ?? []).map((n) => trim(n.html))).slice(0, 3),
      helpUrl: rule.helpUrl,
    };
  };
  return [
    ...(axe.violations ?? []).map((r) => make(r, 'violation')),
    ...(axe.incomplete ?? []).map((r) => make(r, 'needs review')),
  ];
}

function ibmItems(ibm = {}) {
  const byRule = new Map();
  for (const issue of ibm.issues ?? []) {
    const key = issue.ruleId ?? issue.issue;
    const entry = byRule.get(key) ?? { issues: [], count: 0, violation: false };
    entry.issues.push(issue);
    entry.count += issue.count ?? 1;
    entry.violation ||= issue.type === 'Violation';
    byRule.set(key, entry);
  }
  return [...byRule.entries()].map(([ruleId, entry]) => {
    const first = entry.issues[0];
    const guide = RULE_GUIDANCE[ruleId];
    const distinctMessages = unique(entry.issues.map((i) => i.issue));
    return {
      id: `tool.ibm.${ruleId}`,
      category: 'Tool findings to confirm',
      title: `IBM Equal Access ${entry.violation ? 'violation' : 'needs review'}: ${trim(first.issue, 160)}${entry.count > 1 ? ` (${entry.count} occurrences${distinctMessages.length > 1 ? `, ${distinctMessages.length} variants` : ''})` : ''}`,
      how: guide?.how ?? 'Inspect the elements listed under "Found at" and decide whether the requirement is met. Follow the guidance link for the exact test.',
      why: guide?.why ?? (entry.violation
        ? 'The tool reports a failure; a person must fix it or record why it is accepted.'
        : 'IBM Equal Access could not decide pass or fail automatically.'),
      wcag: first.checkpoint,
      source: 'tool',
      // One line per distinct message so a merged rule never hides one of its variants.
      evidence: distinctMessages.length > 1
        ? entry.issues.map((i) => `${trim(i.issue, 90)} — ${trim(i.element, 140)}`).slice(0, 4)
        : unique(entry.issues.map((i) => trim(i.element))).slice(0, 3),
      helpUrl: first.helpUrl,
    };
  });
}

/**
 * @param {object}   args
 * @param {object}   args.scan             parsed src/a11y/<route>.json
 * @param {Array}    args.componentChecks  [{ id, title, how, why, wcag, note? }] (id is prefixed automatically)
 * @param {object}   args.standardNotes    { [standardId]: 'component-specific hint' }
 * @param {string[]} args.omit             standard ids that do not apply to this component
 */
export function buildChecklist({ scan, componentChecks = [], standardNotes = {}, omit = [] }) {
  const prefix = (scan?.route ?? 'component').replace(/^\//, '').replace(/[^a-z0-9]+/gi, '-').toLowerCase();

  const standard = STANDARD_CHECKS
    .filter((c) => !omit.includes(c.id))
    .map((c) => ({ ...c, source: 'standard', note: standardNotes[c.id] }));

  const component = componentChecks.map((c) => ({
    ...c,
    id: `${prefix}.${c.id}`,
    category: c.category ?? 'Component-specific',
    source: 'component',
  }));

  const order = (item) => CATEGORIES.indexOf(item.category);
  return [...standard, ...axeItems(scan?.axe), ...ibmItems(scan?.ibm), ...component]
    .sort((a, b) => order(a) - order(b));
}

export const slugForScan = (scan) =>
  (scan?.route ?? '').replace(/^\//, '').replace(/\//g, '-').toLowerCase();

// ── Status of a saved item ───────────────────────────────────────────────────
// A resolved or accepted item goes stale after MANUAL_STALE_AFTER_DAYS and then counts as
// "to do" again until someone re-tests it and confirms it.
export const MANUAL_STALE_AFTER_DAYS = 90;
const MS_PER_DAY = 24 * 60 * 60 * 1000;

/** @returns {{ state: 'todo'|'resolved'|'accepted', stale: boolean, closed: boolean, ageDays: number|null }} */
export function itemStatus(saved, now = Date.now()) {
  if (!saved || (!saved.resolved && !saved.accepted)) {
    return { state: 'todo', stale: false, closed: false, ageDays: null };
  }
  const time = new Date(saved.updatedAt).getTime();
  const ageDays = Number.isNaN(time) ? null : Math.max(0, Math.floor((now - time) / MS_PER_DAY));
  const stale = ageDays !== null && ageDays > MANUAL_STALE_AFTER_DAYS;
  return { state: saved.accepted ? 'accepted' : 'resolved', stale, closed: !stale, ageDays };
}

/** Checklist item id that corresponds to a scanner result, so rows can show their manual status. */
export const toolItemId = (tool, ruleId) => `tool.${tool}.${ruleId}`;
