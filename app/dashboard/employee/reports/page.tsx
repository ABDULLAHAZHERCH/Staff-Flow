"use client";
import React from 'react';
import { EmployeeReportsChart } from '@/components/dashboard/employee/reports-chart';
import { EmployeeReportsTable } from '@/components/dashboard/employee/reports-table';
import { Container, Box, Typography, Card, CardHeader, CardContent, Tabs, Tab } from '@mui/material';
import { styled } from '@mui/material/styles';

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

const EmployeeReportsPage: React.FC = () => {
  const [value, setValue] = React.useState('overview');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <PageContainer>
      <Typography variant="h4" sx={{ fontFamily: '"Poppins", "Inter", "Arial", sans-serif', fontWeight: 600, color: '#0d1b2a' }}>
        My Reports
      </Typography>

      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <StyledTabs value={value} onChange={handleChange} aria-label="reports tabs">
          <StyledTab label="Overview" value="overview" />
          <StyledTab label="Performance" value="performance" />
        </StyledTabs>

        <Box sx={{ display: value === 'overview' ? 'block' : 'none' }}>
          <StyledCard>
            <CardHeader
              title={<Typography variant="h6" sx={{ fontFamily: '"Poppins", "Inter", "Arial", sans-serif', fontWeight: 600, color: '#0d1b2a' }}>Monthly Hours Overview</Typography>}
              subheader={<Typography variant="body2" sx={{ color: '#64748b' }}>Your hours worked over the past month</Typography>}
            />
            <CardContent sx={{ height: '300px' }}>
              <EmployeeReportsChart />
            </CardContent>
          </StyledCard>
          <StyledCard sx={{ mt: 2 }}>
            <CardHeader
              title={<Typography variant="h6" sx={{ fontFamily: '"Poppins", "Inter", "Arial", sans-serif', fontWeight: 600, color: '#0d1b2a' }}>Detailed Report</Typography>}
              subheader={<Typography variant="body2" sx={{ color: '#64748b' }}>Breakdown of your hours worked by week</Typography>}
            />
            <CardContent>
              <EmployeeReportsTable />
            </CardContent>
          </StyledCard>
        </Box>

        <Box sx={{ display: value === 'performance' ? 'block' : 'none' }}>
          <StyledCard>
            <CardHeader
              title={<Typography variant="h6" sx={{ fontFamily: '"Poppins", "Inter", "Arial", sans-serif', fontWeight: 600, color: '#0d1b2a' }}>Performance Metrics</Typography>}
              subheader={<Typography variant="body2" sx={{ color: '#64748b' }}>Your performance metrics and feedback</Typography>}
            />
            <CardContent>
              <Typography variant="body2" sx={{ color: '#64748b' }}>
                Performance reports will be available in the next update.
              </Typography>
            </CardContent>
          </StyledCard>
        </Box>
      </Box>
    </PageContainer>
  );
};

export default EmployeeReportsPage;