import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  Content,
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenu,
  HeaderMenuItem,
  Theme
} from '@carbon/react';
import DataTablePage from './pages/DataTablePage';
import TreeViewPage from './pages/TreeViewPage';
import NumberInputPage from './pages/NumberInputPage';
import TooltipPage from './pages/TooltipPage';
import MultiSelectPage from './pages/MultiSelectPage';
import AgentPage from './pages/AgentPage';
import StatusIndicatorPage from './pages/StatusIndicatorPage';

function AppContent() {
  const location = useLocation();

  return (
    <Theme theme="white">
      <Header aria-label="Carbon Component Sandbox">
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
          </HeaderMenu>
        </HeaderNavigation>
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
          <Route path="/agent" element={<AgentPage />} />
          <Route path="/status-indicator" element={<StatusIndicatorPage />} />
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
