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
import { trackProject } from '@/app/services/project.service';
import { searchByContractAddress } from '@/app/services/etherscan.service';

const TrackProject: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const addProject = useStore(
    (state: StoreState & StoreActions) => state.addProject,
  );
  const router = useRouter();

  const handleTrackProject = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('No access token found');
      }

      // const etherscanResult = await searchTokenOrNFT(searchTerm);
      const projectData = await searchByContractAddress(searchTerm);

      const newProject = await trackProject(projectData, accessToken);
      addProject(newProject); // Update the store with the new project
      router.push('/'); // Redirect to the dashboard
    } catch (error) {
      console.error('Error tracking project:', error);
    }
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
