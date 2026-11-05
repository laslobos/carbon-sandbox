import React from 'react';
import { Stack } from '@carbon/react';
import { DatePickerV12 } from '../../components/DatePickerDemo';
import { V12ChangesBanner } from '../../components/V12ChangesBanner';
import { AccessibilityPanel } from '../../components/AccessibilityPanel';
import scan from '../../a11y/v12-date-picker.json';

// ─── Manual checklist ─────────────────────────────────────────────────────────
// Component-specific checks. The standard checks (focus, zoom, contrast, screen reader …)
// and one item per scanner "needs review" finding are added by the panel.
// `note` records what a headless-Chrome pre-check saw on 2026-11-03. It is NOT a pass:
// a person still has to test and tick Resolved. No screen reader was used.
// Several findings come from Carbon's DatePicker / flatpickr rather than the v12 styling.
const componentChecks = [
  {
    id: 'input-label',
    category: 'Content and forms',
    title: 'The input has a visible label that is programmatically associated with it',
    how: 'Click the label text: the input should receive focus. In DevTools, the input\'s accessible name should be "Date picker label".',
    why: 'Scanners confirm a label exists, not that it makes sense.',
    wcag: '1.3.1 Info and Relationships (A), 3.3.2 Labels or Instructions (A)',
    note: 'The label was associated with the input.',
  },
  {
    id: 'opens-on-focus',
    category: 'Focus',
    title: 'The calendar opening when the input receives keyboard focus is acceptable',
    how: 'Tab onto the input. Decide whether opening without an activation counts as an unexpected change.',
    why: 'A judgement about behaviour.',
    wcag: '3.2.1 On Focus (A)',
    note: 'Tabbing to the input opened the calendar. It did not take focus.',
  },
  {
    id: 'reach-days',
    category: 'Keyboard',
    title: 'A keyboard user can reach the days and move between them with the arrow keys',
    how: 'Tab from the input into the calendar, then use the arrow keys. Also try ArrowDown from the input.',
    why: 'IBM flags the 42 day cells as "role=button without a tabbable element". Roving focus is intended, but only a keyboard test shows it works.',
    wcag: '2.1.1 Keyboard (A)',
    note: 'Tab moved to today\'s date; Left/Right moved 1 day and Up/Down 7. ArrowDown from the input did not enter the grid; only Tab did.',
  },
  {
    id: 'enter-selects',
    category: 'Keyboard',
    title: 'Enter on a day selects it, closes the calendar and returns focus to the input',
    how: 'Focus a day and press Enter.',
    why: 'Requires performing the action.',
    wcag: '2.1.1 Keyboard (A), 3.2.2 On Input (A)',
    note: 'The value was written to the input and focus returned to it.',
  },
  {
    id: 'escape',
    category: 'Keyboard',
    title: 'Escape closes the calendar and focus ends up on the input',
    how: 'Press Escape from the input and from inside the grid.',
    why: 'Focus management after a key press is not scanned.',
    wcag: '2.1.1 Keyboard (A)',
    note: 'Worked from both places.',
  },
  {
    id: 'tab-leaves',
    category: 'Keyboard',
    title: 'Tab leaves the calendar and the calendar closes',
    how: 'Tab into the grid then Tab again. Focus should move on to the next control on the page.',
    why: 'Focus order is not scanned.',
    wcag: '2.1.2 No Keyboard Trap (A), 2.4.3 Focus Order (A)',
    note: 'Order was input, then today\'s date, then the next control; the calendar closed.',
  },
  {
    id: 'month-keyboard',
    category: 'Keyboard',
    title: 'The month can be changed with the keyboard, and the method is discoverable',
    how: 'In the grid press Ctrl+Right and Ctrl+Left. Look for any on-screen hint that this is possible.',
    why: 'Key handling and discoverability cannot be scanned.',
    wcag: '2.1.1 Keyboard (A), 3.3.2 Labels or Instructions (A)',
    note: 'Ctrl+Arrow changed the month. Nothing on screen says so.',
  },
  {
    id: 'past-month-end',
    category: 'Assistive technology',
    title: 'Arrowing past the end of the month is announced sensibly',
    how: 'With a screen reader, arrow beyond the last day of the month. Check what is announced and whether the month heading changes.',
    why: 'Dynamic state changes are not scanned.',
    wcag: '1.3.1 Info and Relationships (A), 4.1.2 Name, Role, Value (A)',
    note: 'Focus moved onto a trailing December day while the heading still read November.',
  },
  {
    id: 'month-controls',
    category: 'Component-specific',
    title: 'The previous / next month controls are operable buttons',
    how: 'Tab to try to reach the arrows beside the month name. Inspect them in DevTools for a role and tabindex.',
    why: 'Neither scanner flagged these controls.',
    wcag: '4.1.2 Name, Role, Value (A), 2.1.1 Keyboard (A)',
    note: 'LIKELY FAIL. They are span elements with no role and no tabindex; only an inner SVG has a name. Ctrl+Arrow is the only keyboard route.',
  },
  {
    id: 'selected-state',
    category: 'Assistive technology',
    title: 'The calendar container and days have useful names, and the selected day is exposed',
    how: 'Inspect the container, a day and the selected day in the Accessibility pane. With a screen reader, listen for the selected state.',
    why: 'Scanners check that a name exists, not that it is meaningful or that selection is exposed.',
    wcag: '4.1.2 Name, Role, Value (A), 1.3.1 Info and Relationships (A)',
    note: 'The container is role="application" named "calendar-container". Days have full-date labels and today has aria-current="date", but the selected day has no aria-selected.',
  },
  {
    id: 'year-field',
    category: 'Content and forms',
    title: 'The year field in the calendar has a visible label and can be reached',
    how: 'Open the calendar and look for a visible "Year" label. Try to Tab to the year field.',
    why: 'IBM raises the issue but cannot decide whether it matters.',
    wcag: '1.3.1 Info and Relationships (A), 3.3.2 Labels or Instructions (A)',
    note: 'It has aria-label="Year" and tabindex="-1" but no visible label.',
  },
  {
    id: 'valid-date',
    category: 'Content and forms',
    title: 'Typing a valid date is accepted and shown in the calendar',
    how: 'Type 11/05/2026 and press Enter, then reopen the calendar.',
    why: 'Requires entering data.',
    wcag: '3.3.2 Labels or Instructions (A)',
    note: 'The date was accepted unchanged and highlighted.',
  },
];

// Hints shown on the standard checks, specific to this component.
const standardNotes = {
  'std.errors': 'LIKELY FAIL. Typing 13/45/2026 showed no error: aria-invalid was not set and there was no message, and Enter silently replaced the value with 01/01/2026. The demo sets no invalid / invalidText props, so this may be configuration rather than the component.',
  'std.instructions': 'The format "mm/dd/yyyy" appears only in the placeholder, which disappears on typing. There is no helper text or aria-describedby.',
  'std.text-contrast': 'Not measured. The v12 input uses a gradient background and a transparent border, which axe cannot sample (it reports "needs review" because the input is empty).',
  'std.focus-visible': 'The input and the focused day both had a 2px solid blue outline. Contrast not measured.',
  'std.forced-colors': 'Calendar border, arrows, weekday row, day numbers and input border were visible. Selected, hovered and range states were not checked.',
  'std.zoom-200': 'At 640 px wide the calendar stayed inside the viewport.',
  'std.reflow-320': 'Could not be tested here: the sandbox sidenav pushes content off screen at 320 px. Test on a page without the sidenav.',
  'std.keyboard-operable': 'The input took 38 Tab presses to reach because the sidenav links come first.',
};

// Does not apply to a date input.
const omit = ['std.hover-focus-content'];

function DatePickerPage() {
  return (
    <Stack gap={7} style={{ padding: '2rem' }}>
      <Stack gap={3}>
        <h1>Date Picker</h1>
        <p>
          Date pickers allow users to select a single date or a range of dates
          using a calendar overlay or by typing directly into the input.
        </p>
      </Stack>

      <V12ChangesBanner
        noJsChanges={true}
        cssChanges={[
          'Input border: 1px solid transparent with gradient background (gray-20 → gray-50) replacing the solid bottom border.',
          'Input corners: border-radius 0.25rem (was 0).',
          'Calendar popover: border-radius 0.5rem with 1px solid border-subtle.',
          'Calendar opens with 4px gap below the input (margin-block-start spacing).',
        ]}
      />

      <DatePickerV12 />

      <AccessibilityPanel
        scan={scan}
        componentChecks={componentChecks}
        standardNotes={standardNotes}
        omit={omit}
      />
    </Stack>
  );
}

export default DatePickerPage;
