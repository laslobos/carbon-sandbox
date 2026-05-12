import React, { useState } from 'react';
import { Stack, Button } from '@carbon/react';
import { Tearsheet } from '@carbon/ibm-products';
import { ChatContainer } from '@carbon/ai-chat';
import '@carbon/ibm-products/css/index.min.css';
import '../styles/agent.scss';

/**
 * AgentPage - Testing page for AI Chat Agent component with Tearsheet
 *
 * This page demonstrates the ACTUAL z-index overlay issue between:
 * - AI Chat Agent sidebar (positioned left)
 * - Tearsheet overlay component
 *
 * NO FIXES APPLIED - This shows the default behavior to identify the issue.
 */
function AgentPage() {
  const [isTearsheetOpen, setIsTearsheetOpen] = useState(false);

  return (
    <div className="agent-page-layout">
      {/* AI Chat Agent Component */}
      <ChatContainer
        config={{
          namespace: 'agent-test',
          layout: 'sidebar_left',
          launcher: {
            enabled: true,
          },
          messaging: {
            async sendMessage(message) {
              return {
                text: `Echo: ${message.text}`,
              };
            },
          },
        }}
      />

      {/* Main Content Area */}
      <Stack className="agent-page-content" gap={7}>
        <Stack gap={5}>
          <h1>AI Chat Agent with Tearsheet - Default Behavior</h1>
          <p>
            This page demonstrates the ACTUAL AI Chat Agent and Tearsheet components
            with their default z-index behavior. No fixes have been applied yet.
          </p>
        </Stack>

        <Stack gap={5}>
          <h2>The Problem</h2>
          <Stack gap={4}>
            <p>
              When both the Agent sidebar and Tearsheet are open simultaneously, they may
              overlay each other causing accessibility issues:
            </p>
            <ul>
              <li>
                <strong>Z-index conflicts:</strong> If both components use similar z-index
                values, one may partially or fully cover the other
              </li>
              <li>
                <strong>Focus management:</strong> Keyboard focus may get trapped or jump
                unexpectedly between overlapping components
              </li>
              <li>
                <strong>Interactive elements:</strong> Buttons and controls may become
                unreachable when components overlap
              </li>
            </ul>
          </Stack>
        </Stack>

        <Stack gap={5}>
          <h2>Expected Behavior</h2>
          <Stack gap={4}>
            <p>
              <strong>Correct z-index layering should be:</strong>
            </p>
            <ol>
              <li>Page content (z-index: 0)</li>
              <li>Agent sidebar (z-index: ~8000-9000)</li>
              <li>Tearsheet overlay (z-index: ~9000+, should be above Agent)</li>
            </ol>
            <p>
              The Tearsheet should appear <strong>above</strong> the Agent sidebar when both
              are open, with proper focus management and no overlapping interactive elements.
            </p>
          </Stack>
        </Stack>

        <Stack gap={5}>
          <h2>Component Integration Steps</h2>
          <Stack gap={4}>
            <ol>
              <li>Install the AI Chat Agent package: <code>npm install @carbon/ai-chat</code></li>
              <li>Import and add the Agent component (see TODO comment above)</li>
              <li>Import and add the Tearsheet component (see TODO comment below)</li>
              <li>Test with both components open simultaneously</li>
              <li>Verify z-index layering using browser DevTools</li>
              <li>Test keyboard navigation (Tab, Shift+Tab, Escape)</li>
              <li>Verify focus management and screen reader behavior</li>
            </ol>
          </Stack>
        </Stack>

        <Stack gap={5}>
          <h2>Test Instructions</h2>
          <Stack gap={4}>
            <p>
              <strong>Steps to reproduce the issue:</strong>
            </p>
            <ol>
              <li>The AI Chat Agent is already open on the left</li>
              <li>Click the "Open Tearsheet" button below</li>
              <li>Observe the z-index behavior between Agent and Tearsheet</li>
            </ol>
            <p>
              <strong>Expected issue:</strong> The Tearsheet and Agent may have overlapping
              z-index values, causing one to partially or fully cover the other, creating
              accessibility problems.
            </p>
          </Stack>
        </Stack>

        <Stack gap={5}>
          <h2>Test Controls</h2>
          <Button
            onClick={() => setIsTearsheetOpen(true)}
          >
            Open Tearsheet
          </Button>
        </Stack>

        {/* Tearsheet Component */}
        <Tearsheet
          open={isTearsheetOpen}
          onClose={() => setIsTearsheetOpen(false)}
          title="Test Tearsheet"
          description="Testing z-index behavior with AI Chat Agent"
        >
          <div style={{ padding: '2rem' }}>
            <Stack gap={5}>
              <h3>Tearsheet Content</h3>
              <p>
                This is the actual Carbon Tearsheet component. Observe how it interacts
                with the AI Chat Agent sidebar on the left.
              </p>
              <p>
                <strong>What to check:</strong>
              </p>
              <ul>
                <li>Does the Tearsheet appear above or below the Agent?</li>
                <li>Can you see both components clearly?</li>
                <li>Are there any overlapping interactive elements?</li>
                <li>Can you interact with both components?</li>
                <li>Does keyboard navigation work correctly?</li>
              </ul>
              <Button onClick={() => setIsTearsheetOpen(false)}>
                Close Tearsheet
              </Button>
            </Stack>
          </div>
        </Tearsheet>
      </Stack>
    </div>
  );
}

export default AgentPage;

// Made with Bob