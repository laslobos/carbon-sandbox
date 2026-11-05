import React from 'react';
import { Stack } from '@carbon/react';
import { MenuButtonV12 } from '../../components/MenuButtonDemo';
import { AccessibilityPanel } from '../../components/AccessibilityPanel';
import { V12ChangesBanner } from '../../components/V12ChangesBanner';
import scan from '../../a11y/v12-menu-buttons.json';

// ─── Manual checklist ─────────────────────────────────────────────────────────
// Component-specific checks. The standard checks (focus, zoom, contrast, screen reader …)
// and one item per scanner "needs review" finding are added by the panel.
// `note` records what a headless-Chrome pre-check saw on 2026-11-03. It is NOT a pass:
// a person still has to test and tick Resolved. No screen reader was used.
const componentChecks = [
  {
    id: 'open-keys',
    category: 'Keyboard',
    title: 'Enter and Space open the menu and move focus to the first item',
    how: 'Tab to the "Actions" button. Press Enter, close it, press Space.',
    why: 'Scanners never press keys.',
    wcag: '2.1.1 Keyboard (A)',
    note: 'Both keys opened the menu and focus landed on the first item.',
  },
  {
    id: 'arrow-keys',
    category: 'Keyboard',
    title: 'Arrow keys move through the items, wrap round, and skip the disabled item',
    how: 'With the menu open, press Down and Up repeatedly. Focus should wrap and never land on "Third action".',
    why: 'IBM asks you to confirm this because it cannot judge arrow-key behaviour.',
    wcag: '2.1.1 Keyboard (A)',
    note: 'Down and Up cycled the first two items and skipped the disabled one.',
  },
  {
    id: 'home-end',
    category: 'Keyboard',
    title: 'Home and End jump to the first and last item (decide whether this is wanted)',
    how: 'With the menu open press Home, then End.',
    why: 'Optional in the ARIA menu pattern, so a person decides whether the gap matters.',
    wcag: '2.1.1 Keyboard (A)',
    note: 'Neither key moved focus.',
  },
  {
    id: 'escape-returns',
    category: 'Keyboard',
    title: 'Escape closes the menu and focus returns to the trigger',
    how: 'Open the menu and press Escape. Check the menu closed and focus is back on "Actions".',
    why: 'Focus management after a key press is not scanned.',
    wcag: '2.1.1 Keyboard (A), 3.2.1 On Focus (A)',
    note: 'Menu closed, aria-expanded went back to false and focus was on the trigger.',
  },
  {
    id: 'activate-returns',
    category: 'Keyboard',
    title: 'Activating an item with Enter closes the menu and returns focus to the trigger',
    how: 'Open the menu, move to an item, press Enter.',
    why: 'Requires performing the action.',
    wcag: '2.1.1 Keyboard (A), 3.2.2 On Input (A)',
    note: 'Focus returned to the trigger.',
  },
  {
    id: 'tab-while-open',
    category: 'Keyboard',
    title: 'Tab while the menu is open behaves acceptably',
    how: 'Open the menu and press Tab. Note where focus goes and whether the menu closes.',
    why: 'Whether the behaviour is acceptable is a judgement.',
    wcag: '2.4.3 Focus Order (A)',
    note: 'The menu closed and focus stayed on the trigger, so a second Tab was needed to move on.',
  },
  {
    id: 'disabled-item',
    category: 'Component-specific',
    title: 'The disabled item cannot be activated and is announced as unavailable',
    how: 'Try to reach and click "Third action". With a screen reader, listen for "dimmed" or "unavailable".',
    why: 'Announcement needs a screen reader. In forced-colors mode the disabled item looked the same as the others, so check it is distinguishable there too.',
    wcag: '4.1.2 Name, Role, Value (A), 1.4.1 Use of Color (A)',
    note: 'The item has aria-disabled="true" and tabindex="-1" and was skipped by the arrow keys.',
  },
  {
    id: 'trigger-semantics',
    category: 'Component-specific',
    title: 'The trigger exposes its name and expanded state, and points at the menu',
    how: 'In DevTools, Accessibility pane: the trigger should be named "Actions", have aria-haspopup, and aria-expanded that flips true/false. When open, aria-controls must equal the id of the menu (role="menu"), and each item must have role="menuitem".',
    why: 'axe cannot resolve aria-controls because the menu is rendered in a portal outside the scanned area.',
    wcag: '4.1.2 Name, Role, Value (A)',
    note: 'Trigger name came from its visible text. aria-haspopup="true"; aria-controls matched the menu id when open. Items are li role="menuitem".',
  },
];

// Hints shown on the standard checks, specific to this component.
const standardNotes = {
  'std.focus-visible': 'Trigger: 1px blue plus a 2px white inset ring. Menu item: dark outline. Contrast not measured.',
  'std.forced-colors': 'With forced-colors emulated, the menu border, item text and focused-item outline were visible.',
  'std.truncation': '"First action with a long label description" is cut off with an ellipsis and has no tooltip. Screen readers get the full text.',
  'std.zoom-200': 'At 640 px wide the menu stayed inside the viewport with no sideways scroll.',
  'std.reflow-320': 'Could not be tested here: at 320 px the sandbox sidenav pushes the trigger off screen. Test on a page without the sidenav.',
  'std.keyboard-operable': 'The trigger took 38 Tab presses to reach because the sidenav links come first.',
};

// Does not apply to a button that opens a menu.
const omit = ['std.errors', 'std.instructions', 'std.hover-focus-content'];

function MenuButtonsPage() {
  return (
    <Stack gap={7} style={{ padding: '2rem' }}>
      <Stack gap={3}>
        <h1>Menu Buttons</h1>
        <p>
          Menu buttons combine a trigger button with a dropdown menu, surfacing
          a set of related actions from a single control.
        </p>
      </Stack>

      <V12ChangesBanner
        noJsChanges={true}
        cssChanges={[
          'Rounded menu corners via border-radius on .cds--menu.',
          'Menu border: 1px solid border-subtle on the open menu.',
          'Updated shadows and spacing.',
        ]}
        notes="MenuButton hardcodes legacyAutoalign={false} regardless of the FeatureFlags wrapper, so both instances have always used @floating-ui/react for positioning. The wrapper's only unique JS effect (flip/size middleware toggling) is a subtle edge-case difference not observable in normal use."
      />

      <MenuButtonV12 />

      <AccessibilityPanel
        scan={scan}
        componentChecks={componentChecks}
        standardNotes={standardNotes}
        omit={omit}
      />
    </Stack>
  );
}

export default MenuButtonsPage;
