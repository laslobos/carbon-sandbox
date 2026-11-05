import React, { useRef, useState, useId } from 'react';
import { Button, FeatureFlags, FileUploaderItem, InlineLoading, Stack } from '@carbon/react';

/**
 * CompositeUploader
 *
 * Replaces the standard FileUploader button with an InlineLoading button so
 * that uploading / complete feedback lives in the trigger itself rather than
 * inside FileUploaderItem.  FileUploaderItem is kept exclusively in its
 * `status="edit"` state so it only ever provides the remove affordance.
 *
 * State machine per file:
 *   (selected) → uploading → complete → edit
 *                                      ↑ stays here until user removes
 *
 * ─── Accessibility note: aria-live region ────────────────────────────────────
 * InlineLoading has a built-in aria-live region, but it is conditionally
 * mounted — it only exists in the DOM while uploading or complete. Screen
 * readers announce text that *changes* inside a live region that already
 * exists; they do NOT announce the initial content when a live region first
 * mounts. Conditionally rendering InlineLoading therefore produces silence.
 *
 * This is a known limitation of how InlineLoading is used in Carbon's own
 * UX example (https://react.carbondesignsystem.com/?path=/story/components-
 * inlineloading--ux-example): InlineLoading replaces the button, so the live
 * region is always born and destroyed rather than updated in place.
 *
 * Fix applied here: a dedicated <div aria-live="polite"> is rendered
 * unconditionally and stays in the DOM for the lifetime of the component.
 * Status strings are written into it as state changes occur. InlineLoading
 * remains for its visual spinner/checkmark only — screen reader announcements
 * are driven entirely by this persistent region.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// How long the "Upload complete" label is shown before the button reappears (ms)
const SUCCESS_DELAY = 1500;
// Simulated upload duration per file (ms) — replace with real async logic
const UPLOAD_DURATION = 2000;

export function CompositeUploader({
  accept,
  labelTitle = 'Upload files',
  labelDescription = 'Max file size is 500 KB.',
  buttonLabel = 'Add file',
  multiple = false,
}) {
  const inputRef = useRef(null);
  const instanceId = useId();

  // uploadState: 'idle' | 'uploading' | 'complete'
  const [uploadState, setUploadState] = useState('idle');
  // files: Array<{ id: string, file: File, status: 'uploading' | 'complete' | 'edit' }>
  const [files, setFiles] = useState([]);

  // Persistent announcement text for the always-mounted aria-live region.
  // Must be separate state from uploadState so we control exactly when and
  // what is announced, independent of what InlineLoading is doing visually.
  const [liveMessage, setLiveMessage] = useState('');

  // ─── Handlers ──────────────────────────────────────────────────────────────

  function handleButtonClick() {
    inputRef.current?.click();
  }

  function handleFileChange(e) {
    const selected = Array.from(e.target.files ?? []);
    if (!selected.length) return;

    // Defer the reset so the browser finishes processing the change event first.
    // Resetting synchronously inside the handler prevents the file picker from
    // reopening on a subsequent click in Chrome/Safari on macOS.
    const input = e.target;
    setTimeout(() => { input.value = ''; }, 0);

    const incoming = selected.map((file) => ({
      id: `${instanceId}-${file.name}-${Date.now()}-${Math.random()}`,
      file,
      status: 'uploading',
    }));

    setFiles((prev) => (multiple ? [...prev, ...incoming] : incoming));
    setUploadState('uploading');

    // Announce uploading into the persistent live region.
    // InlineLoading is not relied upon here — its live region does not yet
    // exist in the DOM at this point, so it would produce silence.
    const fileWord = incoming.length === 1 ? 'file' : 'files';
    setLiveMessage(`Uploading ${incoming.length} ${fileWord}…`);

    // Simulate async upload — replace with real fetch/XHR calls per file
    setTimeout(() => {
      setFiles((prev) =>
        prev.map((f) =>
          incoming.some((i) => i.id === f.id) ? { ...f, status: 'complete' } : f
        )
      );
      setUploadState('complete');

      // Announce completion. The InlineLoading "finished" state will also
      // show the checkmark visually, but its own live region is unreliable
      // here for the same mounting reason described above.
      setLiveMessage(
        `${incoming.length} ${fileWord} uploaded successfully.`
      );
    }, UPLOAD_DURATION);
  }

  // Called by InlineLoading once its success animation finishes
  function handleUploadSuccess() {
    setUploadState('idle');
    // Transition complete → edit so FileUploaderItems appear with remove buttons
    setFiles((prev) =>
      prev.map((f) => (f.status === 'complete' ? { ...f, status: 'edit' } : f))
    );
    // Clear the live message so the same text can re-trigger on the next upload.
    // Clearing is deferred by one tick so the previous announcement has time
    // to be read before the region is emptied.
    setTimeout(() => setLiveMessage(''), 0);
  }

  function handleRemove(id) {
    const removed = files.find((f) => f.id === id);
    setFiles((prev) => prev.filter((f) => f.id !== id));
    // Announce removal so keyboard/SR users know the action succeeded.
    if (removed) setLiveMessage(`${removed.file.name} removed.`);
  }

  // ─── Derived ───────────────────────────────────────────────────────────────

  const isUploading = uploadState === 'uploading';
  const isComplete = uploadState === 'complete';
  const showButton = uploadState === 'idle';

  // Files currently visible as FileUploaderItems (edit state only)
  const editFiles = files.filter((f) => f.status === 'edit');

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <FeatureFlags enableV12Release enableV12DynamicFloatingStyles>
    <div className="cds--v12">
    <div className="cds--file__container">

      {/*
        Persistent aria-live region — always in the DOM, never conditionally
        rendered. Text updates here trigger screen reader announcements.

        WHY THIS EXISTS: InlineLoading has its own aria-live region, but it is
        only mounted while uploading or complete. A live region cannot announce
        its own initial content — only subsequent text changes are announced.
        This persistent region decouples visual state (InlineLoading mounting/
        unmounting) from audible state (announcements).

        aria-atomic="true" ensures the full message is read as a single unit
        rather than just the changed characters.
      */}
      {/*
        VoiceOver fix: cds--assistive-text sets margin:-1px which pulls the
        element outside its container and causes VoiceOver to skip the region.
        margin:0 overrides that single property while keeping all other
        visually-hidden styles (position:absolute, clip, 1px size) intact.
        This is a known Carbon/VoiceOver incompatibility — the same issue
        exists in Carbon's own ProgressBar live region.
      */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="cds--assistive-text"
        style={{ margin: 0 }}
      >
        {liveMessage}
      </div>

      {/* Label block — mirrors the FileUploader label structure */}
      <strong className="cds--file--label">{labelTitle}</strong>
      <p className="cds--label-description">{labelDescription}</p>

      {/* Hidden native input */}
      <input
        ref={inputRef}
        id={`${instanceId}-input`}
        type="file"
        className="cds--file-input"
        tabIndex={-1}
        aria-hidden="true"
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
      />

      {/* Trigger area: Button ↔ InlineLoading */}
      {/*
        InlineLoading is kept here for its visual spinner and checkmark only.
        Its built-in aria-live region is intentionally not relied upon —
        announcements are handled by the persistent region above.
      */}
      <div style={{ display: 'flex', alignItems: 'center', minHeight: '2.5rem' }}>
        {showButton && (
          <Button size="md" onClick={handleButtonClick}>
            {buttonLabel}
          </Button>
        )}
        {(isUploading || isComplete) && (
          <InlineLoading
            description={isUploading ? 'Uploading…' : 'Upload complete'}
            status={isUploading ? 'active' : 'finished'}
            aria-live="off"
            successDelay={SUCCESS_DELAY}
            onSuccess={handleUploadSuccess}
          />
        )}
      </div>

      {/* File list — only rendered once files reach edit state */}
      {editFiles.length > 0 && (
        <Stack gap={3} style={{ marginTop: '0.5rem' }}>
          {editFiles.map(({ id, file }) => (
            <FileUploaderItem
              key={id}
              uuid={id}
              name={file.name}
              status="edit"
              iconDescription="Remove file"
              onDelete={() => handleRemove(id)}
            />
          ))}
        </Stack>
      )}
    </div>
    </div>
    </FeatureFlags>
  );
}
