import React from 'react';
import { Stack } from '@carbon/react';

function MultiSelectPage() {
  return (
    <Stack gap={7} style={{ padding: '2rem' }}>
      <Stack gap={3}>
        <h1>Multi-select</h1>
        <p>
          The Multi-select component lets users select multiple items from a dropdown list,
          with selected items indicated by checkmarks and displayed as tags or a count.
        </p>
      </Stack>

      {/* Components will be added here */}
    </Stack>
  );
}

export default MultiSelectPage;
