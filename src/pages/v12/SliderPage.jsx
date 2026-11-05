import React from 'react';
import { Stack } from '@carbon/react';

function SliderPage() {
  return (
    <Stack gap={7} style={{ padding: '2rem' }}>
      <Stack gap={3}>
        <h1>Slider</h1>
        <p>
          The Slider component allows users to select a value or range of values by dragging
          a handle along a track, useful for settings like volume, brightness, or filters.
        </p>
      </Stack>

      {/* Components will be added here */}
    </Stack>
  );
}

export default SliderPage;
