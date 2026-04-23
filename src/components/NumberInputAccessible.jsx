import React, { useState, useEffect, useRef } from 'react';
import { NumberInput } from '@carbon/react';

function NumberInputAccessible() {
  const [value, setValue] = useState(50);
  const containerRef = useRef(null);

  const handleChange = (event, { value }) => {
    setValue(value);
  };

  useEffect(() => {
    // After component mounts, find the increment/decrement buttons and add aria-hidden
    if (containerRef.current) {
      const buttons = containerRef.current.querySelectorAll('button[tabindex="-1"]');
      buttons.forEach((button) => {
        // Hide buttons from screen readers since they're redundant
        // Screen reader users can use arrow keys or native adjustment gestures
        button.setAttribute('aria-hidden', 'true');
      });
    }
  }, []);

  return (
    <div ref={containerRef}>
      <NumberInput
        id="number-input-accessible"
        label="Quantity (Accessible)"
        helperText="Increment/decrement buttons hidden from screen readers"
        min={0}
        max={100}
        value={value}
        step={1}
        onChange={handleChange}
      />
    </div>
  );
}

export default NumberInputAccessible;

// Made with Bob
