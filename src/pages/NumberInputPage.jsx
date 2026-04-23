import React from 'react';
import { Stack, Grid, Column, UnorderedList, ListItem } from '@carbon/react';
import NumberInputDemo from '../components/NumberInputDemo';
import NumberInputCustom from '../components/NumberInputCustom';
import NumberInputAccessible from '../components/NumberInputAccessible';
import NumberInputLabeled from '../components/NumberInputLabeled';

function NumberInputPage() {
  return (
    <Stack gap={7}>
      <Stack gap={5}>
        <h1>NumberInput Accessibility</h1>
        <p>Demonstrating the screen reader accessibility issue with NumberInput buttons and solutions.</p>
      </Stack>
      
      <Stack gap={5}>
        <h2>Problem: Default NumberInput (Multiple Side-by-Side)</h2>
        <Stack gap={4}>
          <p>
            <strong>Issue:</strong> When multiple NumberInputs are adjacent, VoiceOver on iOS announces
            unlabeled "Button" elements for increment/decrement controls. Screen reader users cannot
            determine which buttons belong to which input.
          </p>
          <p>
            <strong>Note:</strong> The buttons have <code>tabindex="-1"</code> (correct for keyboard users),
            but this does NOT hide them from screen readers. VoiceOver swipe navigation will encounter
            these buttons.
          </p>
        </Stack>
        <Grid narrow>
          <Column sm={4} md={4} lg={4}>
            <NumberInputDemo />
          </Column>
          <Column sm={4} md={4} lg={4}>
            <NumberInputCustom />
          </Column>
        </Grid>
      </Stack>
      
      <Stack gap={5}>
        <h2>Solution 1: Hide Buttons from Screen Readers (Recommended)</h2>
        <Stack gap={4}>
          <p>
            <strong>Approach:</strong> Add <code>aria-hidden="true"</code> to increment/decrement buttons.
          </p>
          <p>
            <strong>Rationale:</strong> The buttons are redundant for screen reader users who can:
          </p>
          <UnorderedList>
            <ListItem>Use arrow keys (↑↓) on desktop to adjust values</ListItem>
            <ListItem>Use VoiceOver's native adjustment gestures (swipe up/down) on iOS</ListItem>
            <ListItem>Directly type values into the input</ListItem>
          </UnorderedList>
          <p>
            <strong>Result:</strong> VoiceOver only announces the input field, not the buttons.
            Clean, uncluttered experience.
          </p>
        </Stack>
        <Grid narrow>
          <Column sm={4} md={4} lg={4}>
            <NumberInputAccessible />
          </Column>
          <Column sm={4} md={4} lg={4}>
            <NumberInputAccessible />
          </Column>
        </Grid>
      </Stack>
      
      <Stack gap={5}>
        <h2>Solution 2: Add Descriptive Labels to Buttons</h2>
        <Stack gap={4}>
          <p>
            <strong>Approach:</strong> Add <code>aria-label</code> attributes that identify which
            input each button controls (e.g., "Increment Width", "Decrement Height").
          </p>
          <p>
            <strong>Rationale:</strong> If buttons must remain accessible, they need clear labels
            so screen reader users understand their purpose and association.
          </p>
          <p>
            <strong>Result:</strong> VoiceOver announces "Increment Width, button" instead of just
            "Button", providing context.
          </p>
        </Stack>
        <Grid narrow>
          <Column sm={4} md={4} lg={4}>
            <NumberInputLabeled
              id="width-input"
              label="Width"
              helperText="Buttons have descriptive labels"
            />
          </Column>
          <Column sm={4} md={4} lg={4}>
            <NumberInputLabeled
              id="height-input"
              label="Height"
              helperText="Buttons have descriptive labels"
            />
          </Column>
        </Grid>
      </Stack>

      {/* <Stack gap={5}>
        <h2>Recommendation</h2>
        <Stack gap={4}>
          <p>
            <strong>Solution 1 (aria-hidden) is preferred</strong> because:
          </p>
          <UnorderedList>
            <ListItem>Matches native HTML number input behavior</ListItem>
            <ListItem>Reduces cognitive load for screen reader users</ListItem>
            <ListItem>Eliminates redundant controls</ListItem>
            <ListItem>Follows Carbon's design principle: buttons are for mouse users only</ListItem>
          </UnorderedList>
          <p>
            The <code>tabindex="-1"</code> attribute correctly removes buttons from keyboard
            tab order, but <code>aria-hidden="true"</code> is needed to hide them from
            screen readers as well.
          </p>
        </Stack>
      </Stack> */}
    </Stack>
  );
}

export default NumberInputPage;

// Made with Bob
