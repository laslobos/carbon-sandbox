import React from 'react';
import { Stack } from '@carbon/react';

function NumberInputPage() {
  return (
    <Stack gap={7} style={{ padding: '2rem' }}>
      <Stack gap={3}>
        <h1>Number Input</h1>
        <p>
          The Number input component allows users to enter a numeric value, with optional
          increment and decrement controls for stepping through values.
        </p>
      </Stack>

      {/* Components will be added here */}
    </Stack>
  );
}

export default NumberInputPage;
