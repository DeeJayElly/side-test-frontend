'use client';

import React, { useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Avatar,
} from '@mui/material';
import useStore, { StoreActions, StoreState } from './state/store';
import { TrackedProject } from '@/app/types';
import useAuth from '@/app/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { fetchUserDashboard } from '@/app/services/project.service';

const Dashboard: React.FC = () => {
  useAuth();

  const router = useRouter();

  const user = useStore((state: StoreState & StoreActions) => state.user);
  const setUser = useStore((state: StoreState & StoreActions) => state.setUser);
  const trackedProjects = useStore(
    (state: StoreState & StoreActions) => state.trackedProjects,
  );
  const setTrackedProjects = useStore(
    (state: StoreState & StoreActions) => state.setTrackedProjects,
  );

  const handleDisconnect = () => {
    // Clear token
    localStorage.removeItem('accessToken');
    // Reset user state
    setUser({ address: null, isAuthenticated: false, userId: null });
    // Redirect to login
    router.push('/login');
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      fetchUserDashboard(accessToken)
        .then((projects) => {
          setTrackedProjects(projects);
        })
        .catch((error) => console.error(error));
    }
  }, [setTrackedProjects]);

  return (
    <Container maxWidth="lg">
      <Typography component="h1" variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="subtitle1">
        Wallet Address: {user?.address}
      </Typography>
      <Button
        variant="outlined"
        color="error"
        onClick={() => handleDisconnect()}
      >
        Disconnect
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => router.push('/track-project')}
      >
        Track New Project
      </Button>
      <Grid container spacing={2}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Logo</TableCell>
              <TableCell>Bookmarked</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trackedProjects.map((project: TrackedProject) => (
              <TableRow key={project.id}>
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.price}</TableCell>
                <TableCell>
                  <Avatar
                    alt={project.name}
                    src={project.logo}
                    sx={{ width: 56, height: 56 }}
                  />
                </TableCell>
                <TableCell>{project.isBookmarked ? 'Yes' : 'No'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </Container>
  );
};

export default Dashboard;
