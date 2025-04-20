'use client';

import React, { useState } from 'react';
import { AISchedulingForm } from '@/components/dashboard/manager/ai-scheduling-form';
import { AISchedulingResults } from '@/components/dashboard/manager/ai-scheduling-results';
import { Box, Typography, Card, CardHeader, CardContent, Button, Tabs, Tab, styled } from '@mui/material';
import { AutoAwesome } from '@mui/icons-material';

const PageContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  backgroundColor: 'white',
  padding: theme.spacing(2),
}));

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const TitleContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
  textTransform: 'none',
  background: 'linear-gradient(135deg, #03306b 0%, #c61111 100%)', // Gradient inspired by btn-gradient-dual
  color: 'white',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)', // From global.css
  transition: 'box-shadow 0.2s ease-in-out',
  '&:hover': {
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)', // From global.css
    background: 'linear-gradient(135deg, #c61111 0%, #03306b 100%)', // Reversed gradient for hover
  },
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
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
    backgroundColor: '#c61111', // Secondary color for active-secondary
  },
  '&:hover': {
    //color: '#c61111', // Secondary color from global.css
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  width: '100%',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)', // From global.css
  '&:hover': {
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)', // From global.css
  },
}));

const AISchedulingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('generate');

  return (
    <PageContainer>
      <HeaderContainer>
        <TitleContainer>
          <Typography variant="h4" sx={{ fontFamily: '"Poppins", "Inter", "Arial", sans-serif', fontWeight: 600, color: '#0d1b2a' }}>
            AI Scheduling
          </Typography>
          <StyledButton>
            <AutoAwesome sx={{ fontSize: 16 }} />
            New Schedule
          </StyledButton>
        </TitleContainer>

        <Box>
          <StyledTabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} aria-label="scheduling tabs">
            <StyledTab label="Generate Schedule" value="generate" />
            <StyledTab label="Schedule History" value="history" />
          </StyledTabs>

          <Box sx={{ display: activeTab === 'generate' ? 'block' : 'none', mt: 2 }}>
            <StyledCard>
              <CardHeader
                title={<Typography variant="h6" sx={{ fontFamily: '"Poppins", "Inter", "Arial", sans-serif', fontWeight: 600, color: '#0d1b2a' }}>AI-Assisted Scheduling</Typography>}
                subheader={<Typography variant="body2" sx={{ color: '#64748b' }}>Generate optimized shift schedules based on employee availability and business needs</Typography>}
              />
              <CardContent>
                <AISchedulingForm />
              </CardContent>
            </StyledCard>
            <StyledCard sx={{ mt: 2 }}>
              <CardHeader
                title={<Typography variant="h6" sx={{ fontFamily: '"Poppins", "Inter", "Arial", sans-serif', fontWeight: 600, color: '#0d1b2a' }}>Generated Schedule</Typography>}
                subheader={<Typography variant="body2" sx={{ color: '#64748b' }}>Review and adjust the AI-generated schedule</Typography>}
              />
              <CardContent>
                <AISchedulingResults />
              </CardContent>
            </StyledCard>
          </Box>

          <Box sx={{ display: activeTab === 'history' ? 'block' : 'none', mt: 2 }}>
            <StyledCard>
              <CardHeader
                title={<Typography variant="h6" sx={{ fontFamily: '"Poppins", "Inter", "Arial", sans-serif', fontWeight: 600, color: '#0d1b2a' }}>Schedule History</Typography>}
                subheader={<Typography variant="body2" sx={{ color: '#64748b' }}>View and manage previously generated schedules</Typography>}
              />
              <CardContent sx={{ textAlign: 'center', padding: '2rem 0' }}>
                <Typography variant="body2" sx={{ color: '#64748b', mb: 2 }}>
                  No previous schedules found
                </Typography>
                
              </CardContent>
            </StyledCard>
          </Box>
        </Box>
      </HeaderContainer>
    </PageContainer>
  );
};

export default AISchedulingPage;