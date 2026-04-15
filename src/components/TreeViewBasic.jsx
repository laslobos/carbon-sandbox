import React, { useState } from 'react';
import { TreeView, TreeNode } from '@carbon/react';
import { Document, Folder } from '@carbon/icons-react';

function TreeViewBasic() {
  const [selected, setSelected] = useState([]);
  const [active, setActive] = useState('');

  return (
    <TreeView
      label="File System (Basic)"
      selected={selected}
      onSelect={setSelected}
      active={active}
      onActivate={setActive}
    >
      <TreeNode id="1" label="Documents" renderIcon={Folder}>
        <TreeNode id="1-1" label="Work" renderIcon={Folder}>
          <TreeNode id="1-1-1" label="Project Proposal.pdf" renderIcon={Document} />
          <TreeNode id="1-1-2" label="Budget 2024.xlsx" renderIcon={Document} />
          <TreeNode id="1-1-3" label="Meeting Notes.docx" renderIcon={Document} />
        </TreeNode>
        <TreeNode id="1-2" label="Personal" renderIcon={Folder}>
          <TreeNode id="1-2-1" label="Resume.pdf" renderIcon={Document} />
          <TreeNode id="1-2-2" label="Cover Letter.docx" renderIcon={Document} />
        </TreeNode>
      </TreeNode>
      <TreeNode id="2" label="Images" renderIcon={Folder}>
        <TreeNode id="2-1" label="Vacation" renderIcon={Folder}>
          <TreeNode id="2-1-1" label="beach.jpg" renderIcon={Document} />
          <TreeNode id="2-1-2" label="sunset.jpg" renderIcon={Document} />
        </TreeNode>
        <TreeNode id="2-2" label="Screenshots" renderIcon={Folder}>
          <TreeNode id="2-2-1" label="screenshot-1.png" renderIcon={Document} />
          <TreeNode id="2-2-2" label="screenshot-2.png" renderIcon={Document} />
        </TreeNode>
      </TreeNode>
      <TreeNode id="3" label="Projects" renderIcon={Folder}>
        <TreeNode id="3-1" label="Website Redesign" renderIcon={Folder}>
          <TreeNode id="3-1-1" label="index.html" renderIcon={Document} />
          <TreeNode id="3-1-2" label="styles.css" renderIcon={Document} />
          <TreeNode id="3-1-3" label="script.js" renderIcon={Document} />
        </TreeNode>
        <TreeNode id="3-2" label="Mobile App" renderIcon={Folder}>
          <TreeNode id="3-2-1" label="App.jsx" renderIcon={Document} />
          <TreeNode id="3-2-2" label="package.json" renderIcon={Document} />
        </TreeNode>
      </TreeNode>
      <TreeNode id="4" label="Downloads" renderIcon={Folder}>
        <TreeNode id="4-1" label="installer.dmg" renderIcon={Document} />
        <TreeNode id="4-2" label="archive.zip" renderIcon={Document} />
      </TreeNode>
    </TreeView>
  );
}

export default TreeViewBasic;

// Made with Bob
