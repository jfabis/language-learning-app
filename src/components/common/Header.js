import React, { useState } from 'react';
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
  Tooltip,
  LinearProgress,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import {
  School,
  Notifications,
  Settings,
  Person,
  LocalFireDepartment,
  ExitToApp,
  Star,
  AccountCircle,
  Palette,
  VolumeUp,
  Help,
  Logout
} from '@mui/icons-material';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const theme = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [settingsAnchor, setSettingsAnchor] = useState(null);

  // Dane użytkownika z wartościami domyślnymi
  const currentLevel = 12;
  const currentXP = 1247;
  const nextLevelXP = 1500;
  const streakDays = 7;
  const xpProgress = (currentXP / nextLevelXP) * 100;

  const handleSettingsClose = () => {
    setSettingsAnchor(null);
  };

  const handleLogout = () => {
    logout();
    handleSettingsClose();
  };

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
        zIndex: 1300
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', py: 1, minHeight: '64px !important' }}>
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
                fontSize: 28, 
                color: theme.palette.primary.main,
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
              }} 
            />
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                fontWeight: 800,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em'
              }}
            >
              KappaLingo
            </Typography>
          </Box>

          {/* Minimalistyczny Streak Counter */}
          <Chip
            icon={<LocalFireDepartment sx={{ color: '#ff6b35 !important', fontSize: 18 }} />}
            label={`${streakDays} dni`}
            size="small"
            sx={{
              backgroundColor: alpha('#ff6b35', 0.15),
              color: '#ff6b35',
              fontWeight: 600,
              border: `1px solid ${alpha('#ff6b35', 0.3)}`,
              '& .MuiChip-icon': {
                color: '#ff6b35'
              }
            }}
          />
        </Box>

        {/* Środkowa sekcja - Minimalistyczny Pasek Poziomu */}
        <Box sx={{ 
          display: { xs: 'none', md: 'flex' }, 
          flexDirection: 'column',
          alignItems: 'center',
          width: 300,
          mx: 2
        }}>
          {/* Kompaktowy Level Badge */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Star sx={{ color: theme.palette.secondary.main, fontSize: 16 }} />
            <Typography 
              variant="body2" 
              sx={{ 
                fontWeight: 700, 
                color: theme.palette.secondary.main
              }}
            >
              Level {currentLevel}
            </Typography>
          </Box>

          {/* Minimalistyczny Progress Bar - BEZ KROPKI */}
          <Box sx={{ width: '100%', mb: 0.5 }}>
            <LinearProgress
              variant="determinate"
              value={xpProgress}
              sx={{
                height: 6,
                borderRadius: 3,
                backgroundColor: alpha(theme.palette.secondary.main, 0.2),
                '& .MuiLinearProgress-bar': {
                  background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                  borderRadius: 3,
                }
              }}
            />
          </Box>
          
          {/* Kompaktowy XP Counter */}
          <Typography variant="caption" sx={{ 
            fontWeight: 600, 
            color: theme.palette.text.secondary,
            fontSize: '0.7rem'
          }}>
            {currentXP.toLocaleString()} / {nextLevelXP.toLocaleString()} XP
          </Typography>
        </Box>

        {/* Prawa sekcja - Minimalistyczne Akcje */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ThemeToggle />
          
          <Tooltip title="Powiadomienia">
            <IconButton 
              size="small"
              sx={{ 
                color: theme.palette.text.primary,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.1)
                }
              }}
            >
              <Notifications fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Ustawienia">
            <IconButton 
              size="small"
              onClick={(e) => setSettingsAnchor(e.currentTarget)}
              sx={{ 
                color: theme.palette.text.primary,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.1)
                }
              }}
            >
              <Settings fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Wyloguj się">
            <IconButton 
              size="small"
              onClick={logout}
              sx={{ 
                color: theme.palette.text.primary,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.error.main, 0.1),
                  color: theme.palette.error.main
                }
              }}
            >
              <ExitToApp fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title={`${user?.firstName || 'Użytkownik'} ${user?.lastName || ''}`}>
            <Avatar
              onClick={() => navigate('/profile')}
              sx={{
                width: 32,
                height: 32,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                cursor: 'pointer',
                transition: 'transform 0.2s',
                fontSize: '0.9rem',
                '&:hover': {
                  transform: 'scale(1.05)'
                }
              }}
            >
              {user?.firstName ? user.firstName.charAt(0).toUpperCase() : <Person />}
            </Avatar>
          </Tooltip>
        </Box>
      </Toolbar>

      {/* Proste Settings Menu */}
      <Menu
        anchorEl={settingsAnchor}
        open={Boolean(settingsAnchor)}
        onClose={handleSettingsClose}
        PaperProps={{
          sx: {
            width: 200,
            borderRadius: 2,
          }
        }}
      >
        <MenuItem onClick={() => { navigate('/profile'); handleSettingsClose(); }}>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary="Profil" />
        </MenuItem>
        <MenuItem onClick={handleSettingsClose}>
          <ListItemIcon>
            <Palette />
          </ListItemIcon>
          <ListItemText primary="Wygląd" />
        </MenuItem>
        <MenuItem onClick={handleSettingsClose}>
          <ListItemIcon>
            <VolumeUp />
          </ListItemIcon>
          <ListItemText primary="Dźwięk" />
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleSettingsClose}>
          <ListItemIcon>
            <Help />
          </ListItemIcon>
          <ListItemText primary="Pomoc" />
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout} sx={{ color: theme.palette.error.main }}>
          <ListItemIcon sx={{ color: theme.palette.error.main }}>
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Wyloguj się" />
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Header;
