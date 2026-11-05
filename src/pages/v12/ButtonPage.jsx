import React from 'react';
import { Stack } from '@carbon/react';

function ButtonPage() {
  return (
    <Stack gap={7} style={{ padding: '2rem' }}>
      <Stack gap={3}>
        <h1>Button</h1>
        <p>
          The Button component is used to trigger actions or events, such as submitting a form,
          opening a dialog, cancelling an action, or performing a delete operation.
        </p>
      </Stack>

      {/* Components will be added here */}
    </Stack>
  );
}

export default ButtonPage;
