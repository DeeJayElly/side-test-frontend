'use client';

import React from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
} from '@mui/material';
import useStore, { StoreActions, StoreState } from './state/store';
import { TrackedProject } from '@/app/types';
import useAuth from '@/app/hooks/useAuth';

const Dashboard: React.FC = () => {
  useAuth();

  const user = useStore((state: StoreState & StoreActions) => state.user);
  const trackedProjects = useStore(
    (state: StoreState & StoreActions) => state.trackedProjects,
  );

  return (
    <Container maxWidth="lg">
      <Typography component="h1" variant="h4" gutterBottom>
        Dashboard
      </Typography>
      {/* Display user info and a disconnect button */}
      <Typography variant="subtitle1">
        Wallet Address: {user?.address}
      </Typography>
      <Button
        variant="outlined"
        color="error"
        onClick={() => {
          /* Disconnect logic */
        }}
      >
        Disconnect
      </Button>
      {/* Display tracked projects */}
      <Grid container spacing={2}>
        {trackedProjects.map((project: TrackedProject) => (
          <Grid item xs={12} sm={6} md={4} key={project.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {project.name}
                </Typography>
                {/* Display logo and price/floor price */}
                <Typography color="textSecondary">
                  Price: {project.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
