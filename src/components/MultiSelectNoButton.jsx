import React, { useState, useEffect, useRef } from 'react';
import { MultiSelect } from '@carbon/react';

const items = [
  { id: 'option-1', text: 'Option 1' },
  { id: 'option-2', text: 'Option 2' },
  { id: 'option-3', text: 'Option 3' },
  { id: 'option-4', text: 'Option 4' },
  { id: 'option-5', text: 'Option 5' },
];

function MultiSelectNoButton() {
  const [selectedItems, setSelectedItems] = useState([items[0], items[1]]);
  const containerRef = useRef(null);

  useEffect(() => {
    // After component mounts, find the clear selection button and replace it with a span
    if (containerRef.current) {
      // Try multiple selectors to find the clear button
      const selectors = [
        'button[title*="Clear"]',
        'button[aria-label*="Clear"]',
        'button[aria-label*="clear"]',
        '.cds--list-box__selection',
        'button.cds--list-box__selection',
      ];

      let clearButton = null;
      
      for (const selector of selectors) {
        clearButton = containerRef.current.querySelector(selector);
        if (clearButton) {
          console.log('Found clear button with selector:', selector);
          break;
        }
      }

      // Fallback: find button with tabindex="-1" that's not the dropdown trigger
      if (!clearButton) {
        const allButtons = containerRef.current.querySelectorAll('button');
        clearButton = Array.from(allButtons).find(btn => 
          btn.getAttribute('tabindex') === '-1' && 
          !btn.classList.contains('cds--list-box__field')
        );
      }
      
      if (clearButton) {
        console.log('Replacing button with non-interactive span');
        
        // Create a span element to replace the button
        const span = document.createElement('span');
        
        // Copy all classes from the button
        span.className = clearButton.className;
        
        // Copy the inner HTML (the icon and count)
        span.innerHTML = clearButton.innerHTML;
        
        // Make it non-interactive
        span.setAttribute('aria-hidden', 'true');
        span.style.cursor = 'default';
        span.style.pointerEvents = 'none';
        
        // Replace the button with the span
        clearButton.parentNode.replaceChild(span, clearButton);
        
        console.log('Button replaced with span element');
      } else {
        console.log('Clear button not found');
      }
    }
  }, [selectedItems]);

  const handleChange = ({ selectedItems }) => {
    setSelectedItems(selectedItems);
  };

  return (
    <div ref={containerRef} style={{ width: 300 }}>
      <MultiSelect
        label="Multiselect Label (No Button)"
        id="carbon-multiselect-no-button"
        titleText="Multiselect with visual-only indicator"
        helperText="Press Escape to clear all selections"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        selectedItems={selectedItems}
        onChange={handleChange}
        selectionFeedback="top-after-reopen"
      />
    </div>
  );
}

export default MultiSelectNoButton;

// Made with Bob
