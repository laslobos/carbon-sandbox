import React from 'react';
import { Stack } from '@carbon/react';

function SearchPage() {
  return (
    <Stack gap={7} style={{ padding: '2rem' }}>
      <Stack gap={3}>
        <h1>Search</h1>
        <p>
          The Search component provides a text input with a search icon, used for filtering
          content or querying data within an application.
        </p>
      </Stack>

      {/* Components will be added here */}
    </Stack>
  );
}

export default SearchPage;
