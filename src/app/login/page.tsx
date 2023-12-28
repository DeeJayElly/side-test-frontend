'use client';

import React from 'react';
import { Container, Button, Typography, Box } from '@mui/material';
import { connectWallet } from '@/app/services/auth.service';
import { useRouter } from 'next/navigation';
import useStore, { StoreActions, StoreState } from '../state/store';

const Login: React.FC = () => {
  const setUser = useStore((state: StoreState & StoreActions) => state.setUser);
  const router = useRouter();

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={() => connectWallet(setUser, router)}
        >
          Connect Wallet
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
