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
  Collapse,
  Avatar
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
  ExpandMore,
  Flag
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navigation = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [languagesOpen, setLanguagesOpen] = useState(false);

  const drawerWidth = 280;

  const mainMenuItems = [
    { text: 'Panel główny', icon: <Dashboard />, path: '/', color: theme.palette.primary.main },
    { text: 'Lekcje', icon: <MenuBook />, path: '/lessons', color: theme.palette.success.main },
    { text: 'Quiz', icon: <Quiz />, path: '/quiz', color: theme.palette.warning.main },
    { text: 'Postępy', icon: <TrendingUp />, path: '/progress', color: theme.palette.info.main },
    { text: 'Osiągnięcia', icon: <EmojiEvents />, path: '/achievements', color: theme.palette.secondary.main },
    { text: 'Profil', icon: <Person />, path: '/profile', color: theme.palette.text.primary }
  ];

  // Profesjonalna lista języków z danymi
  const languages = [
    { 
      name: 'Angielski', 
      flag: '🇺🇸', 
      progress: 75, 
      level: 'B2',
      color: theme.palette.primary.main,
      lessonsCompleted: 90,
      totalLessons: 120,
      xp: 1247,
      isActive: true
    },
    { 
      name: 'Hiszpański', 
      flag: '🇪🇸', 
      progress: 45, 
      level: 'A2',
      color: theme.palette.warning.main,
      lessonsCompleted: 36,
      totalLessons: 80,
      xp: 634,
      isActive: true
    },
    { 
      name: 'Francuski', 
      flag: '🇫🇷', 
      progress: 20, 
      level: 'A1',
      color: theme.palette.info.main,
      lessonsCompleted: 12,
      totalLessons: 60,
      xp: 234,
      isActive: true
    },
    { 
      name: 'Niemiecki', 
      flag: '🇩🇪', 
      progress: 0, 
      level: 'A1',
      color: theme.palette.text.secondary,
      lessonsCompleted: 0,
      totalLessons: 50,
      xp: 0,
      isActive: false,
      locked: true
    },
    { 
      name: 'Włoski', 
      flag: '🇮🇹', 
      progress: 0, 
      level: 'A1',
      color: theme.palette.text.secondary,
      lessonsCompleted: 0,
      totalLessons: 45,
      xp: 0,
      isActive: false,
      locked: true
    }
  ];

  const handleLanguagesClick = () => {
    setLanguagesOpen(!languagesOpen);
  };

  const handleLanguageClick = (language) => {
    if (!language.locked) {
      // Przekieruj do lekcji danego języka
      navigate(`/lessons?lang=${language.name.toLowerCase()}`);
    }
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
          position: 'relative',
          zIndex: 1200
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
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Avatar
            sx={{
              width: 50,
              height: 50,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              fontSize: '1.2rem',
              fontWeight: 700
            }}
          >
            {user?.firstName ? user.firstName.charAt(0).toUpperCase() : 'U'}
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {user?.firstName || 'Użytkownik'} {user?.lastName || ''}
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

        {/* Profesjonalna Sekcja Języków */}
        <ListItem disablePadding>
          <ListItemButton 
            onClick={handleLanguagesClick} 
            sx={{ 
              borderRadius: 2,
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
              }
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <Language sx={{ fontSize: 22, color: theme.palette.primary.main }} />
            </ListItemIcon>
            <ListItemText 
              primary="Moje języki"
              primaryTypographyProps={{ 
                fontWeight: 600, 
                fontSize: '0.95rem',
                color: theme.palette.primary.main
              }}
            />
            {languagesOpen ? 
              <ExpandLess sx={{ color: theme.palette.primary.main }} /> : 
              <ExpandMore sx={{ color: theme.palette.primary.main }} />
            }
          </ListItemButton>
        </ListItem>

        <Collapse in={languagesOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 1, mt: 1 }}>
            {languages.map((lang, index) => (
              <ListItem key={lang.name} disablePadding sx={{ mb: 1 }}>
                <Box
                  onClick={() => handleLanguageClick(lang)}
                  sx={{
                    width: '100%',
                    p: 2.5,
                    borderRadius: 2,
                    background: lang.locked 
                      ? `linear-gradient(135deg, ${alpha(theme.palette.text.secondary, 0.05)}, ${alpha(theme.palette.text.secondary, 0.02)})`
                      : `linear-gradient(135deg, ${alpha(lang.color, 0.1)}, ${alpha(lang.color, 0.05)})`,
                    border: `1px solid ${alpha(lang.locked ? theme.palette.text.secondary : lang.color, 0.2)}`,
                    cursor: lang.locked ? 'not-allowed' : 'pointer',
                    opacity: lang.locked ? 0.6 : 1,
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': !lang.locked ? {
                      backgroundColor: alpha(lang.color, 0.15),
                      transform: 'translateX(4px)',
                      boxShadow: `0 4px 12px ${alpha(lang.color, 0.2)}`,
                    } : {}
                  }}
                >
                  {/* Gradient Overlay */}
                  {!lang.locked && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: 60,
                        height: 60,
                        background: `radial-gradient(circle, ${alpha(lang.color, 0.1)} 0%, transparent 70%)`,
                        borderRadius: '50%',
                        transform: 'translate(20px, -20px)',
                      }}
                    />
                  )}

                  {/* Header z flagą i nazwą */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5, position: 'relative', zIndex: 1 }}>
                    <Typography sx={{ fontSize: 24, mr: 1.5 }}>{lang.flag}</Typography>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body1" sx={{ 
                        fontWeight: 600, 
                        color: lang.locked ? theme.palette.text.secondary : theme.palette.text.primary,
                        mb: 0.5
                      }}>
                        {lang.name}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Chip
                          label={lang.level}
                          size="small"
                          sx={{
                            backgroundColor: alpha(lang.locked ? theme.palette.text.secondary : lang.color, 0.2),
                            color: lang.locked ? theme.palette.text.secondary : lang.color,
                            fontWeight: 600,
                            fontSize: '0.7rem',
                            height: 20
                          }}
                        />
                        {lang.locked && (
                          <Chip
                            label="Zablokowany"
                            size="small"
                            sx={{
                              backgroundColor: alpha(theme.palette.text.secondary, 0.2),
                              color: theme.palette.text.secondary,
                              fontWeight: 600,
                              fontSize: '0.65rem',
                              height: 20
                            }}
                          />
                        )}
                      </Box>
                    </Box>
                  </Box>

                  {/* Progress Bar */}
                  <Box sx={{ mb: 1.5, position: 'relative', zIndex: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                        Postęp
                      </Typography>
                      <Typography variant="caption" sx={{ 
                        fontWeight: 600, 
                        color: lang.locked ? theme.palette.text.secondary : lang.color,
                        fontSize: '0.75rem'
                      }}>
                        {lang.progress}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={lang.progress}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: alpha(lang.locked ? theme.palette.text.secondary : lang.color, 0.2),
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: lang.locked ? theme.palette.text.secondary : lang.color,
                          borderRadius: 3,
                        }
                      }}
                    />
                  </Box>

                  {/* Stats */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
                    <Box>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                        Lekcje
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        fontWeight: 600, 
                        fontSize: '0.8rem',
                        color: lang.locked ? theme.palette.text.secondary : theme.palette.text.primary
                      }}>
                        {lang.lessonsCompleted}/{lang.totalLessons}
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                        XP
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        fontWeight: 600, 
                        fontSize: '0.8rem',
                        color: lang.locked ? theme.palette.text.secondary : theme.palette.warning.main
                      }}>
                        {lang.xp.toLocaleString()}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </ListItem>
            ))}
          </List>

          {/* Dodaj Nowy Język */}
          <Box sx={{ px: 1, mt: 2 }}>
            <ListItemButton
              sx={{
                borderRadius: 2,
                border: `2px dashed ${alpha(theme.palette.primary.main, 0.3)}`,
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  borderColor: alpha(theme.palette.primary.main, 0.5),
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <Flag sx={{ fontSize: 20, color: theme.palette.primary.main }} />
              </ListItemIcon>
              <ListItemText 
                primary="Dodaj nowy język"
                primaryTypographyProps={{ 
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  color: theme.palette.primary.main
                }}
              />
            </ListItemButton>
          </Box>
        </Collapse>
      </Box>
    </Drawer>
  );
};

export default Navigation;
