import React from 'react';
import { Stack } from '@carbon/react';
import TooltipDemo from '../components/TooltipDemo';

function TooltipPage() {
  return (
    <Stack gap={7}>
      <div>
        <h1>Tooltip</h1>
        <p>Tooltip component for providing additional context on hover or focus.</p>
      </div>
      
      <div>
        <h2>Basic Tooltip</h2>
        <p>Hover over or focus on the button to see the tooltip.</p>
        <TooltipDemo />
      </div>
    </Stack>
  );
}

export default TooltipPage;

