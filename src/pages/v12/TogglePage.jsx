import React from 'react';
import { Stack } from '@carbon/react';

function TogglePage() {
  return (
    <Stack gap={7} style={{ padding: '2rem' }}>
      <Stack gap={3}>
        <h1>Toggle</h1>
        <p>
          The Toggle component is a binary control that switches between two mutually exclusive
          states, such as on/off or enabled/disabled.
        </p>
      </Stack>

      {/* Components will be added here */}
    </Stack>
  );
}

export default TogglePage;
