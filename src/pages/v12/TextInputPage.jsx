import React from 'react';
import { Stack } from '@carbon/react';

function TextInputPage() {
  return (
    <Stack gap={7} style={{ padding: '2rem' }}>
      <Stack gap={3}>
        <h1>Text Input</h1>
        <p>
          The Text input component enables users to enter free-form text. It supports various
          states including default, focus, disabled, read-only, and error.
        </p>
      </Stack>

      {/* Components will be added here */}
    </Stack>
  );
}

export default TextInputPage;
