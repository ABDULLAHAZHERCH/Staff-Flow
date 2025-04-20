'use client';

import React, { useState } from 'react';
import { Box, Typography, TextField, Select, MenuItem, Slider, Switch, Button, Alert, styled, SelectChangeEvent } from '@mui/material';
import { CalendarToday, HourglassEmpty, AutoAwesome } from '@mui/icons-material';

const FormContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  backgroundColor: 'white',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)', // From global.css
    transition: 'box-shadow 0.2s ease-in-out',
    '&:hover, &.Mui-focused': {
      boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)', // From global.css
    },
  },
  '& .MuiInputBase-input': {
    fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
  },
  '& .MuiInputAdornment-root': {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    opacity: 0.5,
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)', // From global.css
  transition: 'box-shadow 0.2s ease-in-out',
  '&:hover, &.Mui-focused': {
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)', // From global.css
  },
  '& .MuiSelect-select': {
    fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
  },
}));

const StyledSlider = styled(Slider)(({ theme }) => ({
  '& .MuiSlider-thumb': {
    backgroundColor: '#c61111', // Secondary color from global.css
  },
  '& .MuiSlider-track': {
    backgroundColor: '#c61111', // Secondary color
  },
  '& .MuiSlider-rail': {
    backgroundColor: '#e2e8f0', // Muted background
  },
}));

const StyledSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase': {
    '&.Mui-checked': {
      color: '#c61111', // Secondary color
    },
    '&.Mui-checked + .MuiSwitch-track': {
      backgroundColor: '#c61111', // Secondary color
    },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
  textTransform: 'none',
  backgroundColor: '#03306b', // Primary color from global.css
  color: 'white',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)', // From global.css
  transition: 'box-shadow 0.2s ease-in-out, background-color 0.2s ease-in-out',
  '&:hover': {
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)', // From global.css
    backgroundColor: '#022a5b', // Darker primary
  },
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  '&.Mui-disabled': {
    backgroundColor: '#e2e8f0',
    color: '#64748b',
  },
}));

const PreferenceBox = styled(Box)(({ theme }) => ({
  border: '1px solid #e2e8f0', // Border-color from global.css
  borderRadius: '0.375rem', // var(--radius)
  padding: theme.spacing(2),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export function AISchedulingForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [formData, setFormData] = useState({
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
    department: '',
    prioritizeEmployeePreferences: true,
    maxConsecutiveDays: 5,
    considerSkillLevel: true,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | SelectChangeEvent<unknown>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log('AI Scheduling parameters:', formData);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setAlert({ type: 'success', message: 'Schedule generated successfully!' });
    } catch (error) {
      setAlert({ type: 'error', message: 'There was an error generating the schedule. Please try again.' });
    } finally {
      setIsLoading(false);
      setTimeout(() => setAlert(null), 3000); // Hide alert after 3 seconds
    }
  };

  return (
    <FormContainer as="form" onSubmit={handleSubmit}>
      {alert && (
        <Alert severity={alert.type} sx={{ fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif' }}>
          <Typography variant="body2">{alert.message}</Typography>
        </Alert>
      )}

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, flexWrap: 'wrap' }}>
        <Box sx={{ flex: 1, minWidth: { xs: '100%', md: 'calc(50% - 12px)' } }}>
          <Typography variant="body2" sx={{ mb: 1, fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif', color: '#1a1a1a' }}>
            Start Date
          </Typography>
          <StyledTextField
            type="date"
            name="startDate"
            fullWidth
            value={formData.startDate.toISOString().split('T')[0]}
            onChange={(e) => setFormData({ ...formData, startDate: new Date(e.target.value) })}
            InputProps={{
              endAdornment: <CalendarToday sx={{ fontSize: 16 }} />,
            }}
          />
        </Box>
        <Box sx={{ flex: 1, minWidth: { xs: '100%', md: 'calc(50% - 12px)' } }}>
          <Typography variant="body2" sx={{ mb: 1, fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif', color: '#1a1a1a' }}>
            End Date
          </Typography>
          <StyledTextField
            type="date"
            name="endDate"
            fullWidth
            value={formData.endDate.toISOString().split('T')[0]}
            onChange={(e) => setFormData({ ...formData, endDate: new Date(e.target.value) })}
            InputProps={{
              endAdornment: <CalendarToday sx={{ fontSize: 16 }} />,
            }}
          />
        </Box>
        <Box sx={{ flex: 1, minWidth: { xs: '100%', md: 'calc(50% - 12px)' } }}>
          <Typography variant="body2" sx={{ mb: 1, fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif', color: '#1a1a1a' }}>
            Department
          </Typography>
          <StyledSelect
            fullWidth
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            displayEmpty
            renderValue={(value) => (value as string ? (value as string).charAt(0).toUpperCase() + (value as string).slice(1) : 'Select a department')}
          >
            <MenuItem value="">Select a department</MenuItem>
            <MenuItem value="all">All Departments</MenuItem>
            {['sales', 'support', 'kitchen', 'delivery', 'admin', 'cleaning'].map((dept) => (
              <MenuItem key={dept} value={dept}>
                {dept.charAt(0).toUpperCase() + dept.slice(1)}
              </MenuItem>
            ))}
          </StyledSelect>
        </Box>
        <Box sx={{ flex: 1.2, minWidth: { xs: '100%', md: 'calc(50% - 12px)' } }}>
          <Typography variant="body2" sx={{ mb: 1, fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif', color: '#1a1a1a' }}>
            Max Consecutive Working Days
          </Typography>
          <StyledSlider
            value={formData.maxConsecutiveDays}
            onChange={(e, value) => setFormData({ ...formData, maxConsecutiveDays: value as number })}
            min={1}
            max={7}
            step={1}
            
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value} ${value === 1 ? 'day' : 'days'}`}
          />
          <Typography sx={{ textAlign: 'center', fontWeight: 500, mt: 1, fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif' }}>
            {formData.maxConsecutiveDays} {formData.maxConsecutiveDays === 1 ? 'day' : 'days'}
          </Typography>
        </Box>
        <PreferenceBox sx={{ flex: 1, minWidth: { xs: '100%', md: 'calc(50% - 12px)' } }}>
          <Box>
            <Typography variant="body2" sx={{ mb: 0.5, fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif', color: '#1a1a1a' }}>
              Prioritize Employee Preferences
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748b', fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif' }}>
              Consider employee availability and preferences when scheduling
            </Typography>
          </Box>
          <StyledSwitch
            checked={formData.prioritizeEmployeePreferences}
            onChange={(e) => setFormData({ ...formData, prioritizeEmployeePreferences: e.target.checked })}
            name="prioritizeEmployeePreferences"
          />
        </PreferenceBox>
        <PreferenceBox sx={{ flex: 1, minWidth: { xs: '100%', md: 'calc(50% - 12px)' } }}>
          <Box>
            <Typography variant="body2" sx={{ mb: 0.5, fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif', color: '#1a1a1a' }}>
              Consider Skill Level
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748b', fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif' }}>
              Ensure appropriate skill mix in each shift
            </Typography>
          </Box>
          <StyledSwitch
            checked={formData.considerSkillLevel}
            onChange={(e) => setFormData({ ...formData, considerSkillLevel: e.target.checked })}
            name="considerSkillLevel"
          />
        </PreferenceBox>
      </Box>
      <StyledButton type="submit" disabled={isLoading}>
        {isLoading ? (
          <>
            <HourglassEmpty sx={{ fontSize: 16 }} />
            Generating Schedule...
          </>
        ) : (
          <>
            <AutoAwesome sx={{ fontSize: 16 }} />
            Generate AI Schedule
          </>
        )}
      </StyledButton>
    </FormContainer>
  );
}