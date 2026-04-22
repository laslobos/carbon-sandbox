import React from 'react';
import { Stack } from '@carbon/react';
import TreeViewBasic from '../components/TreeViewBasic';
import TreeViewDemo from '../components/TreeViewDemo';

function TreeViewPage() {
  return (
    <Stack gap={7}>
      <div>
        <h1>TreeView</h1>
        <p>TreeView component variants: basic and with search/filter functionality.</p>
      </div>
      
      <div>
        <h2>Basic TreeView</h2>
        <p>Standard TreeView with expand/collapse functionality.</p>
        <TreeViewBasic />
      </div>
      
      <div>
        <h2>TreeView with Search & Filter</h2>
        <p>Enhanced TreeView with search, filtering, and full accessibility support.</p>
        <TreeViewDemo />
      </div>
    </Stack>
  );
}

export default TreeViewPage;


