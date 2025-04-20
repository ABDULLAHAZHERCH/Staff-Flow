"use client";
import React from 'react';
import { SignInForm } from '@/components/auth/sign-in-form';
import Image from 'next/image';
import Link from 'next/link';
import { Container, Box, AppBar, Toolbar, Typography, styled } from '@mui/material';

const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white',
}));

const Header = styled(AppBar)(({ theme }) => ({
  borderBottom: '1px solid #e2e8f0',
  padding: theme.spacing(2, 0),
  backgroundColor: 'white',
  boxShadow: 'none',
  position: 'static',
}));

const HeaderContent = styled(Container)(({ theme }) => ({
  maxWidth: '1200px',
  padding: theme.spacing(0, 3),
  margin: '0 auto',
}));

const Logo = styled('a')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  textDecoration: 'none',
  color: '#333', // LogoText color from original
  transition: 'color 0.2s ease-in-out', // From global.css
  '&:hover': {
    color: '#c61111', // Hover color from global.css
  },
}));

const LogoText = styled(Typography)(({ theme }) => ({
  fontFamily: '"Poppins", "Inter", "Arial", sans-serif',
  fontWeight: 700,
  fontSize: '1.5rem',
  color: 'inherit', // Inherits from Logo
}));

const Main = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4),
}));

const FormContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '420px',
  '& > *': {
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)', // Shadow from global.css for form elements
    transition: 'box-shadow 0.2s ease-in-out',
    '&:focus-within': {
      boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)', // Focus shadow from global.css
    },
  },
}));

const Footer = styled(Box)(({ theme }) => ({
  borderTop: '1px solid #e2e8f0',
  padding: theme.spacing(2, 0),
  textAlign: 'center',
  color: '#64748b',
  fontSize: '0.875rem',
  fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
  backgroundColor: 'white',
}));

const SignInPage: React.FC = () => {
  return (
    <PageContainer>
      <Header>
        <HeaderContent maxWidth={false}>
          <Link href="/" passHref legacyBehavior>
            <Logo>
              <Image src="/logo.png" alt="StaffFlow Logo" width={32} height={32} />
              <LogoText>StaffFlow</LogoText>
            </Logo>
          </Link>
        </HeaderContent>
      </Header>

      <Main>
        <FormContainer>
          <SignInForm />
        </FormContainer>
      </Main>

      <Footer>
        <Typography variant="body2">
          © 2025 StaffFlow. All rights reserved.
        </Typography>
      </Footer>
    </PageContainer>
  );
};

export default SignInPage;