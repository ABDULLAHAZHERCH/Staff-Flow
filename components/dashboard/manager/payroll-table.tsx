'use client';

import React from 'react';
import { Box, Button, Typography, styled } from '@mui/material';
import { Download } from '@mui/icons-material';

const payrollData = [
  {
    id: 1,
    department: 'Sales',
    employees: 4,
    regularHours: 640,
    overtimeHours: 25,
    regularPay: 12800,
    overtimePay: 750,
    totalPay: 13550,
  },
  {
    id: 2,
    department: 'Support',
    employees: 3,
    regularHours: 480,
    overtimeHours: 10,
    regularPay: 9600,
    overtimePay: 300,
    totalPay: 9900,
  },
  {
    id: 3,
    department: 'Kitchen',
    employees: 3,
    regularHours: 480,
    overtimeHours: 15,
    regularPay: 8640,
    overtimePay: 405,
    totalPay: 9045,
  },
  {
    id: 4,
    department: 'Delivery',
    employees: 3,
    regularHours: 480,
    overtimeHours: 0,
    regularPay: 7680,
    overtimePay: 0,
    totalPay: 7680,
  },
  {
    id: 5,
    department: 'Admin',
    employees: 2,
    regularHours: 320,
    overtimeHours: 0,
    regularPay: 8000,
    overtimePay: 0,
    totalPay: 8000,
  },
  {
    id: 6,
    department: 'Cleaning',
    employees: 2,
    regularHours: 320,
    overtimeHours: 0,
    regularPay: 5120,
    overtimePay: 0,
    totalPay: 5120,
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

export function ManagerPayrollTable() {
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
            <Box sx={{ flex: 1 }}>Employees</Box>
            <Box sx={{ flex: 1 }}>Regular Hours</Box>
            <Box sx={{ flex: 1 }}>Overtime Hours</Box>
            <Box sx={{ flex: 1 }}>Regular Pay</Box>
            <Box sx={{ flex: 1 }}>Overtime Pay</Box>
            <Box sx={{ flex: 1 }}>Total Pay</Box>
          </Box>
        </TableHeader>
        {payrollData.map((payroll) => (
          <TableRow key={payroll.id}>
            <Box sx={{ flex: 1.5 }}>
              <Typography sx={{ fontWeight: 500, fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif' }}>
                {payroll.department}
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif' }}>
                {payroll.employees}
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif' }}>
                {payroll.regularHours}h
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif' }}>
                {payroll.overtimeHours}h
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif' }}>
                ${payroll.regularPay}
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif' }}>
                ${payroll.overtimePay}
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontWeight: 500, fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif' }}>
                ${payroll.totalPay}
              </Typography>
            </Box>
          </TableRow>
        ))}
      </TableContainer>
    </Container>
  );
}