"use client";
import React from 'react';
import { ManagerNotificationsList } from '@/components/dashboard/manager/notifications-list';
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

const ManagerNotificationsPage: React.FC = () => {
  return (
    <PageContainer>
      <Typography variant="h4" sx={{ fontFamily: '"Poppins", "Inter", "Arial", sans-serif', fontWeight: 600, color: '#0d1b2a' }}>
        Notifications
      </Typography>

      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <StyledTabs value="all" aria-label="notification tabs">
          <StyledTab label="All" value="all" />
          <StyledTab label="Unread" value="unread" />
          <StyledTab label="Important" value="important" />
        </StyledTabs>

        <Box sx={{ display: 'block' }}>
          <StyledCard>
            <CardHeader
              title={<Typography variant="h6" sx={{ fontFamily: '"Poppins", "Inter", "Arial", sans-serif', fontWeight: 600, color: '#0d1b2a' }}>All Notifications</Typography>}
              subheader={<Typography variant="body2" sx={{ color: '#64748b' }}>View all your notifications</Typography>}
            />
            <CardContent>
              <ManagerNotificationsList filter="all" />
            </CardContent>
          </StyledCard>
        </Box>

        <Box sx={{ display: 'none' }}>
          <StyledCard>
            <CardHeader
              title={<Typography variant="h6" sx={{ fontFamily: '"Poppins", "Inter", "Arial", sans-serif', fontWeight: 600, color: '#0d1b2a' }}>Unread Notifications</Typography>}
              subheader={<Typography variant="body2" sx={{ color: '#64748b' }}>View your unread notifications</Typography>}
            />
            <CardContent>
              <ManagerNotificationsList filter="unread" />
            </CardContent>
          </StyledCard>
        </Box>

        <Box sx={{ display: 'none' }}>
          <StyledCard>
            <CardHeader
              title={<Typography variant="h6" sx={{ fontFamily: '"Poppins", "Inter", "Arial", sans-serif', fontWeight: 600, color: '#0d1b2a' }}>Important Notifications</Typography>}
              subheader={<Typography variant="body2" sx={{ color: '#64748b' }}>View your important notifications</Typography>}
            />
            <CardContent>
              <ManagerNotificationsList filter="important" />
            </CardContent>
          </StyledCard>
        </Box>
      </Box>
    </PageContainer>
  );
};

export default ManagerNotificationsPage;