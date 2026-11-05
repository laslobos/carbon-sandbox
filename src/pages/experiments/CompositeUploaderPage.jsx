import React from 'react';
import { FileUploader, Stack } from '@carbon/react';
import { CompositeUploader } from '../../components/CompositeUploader';

function CompositeUploaderPage() {
  return (
    <Stack gap={7} style={{ padding: '2rem' }}>
      <Stack gap={3}>
        <h1>Composite Upload</h1>
        <p>
          An experimental upload component that replaces the standard
          FileUploader button with an <strong>InlineLoading</strong> button.
          Upload progress and completion feedback live in the trigger itself
          rather than inside the file item. Once the upload completes the file
          item appears in its <code>edit</code> state, providing only the remove
          affordance.
        </p>
      </Stack>

      {/* ── Carbon reference ─────────────────────────────────────────────── */}
      <Stack gap={3}>
        <h2>Carbon FileUploader (reference)</h2>
        <p>The standard Carbon component for comparison.</p>
        <div className="cds--file__container">
          <FileUploader
            labelTitle="Upload files"
            labelDescription="Max file size is 500 KB. Supported types: JPG, PNG."
            buttonLabel="Add file"
            buttonKind="primary"
            filenameStatus="edit"
            accept={['.jpg', '.jpeg', '.png']}
            multiple
            iconDescription="Remove file"
            size="md"
          />
        </div>
      </Stack>

      {/* ── Composite experiment ─────────────────────────────────────────── */}
      <Stack gap={3}>
        <h2>Composite Upload (experiment)</h2>
        <p>
          InlineLoading replaces the button during upload. Files appear with
          the remove affordance only once the upload is complete.
        </p>
        <CompositeUploader
          labelTitle="Upload images"
          labelDescription="Max file size is 2 MB per file. Supported types: JPG, PNG."
          buttonLabel="Add files"
          accept=".jpg,.jpeg,.png"
          multiple={true}
        />
      </Stack>
    </Stack>
  );
}

export default CompositeUploaderPage;
