import React, { useState } from 'react';
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableContainer,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  TableBatchActions,
  TableBatchAction,
  TableSelectAll,
  TableSelectRow,
  Button,
  FilterableMultiSelect,
} from '@carbon/react';
import { TrashCan, Save, Download, Filter } from '@carbon/icons-react';

const headers = [
  { key: 'name', header: 'Name' },
  { key: 'protocol', header: 'Protocol' },
  { key: 'port', header: 'Port' },
  { key: 'rule', header: 'Rule' },
  { key: 'attached_groups', header: 'Attached Groups' },
  { key: 'status', header: 'Status' }
];

const rows = [
  {
    id: 'a',
    name: 'Load Balancer 1',
    protocol: 'HTTP',
    port: 80,
    rule: 'Round robin',
    attached_groups: "Kevin's VM Groups",
    status: 'Active'
  },
  {
    id: 'b',
    name: 'Load Balancer 2',
    protocol: 'HTTPS',
    port: 443,
    rule: 'Least connections',
    attached_groups: 'Staging Environment',
    status: 'Active'
  },
  {
    id: 'c',
    name: 'Load Balancer 3',
    protocol: 'HTTP',
    port: 8080,
    rule: 'IP hash',
    attached_groups: 'Production Environment',
    status: 'Inactive'
  },
  {
    id: 'd',
    name: 'Load Balancer 4',
    protocol: 'HTTPS',
    port: 8443,
    rule: 'Round robin',
    attached_groups: 'Development Environment',
    status: 'Active'
  },
  {
    id: 'e',
    name: 'Load Balancer 5',
    protocol: 'HTTP',
    port: 3000,
    rule: 'Least connections',
    attached_groups: 'Testing Environment',
    status: 'Active'
  }
];

const statusItems = [
  { id: 'active', text: 'Active' },
  { id: 'inactive', text: 'Inactive' }
];

const protocolItems = [
  { id: 'http', text: 'HTTP' },
  { id: 'https', text: 'HTTPS' }
];

function DataTableDemo() {
  const [searchValue, setSearchValue] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [selectedProtocols, setSelectedProtocols] = useState([]);

  const filteredRows = rows.filter((row) => {
    // Apply search filter
    if (searchValue) {
      const searchLower = searchValue.toLowerCase();
      const matchesSearch = Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchLower)
      );
      if (!matchesSearch) return false;
    }

    // Apply status filter
    if (selectedStatuses.length > 0) {
      const statusMatch = selectedStatuses.some(
        (status) => status.text.toLowerCase() === row.status.toLowerCase()
      );
      if (!statusMatch) return false;
    }

    // Apply protocol filter
    if (selectedProtocols.length > 0) {
      const protocolMatch = selectedProtocols.some(
        (protocol) => protocol.text.toLowerCase() === row.protocol.toLowerCase()
      );
      if (!protocolMatch) return false;
    }

    return true;
  });

  return (
    <DataTable rows={filteredRows} headers={headers}>
      {({
        rows,
        headers,
        getHeaderProps,
        getRowProps,
        getSelectionProps,
        getToolbarProps,
        getBatchActionProps,
        onInputChange,
        selectedRows,
        getTableProps,
        getTableContainerProps
      }) => {
        const batchActionProps = getBatchActionProps();

        return (
          <TableContainer
            title="Load Balancers"
            description="A collection of load balancers for managing traffic distribution"
            {...getTableContainerProps()}
          >
            <TableToolbar {...getToolbarProps()}>
              <TableBatchActions {...batchActionProps}>
                <TableBatchAction
                  tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                  renderIcon={TrashCan}
                  onClick={() => console.log('Delete selected items')}
                >
                  Delete
                </TableBatchAction>
                <TableBatchAction
                  tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                  renderIcon={Save}
                  onClick={() => console.log('Save selected items')}
                >
                  Save
                </TableBatchAction>
                <TableBatchAction
                  tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                  renderIcon={Download}
                  onClick={() => console.log('Download selected items')}
                >
                  Download
                </TableBatchAction>
              </TableBatchActions>
              <TableToolbarContent
                aria-hidden={batchActionProps.shouldShowBatchActions}
              >
                <TableToolbarSearch
                  tabIndex={batchActionProps.shouldShowBatchActions ? -1 : 0}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                    onInputChange(e);
                  }}
                  placeholder="Search table"
                />
                <Button
                  hasIconOnly
                  renderIcon={Filter}
                  iconDescription="Filter"
                  kind="ghost"
                  isSelected={showFilters}
                  onClick={() => setShowFilters(!showFilters)}
                />
                <Button
                  tabIndex={batchActionProps.shouldShowBatchActions ? -1 : 0}
                  onClick={() => console.log('Add new item')}
                  size="sm"
                  kind="primary"
                >
                  Add new
                </Button>
              </TableToolbarContent>
            </TableToolbar>
            {showFilters && (
              <TableToolbarContent>
                <FilterableMultiSelect
                  id="status-filter"
                  titleText="Status"
                  placeholder="Filter by status"
                  items={statusItems}
                  itemToString={(item) => (item ? item.text : '')}
                  selectedItems={selectedStatuses}
                  onChange={({ selectedItems }) => setSelectedStatuses(selectedItems)}
                />
                <FilterableMultiSelect
                  id="protocol-filter"
                  titleText="Protocol"
                  placeholder="Filter by protocol"
                  items={protocolItems}
                  itemToString={(item) => (item ? item.text : '')}
                  selectedItems={selectedProtocols}
                  onChange={({ selectedItems }) => setSelectedProtocols(selectedItems)}
                />
              </TableToolbarContent>
            )}
            <Table {...getTableProps()}>
              <TableHead>
                <TableRow>
                  <TableSelectAll {...getSelectionProps()} />
                  {headers.map((header, i) => (
                    <TableHeader key={i} {...getHeaderProps({ header })}>
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, i) => (
                  <TableRow key={row.id} {...getRowProps({ row })}>
                    <TableSelectRow {...getSelectionProps({ row })} />
                    {row.cells.map((cell) => (
                      <TableCell key={cell.id}>{cell.value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        );
      }}
    </DataTable>
  );
}

export default DataTableDemo;

// Made with Bob
