import React from 'react';
import { Stack } from '@carbon/react';

function MenuPage() {
  return (
    <Stack gap={7} style={{ padding: '2rem' }}>
      <Stack gap={3}>
        <h1>Menu</h1>
        <p>
          The Menu component presents a list of options or actions to the user, typically
          triggered by a button or other interactive element.
        </p>
      </Stack>

      {/* Components will be added here */}
    </Stack>
  );
}

export default MenuPage;
