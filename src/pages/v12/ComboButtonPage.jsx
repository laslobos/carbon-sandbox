import React from 'react';
import { Stack } from '@carbon/react';

function ComboButtonPage() {
  return (
    <Stack gap={7} style={{ padding: '2rem' }}>
      <Stack gap={3}>
        <h1>ComboButton</h1>
        <p>
          The ComboButton component provides a primary action alongside an overflow menu
          for secondary actions, reducing interface clutter while surfacing related controls.
        </p>
      </Stack>

      {/* Components will be added here */}
    </Stack>
  );
}

export default ComboButtonPage;
