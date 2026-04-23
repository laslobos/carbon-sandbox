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
        <h1>NumberInput Accessibility Issues</h1>
        <p>
          Investigating VoiceOver on iOS accessibility problems with Carbon's NumberInput component 
          and exploring potential solutions.
        </p>
      </Stack>
      
      <Stack gap={5}>
        <h2>Problem: Default NumberInput</h2>
        <Stack gap={4}>
          <p>
            <strong>VoiceOver Issues:</strong>
          </p>
          <UnorderedList>
            <ListItem>
              <strong>Unlabeled buttons:</strong> When multiple NumberInputs are adjacent, VoiceOver 
              announces generic "Button" elements without context about which input they control
            </ListItem>
            <ListItem>
              <strong>Not adjustable:</strong> The input is not announced as "adjustable", so VoiceOver 
              users cannot use swipe up/down gestures to change values
            </ListItem>
            <ListItem>
              <strong>Buttons have tabindex="-1":</strong> Correct for keyboard users but prevents 
              VoiceOver from properly activating the buttons via double-tap
            </ListItem>
          </UnorderedList>
          {/* 
          Test: Use VoiceOver to navigate these inputs. Notice the buttons announce 
          as "Button" with no context, and double-tapping them doesn't change the value.
          */}
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
        <h2>Attempted Solution 1: Hide Buttons with aria-hidden</h2>
        {/* 
        Approach: Add aria-hidden="true" to increment/decrement buttons.
        
        Issues with this approach:
        - Removes only way to increment/decrement: Since the input is not "adjustable", 
          hiding the buttons removes the only method VoiceOver users have to change values without typing
        - Forces keyboard input: Users must double-tap to activate the input field 
          and use the on-screen keyboard to type values
        - Not truly accessible: This solution assumes VoiceOver provides native 
          adjustment gestures, but Carbon's NumberInput doesn't implement the required ARIA attributes 
          to make this work
        
        Test: With VoiceOver, notice the buttons are hidden but there's no alternative 
        way to increment/decrement values.
        */}
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
        <h2>Attempted Solution 2: Add Descriptive Labels to Buttons</h2>
        {/*
        Approach: Add aria-label attributes that identify which input each button controls 
        (e.g., "Increment Width", "Decrement Height").
        
        Issues with this approach:
        - Confusing announcements: VoiceOver announces "increment width number, increment number" - 
          the custom aria-label conflicts with existing ARIA attributes
        - Buttons still don't work: Double-tapping the button doesn't change the value because 
          tabindex="-1" prevents proper VoiceOver interaction
        - Doesn't solve the core problem: Even with better labels, the buttons remain 
          non-functional for VoiceOver users
        
        Test: With VoiceOver, notice the improved but confusing announcement, 
        and that double-tapping the button doesn't actually change the value.
        */}
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

      {/*
      Root Cause Analysis:
      
      The fundamental issue: Carbon's NumberInput has a design conflict between 
      keyboard and screen reader accessibility.
      
      - For keyboard users: tabindex="-1" on buttons is correct - they use arrow keys to adjust values
      - For screen reader users: The buttons are the only way to increment/decrement, 
        but tabindex="-1" makes them non-functional with VoiceOver
      - Missing ARIA: The input lacks proper ARIA attributes (like role="spinbutton", 
        aria-valuemin, aria-valuemax, aria-valuenow) to make it truly "adjustable" for screen readers
      
      Conclusion: Neither attempted solution fully addresses the accessibility issues. 
      A proper fix would require changes to Carbon's NumberInput component itself to either:
      
      1. Make the input truly "adjustable" with proper ARIA attributes and hide the buttons
      2. Remove tabindex="-1" from buttons so they work with VoiceOver (but this would add them 
         to keyboard tab order)
      3. Implement a dual-mode approach where buttons behave differently for keyboard vs. 
         screen reader users
      */}
    </Stack>
  );
}

export default NumberInputPage;

// Made with Bob
