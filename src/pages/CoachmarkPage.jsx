import React from 'react';
import { Stack } from '@carbon/react';
import CoachmarkDemo from '../components/CoachmarkDemo';

function CoachmarkPage() {
  return (
    <Stack gap={7} style={{ padding: '2rem', paddingBottom: '20rem' }}>
      <Stack gap={5}>
        <h1>Coachmark</h1>
        <p>
          The Coachmark component from Carbon for IBM Products provides guided walkthroughs,
          onboarding hints, and progressive disclosure for key application features.
        </p>
      </Stack>

      <Stack gap={5}>
        <h2>Interactive Coachmark Demo</h2>
        <Stack gap={4}>
          <p>
            Click on the beacon below to launch the Coachmark popover:
          </p>
        </Stack>
        <CoachmarkDemo />
      </Stack>

      <Stack gap={5}>
        <h2>Component Details</h2>
        <Stack gap={4}>
          <p>
            <strong>Library:</strong> @carbon/ibm-products
          </p>
          <p>
            <strong>Subcomponents:</strong>
          </p>
          <ul>
            <li><code>Coachmark</code> (via <code>preview__Coachmark</code>) - Root container managing alignment, focus, and open/close state</li>
            <li><code>CoachmarkBeacon</code> (via <code>preview__CoachmarkBeacon</code>) - Visual pulsing indicator inviting interaction</li>
            <li><code>Coachmark.Content</code> - Wrapper for header and body content</li>
            <li><code>Coachmark.Content.Header</code> - Header bar containing dismiss control</li>
            <li><code>Coachmark.Content.Body</code> - Main callout content container</li>
          </ul>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default CoachmarkPage;
