import React from 'react';
import { Stack } from '@carbon/react';

function DropdownPage() {
  return (
    <Stack gap={7} style={{ padding: '2rem' }}>
      <Stack gap={3}>
        <h1>Dropdown</h1>
        <p>
          The Dropdown component presents a list of options from which the user can select
          a single item, collapsing the list after a selection is made.
        </p>
      </Stack>

      {/* Components will be added here */}
    </Stack>
  );
}

export default DropdownPage;
