import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

const UserProfile = () => {
  return (
    <Paper sx={{ p: 3, m: 2 }}>
      <Typography variant="h5">User Profile</Typography>
      <Box sx={{ mt: 2 }}>
        <Typography>Profile content will go here</Typography>
      </Box>
    </Paper>
  );
};

export default UserProfile;