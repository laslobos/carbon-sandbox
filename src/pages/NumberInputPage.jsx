import React from 'react';
import { Stack } from '@carbon/react';
import NumberInputDemo from '../components/NumberInputDemo';
import NumberInputCustom from '../components/NumberInputCustom';

function NumberInputPage() {
  return (
    <Stack gap={7}>
      <div>
        <h1>NumberInput</h1>
        <p>NumberInput component variants: basic and customizable versions.</p>
      </div>
      
      <div>
        <h2>Basic NumberInput</h2>
        <p>Standard NumberInput with min, max, and step controls.</p>
        <NumberInputDemo />
      </div>
      
      <div>
        <h2>Customizable NumberInput</h2>
        <p>NumberInput with customizable properties and state management.</p>
        <NumberInputCustom />
      </div>
    </Stack>
  );
}

export default NumberInputPage;


