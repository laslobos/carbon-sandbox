import React from 'react';
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableContainer,
} from '@carbon/react';

const headers = [
  { key: 'name', header: 'Name' },
  { key: 'status', header: 'Status' },
  { key: 'date', header: 'Date' }
];

const rows = [
  { id: '1', name: 'Item 1', status: 'Active', date: '2024-01-01' },
  { id: '2', name: 'Item 2', status: 'Inactive', date: '2024-01-02' },
  { id: '3', name: 'Item 3', status: 'Active', date: '2024-01-03' },
  { id: '4', name: 'Item 4', status: 'Inactive', date: '2024-01-04' },
  { id: '5', name: 'Item 5', status: 'Active', date: '2024-01-05' }
];

function DataTableSortable() {
  return (
    <DataTable rows={rows} headers={headers} isSortable>
      {({
        rows,
        headers,
        getHeaderProps,
        getRowProps,
        getTableProps,
        getTableContainerProps
      }) => (
        <TableContainer
          title="Sortable Data Table"
          description="A simple sortable data table with name, status, and date columns"
          {...getTableContainerProps()}
        >
          <Table {...getTableProps()}>
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableHeader
                    key={header.key}
                    {...getHeaderProps({ header })}
                    isSortable
                  >
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id} {...getRowProps({ row })}>
                  {row.cells.map((cell) => (
                    <TableCell key={cell.id}>{cell.value}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </DataTable>
  );
}

export default DataTableSortable;

// Made with Bob
