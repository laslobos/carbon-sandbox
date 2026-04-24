import React from 'react';
import { Stack, UnorderedList, ListItem } from '@carbon/react';
import MultiSelectDemo from '../components/MultiSelectDemo';
import MultiSelectAccessible from '../components/MultiSelectAccessible';
import MultiSelectNoButton from '../components/MultiSelectNoButton';

function MultiSelectPage() {
  return (
    <Stack gap={7} style={{ paddingBottom: '20rem' }}>
      <Stack gap={5}>
        <h1>MultiSelect Accessibility</h1>
        <p>
          Testing Carbon's MultiSelect component with pre-selected items and addressing 
          the "Clear All" button accessibility issue.
        </p>
      </Stack>

      <Stack gap={5}>
        <h2>Default MultiSelect</h2>
        <Stack gap={4}>
          <p>
            This MultiSelect has two items pre-selected (Option 1 and Option 2).
          </p>
          <p>
            <strong>Accessibility Issue:</strong> The "Clear All" button has <code>tabindex="-1"</code>, 
            making it unreachable via keyboard Tab navigation. While the Escape key works to clear 
            selections, keyboard-only users cannot discover or use the visible button.
          </p>
        </Stack>
        <MultiSelectDemo />
      </Stack>

      <Stack gap={5}>
        <h2>Attempted Solution: Remove Button Role (Not Recommended)</h2>
        <Stack gap={4}>
          <p>
            <strong>Approach:</strong> Replace the button element with a span to remove button semantics.
          </p>
          <p>
            <strong>Why This Fails:</strong>
          </p>
          <UnorderedList>
            <ListItem>
              <strong>Still interactive for mouse users:</strong> If the element remains clickable, 
              it violates WCAG 4.1.2 (interactive elements must have proper semantics)
            </ListItem>
            <ListItem>
              <strong>Inequitable access:</strong> Mouse users can click, keyboard users cannot - 
              different user groups have fundamentally different experiences
            </ListItem>
            <ListItem>
              <strong>Hidden from screen readers:</strong> With <code>aria-hidden="true"</code>, 
              screen reader users don't know the element exists
            </ListItem>
            <ListItem>
              <strong>Worse than original:</strong> Creates an interactive element without proper 
              button semantics, violating accessibility standards
            </ListItem>
          </UnorderedList>
          <p>
            <strong>Conclusion:</strong> If an element is interactive (clickable), it MUST be a proper 
            button with correct semantics. Using a span for interactive elements is a WCAG violation.
          </p>
        </Stack>
        <MultiSelectNoButton />
      </Stack>

      <Stack gap={5}>
        <h2>Correct Solution: Tabbable Button (Recommended)</h2>
        <Stack gap={4}>
          <p>
            <strong>Approach:</strong> Remove <code>tabindex="-1"</code> to make the button keyboard accessible.
          </p>
          <p>
            <strong>Why This Works:</strong>
          </p>
          <UnorderedList>
            <ListItem>
              <strong>Equal access:</strong> Works for mouse users (click), keyboard users (Tab + Enter/Space), 
              and screen reader users (announced and operable)
            </ListItem>
            <ListItem>
              <strong>WCAG compliant:</strong> Meets 2.1.1 (Keyboard) and 4.1.2 (Name, Role, Value)
            </ListItem>
            <ListItem>
              <strong>Discoverable:</strong> Users don't need to know keyboard shortcuts
            </ListItem>
            <ListItem>
              <strong>Redundant methods:</strong> Escape key still works as a power-user shortcut
            </ListItem>
            <ListItem>
              <strong>Proper semantics:</strong> Interactive element has correct button role
            </ListItem>
          </UnorderedList>
          <p>
            <strong>Test:</strong> Use Tab to navigate to the "Clear All" button and press Enter or Space to activate it.
          </p>
        </Stack>
        <MultiSelectAccessible />
      </Stack>
    </Stack>
  );
}

export default MultiSelectPage;

// Made with Bob
