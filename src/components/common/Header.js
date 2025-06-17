import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  Chip,
  useTheme,
  alpha,
  Stack
} from '@mui/material';
import {
  School,
  Notifications,
  Settings,
  Person,
  EmojiEvents,
  LocalFireDepartment
} from '@mui/icons-material';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const theme = useTheme();

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{
        backgroundImage: 'none',
        backgroundColor: alpha(theme.palette.background.paper, 0.95),
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        boxShadow: theme.palette.mode === 'dark' 
          ? '0 4px 20px rgba(0, 0, 0, 0.3)' 
          : '0 4px 20px rgba(0, 0, 0, 0.08)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
        {/* Logo i Nazwa */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              p: 1,
              borderRadius: 2,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}20, ${theme.palette.secondary.main}20)`,
            }}
          >
            <School 
              sx={{ 
                fontSize: 32, 
                color: theme.palette.primary.main,
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
              }} 
            />
            <Typography 
              variant="h5" 
              component="div" 
              sx={{ 
                fontWeight: 800,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em'
              }}
            >
              LinguaLearn
            </Typography>
          </Box>

          {/* Streak Counter */}
          <Chip
            icon={<LocalFireDepartment sx={{ color: '#ff6b35 !important' }} />}
            label="7 dni"
            size="small"
            sx={{
              backgroundColor: alpha('#ff6b35', 0.1),
              color: '#ff6b35',
              fontWeight: 600,
              '& .MuiChip-icon': {
                color: '#ff6b35'
              }
            }}
          />
        </Box>

        {/* Środkowa sekcja - Statystyki */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 3 }}>
          <Stack direction="row" spacing={2}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
                1,247
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Punkty
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.secondary.main }}>
                Level 12
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Poziom
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* Prawa sekcja - Akcje użytkownika */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ThemeToggle />
          
          <IconButton 
            sx={{ 
              color: theme.palette.text.primary,
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.1)
              }
            }}
          >
            <Notifications />
          </IconButton>

          <IconButton 
            sx={{ 
              color: theme.palette.text.primary,
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.1)
              }
            }}
          >
            <Settings />
          </IconButton>

          <Avatar
            sx={{
              width: 40,
              height: 40,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}
          >
            <Person />
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
