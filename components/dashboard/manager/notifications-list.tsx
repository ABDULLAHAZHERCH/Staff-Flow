'use client';

import React, { useState } from 'react';
import { Box, Typography, Avatar, Chip, Button, styled } from '@mui/material';
import { Person, Message, CalendarToday, AccessTime, Star, Delete, PersonAdd, CheckCircle } from '@mui/icons-material';

type Notification = {
  id: number;
  title: string;
  message: string;
  time: string;
  date: string;
  read: boolean;
  important: boolean;
  type: 'shift_request' | 'message' | 'system' | 'schedule';
  user?: { name: string; avatar: string; initials: string };
};

const notifications: Notification[] = [
  {
    id: 1,
    title: 'Shift Request',
    message: 'Jane Smith has requested a shift change for Monday, April 20.',
    time: '10:30 AM',
    date: '2025-04-19',
    read: false,
    important: true,
    type: 'shift_request',
    user: { name: 'Jane Smith', avatar: '/placeholder.svg?height=40&width=40', initials: 'JS' },
  },
  {
    id: 2,
    title: 'New Message',
    message: 'Mike Johnson sent you a message about his upcoming shift.',
    time: 'Yesterday',
    date: '2025-04-18',
    read: false,
    important: false,
    type: 'message',
    user: { name: 'Mike Johnson', avatar: '/placeholder.svg?height=40&width=40', initials: 'MJ' },
  },
  {
    id: 3,
    title: 'Schedule Published',
    message: 'The schedule for April 20-26 has been published.',
    time: '2 days ago',
    date: '2025-04-17',
    read: true,
    important: true,
    type: 'schedule',
  },
  {
    id: 4,
    title: 'System Notification',
    message: 'Your subscription will renew in 7 days.',
    time: '3 days ago',
    date: '2025-04-16',
    read: true,
    important: false,
    type: 'system',
  },
  {
    id: 5,
    title: 'New Employee',
    message: 'Sarah Williams has been added to your team.',
    time: '1 week ago',
    date: '2025-04-12',
    read: true,
    important: false,
    type: 'system',
    user: { name: 'Sarah Williams', avatar: '/placeholder.svg?height=40&width=40', initials: 'SW' },
  },
];

const NotificationContainer = styled(Box)<{ read?: boolean }>(({ theme, read }) => ({
  marginBottom: theme.spacing(2),
  border: '1px solid #e2e8f0', // From global.css
  borderRadius: '0.5rem',
  padding: theme.spacing(2),
  backgroundColor: read ? 'white' : '#f8fafc', // Unread background
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)', // From global.css
  transition: 'all 0.2s ease',
  '&:hover': {
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)', // Hover shadow
  },
}));

const NotificationIcon = styled(Box)(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f1f5f9', // Light background
  color: '#1a1a1a',
  marginRight: theme.spacing(2),
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
  gap: theme.spacing(0.5),
  fontSize: '0.75rem',
  padding: theme.spacing(0.75, 1.5),
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
  fontSize: '0.75rem',
  padding: theme.spacing(0.75, 1.5),
}));

const ActionButton = styled(Button)(({ theme }) => ({
  minWidth: 'auto',
  padding: theme.spacing(0.5),
  color: '#64748b', // Muted color
  '&:hover': {
    color: '#1a1a1a', // Body color
  },
  '&.important': {
    color: '#f59e0b', // Amber for important
  },
}));

const EmptyState = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(4),
  color: '#64748b', // Muted color
  fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
}));

export function ManagerNotificationsList({ filter = 'all' }: { filter?: 'all' | 'unread' | 'important' }) {
  const [notificationState, setNotificationState] = useState(notifications);

  const filteredNotifications = notificationState.filter((notification) => {
    if (filter === 'unread') return !notification.read;
    if (filter === 'important') return notification.important;
    return true;
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'shift_request':
        return <Person sx={{ fontSize: 20, color: '#3b82f6' }} />;
      case 'message':
        return <Message sx={{ fontSize: 20, color: '#16a34a' }} />;
      case 'schedule':
        return <CalendarToday sx={{ fontSize: 20, color: '#9333ea' }} />;
      case 'system':
        return <AccessTime sx={{ fontSize: 20, color: '#f97316' }} />;
      default:
        return <Message sx={{ fontSize: 20 }} />;
    }
  };

  const toggleImportant = (id: number) => {
    setNotificationState(
      notificationState.map((notification) =>
        notification.id === id ? { ...notification, important: !notification.important } : notification
      )
    );
  };

  const deleteNotification = (id: number) => {
    setNotificationState(notificationState.filter((notification) => notification.id !== id));
  };

  const markAsRead = (id: number) => {
    setNotificationState(
      notificationState.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  return (
    <Box>
      {filteredNotifications.length === 0 ? (
        <EmptyState>No notifications found</EmptyState>
      ) : (
        filteredNotifications.map((notification) => (
          <NotificationContainer
            key={notification.id}
            read={notification.read}
            onClick={() => markAsRead(notification.id)}
          >
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box>
                {notification.user ? (
                  <Avatar sx={{ width: 40, height: 40 }}>
                    <img src={notification.user.avatar || '/placeholder.svg'} alt={notification.user.name} />
                    <Typography sx={{ fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif' }}>
                      {notification.user.initials}
                    </Typography>
                  </Avatar>
                ) : (
                  <NotificationIcon>{getNotificationIcon(notification.type)}</NotificationIcon>
                )}
              </Box>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 500, color: '#333', fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif' }}
                    >
                      {notification.title}
                    </Typography>
                    {!notification.read && (
                      <Chip label="New" sx={{ bgcolor: '#03306b', color: 'white', fontSize: '0.75rem', height: 24 }} />
                    )}
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <ActionButton
                      className={notification.important ? 'important' : ''}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleImportant(notification.id);
                      }}
                    >
                      <Star sx={{ fontSize: 16 }} />
                    </ActionButton>
                    <ActionButton
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notification.id);
                      }}
                    >
                      <Delete sx={{ fontSize: 16 }} />
                    </ActionButton>
                  </Box>
                </Box>
                <Typography
                  sx={{ fontSize: '0.875rem', color: '#4a5568', mb: 1.5, lineHeight: 1.5, fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif' }}
                >
                  {notification.message}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography sx={{ fontSize: '0.75rem', color: '#64748b', fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif' }}>
                    {notification.time}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {notification.type === 'shift_request' && (
                      <>
                        <StyledOutlineButton>Decline</StyledOutlineButton>
                        <StyledButton>
                          <PersonAdd sx={{ fontSize: 12 }} />
                          Approve
                        </StyledButton>
                      </>
                    )}
                    {notification.type === 'message' && (
                      <StyledButton>
                        <Message sx={{ fontSize: 12 }} />
                        Reply
                      </StyledButton>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          </NotificationContainer>
        ))
      )}
    </Box>
  );
}