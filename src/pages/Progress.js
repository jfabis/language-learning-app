import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  useTheme,
  alpha,
  Container,
  Avatar,
  Chip,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Tabs,
  Tab,
  Paper
} from '@mui/material';
import {
  TrendingUp,
  BarChart,
  ShowChart,
  Star,
  EmojiEvents,
  LocalFireDepartment,
  School,
  Quiz,
  MenuBook,
  Timer,
  CheckCircle,
  Flag,
  Language,
  CalendarToday,
  Speed,
  GpsFixed, // Zastąpienie Target
  Timeline,
  Insights
} from '@mui/icons-material';

const Progress = () => {
  const theme = useTheme();
  const [selectedTab, setSelectedTab] = useState(0);

  // Główne statystyki
  const mainStats = [
    {
      title: 'Ogólny postęp',
      value: 78,
      maxValue: 100,
      icon: <TrendingUp />,
      color: theme.palette.primary.main,
      description: 'Ukończono 78% wszystkich dostępnych lekcji',
      trend: '+12%',
      trendPositive: true
    },
    {
      title: 'Średnia dokładność',
      value: 85,
      maxValue: 100,
      icon: <GpsFixed />, // Zmienione z Target na GpsFixed
      color: theme.palette.secondary.main,
      description: 'Średnia poprawność odpowiedzi w quizach',
      trend: '+5%',
      trendPositive: true
    },
    {
      title: 'Czas nauki',
      value: 127,
      maxValue: 200,
      icon: <Timer />,
      color: theme.palette.success.main,
      description: '127 godzin spędzonych na nauce',
      trend: '+23h',
      trendPositive: true,
      unit: 'h'
    },
    {
      title: 'Seria dni',
      value: 7,
      maxValue: 30,
      icon: <LocalFireDepartment />,
      color: '#ff6b35',
      description: '7 dni nauki z rzędu',
      trend: '+2 dni',
      trendPositive: true,
      unit: ' dni'
    }
  ];

  // Postęp w językach
  const languageProgress = [
    {
      language: 'Angielski',
      flag: '🇺🇸',
      level: 'B2',
      progress: 75,
      lessonsCompleted: 90,
      totalLessons: 120,
      points: 1247,
      color: theme.palette.primary.main
    },
    {
      language: 'Hiszpański',
      flag: '🇪🇸',
      level: 'A2',
      progress: 45,
      lessonsCompleted: 36,
      totalLessons: 80,
      points: 634,
      color: theme.palette.warning.main
    },
    {
      language: 'Francuski',
      flag: '🇫🇷',
      level: 'A1',
      progress: 20,
      lessonsCompleted: 12,
      totalLessons: 60,
      points: 234,
      color: theme.palette.info.main
    }
  ];

  // Ostatnie osiągnięcia
  const recentAchievements = [
    {
      title: 'Grammar Master',
      description: 'Ukończ 50 lekcji gramatyki',
      icon: <School />,
      color: theme.palette.primary.main,
      date: '2 dni temu',
      points: 100
    },
    {
      title: 'Quiz Champion',
      description: 'Zdobądź 90% w 10 quizach z rzędu',
      icon: <Quiz />,
      color: theme.palette.secondary.main,
      date: '5 dni temu',
      points: 150
    },
    {
      title: 'Streak Master',
      description: 'Naucz się przez 7 dni z rzędu',
      icon: <LocalFireDepartment />,
      color: '#ff6b35',
      date: 'dziś',
      points: 200
    }
  ];

  // Statystyki tygodniowe
  const weeklyStats = [
    { day: 'Pon', lessons: 3, time: 45 },
    { day: 'Wt', lessons: 2, time: 30 },
    { day: 'Śr', lessons: 4, time: 60 },
    { day: 'Czw', lessons: 1, time: 15 },
    { day: 'Pt', lessons: 3, time: 45 },
    { day: 'Sob', lessons: 5, time: 75 },
    { day: 'Ndz', lessons: 2, time: 30 }
  ];

  const maxLessons = Math.max(...weeklyStats.map(s => s.lessons));

  const renderMainStats = () => (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {mainStats.map((stat, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card
            sx={{
              background: `linear-gradient(135deg, ${alpha(stat.color, 0.1)}, ${alpha(stat.color, 0.05)})`,
              border: `1px solid ${alpha(stat.color, 0.2)}`,
              borderRadius: 3,
              height: '100%',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: `0 20px 40px ${alpha(stat.color, 0.2)}`,
              }
            }}
          >
            {/* Gradient Overlay */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: 100,
                height: 100,
                background: `radial-gradient(circle, ${alpha(stat.color, 0.1)} 0%, transparent 70%)`,
                borderRadius: '50%',
                transform: 'translate(30px, -30px)',
              }}
            />

            <CardContent sx={{ p: 3, position: 'relative', zIndex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar
                  sx={{
                    backgroundColor: stat.color,
                    mr: 2,
                    width: 48,
                    height: 48
                  }}
                >
                  {stat.icon}
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    {stat.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: stat.color }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.unit || '%'}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
                {stat.description}
              </Typography>

              {stat.maxValue && (
                <Box sx={{ mb: 2 }}>
                  <LinearProgress
                    variant="determinate"
                    value={(stat.value / stat.maxValue) * 100}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: alpha(stat.color, 0.2),
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: stat.color,
                        borderRadius: 3,
                      }
                    }}
                  />
                </Box>
              )}

              <Chip
                label={stat.trend}
                size="small"
                sx={{
                  backgroundColor: stat.trendPositive ? alpha(theme.palette.success.main, 0.2) : alpha(theme.palette.error.main, 0.2),
                  color: stat.trendPositive ? theme.palette.success.main : theme.palette.error.main,
                  fontWeight: 600,
                  fontSize: '0.7rem'
                }}
              />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  const renderLanguageProgress = () => (
    <Card sx={{ mb: 4, borderRadius: 3 }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, display: 'flex', alignItems: 'center' }}>
          <Language sx={{ mr: 1, color: theme.palette.primary.main }} />
          Postęp w językach
        </Typography>
        
        <Grid container spacing={3}>
          {languageProgress.map((lang, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: 2,
                  background: `linear-gradient(135deg, ${alpha(lang.color, 0.1)}, ${alpha(lang.color, 0.05)})`,
                  border: `1px solid ${alpha(lang.color, 0.2)}`,
                  textAlign: 'center'
                }}
              >
                <Typography sx={{ fontSize: 32, mb: 1 }}>{lang.flag}</Typography>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  {lang.language}
                </Typography>
                <Chip
                  label={lang.level}
                  size="small"
                  sx={{
                    backgroundColor: alpha(lang.color, 0.2),
                    color: lang.color,
                    fontWeight: 600,
                    mb: 2
                  }}
                />
                
                <Box sx={{ position: 'relative', display: 'inline-flex', mb: 2 }}>
                  <CircularProgress
                    variant="determinate"
                    value={lang.progress}
                    size={80}
                    thickness={4}
                    sx={{
                      color: lang.color,
                      '& .MuiCircularProgress-circle': {
                        strokeLinecap: 'round',
                      }
                    }}
                  />
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: 'absolute',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 700, color: lang.color }}>
                      {lang.progress}%
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {lang.lessonsCompleted} / {lang.totalLessons} lekcji
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.warning.main }}>
                  {lang.points} XP
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );

  const renderWeeklyActivity = () => (
    <Card sx={{ mb: 4, borderRadius: 3 }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, display: 'flex', alignItems: 'center' }}>
          <BarChart sx={{ mr: 1, color: theme.palette.primary.main }} />
          Aktywność w tym tygodniu
        </Typography>
        
        <Grid container spacing={2}>
          {weeklyStats.map((day, index) => (
            <Grid item xs key={index}>
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    height: 100,
                    display: 'flex',
                    alignItems: 'end',
                    justifyContent: 'center',
                    mb: 1
                  }}
                >
                  <Box
                    sx={{
                      width: 24,
                      height: `${(day.lessons / maxLessons) * 80}px`,
                      backgroundColor: theme.palette.primary.main,
                      borderRadius: 1,
                      minHeight: 8
                    }}
                  />
                </Box>
                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                  {day.day}
                </Typography>
                <Typography variant="caption" display="block" color="text.secondary">
                  {day.lessons} lekcji
                </Typography>
                <Typography variant="caption" display="block" color="text.secondary">
                  {day.time} min
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );

  const renderAchievements = () => (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, display: 'flex', alignItems: 'center' }}>
          <EmojiEvents sx={{ mr: 1, color: theme.palette.warning.main }} />
          Ostatnie osiągnięcia
        </Typography>
        
        <List sx={{ p: 0 }}>
          {recentAchievements.map((achievement, index) => (
            <ListItem
              key={index}
              sx={{
                px: 0,
                py: 2,
                borderBottom: index < recentAchievements.length - 1 ? `1px solid ${alpha(theme.palette.divider, 0.1)}` : 'none'
              }}
            >
              <ListItemIcon>
                <Avatar
                  sx={{
                    backgroundColor: achievement.color,
                    width: 40,
                    height: 40
                  }}
                >
                  {achievement.icon}
                </Avatar>
              </ListItemIcon>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {achievement.title}
                    </Typography>
                    <Chip
                      label={`+${achievement.points} XP`}
                      size="small"
                      sx={{
                        backgroundColor: alpha(theme.palette.warning.main, 0.2),
                        color: theme.palette.warning.main,
                        fontWeight: 600
                      }}
                    />
                  </Box>
                }
                secondary={
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      {achievement.description}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {achievement.date}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Header */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 4,
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Postępy
      </Typography>

      {/* Main Stats */}
      {renderMainStats()}

      {/* Language Progress */}
      {renderLanguageProgress()}

      <Grid container spacing={3}>
        {/* Weekly Activity */}
        <Grid item xs={12} md={8}>
          {renderWeeklyActivity()}
        </Grid>

        {/* Achievements */}
        <Grid item xs={12} md={4}>
          {renderAchievements()}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Progress;
