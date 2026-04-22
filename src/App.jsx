import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  Content,
  Header,
  HeaderName,
  HeaderMenuButton,
  SideNav,
  SideNavItems,
  SideNavLink,
  Theme
} from '@carbon/react';
import DataTablePage from './pages/DataTablePage';
import TreeViewPage from './pages/TreeViewPage';
import NumberInputPage from './pages/NumberInputPage';
import TooltipPage from './pages/TooltipPage';

function AppContent() {
  const [isSideNavExpanded, setIsSideNavExpanded] = useState(true);
  const location = useLocation();

  return (
    <Theme theme="white">
      <Header aria-label="Carbon Component Sandbox">
        <HeaderMenuButton
          aria-label={isSideNavExpanded ? 'Close menu' : 'Open menu'}
          onClick={() => setIsSideNavExpanded(!isSideNavExpanded)}
          isActive={isSideNavExpanded}
        />
        <HeaderName as={Link} to="/" prefix="IBM">
          Carbon Sandbox
        </HeaderName>
      </Header>

      <SideNav
        aria-label="Side navigation"
        expanded={isSideNavExpanded}
        isFixedNav
      >
        <SideNavItems>
          <SideNavLink
            as={Link}
            to="/datatable"
            isActive={location.pathname === '/datatable'}
          >
            DataTable
          </SideNavLink>
          <SideNavLink
            as={Link}
            to="/treeview"
            isActive={location.pathname === '/treeview'}
          >
            TreeView
          </SideNavLink>
          <SideNavLink
            as={Link}
            to="/numberinput"
            isActive={location.pathname === '/numberinput'}
          >
            NumberInput
          </SideNavLink>
          <SideNavLink
            as={Link}
            to="/tooltip"
            isActive={location.pathname === '/tooltip'}
          >
            Tooltip
          </SideNavLink>
        </SideNavItems>
      </SideNav>

      <Content>
        <Routes>
          <Route path="/" element={
            <div style={{ padding: '2rem' }}>
              <h1>Welcome to Carbon Component Sandbox</h1>
              <p>Select a component from the side navigation to view demos.</p>
            </div>
          } />
          <Route path="/datatable" element={<DataTablePage />} />
          <Route path="/treeview" element={<TreeViewPage />} />
          <Route path="/numberinput" element={<NumberInputPage />} />
          <Route path="/tooltip" element={<TooltipPage />} />
        </Routes>
      </Content>
    </Theme>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

// Made with Bob
