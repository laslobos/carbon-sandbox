import React from 'react';
import { Stack } from '@carbon/react';
import DataTableSortable from '../components/DataTableSortable';

function DataTableSortablePage() {
  return (
    <Stack gap={7}>
      <div>
        <h1>Sortable DataTable</h1>
        <p>DataTable component with sortable columns. Click on any column header to sort the data.</p>
      </div>
      <DataTableSortable />
    </Stack>
  );
}

export default DataTableSortablePage;

// Made with Bob
