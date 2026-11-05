import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  Content,
  Header,
  HeaderName,
  HeaderGlobalBar,
  SkipToContent,
  SideNav,
  SideNavItems,
  SideNavLink,
  SideNavMenu,
  SideNavMenuItem,
  Theme
} from '@carbon/react';
import { CheckmarkFilled } from '@carbon/icons-react';
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
import CoachmarkPage from './pages/CoachmarkPage';
import ButtonPage from './pages/v12/ButtonPage';
import MenuPage from './pages/v12/MenuPage';
import MenuButtonsPage from './pages/v12/MenuButtonsPage';
import ComboButtonPage from './pages/v12/ComboButtonPage';
import ToolbarPage from './pages/v12/ToolbarPage';
import LinkPage from './pages/v12/LinkPage';
import CheckboxPage from './pages/v12/CheckboxPage';
import RadioButtonPage from './pages/v12/RadioButtonPage';
import ComboboxPage from './pages/v12/ComboboxPage';
import DropdownPage from './pages/v12/DropdownPage';
import V12MultiSelectPage from './pages/v12/MultiSelectPage';
import FormPage from './pages/v12/FormPage';
import SelectPage from './pages/v12/SelectPage';
import TextInputPage from './pages/v12/TextInputPage';
import V12NumberInputPage from './pages/v12/NumberInputPage';
import SearchPage from './pages/v12/SearchPage';
import DatePickerPage from './pages/v12/DatePickerPage';
import FileUploaderPage from './pages/v12/FileUploaderPage';
import SliderPage from './pages/v12/SliderPage';
import TogglePage from './pages/v12/TogglePage';
import CompositeUploaderPage from './pages/experiments/CompositeUploaderPage';
import { v11Routes, v12Routes, experimentsRoutes } from './routes';

function AppContent() {
  const location = useLocation();

  const isV11Active = v11Routes.some((r) => r.path === location.pathname);
  const isV12Active = v12Routes.some((r) => r.path === location.pathname);
  const isExperimentsActive = experimentsRoutes.some((r) => r.path === location.pathname);

  return (
    <Theme theme="white">
      <Header aria-label="Carbon Component Sandbox">
        <SkipToContent />
        <HeaderName as={Link} to="/" prefix="IBM">
          Carbon Sandbox
        </HeaderName>
        <HeaderGlobalBar />
      </Header>

      <SideNav
        isFixedNav
        expanded={true}
        isChildOfHeader={false}
        aria-label="Side navigation"
      >
        <SideNavItems>
          <SideNavMenu title="v11 Components" isActive={isV11Active} defaultExpanded>
            {v11Routes.map(({ path, label }) => (
              <SideNavMenuItem
                key={path}
                as={Link}
                to={path}
                isActive={location.pathname === path}
              >
                {label}
              </SideNavMenuItem>
            ))}
          </SideNavMenu>
          <SideNavMenu title="v12 Components" isActive={isV12Active} defaultExpanded>
            {v12Routes.map(({ path, label, done }) => (
              <SideNavMenuItem
                key={path}
                as={Link}
                to={path}
                isActive={location.pathname === path}
              >
                {label}
                {done && (
                  <CheckmarkFilled
                    size={16}
                    className="sidenav-done-icon"
                    aria-label="Done"
                  />
                )}
              </SideNavMenuItem>
            ))}
          </SideNavMenu>
          <SideNavMenu title="Experiments" isActive={isExperimentsActive} defaultExpanded>
            {experimentsRoutes.map(({ path, label }) => (
              <SideNavMenuItem
                key={path}
                as={Link}
                to={path}
                isActive={location.pathname === path}
              >
                {label}
              </SideNavMenuItem>
            ))}
          </SideNavMenu>
        </SideNavItems>
      </SideNav>

      <Content id="main-content">
        <Routes>
          <Route path="/v12/button" element={<ButtonPage />} />
          <Route path="/v12/menu" element={<MenuPage />} />
          <Route path="/v12/menu-buttons" element={<MenuButtonsPage />} />
          <Route path="/v12/combo-button" element={<ComboButtonPage />} />
          <Route path="/v12/toolbar" element={<ToolbarPage />} />
          <Route path="/v12/link" element={<LinkPage />} />
          <Route path="/v12/checkbox" element={<CheckboxPage />} />
          <Route path="/v12/radio-button" element={<RadioButtonPage />} />
          <Route path="/v12/combobox" element={<ComboboxPage />} />
          <Route path="/v12/dropdown" element={<DropdownPage />} />
          <Route path="/v12/multi-select" element={<V12MultiSelectPage />} />
          <Route path="/v12/form" element={<FormPage />} />
          <Route path="/v12/select" element={<SelectPage />} />
          <Route path="/v12/text-input" element={<TextInputPage />} />
          <Route path="/v12/number-input" element={<V12NumberInputPage />} />
          <Route path="/v12/search" element={<SearchPage />} />
          <Route path="/v12/date-picker" element={<DatePickerPage />} />
          <Route path="/v12/file-uploader" element={<FileUploaderPage />} />
          <Route path="/v12/slider" element={<SliderPage />} />
          <Route path="/v12/toggle" element={<TogglePage />} />
          <Route path="/experiments/composite-uploader" element={<CompositeUploaderPage />} />
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
          <Route path="/coachmark" element={<CoachmarkPage />} />
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
