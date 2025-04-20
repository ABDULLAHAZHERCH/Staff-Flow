'use client';

import React from 'react';
import { Box, Typography, Button, Avatar, Chip, Divider, styled } from '@mui/material';
import { Edit, Download, Check, Delete, CalendarToday } from '@mui/icons-material';

const scheduledShifts = [
  {
    id: 1,
    employee: {
      name: 'Jane Smith',
      avatar: '/placeholder.svg?height=40&width=40',
      initials: 'JS',
    },
    department: 'Sales',
    date: '2025-04-20',
    day: 'Monday',
    startTime: '09:00',
    endTime: '17:00',
  },
  {
    id: 2,
    employee: {
      name: 'Mike Johnson',
      avatar: '/placeholder.svg?height=40&width=40',
      initials: 'MJ',
    },
    department: 'Support',
    date: '2025-04-20',
    day: 'Monday',
    startTime: '10:00',
    endTime: '18:00',
  },
  {
    id: 3,
    employee: {
      name: 'Sarah Williams',
      avatar: '/placeholder.svg?height=40&width=40',
      initials: 'SW',
    },
    department: 'Kitchen',
    date: '2025-04-21',
    day: 'Tuesday',
    startTime: '08:00',
    endTime: '16:00',
  },
  {
    id: 4,
    employee: {
      name: 'David Brown',
      avatar: '/placeholder.svg?height=40&width=40',
      initials: 'DB',
    },
    department: 'Delivery',
    date: '2025-04-21',
    day: 'Tuesday',
    startTime: '12:00',
    endTime: '20:00',
  },
  {
    id: 5,
    employee: {
      name: 'Lisa Chen',
      avatar: '/placeholder.svg?height=40&width=40',
      initials: 'LC',
    },
    department: 'Admin',
    date: '2025-04-22',
    day: 'Wednesday',
    startTime: '09:00',
    endTime: '17:00',
  },
];

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  backgroundColor: 'white',
}));

const TableContainer = styled(Box)(({ theme }) => ({
  border: '1px solid #e2e8f0', // Border from global.css
  borderRadius: '0.375rem',
  overflow: 'hidden',
}));

const TableHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: '#f8fafc', // Light background
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

const StyledButton = styled(Button)(({ theme }) => ({
  fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
  textTransform: 'none',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)', // From global.css
  transition: 'box-shadow 0.2s ease-in-out, background-color 0.2s ease-in-out',
  backgroundColor: '#03306b', // Primary color
  color: 'white',
  '&:hover': {
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)', // From global.css
    backgroundColor: '#022a5b', // Darker primary
  },
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
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
}));

const StyledIconButton = styled(Button)(({ theme }) => ({
  minWidth: 'auto',
  padding: theme.spacing(1),
  color: '#1a1a1a',
  '&:hover': {
    color: '#c61111', // Secondary color
  },
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  backgroundColor: '#03306b', // Primary color
  color: 'white',
  fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
}));

export function AISchedulingResults() {
  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
        <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
          <StyledChip label="AI Generated" sx={{ mb: 1 }} />
          <Typography variant="h6" sx={{ fontFamily: '"Poppins", "Inter", "Arial", sans-serif', color: '#0d1b2a' }}>
            Schedule for Apr 20 - Apr 26, 2025
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b', fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif' }}>
            Generated on Apr 19, 2025 • All Departments
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: { xs: 'center', sm: 'flex-end' } }}>
          <StyledOutlineButton variant="outlined" size="small">
            <Edit sx={{ fontSize: 16 }} />
            Edit
          </StyledOutlineButton>
          <StyledOutlineButton variant="outlined" size="small">
            <Download sx={{ fontSize: 16 }} />
            Export
          </StyledOutlineButton>
          <StyledButton size="small">
            <Check sx={{ fontSize: 16 }} />
            Approve & Publish
          </StyledButton>
        </Box>
      </Box>

      <TableContainer>
        <TableHeader>
          <Box sx={{ display: 'flex', gap: 4, fontWeight: 500, fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif', color: '#1a1a1a' }}>
            <Box sx={{ flex: 1.5 }}>Employee</Box>
            <Box sx={{ flex: 1 }}>Department</Box>
            <Box sx={{ flex: 1 }}>Day</Box>
            <Box sx={{ flex: 1 }}>Date</Box>
            <Box sx={{ flex: 1 }}>Time</Box>
            <Box sx={{ flex: 1, textAlign: 'right' }}>Actions</Box>
          </Box>
        </TableHeader>
        {scheduledShifts.map((shift) => (
          <TableRow key={shift.id}>
            <Box sx={{ flex: 1.5, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ width: 32, height: 32 }}>
                <img src={shift.employee.avatar || '/placeholder.svg'} alt={shift.employee.name} />
                <Typography sx={{ fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif' }}>{shift.employee.initials}</Typography>
              </Avatar>
              <Typography sx={{ fontWeight: 500, fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif' }}>
                {shift.employee.name}
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif' }}>{shift.department}</Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontWeight: 500, fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif' }}>{shift.day}</Typography>
            </Box>
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
              <CalendarToday sx={{ fontSize: 16, color: '#64748b' }} />
              <Typography sx={{ fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif' }}>{shift.date}</Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif' }}>
                {shift.startTime} - {shift.endTime}
              </Typography>
            </Box>
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <StyledIconButton variant="text">
                <Edit sx={{ fontSize: 16 }} />
              </StyledIconButton>
              <StyledIconButton variant="text">
                <Delete sx={{ fontSize: 16 }} />
              </StyledIconButton>
            </Box>
          </TableRow>
        ))}
      </TableContainer>
    </Container>
  );
}