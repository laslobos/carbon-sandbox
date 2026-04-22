import React from 'react';
import { Tooltip, Button } from '@carbon/react';

function TooltipDemo() {
  return (
    <Tooltip
      align="bottom-left"
      label="This is an AI search"
    >
      <Button>
        Search documents
      </Button>
    </Tooltip>
  );
}

export default TooltipDemo;

