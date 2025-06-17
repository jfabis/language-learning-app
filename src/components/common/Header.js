import React from 'react';
import { AppBar, Toolbar, Typography, Box, useTheme, alpha } from '@mui/material';
import { School } from '@mui/icons-material';
// SPRAWDŹ TEN IMPORT - czy ścieżka jest poprawna
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const theme = useTheme();

  return (
    <AppBar 
      position="static" 
      sx={{
        backgroundImage: 'none',
        backdropFilter: 'blur(10px)',
        backgroundColor: alpha(theme.palette.background.paper, 0.8),
        boxShadow: theme.palette.mode === 'dark' 
          ? '0 2px 10px rgba(0, 0, 0, 0.5)' 
          : '0 2px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Toolbar>
        <School sx={{ fontSize: 32, mr: 2, color: theme.palette.primary.main }} />
        <Typography 
          variant="h5" 
          component="div" 
          sx={{ 
            flexGrow: 1,
            fontWeight: 700,
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          LinguaLearn
        </Typography>
        <Box>
          <ThemeToggle />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
