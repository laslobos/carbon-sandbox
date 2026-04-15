import React, { useState, useEffect, useRef, useMemo } from 'react';
import { TreeView, TreeNode, Search, Layer } from '@carbon/react';
import { Document, Folder } from '@carbon/icons-react';

const treeData = [
  {
    id: '1',
    label: 'Documents',
    icon: Folder,
    children: [
      {
        id: '1-1',
        label: 'Work',
        icon: Folder,
        children: [
          { id: '1-1-1', label: 'Project Proposal.pdf', icon: Document },
          { id: '1-1-2', label: 'Budget 2024.xlsx', icon: Document },
          { id: '1-1-3', label: 'Meeting Notes.docx', icon: Document }
        ]
      },
      {
        id: '1-2',
        label: 'Personal',
        icon: Folder,
        children: [
          { id: '1-2-1', label: 'Resume.pdf', icon: Document },
          { id: '1-2-2', label: 'Cover Letter.docx', icon: Document }
        ]
      }
    ]
  },
  {
    id: '2',
    label: 'Images',
    icon: Folder,
    children: [
      {
        id: '2-1',
        label: 'Vacation',
        icon: Folder,
        children: [
          { id: '2-1-1', label: 'beach.jpg', icon: Document },
          { id: '2-1-2', label: 'sunset.jpg', icon: Document }
        ]
      },
      {
        id: '2-2',
        label: 'Screenshots',
        icon: Folder,
        children: [
          { id: '2-2-1', label: 'screenshot-1.png', icon: Document },
          { id: '2-2-2', label: 'screenshot-2.png', icon: Document }
        ]
      }
    ]
  },
  {
    id: '3',
    label: 'Projects',
    icon: Folder,
    children: [
      {
        id: '3-1',
        label: 'Website Redesign',
        icon: Folder,
        children: [
          { id: '3-1-1', label: 'index.html', icon: Document },
          { id: '3-1-2', label: 'styles.css', icon: Document },
          { id: '3-1-3', label: 'script.js', icon: Document }
        ]
      },
      {
        id: '3-2',
        label: 'Mobile App',
        icon: Folder,
        children: [
          { id: '3-2-1', label: 'App.jsx', icon: Document },
          { id: '3-2-2', label: 'package.json', icon: Document }
        ]
      }
    ]
  },
  {
    id: '4',
    label: 'Downloads',
    icon: Folder,
    children: [
      { id: '4-1', label: 'installer.dmg', icon: Document },
      { id: '4-2', label: 'archive.zip', icon: Document }
    ]
  }
];

function TreeViewDemo() {
  const [selected, setSelected] = useState([]);
  const [active, setActive] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [expanded, setExpanded] = useState([]);
  const [matchCount, setMatchCount] = useState(0);
  const liveRegionRef = useRef(null);
  const previousFocusRef = useRef(null);
  const previousSearchRef = useRef('');

  // Find all matching nodes and their ancestors
  const { filteredData, matchingIds, ancestorIds } = useMemo(() => {
    if (!searchValue.trim()) {
      return { filteredData: treeData, matchingIds: new Set(), ancestorIds: new Set() };
    }

    const searchLower = searchValue.toLowerCase();
    const matching = new Set();
    const ancestors = new Set();

    const findMatches = (nodes, parentIds = []) => {
      const results = [];
      
      nodes.forEach(node => {
        const matches = node.label.toLowerCase().includes(searchLower);
        const childResults = node.children ? findMatches(node.children, [...parentIds, node.id]) : [];
        const hasMatchingChildren = childResults.length > 0;

        if (matches || hasMatchingChildren) {
          if (matches) {
            matching.add(node.id);
            // Add all parent IDs as ancestors
            parentIds.forEach(id => ancestors.add(id));
          }

          results.push({
            ...node,
            children: childResults.length > 0 ? childResults : node.children
          });
        }
      });

      return results;
    };

    const filtered = findMatches(treeData);
    return { 
      filteredData: filtered, 
      matchingIds: matching, 
      ancestorIds: ancestors 
    };
  }, [searchValue]);

  // Auto-expand ancestors of matching nodes when searching, collapse all when cleared
  useEffect(() => {
    const hadSearch = previousSearchRef.current.trim().length > 0;
    const hasSearch = searchValue.trim().length > 0;
    
    if (hasSearch && ancestorIds.size > 0) {
      setExpanded(Array.from(ancestorIds));
    } else if (hadSearch && !hasSearch) {
      // Only collapse when transitioning from search to no search
      setExpanded([]);
    }
    
    previousSearchRef.current = searchValue;
  }, [searchValue, ancestorIds]);

  // Update match count and announce to screen readers
  useEffect(() => {
    const count = matchingIds.size;
    setMatchCount(count);

    if (liveRegionRef.current) {
      if (searchValue.trim()) {
        liveRegionRef.current.textContent = count === 0 
          ? 'No results found' 
          : `${count} ${count === 1 ? 'result' : 'results'} found`;
      } else {
        liveRegionRef.current.textContent = '';
      }
    }
  }, [matchingIds, searchValue]);

  // Manage focus when results change
  useEffect(() => {
    if (searchValue.trim() && active && !matchingIds.has(active) && !ancestorIds.has(active)) {
      // Current active node is filtered out, move focus to first match
      const firstMatch = Array.from(matchingIds)[0];
      if (firstMatch) {
        setActive(firstMatch);
      } else if (ancestorIds.size > 0) {
        // No direct matches, focus first visible ancestor
        setActive(Array.from(ancestorIds)[0]);
      }
    }
  }, [searchValue, active, matchingIds, ancestorIds]);

  const renderTree = (nodes) => {
    const isSearching = searchValue.trim().length > 0;
    
    return nodes.map(node => {
      const isMatch = matchingIds.has(node.id);
      const isExpanded = expanded.includes(node.id);

      return (
        <TreeNode
          key={node.id}
          id={node.id}
          label={node.label}
          renderIcon={node.icon}
          isExpanded={isSearching && node.children ? isExpanded : undefined}
          onToggle={isSearching && node.children ? () => {
            setExpanded(prev =>
              prev.includes(node.id)
                ? prev.filter(id => id !== node.id)
                : [...prev, node.id]
            );
          } : undefined}
        >
          {node.children && (!isSearching || isExpanded) && renderTree(node.children)}
        </TreeNode>
      );
    });
  };

  return (
    <div>
      <Layer>
        <Search
          id="tree-search"
          labelText="Search files"
          placeholder="Search files and folders"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onClear={() => setSearchValue('')}
        />
      </Layer>
      
      {/* ARIA live region for announcing results */}
      <div
        ref={liveRegionRef}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: 'absolute',
          left: '-10000px',
          width: '1px',
          height: '1px',
          overflow: 'hidden'
        }}
      />

      <TreeView
        label="File System"
        selected={selected}
        onSelect={setSelected}
        active={active}
        onActivate={(id) => {
          previousFocusRef.current = id;
          setActive(id);
        }}
      >
        {filteredData.length > 0 ? (
          renderTree(filteredData)
        ) : (
          <TreeNode id="no-results" label="No results found" />
        )}
      </TreeView>
    </div>
  );
}

export default TreeViewDemo;

// Made with Bob
