import React from 'react';
import { Stack } from '@carbon/react';
import AboutModalDemo from '../components/AboutModalDemo';

function AboutModalPage() {
  return (
    <Stack gap={7} style={{ padding: '2rem', paddingBottom: '20rem' }}>
      <Stack gap={5}>
        <h1>AboutModal - With Additional Content</h1>
        <p>
          The AboutModal component from Carbon for IBM Products v2.89.0 provides a standardized
          way to display information about your application or product.
        </p>
      </Stack>

      <Stack gap={5}>
        <h2>AboutModal with Additional Content</h2>
        <Stack gap={4}>
          <p>
            This variant demonstrates the AboutModal component with all available content sections:
          </p>
          <ul>
            <li><strong>Title:</strong> Multi-line title support for product name and subtitle</li>
            <li><strong>Content:</strong> Main descriptive content about the product</li>
            <li><strong>Additional Info:</strong> Extra sections like features, capabilities, or technical details</li>
            <li><strong>Links:</strong> Related links to documentation, repositories, or resources</li>
            <li><strong>Version & Copyright:</strong> Product version and copyright information</li>
          </ul>
          <p>
            <strong>Accessibility:</strong> The modal is fully keyboard accessible and includes 
            proper ARIA labels for screen readers. Press Escape to close the modal, or use the 
            close button.
          </p>
          <p>
            <strong>Usage:</strong> Click the button below to open the AboutModal and explore 
            all the content sections.
          </p>
        </Stack>
        <AboutModalDemo />
      </Stack>

      <Stack gap={5}>
        <h2>Component Details</h2>
        <Stack gap={4}>
          <p>
            <strong>Library:</strong> @carbon/ibm-products v2.89.0
          </p>
          <p>
            <strong>Component:</strong> AboutModal
          </p>
          <p>
            <strong>Variant:</strong> With Additional Content
          </p>
          <p>
            <strong>Key Props:</strong>
          </p>
          <ul>
            <li><code>open</code> - Controls modal visibility</li>
            <li><code>onClose</code> - Callback when modal is closed</li>
            <li><code>title</code> - Modal title (can be JSX for multi-line)</li>
            <li><code>content</code> - Main content section (JSX)</li>
            <li><code>additionalInfo</code> - Additional information section (JSX)</li>
            <li><code>links</code> - Array of link objects with href and text</li>
            <li><code>version</code> - Product version string</li>
            <li><code>copyrightText</code> - Copyright notice</li>
            <li><code>modalAriaLabel</code> - Accessible label for screen readers</li>
            <li><code>closeIconDescription</code> - Accessible label for close button</li>
          </ul>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default AboutModalPage;

// Made with Bob