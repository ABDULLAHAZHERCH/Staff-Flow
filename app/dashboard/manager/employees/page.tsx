'use client';

import React, { useState } from 'react';
import { EmployeeList } from '@/components/dashboard/manager/employee-list';
import { AddEmployeeForm } from '@/components/dashboard/manager/add-employee-form';
import { Box, Typography, Card, CardHeader, CardContent, Tabs, Tab, Button, TextField, InputAdornment, styled } from '@mui/material';
import { Add, Search } from '@mui/icons-material';

const PageContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  backgroundColor: 'white',
  padding: theme.spacing(2),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  width: '100%',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)', // From global.css
  '&:hover': {
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)', // From global.css
  },
  borderTop: '4px solid', // Border-top for cards
  borderColor: '#03306b', // Default to primary
  '&[data-tab="active"], &[data-tab="add"]': {
    borderColor: '#c61111', // Secondary for active/add tabs
  },
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    backgroundColor: '#03306b', // Primary color from global.css
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
  textTransform: 'none',
  color: '#1a1a1a', // Body color from global.css
  '&.Mui-selected': {
    color: 'white',
    backgroundColor: '#03306b', // Primary for all/active/inactive, secondary for add
  },
  '&[data-value="active"], &[data-value="add"]': {
    '&.Mui-selected': {
      backgroundColor: '#c61111', // Secondary for active/add tabs
    },
  },
  '&:hover': {
    //color: '#c61111', // Secondary color from global.css
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
  textTransform: 'none',
  backgroundColor: '#c61111', // Secondary color from global.css
  color: 'white',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)', // From global.css
  transition: 'box-shadow 0.2s ease-in-out, background-color 0.2s ease-in-out',
  '&:hover': {
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)', // From global.css
    backgroundColor: '#a50f0f', // Darker secondary for hover (approx 90% opacity)
  },
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)', // From global.css
    transition: 'box-shadow 0.2s ease-in-out',
    borderColor: '#c61111', // Secondary/30 equivalent
    '&:hover, &.Mui-focused': {
      boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)', // From global.css
      borderColor: '#c61111', // Secondary for focus
    },
  },
  '& .MuiInputBase-input': {
    paddingLeft: theme.spacing(4), // Space for icon
  },
}));

const EmployeesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');

  const handleAddEmployeeClick = () => {
    setActiveTab('add');
  };

  return (
    <PageContainer>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' }, justifyContent: 'space-between', gap: 2 }}>
        <Typography variant="h4" sx={{ fontFamily: '"Poppins", "Inter", "Arial", sans-serif', fontWeight: 600, color: '#0d1b2a' }}>
          Employees
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', gap: 1, width: { xs: '100%', sm: 'auto' } }}>
          <Box sx={{ position: 'relative', width: { xs: '100%', md: '300px' } }}>
            <StyledTextField
              type="search"
              placeholder="Search employees..."
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ fontSize: 16, color: '#64748b' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <StyledButton onClick={handleAddEmployeeClick} sx={{ width: { xs: '100%', sm: 'auto' } }}>
            <Add sx={{ fontSize: 16 }} /> Add Employee
          </StyledButton>
        </Box>
      </Box>

      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <StyledTabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} aria-label="employee tabs">
          <StyledTab label="All Employees" value="all" data-value="all" />
          <StyledTab label="Active" value="active" data-value="active" />
          <StyledTab label="Inactive" value="inactive" data-value="inactive" />
          <StyledTab label="Add New" value="add" data-value="add" />
        </StyledTabs>

        <Box sx={{ display: activeTab === 'all' ? 'block' : 'none' }}>
          <StyledCard data-tab="all">
            <CardHeader
              title={<Typography variant="h6" sx={{ fontFamily: '"Poppins", "Inter", "Arial", sans-serif', fontWeight: 600, color: '#0d1b2a' }}>Employee Directory</Typography>}
              subheader={<Typography variant="body2" sx={{ color: '#64748b' }}>Manage your employees and their information</Typography>}
            />
            <CardContent>
              <EmployeeList />
            </CardContent>
          </StyledCard>
        </Box>

        <Box sx={{ display: activeTab === 'active' ? 'block' : 'none' }}>
          <StyledCard data-tab="active">
            <CardHeader
              title={<Typography variant="h6" sx={{ fontFamily: '"Poppins", "Inter", "Arial", sans-serif', fontWeight: 600, color: '#0d1b2a' }}>Active Employees</Typography>}
              subheader={<Typography variant="body2" sx={{ color: '#64748b' }}>Currently active employees in your organization</Typography>}
            />
            <CardContent>
              <EmployeeList filterStatus="active" />
            </CardContent>
          </StyledCard>
        </Box>

        <Box sx={{ display: activeTab === 'inactive' ? 'block' : 'none' }}>
          <StyledCard data-tab="inactive">
            <CardHeader
              title={<Typography variant="h6" sx={{ fontFamily: '"Poppins", "Inter", "Arial", sans-serif', fontWeight: 600, color: '#0d1b2a' }}>Inactive Employees</Typography>}
              subheader={<Typography variant="body2" sx={{ color: '#64748b' }}>Employees who are currently inactive</Typography>}
            />
            <CardContent>
              <EmployeeList filterStatus="inactive" />
            </CardContent>
          </StyledCard>
        </Box>

        <Box sx={{ display: activeTab === 'add' ? 'block' : 'none' }}>
          <StyledCard data-tab="add">
            <CardHeader
              title={<Typography variant="h6" sx={{ fontFamily: '"Poppins", "Inter", "Arial", sans-serif', fontWeight: 600, color: '#0d1b2a' }}>Add New Employee</Typography>}
              subheader={<Typography variant="body2" sx={{ color: '#64748b' }}>Add a new employee to your organization</Typography>}
            />
            <CardContent>
              <AddEmployeeForm onSuccess={() => setActiveTab('all')} />
            </CardContent>
          </StyledCard>
        </Box>
      </Box>
    </PageContainer>
  );
};

export default EmployeesPage;