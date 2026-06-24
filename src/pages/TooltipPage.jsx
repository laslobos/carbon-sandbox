import React from 'react';
import { Stack } from '@carbon/react';
import TooltipDemo from '../components/TooltipDemo';
import TooltipCorrected from '../components/TooltipCorrected';
import TooltipBBCGel from '../components/TooltipBBCGel';

function TooltipPage() {
  return (
    <Stack gap={7}>
      <div>
        <h1>Tooltip</h1>
        <p>Tooltip component for providing additional context on hover or focus.</p>
      </div>
      
      <div>
        <h2>Carbon Design System Tooltip (Current - Incorrect)</h2>
        <p>
          <strong>Issue:</strong> Uses <code>aria-labelledby</code> which causes screen readers to announce
          the tooltip text BEFORE the button label.
        </p>
        <p>Screen reader announces: "This is an AI search, button" ❌</p>
        <TooltipDemo />
      </div>

      <div>
        <h2>Corrected Tooltip Implementation</h2>
        <p>
          <strong>Fix:</strong> Uses <code>aria-describedby</code> which causes screen readers to announce
          the button label FIRST, then the tooltip text.
        </p>
        <p>Screen reader announces: "Search documents, button, This is an AI search" ✅</p>
        <TooltipCorrected />
      </div>

      <div>
        <h2>BBC GEL Design System Tooltip</h2>
        <p>Alternative tooltip implementation following BBC GEL accessibility guidelines.</p>
        <TooltipBBCGel />
      </div>
    </Stack>
  );
}

export default TooltipPage;

