import React, { useState, useEffect, useRef } from 'react';
import { MultiSelect } from '@carbon/react';

const items = [
  { id: 'option-1', text: 'Option 1' },
  { id: 'option-2', text: 'Option 2' },
  { id: 'option-3', text: 'Option 3' },
  { id: 'option-4', text: 'Option 4' },
  { id: 'option-5', text: 'Option 5' },
];

function MultiSelectAccessible() {
  const [selectedItems, setSelectedItems] = useState([items[0], items[1]]);
  const containerRef = useRef(null);

  useEffect(() => {
    // After component mounts, find the clear selection button and make it tabbable
    if (containerRef.current) {
      // Try multiple selectors to find the clear button
      const selectors = [
        'button[title*="Clear"]',
        'button[aria-label*="Clear"]',
        'button[aria-label*="clear"]',
        '.cds--list-box__selection',
        '.cds--tag--filter',
        'button.cds--list-box__selection',
        'button[title*="clear"]'
      ];

      let clearButton = null;
      
      for (const selector of selectors) {
        clearButton = containerRef.current.querySelector(selector);
        if (clearButton) {
          console.log('Found clear button with selector:', selector);
          break;
        }
      }

      // If still not found, try finding all buttons and look for the one with close/clear icon
      if (!clearButton) {
        const allButtons = containerRef.current.querySelectorAll('button');
        console.log('Found buttons:', allButtons.length);
        
        // Look for button with tabindex="-1" that's not the dropdown trigger
        clearButton = Array.from(allButtons).find(btn => 
          btn.getAttribute('tabindex') === '-1' && 
          !btn.classList.contains('cds--list-box__field')
        );
      }
      
      if (clearButton) {
        console.log('Making button tabbable and functional');
        
        // Remove tabindex="-1" to make it tabbable
        clearButton.removeAttribute('tabindex');
        // Explicitly set to 0
        clearButton.setAttribute('tabindex', '0');
        
        // Ensure it has a proper accessible label
        if (!clearButton.getAttribute('aria-label')) {
          clearButton.setAttribute('aria-label', 'Clear all selected items');
        }
        
        // Store the original click handler if it exists
        const originalOnClick = clearButton.onclick;
        
        // Add our own click handler that clears selections
        const handleClearClick = (e) => {
          console.log('Clear button clicked');
          
          // Try to trigger the original handler first
          if (originalOnClick) {
            originalOnClick.call(clearButton, e);
          }
          
          // Also manually clear selections as a fallback
          setSelectedItems([]);
          
          // Dispatch a native click event to ensure Carbon's handlers fire
          const clickEvent = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
          });
          clearButton.dispatchEvent(clickEvent);
        };
        
        // Remove existing listeners and add our handler
        clearButton.onclick = null;
        clearButton.addEventListener('click', handleClearClick);
        
        // Also handle keyboard activation (Enter and Space)
        const handleKeyDown = (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            console.log('Clear button activated via keyboard');
            handleClearClick(e);
          }
        };
        
        clearButton.addEventListener('keydown', handleKeyDown);
        
        console.log('Button updated and handlers attached');
        
        // Cleanup function to remove event listeners
        return () => {
          clearButton.removeEventListener('click', handleClearClick);
          clearButton.removeEventListener('keydown', handleKeyDown);
        };
      } else {
        console.log('Clear button not found');
      }
    }
  }, [selectedItems]); // Re-run when selections change

  const handleChange = ({ selectedItems }) => {
    console.log('Selection changed:', selectedItems);
    setSelectedItems(selectedItems);
  };

  return (
    <div ref={containerRef} style={{ width: 300 }}>
      <MultiSelect
        label="Multiselect Label (Accessible)"
        id="carbon-multiselect-accessible"
        titleText="Multiselect with tabbable clear button"
        helperText="Clear button is keyboard accessible"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        selectedItems={selectedItems}
        onChange={handleChange}
        selectionFeedback="top-after-reopen"
      />
    </div>
  );
}

export default MultiSelectAccessible;

// Made with Bob
