import React from 'react';
import { Stack, UnorderedList, ListItem } from '@carbon/react';
import TagInputDemo from '../components/TagInputDemo';
import TagInputAccessible from '../components/TagInputAccessible';

function TagInputPage() {
  return (
    <Stack gap={7} style={{ paddingBottom: '20rem' }}>
      <Stack gap={5}>
        <h1>TagInput with Suggestions</h1>
        <p>
          Custom implementation of a TagInput component with autocomplete suggestions,
          inspired by Carbon Labs. Built using Carbon's <code>TextInput</code> and <code>Tag</code>
          components with proper accessibility patterns.
        </p>
      </Stack>

      <Stack gap={5}>
        <h2>Default TagInput</h2>
        <Stack gap={4}>
          <p>
            This TagInput component allows users to add tags with autocomplete suggestions. 
            It starts with two pre-selected tags: "React" and "TypeScript".
          </p>
          <p>
            <strong>Features:</strong>
          </p>
          <UnorderedList>
            <ListItem>Type to filter suggestions from a predefined list</ListItem>
            <ListItem>Arrow keys to navigate suggestions</ListItem>
            <ListItem>Enter to select a suggestion</ListItem>
            <ListItem>Escape to close the dropdown</ListItem>
            <ListItem>Click X button to remove individual tags</ListItem>
            <ListItem>Can add custom values not in the suggestions list</ListItem>
          </UnorderedList>
          <p>
            <strong>Potential Accessibility Issues:</strong>
          </p>
          <UnorderedList>
            <ListItem>
              <strong>Missing ARIA combobox pattern:</strong> Input may lack proper <code>role="combobox"</code>, 
              <code>aria-expanded</code>, <code>aria-controls</code>, and <code>aria-autocomplete</code> attributes
            </ListItem>
            <ListItem>
              <strong>Suggestions list semantics:</strong> Dropdown may not have proper <code>role="listbox"</code> 
              and options may lack <code>role="option"</code>
            </ListItem>
            <ListItem>
              <strong>Active descendant:</strong> Missing <code>aria-activedescendant</code> to indicate 
              which suggestion is focused
            </ListItem>
            <ListItem>
              <strong>Tag removal buttons:</strong> Close buttons may lack descriptive <code>aria-label</code> 
              (e.g., "Remove React tag" instead of just "Clear")
            </ListItem>
            <ListItem>
              <strong>Screen reader announcements:</strong> No live region to announce number of filtered 
              suggestions or tag additions/removals
            </ListItem>
          </UnorderedList>
        </Stack>
        <TagInputDemo />
      </Stack>

      <Stack gap={5}>
        <h2>Enhanced Accessible TagInput</h2>
        <Stack gap={4}>
          <p>
            <strong>Approach:</strong> Add missing ARIA attributes and enhance screen reader support.
          </p>
          <p>
            <strong>Accessibility Improvements:</strong>
          </p>
          <UnorderedList>
            <ListItem>
              <strong>Combobox pattern:</strong> Ensures input has <code>role="combobox"</code> and 
              <code>aria-autocomplete="list"</code>
            </ListItem>
            <ListItem>
              <strong>Proper labeling:</strong> Verifies input is properly associated with its label 
              via <code>aria-labelledby</code>
            </ListItem>
            <ListItem>
              <strong>Listbox semantics:</strong> Ensures suggestions dropdown has <code>role="listbox"</code> 
              with proper <code>aria-label</code>
            </ListItem>
            <ListItem>
              <strong>Descriptive tag removal:</strong> Each tag's close button gets a specific 
              <code>aria-label</code> like "Remove React" instead of generic "Clear"
            </ListItem>
            <ListItem>
              <strong>Better discoverability:</strong> Screen reader users can understand the component's 
              purpose and available actions
            </ListItem>
          </UnorderedList>
          <p>
            <strong>WCAG Compliance:</strong>
          </p>
          <UnorderedList>
            <ListItem>
              <strong>2.1.1 Keyboard:</strong> All functionality operable via keyboard
            </ListItem>
            <ListItem>
              <strong>4.1.2 Name, Role, Value:</strong> Proper ARIA attributes for assistive technologies
            </ListItem>
            <ListItem>
              <strong>4.1.3 Status Messages:</strong> Could be further enhanced with live regions for 
              dynamic announcements
            </ListItem>
          </UnorderedList>
          <p>
            <strong>Test:</strong> Use Tab to navigate, type to filter suggestions, use arrow keys to 
            navigate options, and press Enter to select. Test with a screen reader to verify announcements.
          </p>
        </Stack>
        <TagInputAccessible />
      </Stack>

      <Stack gap={5}>
        <h2>Key Accessibility Principles</h2>
        <Stack gap={4}>
          <p>
            The TagInput component demonstrates several important accessibility patterns:
          </p>
          <UnorderedList>
            <ListItem>
              <strong>Combobox Pattern:</strong> Combines a text input with a popup listbox, requiring 
              specific ARIA attributes to work properly with assistive technologies
            </ListItem>
            <ListItem>
              <strong>Keyboard Navigation:</strong> Must support Tab, Arrow keys, Enter, Escape, and 
              potentially Backspace for tag removal
            </ListItem>
            <ListItem>
              <strong>Focus Management:</strong> Focus should move logically between input, suggestions, 
              and tag removal buttons
            </ListItem>
            <ListItem>
              <strong>Screen Reader Support:</strong> All interactive elements need descriptive labels, 
              and state changes should be announced
            </ListItem>
            <ListItem>
              <strong>Visual + Programmatic:</strong> What's visible on screen must be programmatically 
              available to assistive technologies
            </ListItem>
          </UnorderedList>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default TagInputPage;

// Made with Bob