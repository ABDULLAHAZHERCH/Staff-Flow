'use client';

import React, { useState } from 'react';
import { Box, Typography, Card, CardHeader, CardContent, CardActions, Tabs, Tab, TextField, Button, Avatar, Alert, styled } from '@mui/material';
import { Camera, Save, HourglassEmpty } from '@mui/icons-material';

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

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)', // From global.css
    transition: 'box-shadow 0.2s ease-in-out',
    '&:hover, &:focus': {
      boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)', // From global.css
    },
  },
  '& .MuiInputLabel-root': {
    fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
    color: '#1a1a1a',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
  textTransform: 'none',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)', // From global.css
  transition: 'box-shadow 0.2s ease-in-out, color 0.2s ease-in-out',
  '&:hover': {
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)', // From global.css
    color: '#c61111', // Secondary color from global.css
  },
}));

const EmployeeProfilePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = React.useState('general');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setShowSuccess(true);
    setIsLoading(false);

    // Hide alert after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <PageContainer>
      <Typography variant="h4" sx={{ fontFamily: '"Poppins", "Inter", "Arial", sans-serif', fontWeight: 600, color: '#0d1b2a' }}>
        My Profile
      </Typography>

      {showSuccess && (
        <Alert severity="success" sx={{ fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif' }}>
          <Typography variant="body2">Profile updated successfully.</Typography>
        </Alert>
      )}

      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <StyledTabs value={value} onChange={handleChange} aria-label="profile tabs">
          <StyledTab label="General" value="general" />
          <StyledTab label="Security" value="security" />
          <StyledTab label="Preferences" value="preferences" />
        </StyledTabs>

        <Box sx={{ display: value === 'general' ? 'block' : 'none' }}>
          <StyledCard>
            <CardHeader
              title={<Typography variant="h6" sx={{ fontFamily: '"Poppins", "Inter", "Arial", sans-serif', fontWeight: 600, color: '#0d1b2a' }}>Profile Information</Typography>}
              subheader={<Typography variant="body2" sx={{ color: '#64748b' }}>Update your personal information</Typography>}
            />
            <CardContent>
              <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'center', sm: 'flex-start' }, gap: 3 }}>
                  <Box sx={{ position: 'relative' }}>
                    <Avatar sx={{ width: 96, height: 96 }}>
                      <img src="/placeholder.svg?height=96&width=96" alt="Employee" />
                    </Avatar>
                    <StyledButton
                      variant="outlined"
                      sx={{ position: 'absolute', bottom: 0, right: 0, borderRadius: '50%', minWidth: 32, width: 32, height: 32, padding: 0, backgroundColor: 'white' }}
                    >
                      <Camera fontSize="small" />
                    </StyledButton>
                  </Box>

                  <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" sx={{ mb: 1, fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif', color: '#1a1a1a' }}>
                          First Name
                        </Typography>
                        <StyledTextField fullWidth defaultValue="Jane" />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" sx={{ mb: 1, fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif', color: '#1a1a1a' }}>
                          Last Name
                        </Typography>
                        <StyledTextField fullWidth defaultValue="Employee" />
                      </Box>
                    </Box>

                    <Box>
                      <Typography variant="body2" sx={{ mb: 1, fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif', color: '#1a1a1a' }}>
                        Email
                      </Typography>
                      <StyledTextField fullWidth type="email" defaultValue="employee@staffflow.com" />
                    </Box>

                    <Box>
                      <Typography variant="body2" sx={{ mb: 1, fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif', color: '#1a1a1a' }}>
                        Phone Number
                      </Typography>
                      <StyledTextField fullWidth defaultValue="+1 (555) 987-6543" />
                    </Box>

                    <Box>
                      <Typography variant="body2" sx={{ mb: 1, fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif', color: '#1a1a1a' }}>
                        Department
                      </Typography>
                      <StyledTextField fullWidth defaultValue="Sales" disabled />
                    </Box>

                    <Box>
                      <Typography variant="body2" sx={{ mb: 1, fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif', color: '#1a1a1a' }}>
                        Position
                      </Typography>
                      <StyledTextField fullWidth defaultValue="Sales Representative" disabled />
                    </Box>

                    <Box>
                      <Typography variant="body2" sx={{ mb: 1, fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif', color: '#1a1a1a' }}>
                        Bio
                      </Typography>
                      <StyledTextField
                        fullWidth
                        multiline
                        rows={4}
                        defaultValue="Dedicated sales professional with a passion for customer service and meeting targets."
                      />
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <StyledButton type="submit" disabled={isLoading} sx={{ display: 'flex', gap: 1 }}>
                    {isLoading ? (
                      <>
                        <HourglassEmpty sx={{ fontSize: 16 }} />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save sx={{ fontSize: 16 }} />
                        Save Changes
                      </>
                    )}
                  </StyledButton>
                </Box>
              </form>
            </CardContent>
          </StyledCard>
        </Box>

        <Box sx={{ display: value === 'security' ? 'block' : 'none' }}>
          <StyledCard>
            <CardHeader
              title={<Typography variant="h6" sx={{ fontFamily: '"Poppins", "Inter", "Arial", sans-serif', fontWeight: 600, color: '#0d1b2a' }}>Security Settings</Typography>}
              subheader={<Typography variant="body2" sx={{ color: '#64748b' }}>Manage your password and security preferences</Typography>}
            />
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Typography variant="body2" sx={{ mb: 1, fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif', color: '#1a1a1a' }}>
                  Current Password
                </Typography>
                <StyledTextField fullWidth type="password" />
              </Box>
              <Box>
                <Typography variant="body2" sx={{ mb: 1, fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif', color: '#1a1a1a' }}>
                  New Password
                </Typography>
                <StyledTextField fullWidth type="password" />
              </Box>
              <Box>
                <Typography variant="body2" sx={{ mb: 1, fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif', color: '#1a1a1a' }}>
                  Confirm New Password
                </Typography>
                <StyledTextField fullWidth type="password" />
              </Box>
            </CardContent>
            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <StyledButton>Update Password</StyledButton>
            </CardActions>
          </StyledCard>
        </Box>

        <Box sx={{ display: value === 'preferences' ? 'block' : 'none' }}>
          <StyledCard>
            <CardHeader
              title={<Typography variant="h6" sx={{ fontFamily: '"Poppins", "Inter", "Arial", sans-serif', fontWeight: 600, color: '#0d1b2a' }}>Work Preferences</Typography>}
              subheader={<Typography variant="body2" sx={{ color: '#64748b' }}>Set your availability and work preferences</Typography>}
            />
            <CardContent>
              <Typography variant="body2" sx={{ color: '#64748b' }}>
                Work preferences will be available in the next update.
              </Typography>
            </CardContent>
          </StyledCard>
        </Box>
      </Box>
    </PageContainer>
  );
};

export default EmployeeProfilePage;