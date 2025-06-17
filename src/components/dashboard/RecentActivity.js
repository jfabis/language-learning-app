import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Box,
  Chip,
  IconButton,
  useTheme,
  alpha,
  Divider
} from '@mui/material';
import {
  CheckCircle,
  Quiz,
  MenuBook,
  EmojiEvents,
  LocalFireDepartment,
  Star,
  MoreVert,
  AccessTime,
  TrendingUp
} from '@mui/icons-material';

const RecentActivity = ({ activities = [] }) => {
  const theme = useTheme();

  // Przykładowe dane jeśli activities jest puste
  const defaultActivities = [
    {
      id: 1,
      type: 'lesson_completed',
      title: 'Ukończono lekcję "Present Perfect"',
      description: 'Angielski - Gramatyka',
      timestamp: '2 godziny temu',
      points: 50,
      icon: CheckCircle,
      color: theme.palette.success.main,
      level: 'B2'
    },
    {
      id: 2,
      type: 'quiz_completed',
      title: 'Quiz: Czasowniki nieregularne',
      description: 'Wynik: 18/20 (90%)',
      timestamp: '5 godzin temu',
      points: 45,
      icon: Quiz,
      color: theme.palette.warning.main,
      level: 'B1'
    },
    {
      id: 3,
      type: 'streak',
      title: 'Seria 7 dni!',
      description: 'Gratulacje! Kontynuuj naukę',
      timestamp: 'dziś',
      points: 100,
      icon: LocalFireDepartment,
      color: '#ff6b35',
      level: 'Bonus'
    },
    {
      id: 4,
      type: 'achievement',
      title: 'Nowe osiągnięcie odblokowane',
      description: 'Grammar Master - Poziom 1',
      timestamp: 'wczoraj',
      points: 200,
      icon: EmojiEvents,
      color: theme.palette.secondary.main,
      level: 'Epic'
    },
    {
      id: 5,
      type: 'lesson_started',
      title: 'Rozpoczęto nową lekcję',
      description: 'Hiszpański - Przeszłość',
      timestamp: '2 dni temu',
      points: 0,
      icon: MenuBook,
      color: theme.palette.info.main,
      level: 'A2'
    }
  ];

  const displayActivities = activities.length > 0 ? activities : defaultActivities;

  const getActivityIcon = (activity) => {
    const IconComponent = activity.icon;
    return (
      <Avatar
        sx={{
          width: 44,
          height: 44,
          background: `linear-gradient(135deg, ${activity.color}, ${alpha(activity.color, 0.8)})`,
          boxShadow: `0 4px 12px ${alpha(activity.color, 0.3)}`,
        }}
      >
        <IconComponent sx={{ fontSize: 22, color: 'white' }} />
      </Avatar>
    );
  };

  return (
    <Card
      sx={{
        height: '100%',
        background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.8)}, ${alpha(theme.palette.background.paper, 0.95)})`,
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        borderRadius: 3,
        backdropFilter: 'blur(20px)',
      }}
    >
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TrendingUp sx={{ color: theme.palette.primary.main }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Ostatnia aktywność
            </Typography>
          </Box>
        }
        action={
          <IconButton size="small">
            <MoreVert />
          </IconButton>
        }
        sx={{ pb: 1 }}
      />
      
      <CardContent sx={{ pt: 0, pb: 2 }}>
        <List sx={{ p: 0 }}>
          {displayActivities.map((activity, index) => (
            <React.Fragment key={activity.id}>
              <ListItem
                sx={{
                  px: 0,
                  py: 2,
                  borderRadius: 2,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.action.hover, 0.05),
                    transform: 'translateX(4px)',
                  }
                }}
              >
                <ListItemAvatar sx={{ mr: 2 }}>
                  {getActivityIcon(activity)}
                </ListItemAvatar>
                
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontWeight: 600,
                          color: theme.palette.text.primary,
                          flexGrow: 1
                        }}
                      >
                        {activity.title}
                      </Typography>
                      {activity.level && (
                        <Chip
                          label={activity.level}
                          size="small"
                          sx={{
                            height: 20,
                            fontSize: '0.65rem',
                            fontWeight: 600,
                            backgroundColor: alpha(activity.color, 0.15),
                            color: activity.color,
                          }}
                        />
                      )}
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ mb: 0.5, fontSize: '0.85rem' }}
                      >
                        {activity.description}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <AccessTime sx={{ fontSize: 14, color: theme.palette.text.secondary }} />
                          <Typography 
                            variant="caption" 
                            color="text.secondary"
                            sx={{ fontSize: '0.75rem' }}
                          >
                            {activity.timestamp}
                          </Typography>
                        </Box>
                        {activity.points > 0 && (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Star sx={{ fontSize: 14, color: theme.palette.warning.main }} />
                            <Typography 
                              variant="caption" 
                              sx={{ 
                                fontWeight: 600,
                                color: theme.palette.warning.main,
                                fontSize: '0.75rem'
                              }}
                            >
                              +{activity.points} XP
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </Box>
                  }
                />
              </ListItem>
              {index < displayActivities.length - 1 && (
                <Divider 
                  sx={{ 
                    my: 1, 
                    opacity: 0.3,
                    background: `linear-gradient(90deg, transparent, ${alpha(theme.palette.divider, 0.5)}, transparent)`
                  }} 
                />
              )}
            </React.Fragment>
          ))}
        </List>

        {/* Footer z linkiem do pełnej historii */}
        <Box 
          sx={{ 
            mt: 2, 
            pt: 2, 
            borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            textAlign: 'center'
          }}
        >
          <Typography 
            variant="body2" 
            sx={{ 
              color: theme.palette.primary.main,
              cursor: 'pointer',
              fontWeight: 500,
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
          >
            Zobacz pełną historię →
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
