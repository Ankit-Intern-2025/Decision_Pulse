import React from 'react';
import { Tab, Tabs, Box } from '@mui/material';

export const AdminTabs = ({ selectedTab, onChange }) => {
  return (
    <Box sx={{ width: '100%', typography: 'body1', display: 'flex', justifyContent: 'center' }}>
      <Tabs
        value={selectedTab}
        onChange={onChange}
        aria-label="Admin Tabs"
        sx={{
          fontFamily: "Poppins, sans-serif",
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          borderRadius: '44px', // Rounded edges
          backgroundColor: '#095458', // Tab background color
          paddingTop: '6px',
          paddingBottom: '6px',
          paddingStart: "0px", // Add padding for better appearance
          marginTop: '8px', // Add padding for better appearance
          marginBottom: '8px', // Reduced bottom margin to allow AdminSchedulerTabs to fit closer
          width: 'fit-content', // Center horizontally
          '& .MuiTabs-indicator': {
            display: 'none', // Hide default indicator
          },
          '& .MuiTab-root': {
            fontFamily: "Poppins, sans-serif",
            color: 'white', // Unselected tab text color
            borderRadius: '24px', // Fully rounded tabs
            textTransform: 'none', // Keep text normal case
            padding: '10px 20px', // Adjust padding
            margin: '0 16px', // Increased space between tabs
          },
          '& .MuiTab-root.Mui-selected': {
            fontFamily: "Poppins, sans-serif",
            color: 'white', // Selected tab text color
            backgroundColor: '#00B8C0', // Selected tab background color
          },
        }}
      >
        <Tab label="Schedulers" value="1" />
        <Tab label="Manage Dashboards/Functions" value="2" />
        <Tab label="User Activity" value="3" />
        <Tab label="Manage Users" value="4" />
        <Tab label="Write Back" value="5" />
        <Tab label="Lineage View/Modelling" value="6" />
      </Tabs>
    </Box>
  );
};

export const AdminSchedulerTabs = ({ selectedTab, onChange }) => {
  return (
    <Box sx={{ typography: 'body1', display: 'flex', justifyContent: 'center' }}>
      <Tabs
        value={selectedTab}
        onChange={onChange}
        aria-label="Admin Scheduler Tabs"
        sx={{
          fontFamily: "Poppins, sans-serif",
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          borderRadius: '24px', // Rounded edges
          backgroundColor: '#095458', // Tab background color
          padding: '8px', // Add padding for better appearance 
          marginBottom: '8px', // Reduced bottom margin to allow AdminSchedulerTabs to fit closer
          width: 'fit-content', // Center horizontally
          '& .MuiTabs-indicator': {
            display: 'none', // Hide default indicator
          },
          '& .MuiTab-root': {
            fontFamily: "Poppins, sans-serif",
            color: 'white', // Unselected tab text color
            borderRadius: '24px', // Fully rounded tabs
            textTransform: 'none', // Keep text normal case
            padding: '10px 20px', // Adjust padding
            margin: '0 16px', // Increased space between tabs
          },
          '& .MuiTab-root.Mui-selected': {
            fontFamily: "Poppins, sans-serif",
            color: 'white', // Selected tab text color
            backgroundColor: '#00B8C0', // Selected tab background color
          },
        }}
      >
        <Tab label="Create" value="1" />
        <Tab label="Manage" value="2" />
      </Tabs>
    </Box>
  );
};

export default AdminTabs;