import React from 'react';
import { Stack } from '@carbon/react';
import DataTableDemo from '../components/DataTableDemo';

function DataTablePage() {
  return (
    <Stack gap={7}>
      <div>
        <h1>DataTable</h1>
        <p>DataTable component with filtering, search, and batch actions.</p>
      </div>
      <DataTableDemo />
    </Stack>
  );
}

export default DataTablePage;


