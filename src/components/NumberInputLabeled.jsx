import React, { useState, useEffect, useRef } from 'react';
import { NumberInput } from '@carbon/react';

function NumberInputLabeled({ id, label, ...props }) {
  const [value, setValue] = useState(props.value || 50);
  const containerRef = useRef(null);

  const handleChange = (event, { value }) => {
    setValue(value);
    if (props.onChange) {
      props.onChange(event, { value });
    }
  };

  useEffect(() => {
    // After component mounts, find the increment/decrement buttons and add descriptive labels
    if (containerRef.current) {
      const buttons = containerRef.current.querySelectorAll('button[tabindex="-1"]');
      
      buttons.forEach((button) => {
        // Determine if this is increment or decrement based on button content/class
        const isIncrement = button.querySelector('[class*="up"]') || 
                           button.querySelector('[class*="increment"]') ||
                           button.innerHTML.includes('up') ||
                           button.innerHTML.includes('add');
        
        // Add descriptive aria-label that includes the input's label
        const action = isIncrement ? 'Increment' : 'Decrement';
        button.setAttribute('aria-label', `${action} ${label}`);
      });
    }
  }, [label]);

  return (
    <div ref={containerRef}>
      <NumberInput
        id={id}
        label={label}
        min={0}
        max={100}
        value={value}
        step={1}
        onChange={handleChange}
        {...props}
      />
    </div>
  );
}

export default NumberInputLabeled;

// Made with Bob
