'use client';

import React from 'react';
import { Box, Button, Typography, styled } from '@mui/material';
import { Download, Visibility } from '@mui/icons-material';

const reportData = [
  {
    id: 1,
    department: 'Sales',
    totalHours: 485,
    employees: 4,
    avgHoursPerEmployee: 121.25,
    overtime: 25,
  },
  {
    id: 2,
    department: 'Support',
    totalHours: 350,
    employees: 3,
    avgHoursPerEmployee: 116.67,
    overtime: 10,
  },
  {
    id: 3,
    department: 'Kitchen',
    totalHours: 310,
    employees: 3,
    avgHoursPerEmployee: 103.33,
    overtime: 15,
  },
  {
    id: 4,
    department: 'Delivery',
    totalHours: 270,
    employees: 3,
    avgHoursPerEmployee: 90,
    overtime: 0,
  },
  {
    id: 5,
    department: 'Admin',
    totalHours: 190,
    employees: 2,
    avgHoursPerEmployee: 95,
    overtime: 0,
  },
  {
    id: 6,
    department: 'Cleaning',
    totalHours: 150,
    employees: 2,
    avgHoursPerEmployee: 75,
    overtime: 0,
  },
];

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  backgroundColor: 'white',
}));

const TableContainer = styled(Box)(({ theme }) => ({
  border: '1px solid #e2e8f0', // From global.css
  borderRadius: '0.375rem',
  overflow: 'hidden',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)', // From global.css
}));

const TableHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: '#f8fafc', // Light background
  fontWeight: 500,
  fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
  color: '#1a1a1a',
}));

const TableRow = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  borderBottom: '1px solid #e2e8f0',
  '&:last-child': {
    borderBottom: 'none',
  },
}));

const StyledOutlineButton = styled(Button)(({ theme }) => ({
  fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
  textTransform: 'none',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)', // From global.css
  transition: 'box-shadow 0.2s ease-in-out, color 0.2s ease-in-out',
  borderColor: '#e2e8f0',
  color: '#1a1a1a',
  '&:hover': {
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)', // From global.css
    color: '#c61111', // Secondary color
    borderColor: '#c61111',
  },
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const StyledGhostButton = styled(Button)(({ theme }) => ({
  fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
  textTransform: 'none',
  color: '#1a1a1a',
  '&:hover': {
    backgroundColor: '#f1f5f9', // Muted/10 equivalent
    color: '#c61111', // Secondary color
  },
  fontSize: '0.875rem',
}));

export function ManagerReportsTable() {
  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <StyledOutlineButton variant="outlined" size="small">
          <Download sx={{ fontSize: 16 }} />
          Export
        </StyledOutlineButton>
      </Box>
      <TableContainer>
        <TableHeader>
          <Box sx={{ display: 'flex', gap: 4 }}>
            <Box sx={{ flex: 1.5 }}>Department</Box>
            <Box sx={{ flex: 1 }}>Total Hours</Box>
            <Box sx={{ flex: 1 }}>Employees</Box>
            <Box sx={{ flex: 1 }}>Avg Hours/Employee</Box>
            <Box sx={{ flex: 1 }}>Overtime Hours</Box>
            <Box sx={{ flex: 1 }}></Box>
          </Box>
        </TableHeader>
        {reportData.map((report) => (
          <TableRow key={report.id}>
            <Box sx={{ flex: 1.5 }}>
              <Typography sx={{ fontWeight: 500, fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif' }}>
                {report.department}
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif' }}>
                {report.totalHours}h
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif' }}>
                {report.employees}
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif' }}>
                {report.avgHoursPerEmployee.toFixed(1)}h
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif' }}>
                {report.overtime}h
              </Typography>
            </Box>
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <StyledGhostButton size="small">
                <Visibility sx={{ fontSize: 16, mr: 1 }} />
                View Details
              </StyledGhostButton>
            </Box>
          </TableRow>
        ))}
      </TableContainer>
    </Container>
  );
}