import React from 'react';
import { Grid, Box, Typography, useTheme, Container } from '@mui/material';
import {
  Star,
  TrendingUp,
  LocalFireDepartment,
  EmojiEvents,
  Speed,
  Timeline
} from '@mui/icons-material';
import StatsCard from '../components/dashboard/StatsCard';
import RecentActivity from '../components/dashboard/RecentActivity';
import LanguageSelector from '../components/dashboard/LanguageSelector';

const Dashboard = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ 
          fontWeight: 700, 
          mb: 4,
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Panel główny
      </Typography>
      
      <Grid container spacing={3}>
        {/* Karty statystyk */}
        <Grid item xs={12} sm={6} md={4}>
          <StatsCard
            title="Punkty XP"
            value="1,247"
            subtitle="Zdobyte punkty w tym miesiącu"
            trend="up"
            trendValue={12}
            icon={Star}
            color="primary"
            progress={75}
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <StatsCard
            title="Poziom"
            value="12"
            subtitle="Aktualny poziom użytkownika"
            trend="up"
            trendValue={5}
            icon={TrendingUp}
            color="secondary"
            progress={83}
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <StatsCard
            title="Seria dni"
            value="7"
            subtitle="Dni nauki z rzędu"
            trend="up"
            trendValue={3}
            icon={LocalFireDepartment}
            color="warning"
            progress={90}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <StatsCard
            title="Osiągnięcia"
            value="24"
            subtitle="Odblokowane osiągnięcia"
            trend="up"
            trendValue={8}
            icon={EmojiEvents}
            color="success"
            progress={60}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <StatsCard
            title="Średnia prędkość"
            value="95%"
            subtitle="Dokładność odpowiedzi"
            trend="up"
            trendValue={2}
            icon={Speed}
            color="info"
            progress={95}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <StatsCard
            title="Czas nauki"
            value="2.5h"
            subtitle="W tym tygodniu"
            trend="up"
            trendValue={15}
            icon={Timeline}
            color="error"
            progress={50}
          />
        </Grid>

        {/* Selektor języków */}
        <Grid item xs={12} lg={8}>
          <LanguageSelector />
        </Grid>

        {/* Ostatnia aktywność */}
        <Grid item xs={12} lg={4}>
          <RecentActivity />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
