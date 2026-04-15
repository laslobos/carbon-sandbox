import React from 'react';
import {
  Content,
  Grid,
  Column,
  Header,
  HeaderName,
  Theme,
  Stack
} from '@carbon/react';
import DataTableDemo from './components/DataTableDemo';
import TreeViewBasic from './components/TreeViewBasic';
import TreeViewDemo from './components/TreeViewDemo';

function App() {
  return (
    <Theme theme="white">
      <Header aria-label="Carbon React Website">
        <HeaderName href="#" prefix="IBM">
          Carbon Component Demo
        </HeaderName>
      </Header>
      
      <Content>
        <Grid>
          <Column lg={16} md={8} sm={4}>
            <Stack gap={7}>
              <DataTableDemo />
              <TreeViewBasic />
              <TreeViewDemo />
            </Stack>
          </Column>
        </Grid>
      </Content>
    </Theme>
  );
}

export default App;

// Made with Bob
