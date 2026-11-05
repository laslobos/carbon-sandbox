import React from 'react';
import { Stack } from '@carbon/react';

function ComboboxPage() {
  return (
    <Stack gap={7} style={{ padding: '2rem' }}>
      <Stack gap={3}>
        <h1>Combobox</h1>
        <p>
          The Combobox component combines a text input with a dropdown list, allowing users
          to either type a value directly or select from predefined options.
        </p>
      </Stack>

      {/* Components will be added here */}
    </Stack>
  );
}

export default ComboboxPage;
