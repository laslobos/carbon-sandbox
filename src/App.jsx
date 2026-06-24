import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  Content,
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenu,
  HeaderMenuItem,
  HeaderMenuButton,
  HeaderGlobalBar,
  SkipToContent,
  SideNav,
  SideNavItems,
  SideNavLink,
  Theme
} from '@carbon/react';
import DataTablePage from './pages/DataTablePage';
import TreeViewPage from './pages/TreeViewPage';
import NumberInputPage from './pages/NumberInputPage';
import TooltipPage from './pages/TooltipPage';
import MultiSelectPage from './pages/MultiSelectPage';
import TagInputPage from './pages/TagInputPage';
import AgentPage from './pages/AgentPage';
import StatusIndicatorPage from './pages/StatusIndicatorPage';
import DataTableSortablePage from './pages/DataTableSortablePage';
import AboutModalPage from './pages/AboutModalPage';

function AppContent() {
  const location = useLocation();
  const [isSideNavExpanded, setIsSideNavExpanded] = useState(false);

  return (
    <Theme theme="white">
      <Header aria-label="Carbon Component Sandbox">
        <SkipToContent />
        <HeaderMenuButton
          aria-label={isSideNavExpanded ? 'Close menu' : 'Open menu'}
          onClick={() => setIsSideNavExpanded(!isSideNavExpanded)}
          isActive={isSideNavExpanded}
        />
        <HeaderName as={Link} to="/" prefix="IBM">
          Carbon Sandbox
        </HeaderName>
        <HeaderNavigation aria-label="Carbon Component Sandbox">
          <HeaderMenu aria-label="Components" menuLinkName="Components">
            <HeaderMenuItem
              as={Link}
              to="/datatable"
              isCurrentPage={location.pathname === '/datatable'}
            >
              DataTable
            </HeaderMenuItem>
            <HeaderMenuItem
              as={Link}
              to="/datatable-sortable"
              isCurrentPage={location.pathname === '/datatable-sortable'}
            >
              DataTable Sortable
            </HeaderMenuItem>
            <HeaderMenuItem
              as={Link}
              to="/treeview"
              isCurrentPage={location.pathname === '/treeview'}
            >
              TreeView
            </HeaderMenuItem>
            <HeaderMenuItem
              as={Link}
              to="/numberinput"
              isCurrentPage={location.pathname === '/numberinput'}
            >
              NumberInput
            </HeaderMenuItem>
            <HeaderMenuItem
              as={Link}
              to="/tooltip"
              isCurrentPage={location.pathname === '/tooltip'}
            >
              Tooltip
            </HeaderMenuItem>
            <HeaderMenuItem
              as={Link}
              to="/multiselect"
              isCurrentPage={location.pathname === '/multiselect'}
            >
              MultiSelect
            </HeaderMenuItem>
            <HeaderMenuItem
              as={Link}
              to="/taginput"
              isCurrentPage={location.pathname === '/taginput'}
            >
              TagInput
            </HeaderMenuItem>
            <HeaderMenuItem
              as={Link}
              to="/agent"
              isCurrentPage={location.pathname === '/agent'}
            >
              AI Agent
            </HeaderMenuItem>
            <HeaderMenuItem
              as={Link}
              to="/status-indicator"
              isCurrentPage={location.pathname === '/status-indicator'}
            >
              Status Indicator
            </HeaderMenuItem>
            <HeaderMenuItem
              as={Link}
              to="/about-modal"
              isCurrentPage={location.pathname === '/about-modal'}
            >
              AboutModal
            </HeaderMenuItem>
          </HeaderMenu>
        </HeaderNavigation>
        <HeaderGlobalBar />
        <SideNav
          aria-label="Side navigation"
          expanded={isSideNavExpanded}
          isPersistent={false}
          onOverlayClick={() => setIsSideNavExpanded(false)}
        >
          <SideNavItems>
            <SideNavLink
              as={Link}
              to="/datatable"
              onClick={() => setIsSideNavExpanded(false)}
            >
              DataTable
            </SideNavLink>
            <SideNavLink
              as={Link}
              to="/datatable-sortable"
              onClick={() => setIsSideNavExpanded(false)}
            >
              DataTable Sortable
            </SideNavLink>
            <SideNavLink
              as={Link}
              to="/treeview"
              onClick={() => setIsSideNavExpanded(false)}
            >
              TreeView
            </SideNavLink>
            <SideNavLink
              as={Link}
              to="/numberinput"
              onClick={() => setIsSideNavExpanded(false)}
            >
              NumberInput
            </SideNavLink>
            <SideNavLink
              as={Link}
              to="/tooltip"
              onClick={() => setIsSideNavExpanded(false)}
            >
              Tooltip
            </SideNavLink>
            <SideNavLink
              as={Link}
              to="/multiselect"
              onClick={() => setIsSideNavExpanded(false)}
            >
              MultiSelect
            </SideNavLink>
            <SideNavLink
              as={Link}
              to="/taginput"
              onClick={() => setIsSideNavExpanded(false)}
            >
              TagInput
            </SideNavLink>
            <SideNavLink
              as={Link}
              to="/agent"
              onClick={() => setIsSideNavExpanded(false)}
            >
              AI Agent
            </SideNavLink>
            <SideNavLink
              as={Link}
              to="/status-indicator"
              onClick={() => setIsSideNavExpanded(false)}
            >
              Status Indicator
            </SideNavLink>
            <SideNavLink
              as={Link}
              to="/about-modal"
              onClick={() => setIsSideNavExpanded(false)}
            >
              AboutModal
            </SideNavLink>
          </SideNavItems>
        </SideNav>
      </Header>

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
          <Route path="/multiselect" element={<MultiSelectPage />} />
          <Route path="/taginput" element={<TagInputPage />} />
          <Route path="/agent" element={<AgentPage />} />
          <Route path="/status-indicator" element={<StatusIndicatorPage />} />
          <Route path="/datatable-sortable" element={<DataTableSortablePage />} />
          <Route path="/about-modal" element={<AboutModalPage />} />
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
