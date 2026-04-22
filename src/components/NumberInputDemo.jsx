import React, { useState } from 'react';
import { NumberInput } from '@carbon/react';

function NumberInputDemo() {
  const [value, setValue] = useState(50);

  const handleChange = (event, { value }) => {
    setValue(value);
  };

  return (
    <NumberInput
      id="number-input-demo"
      label="Quantity"
      helperText="Enter a value between 0 and 100"
      min={0}
      max={100}
      value={value}
      step={1}
      onChange={handleChange}
    />
  );
}

export default NumberInputDemo;


