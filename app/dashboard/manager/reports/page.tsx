"use client";
import React from 'react';
import { ManagerReportsChart } from '@/components/dashboard/manager/reports-chart';
import { ManagerReportsTable } from '@/components/dashboard/manager/reports-table';
import { Box, Typography, Card, CardHeader, CardContent, Tabs, Tab, styled } from '@mui/material';

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
    backgroundColor: '#03306b', // Primary color from global.css
  },
  '&:hover': {
    color: '#c61111', // Secondary color from global.css
  },
}));

const ManagerReportsPage: React.FC = () => {
  return (
    <PageContainer>
      <Typography variant="h4" sx={{ fontFamily: '"Poppins", "Inter", "Arial", sans-serif', fontWeight: 600, color: '#0d1b2a' }}>
        Reports
      </Typography>

      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <StyledTabs value="overview" aria-label="reports tabs">
          <StyledTab label="Overview" value="overview" />
          <StyledTab label="Departments" value="departments" />
          <StyledTab label="Employees" value="employees" />
        </StyledTabs>

        <Box sx={{ display: 'block' }}>
          <StyledCard>
            <CardHeader
              title={<Typography variant="h6" sx={{ fontFamily: '"Poppins", "Inter", "Arial", sans-serif', fontWeight: 600, color: '#0d1b2a' }}>Monthly Hours Overview</Typography>}
              subheader={<Typography variant="body2" sx={{ color: '#64748b' }}>Total hours worked by department for the current month</Typography>}
            />
            <CardContent sx={{ height: '300px' }}>
              <ManagerReportsChart />
            </CardContent>
          </StyledCard>
          <StyledCard sx={{ mt: 2 }}>
            <CardHeader
              title={<Typography variant="h6" sx={{ fontFamily: '"Poppins", "Inter", "Arial", sans-serif', fontWeight: 600, color: '#0d1b2a' }}>Detailed Report</Typography>}
              subheader={<Typography variant="body2" sx={{ color: '#64748b' }}>Breakdown of hours worked by department and employee</Typography>}
            />
            <CardContent>
              <ManagerReportsTable />
            </CardContent>
          </StyledCard>
        </Box>

        <Box sx={{ display: 'none' }}>
          <StyledCard>
            <CardHeader
              title={<Typography variant="h6" sx={{ fontFamily: '"Poppins", "Inter", "Arial", sans-serif', fontWeight: 600, color: '#0d1b2a' }}>Department Performance</Typography>}
              subheader={<Typography variant="body2" sx={{ color: '#64748b' }}>Detailed breakdown of department performance</Typography>}
            />
            <CardContent>
              <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.875rem' }}>
                Department reports will be available in the next update.
              </Typography>
            </CardContent>
          </StyledCard>
        </Box>

        <Box sx={{ display: 'none' }}>
          <StyledCard>
            <CardHeader
              title={<Typography variant="h6" sx={{ fontFamily: '"Poppins", "Inter", "Arial", sans-serif', fontWeight: 600, color: '#0d1b2a' }}>Employee Performance</Typography>}
              subheader={<Typography variant="body2" sx={{ color: '#64748b' }}>Detailed breakdown of employee performance</Typography>}
            />
            <CardContent>
              <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.875rem' }}>
                Employee reports will be available in the next update.
              </Typography>
            </CardContent>
          </StyledCard>
        </Box>
      </Box>
    </PageContainer>
  );
};

export default ManagerReportsPage;