import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import StatsCard from '../components/dashboard/StatsCard';
import RecentActivity from '../components/dashboard/RecentActivity';
import LanguageSelector from '../components/dashboard/LanguageSelector';

const Dashboard = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>Panel główny</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <LanguageSelector />
        </Grid>
        <Grid item xs={12} md={4}>
          <RecentActivity activities={[]} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
