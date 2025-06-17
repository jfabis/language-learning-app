import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
  Chip,
  LinearProgress,
  useTheme,
  alpha,
  Collapse
} from '@mui/material';
import {
  Dashboard,
  MenuBook,
  Quiz,
  Person,
  EmojiEvents,
  TrendingUp,
  Language,
  Star,
  ExpandLess,
  ExpandMore
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';

const Navigation = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [languagesOpen, setLanguagesOpen] = useState(false);

  const drawerWidth = 280;

  const mainMenuItems = [
    { text: 'Panel główny', icon: <Dashboard />, path: '/', color: theme.palette.primary.main },
    { text: 'Lekcje', icon: <MenuBook />, path: '/lessons', color: theme.palette.success.main },
    { text: 'Quiz', icon: <Quiz />, path: '/quiz', color: theme.palette.warning.main },
    { text: 'Postępy', icon: <TrendingUp />, path: '/progress', color: theme.palette.info.main },
    { text: 'Osiągnięcia', icon: <EmojiEvents />, path: '/achievements', color: theme.palette.secondary.main },
  ];

  const languages = [
    { name: 'Angielski', flag: '🇺🇸', progress: 75, level: 'B2' },
    { name: 'Hiszpański', flag: '🇪🇸', progress: 45, level: 'A2' },
    { name: 'Francuski', flag: '🇫🇷', progress: 20, level: 'A1' },
  ];

  const handleLanguagesClick = () => {
    setLanguagesOpen(!languagesOpen);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: theme.palette.background.paper,
          borderRight: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          backgroundImage: 'none',
        },
      }}
    >
      <Box sx={{ overflow: 'auto', height: '100%', p: 2 }}>
        {/* Profil użytkownika */}
        <Box
          sx={{
            p: 3,
            mb: 2,
            borderRadius: 3,
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box
              sx={{
                width: 50,
                height: 50,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2
              }}
            >
              <Person sx={{ color: 'white', fontSize: 24 }} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Jasiek
              </Typography>
              <Chip
                icon={<Star sx={{ fontSize: 16 }} />}
                label="Premium"
                size="small"
                sx={{
                  backgroundColor: alpha(theme.palette.warning.main, 0.2),
                  color: theme.palette.warning.main,
                  fontWeight: 600
                }}
              />
            </Box>
          </Box>
          
          <Box sx={{ mb: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Poziom 12
              </Typography>
              <Typography variant="body2" color="text.secondary">
                1,247 / 1,500 XP
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={83}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: alpha(theme.palette.primary.main, 0.2),
                '& .MuiLinearProgress-bar': {
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  borderRadius: 4,
                }
              }}
            />
          </Box>
        </Box>

        {/* Menu główne */}
        <List sx={{ mb: 2 }}>
          {mainMenuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => navigate(item.path)}
                selected={location.pathname === item.path}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  '&.Mui-selected': {
                    backgroundColor: alpha(item.color, 0.15),
                    '&:hover': {
                      backgroundColor: alpha(item.color, 0.2),
                    },
                    '& .MuiListItemIcon-root': {
                      color: item.color,
                    },
                    '& .MuiListItemText-primary': {
                      color: item.color,
                      fontWeight: 600,
                    }
                  },
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.action.hover, 0.1),
                  }
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {React.cloneElement(item.icon, {
                    sx: { 
                      fontSize: 22,
                      color: location.pathname === item.path ? item.color : theme.palette.text.secondary
                    }
                  })}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: location.pathname === item.path ? 600 : 400,
                    fontSize: '0.95rem'
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2, opacity: 0.3 }} />

        {/* Sekcja języków */}
        <ListItem disablePadding>
          <ListItemButton onClick={handleLanguagesClick} sx={{ borderRadius: 2 }}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <Language sx={{ fontSize: 22, color: theme.palette.text.secondary }} />
            </ListItemIcon>
            <ListItemText 
              primary="Moje języki"
              primaryTypographyProps={{ fontWeight: 500, fontSize: '0.95rem' }}
            />
            {languagesOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>

        <Collapse in={languagesOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 2 }}>
            {languages.map((lang) => (
              <ListItem key={lang.name} disablePadding sx={{ mb: 1 }}>
                <Box
                  sx={{
                    width: '100%',
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: alpha(theme.palette.background.default, 0.5),
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography sx={{ fontSize: 20, mr: 1 }}>{lang.flag}</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500, flexGrow: 1 }}>
                      {lang.name}
                    </Typography>
                    <Chip
                      label={lang.level}
                      size="small"
                      sx={{
                        backgroundColor: alpha(theme.palette.info.main, 0.2),
                        color: theme.palette.info.main,
                        fontWeight: 600,
                        fontSize: '0.7rem'
                      }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={lang.progress}
                      sx={{
                        flexGrow: 1,
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: alpha(theme.palette.text.secondary, 0.1),
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: theme.palette.success.main,
                          borderRadius: 3,
                        }
                      }}
                    />
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                      {lang.progress}%
                    </Typography>
                  </Box>
                </Box>
              </ListItem>
            ))}
          </List>
        </Collapse>

        {/* Profil na dole */}
        <Box sx={{ mt: 'auto', pt: 2 }}>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => navigate('/profile')}
              selected={location.pathname === '/profile'}
              sx={{
                borderRadius: 2,
                '&.Mui-selected': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.15),
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <Person sx={{ fontSize: 22, color: theme.palette.text.secondary }} />
              </ListItemIcon>
              <ListItemText 
                primary="Profil"
                primaryTypographyProps={{ fontWeight: 500, fontSize: '0.95rem' }}
              />
            </ListItemButton>
          </ListItem>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Navigation;
