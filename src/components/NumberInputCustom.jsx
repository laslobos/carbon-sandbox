import React, { useState } from 'react';
import { NumberInput } from '@carbon/react';

function NumberInputCustom() {
  const [value, setValue] = useState(50);

  const handleChange = (event, { value }) => {
    setValue(value);
  };

  return (
    <NumberInput
      id="number-input-custom"
      label="Quantity (Custom)"
      helperText="Enter a value between 0 and 100"
      min={0}
      max={100}
      value={value}
      step={1}
      onChange={handleChange}
    />
  );
}

export default NumberInputCustom;


