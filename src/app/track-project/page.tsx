'use client';

import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Box,
} from '@mui/material';
import useStore, { StoreActions, StoreState } from '../state/store';
import { useRouter } from 'next/navigation';

const TrackProject: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const addProject = useStore(
    (state: StoreState & StoreActions) => state.addProject,
  );
  const router = useRouter();

  const handleTrackProject = () => {
    // Replace with actual project tracking logic
    // This should involve searching for the project by name or contract address
    // and then adding it to the trackedProjects state.

    // For now, we'll just simulate adding a project.
    const newProject = {
      id: Date.now().toString(),
      name: searchTerm,
      logo: '', // Replace with actual logo url
      price: 0, // Replace with actual price
      isToken: true, // Determine based on the project type
      isBookmarked: isBookmarked,
    };
    addProject(newProject);
    router.push('/');
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Track Project</FormLabel>
          <TextField
            fullWidth
            label="Search by name or contract address"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mb: 2 }}
          />
          <RadioGroup
            row
            value={isBookmarked}
            onChange={(e) => setIsBookmarked(e.target.value === 'true')}
          >
            <FormControlLabel
              value={true}
              control={<Radio />}
              label="Bookmark"
            />
            <FormControlLabel
              value={false}
              control={<Radio />}
              label="Don't Bookmark"
            />
          </RadioGroup>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleTrackProject}
            disabled={!searchTerm}
          >
            Add Project
          </Button>
        </FormControl>
      </Box>
    </Container>
  );
};

export default TrackProject;
