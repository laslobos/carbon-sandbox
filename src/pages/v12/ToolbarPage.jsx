import React from 'react';
import { Stack } from '@carbon/react';

function ToolbarPage() {
  return (
    <Stack gap={7} style={{ padding: '2rem' }}>
      <Stack gap={3}>
        <h1>Toolbar</h1>
        <p>
          The Toolbar component groups related controls and actions in a horizontal strip,
          providing quick access to common operations within a given context.
        </p>
      </Stack>

      {/* Components will be added here */}
    </Stack>
  );
}

export default ToolbarPage;
