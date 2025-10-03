import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container, Typography, Box, Tabs, Tab } from '@mui/material';
import { client } from './apollo/client';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
  },
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function App() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <Box sx={{ py: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom align="center">
              User Management System
            </Typography>
            <Typography variant="subtitle1" gutterBottom align="center" color="text.secondary">
              NestJS GraphQL + React TypeScript Demo
            </Typography>

            <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 4, mb: 2 }}>
              <Tabs value={tabValue} onChange={handleTabChange} aria-label="user management tabs" centered>
                <Tab label="Create User" id="tab-0" aria-controls="tabpanel-0" />
                <Tab label="Users List" id="tab-1" aria-controls="tabpanel-1" />
              </Tabs>
            </Box>

            <TabPanel value={tabValue} index={0}>
              <UserForm onUserCreated={() => setTabValue(1)} />
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <UserList />
            </TabPanel>
          </Box>
        </Container>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App
