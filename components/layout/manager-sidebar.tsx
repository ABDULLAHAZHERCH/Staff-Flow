'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Box, Typography, Avatar, List, ListItemButton, ListItemIcon, ListItemText, Divider, IconButton,
  Menu, MenuItem, styled, Badge, AppBar, Toolbar
} from '@mui/material';
import {
  Notifications, ArrowDropDown, Assignment, CreditCard, Home, Logout, Settings, AutoAwesome, Person, People
} from '@mui/icons-material';

const AppContainer = styled(Box)({
  display: 'flex',
  height: '100vh',
  width: '100%',
  overflow: 'hidden',
});

const Sidebar = styled(Box)(({ theme }) => ({
  width: '250px',
  backgroundColor: 'white',
  borderRight: '1px solid #e2e8f0', // From global.css
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  position: 'sticky',
  top: 0,
  zIndex: 20,
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)', // From global.css
  [theme.breakpoints.down('md')]: {
    position: 'fixed',
    left: 0,
  },
}));

const SidebarHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: '1px solid #e2e8f0', // From global.css
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  backgroundColor: 'white',
  color: '#1a1a1a', // Body color
}));

const LogoContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  overflow: 'hidden',
  width: '100%',
  justifyContent: 'flex-start',
});

const LogoText = styled(Typography)({
  fontFamily: '"Poppins", "Inter", "Arial", sans-serif',
  fontWeight: 600,
  fontSize: '1.25rem',
  color: '#1a1a1a', // Body color
  whiteSpace: 'nowrap',
});

const SidebarContent = styled(Box)({
  flex: 1,
  overflowY: 'auto',
  padding: '1rem 0',
});

const SidebarSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0, 1),
}));

const SidebarLabel = styled(Typography)({
  fontSize: '0.75rem',
  fontWeight: 500,
  color: '#64748b', // Muted color
  marginBottom: '0.5rem',
  paddingLeft: '0.5rem',
  fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
});

const NavItem = styled(ListItemButton)<{ active: boolean }>(({ active, theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  padding: theme.spacing(1.5, 2),
  color: active ? '#03306b' : '#1a1a1a', // Primary/Body colors
  transition: 'all 0.2s ease',
  borderRadius: '0.375rem',
  marginBottom: '0.25rem',
  fontWeight: active ? 500 : 400,
  justifyContent: 'flex-start',
  position: 'relative',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)', // From global.css
  '&:hover': {
    backgroundColor: '#f1f5f9', // Muted/10 equivalent
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)', // From global.css
  },
  ...(active && {
    backgroundColor: '#f1f5f9',
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: '50%',
      transform: 'translateY(-50%)',
      width: '4px',
      height: '70%',
      backgroundColor: '#03306b', // Primary color
      borderRadius: '0 4px 4px 0',
    },
  }),
}));

const NavItemText = styled(ListItemText)({
  whiteSpace: 'nowrap',
  '& .MuiTypography-root': {
    fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
    fontSize: '0.875rem',
  },
});

const SidebarFooter = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid #e2e8f0', // From global.css
  backgroundColor: '#f8fafc', // Light background
  display: 'flex',
  justifyContent: 'flex-start',
}));

const DropdownButton = styled(IconButton)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  width: '100%',
  padding: theme.spacing(1.5),
  backgroundColor: 'white',
  border: '1px solid #e2e8f0', // From global.css
  borderRadius: '0.375rem',
  justifyContent: 'flex-start',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)', // From global.css
  '&:hover': {
    backgroundColor: '#f1f5f9', // Muted/10 equivalent
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)', // From global.css
  },
}));

const UserInfo = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  flex: 1,
});

const UserName = styled(Typography)({
  fontSize: '0.875rem',
  fontWeight: 500,
  color: '#1a1a1a', // Body color
  fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
});

const UserEmail = styled(Typography)({
  fontSize: '0.75rem',
  color: '#64748b', // Muted color
  fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
});

const ContentContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  width: '100%',
  overflow: 'hidden',
  backgroundColor: 'white',
});

const AppHeader = styled(AppBar)(({ theme }) => ({
  width: '100%',
  backgroundColor: 'white',
  borderBottom: '1px solid #e2e8f0', // From global.css
  padding: theme.spacing(2),
  zIndex: 10,
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)', // From global.css
  position: 'static',
}));

const HeaderTitle = styled(Typography)({
  fontSize: '1.25rem',
  fontWeight: 600,
  color: '#0d1b2a', // Heading color
  fontFamily: '"Poppins", "Inter", "Arial", sans-serif',
});

const HeaderButton = styled(IconButton)(({ theme }) => ({
  width: '2.5rem',
  height: '2.5rem',
  borderRadius: '0.375rem',
  backgroundColor: 'transparent',
  color: '#1a1a1a', // Body color
  transition: 'all 0.2s ease',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)', // From global.css
  '&:hover': {
    backgroundColor: '#f1f5f9', // Muted/10 equivalent
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)', // From global.css
  },
}));

const NotificationBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    top: -5,
    right: -5,
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    backgroundColor: '#c61111', // Secondary color
    color: 'white',
    fontSize: '0.75rem',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 32,
  height: 32,
  backgroundColor: '#03306b', // Primary color
  color: 'white',
  fontWeight: 600,
  fontSize: '0.875rem',
  fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: 'white',
    border: '1px solid #e2e8f0', // From global.css
    borderRadius: '0.375rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // From global.css
    minWidth: '200px',
    marginTop: theme.spacing(0.5),
  },
}));

export function ManagerSidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const handleSignOut = () => {
    router.push('/');
  };

  const handleDropdownOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setIsDropdownOpen(true);
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
    setIsDropdownOpen(false);
  };

  return (
    <AppContainer>
      <Sidebar>
        <SidebarHeader>
          <LogoContainer>
            <Avatar src="/logo.png" sx={{ width: 32, height: 32 }} />
            <LogoText>StaffFlow</LogoText>
          </LogoContainer>
        </SidebarHeader>
        <SidebarContent>
          <SidebarSection>
            <SidebarLabel>MANAGER DASHBOARD</SidebarLabel>
            <List>
              <Link href="/dashboard/manager" style={{ textDecoration: 'none' }}>
                <NavItem active={isActive('/dashboard/manager')}>
                  <ListItemIcon sx={{ minWidth: 0, mr: 1 }}>
                    <Home sx={{ fontSize: 18, color: isActive('/dashboard/manager') ? '#03306b' : '#1a1a1a' }} />
                  </ListItemIcon>
                  <NavItemText primary="Dashboard" />
                </NavItem>
              </Link>
              <Link href="/dashboard/manager/employees" style={{ textDecoration: 'none' }}>
                <NavItem active={isActive('/dashboard/manager/employees')}>
                  <ListItemIcon sx={{ minWidth: 0, mr: 1 }}>
                    <People sx={{ fontSize: 18, color: isActive('/dashboard/manager/employees') ? '#03306b' : '#1a1a1a' }} />
                  </ListItemIcon>
                  <NavItemText primary="Employees" />
                </NavItem>
              </Link>
              <Link href="/dashboard/manager/reports" style={{ textDecoration: 'none' }}>
                <NavItem active={isActive('/dashboard/manager/reports')}>
                  <ListItemIcon sx={{ minWidth: 0, mr: 1 }}>
                    <Assignment sx={{ fontSize: 18, color: isActive('/dashboard/manager/reports') ? '#03306b' : '#1a1a1a' }} />
                  </ListItemIcon>
                  <NavItemText primary="Reports" />
                </NavItem>
              </Link>
              <Link href="/dashboard/manager/payroll" style={{ textDecoration: 'none' }}>
                <NavItem active={isActive('/dashboard/manager/payroll')}>
                  <ListItemIcon sx={{ minWidth: 0, mr: 1 }}>
                    <CreditCard sx={{ fontSize: 18, color: isActive('/dashboard/manager/payroll') ? '#03306b' : '#1a1a1a' }} />
                  </ListItemIcon>
                  <NavItemText primary="Payroll Tracking" />
                </NavItem>
              </Link>
              <Link href="/dashboard/manager/notifications" style={{ textDecoration: 'none' }}>
                <NavItem active={isActive('/dashboard/manager/notifications')}>
                  <ListItemIcon sx={{ minWidth: 0, mr: 1, position: 'relative' }}>
                    <NotificationBadge badgeContent={3}>
                      <Notifications sx={{ fontSize: 18, color: isActive('/dashboard/manager/notifications') ? '#03306b' : '#1a1a1a' }} />
                    </NotificationBadge>
                  </ListItemIcon>
                  <NavItemText primary="Notifications" />
                </NavItem>
              </Link>
              <Link href="/dashboard/manager/ai-scheduling" style={{ textDecoration: 'none' }}>
                <NavItem active={isActive('/dashboard/manager/ai-scheduling')}>
                  <ListItemIcon sx={{ minWidth: 0, mr: 1 }}>
                    <AutoAwesome sx={{ fontSize: 18, color: isActive('/dashboard/manager/ai-scheduling') ? '#03306b' : '#c61111' }} />
                  </ListItemIcon>
                  <NavItemText primary="AI Scheduling" />
                </NavItem>
              </Link>
            </List>
          </SidebarSection>
        </SidebarContent>
        <SidebarFooter>
          <DropdownButton onClick={handleDropdownOpen}>
            <StyledAvatar>M</StyledAvatar>
            <UserInfo>
              <UserName>John Manager</UserName>
              <UserEmail>manager@staffflow.com</UserEmail>
            </UserInfo>
            <ArrowDropDown sx={{ fontSize: 16, ml: 'auto' }} />
          </DropdownButton>
          <StyledMenu
            anchorEl={anchorEl}
            open={isDropdownOpen}
            onClose={handleDropdownClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <Typography
              sx={{
                fontWeight: 500,
                padding: '0.75rem 1rem',
                backgroundColor: '#f8fafc',
                borderBottom: '1px solid #e2e8f0',
                color: '#1a1a1a',
                fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
              }}
            >
              My Account
            </Typography>
            <MenuItem
              component={Link}
              href="/dashboard/manager/profile"
              onClick={handleDropdownClose}
              sx={{ fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif' }}
            >
              <Person sx={{ fontSize: 16, mr: 1 }} />
              Profile
            </MenuItem>
            <MenuItem
              component={Link}
              href="/dashboard/manager/settings"
              onClick={handleDropdownClose}
              sx={{ fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif' }}
            >
              <Settings sx={{ fontSize: 16, mr: 1 }} />
              Settings
            </MenuItem>
            <Divider />
            <MenuItem
              onClick={() => {
                handleSignOut();
                handleDropdownClose();
              }}
              sx={{ color: '#c61111', fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif' }}
            >
              <Logout sx={{ fontSize: 16, mr: 1 }} />
              Sign out
            </MenuItem>
          </StyledMenu>
        </SidebarFooter>
      </Sidebar>
      <ContentContainer>
        <AppHeader>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <HeaderTitle>Manager Dashboard</HeaderTitle>
            </Box>
            <NotificationBadge badgeContent={3}>
              <Link href="/dashboard/manager/notifications">
                <HeaderButton>
                  <Notifications sx={{ fontSize: 20, color: '#1a1a1a' }} />
                </HeaderButton>
              </Link>
            </NotificationBadge>
          </Toolbar>
        </AppHeader>
        <Box component="main" sx={{ flex: 1, overflow: 'auto', p: 3, width: '100%', backgroundColor: 'white' }}>
          {children}
        </Box>
      </ContentContainer>
    </AppContainer>
  );
}