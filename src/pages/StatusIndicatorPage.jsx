import React from 'react';
import { Stack } from '@carbon/react';
import StatusIndicatorOverflowDemo from '../components/StatusIndicatorOverflowDemo';

function StatusIndicatorPage() {
  return (
    <Stack gap={7}>
      <div>
        <h1>Status indicator overflow</h1>
        <p>
          Test page for Carbon status indicator overflow behavior. Labels stay visible
          when there is enough room and collapse into a tooltip trigger when space is
          constrained.
        </p>
      </div>

      <div>
        <h2>Overflow pattern demo</h2>
        <p>
          Resize the page or tab through the indicators to verify hover and focus tooltip
          behavior for compact layouts.
        </p>
        <StatusIndicatorOverflowDemo />
      </div>
    </Stack>
  );
}

export default StatusIndicatorPage;

// Made with Bob
