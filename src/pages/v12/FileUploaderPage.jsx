import React from 'react';
import { Stack } from '@carbon/react';

function FileUploaderPage() {
  return (
    <Stack gap={7} style={{ padding: '2rem' }}>
      <Stack gap={3}>
        <h1>File Uploader</h1>
        <p>
          The File uploader component enables users to select files from their device for
          upload, supporting single or multiple file selection with status feedback.
        </p>
      </Stack>

      {/* Components will be added here */}
    </Stack>
  );
}

export default FileUploaderPage;
