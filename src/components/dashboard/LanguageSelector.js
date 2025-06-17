import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Box,
  Typography,
  LinearProgress,
  Button,
  Chip,
  IconButton,
  useTheme,
  alpha,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText
} from '@mui/material';
import {
  Language,
  Add,
  TrendingUp,
  Schedule,
  EmojiEvents,
  PlayArrow,
  Star,
  Close,
  Info,
  MenuBook,
  Quiz,
  RecordVoiceOver,
  Headphones
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const LanguageSelector = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [addLanguageOpen, setAddLanguageOpen] = useState(false);

  // Dane lekcji dla każdego języka - RZECZYWISTE DANE Z LESSONS
  const lessonsData = {
    english: [
      {
        id: 1,
        title: 'Present Perfect - Wprowadzenie',
        description: 'Poznaj podstawy czasu Present Perfect i jego zastosowanie w codziennych sytuacjach.',
        type: 'Gramatyka',
        difficulty: 'Średni',
        duration: '15 min',
        points: 50,
        progress: 0,
        isNext: true // Następna lekcja do wykonania
      },
      {
        id: 2,
        title: 'Czasowniki nieregularne',
        description: 'Naucz się najważniejszych czasowników nieregularnych w języku angielskim.',
        type: 'Słownictwo',
        difficulty: 'Łatwy',
        duration: '12 min',
        points: 40,
        progress: 75,
        isNext: false
      },
      {
        id: 3,
        title: 'Wymowa dźwięków th',
        description: 'Opanuj trudne dźwięki th w języku angielskim z praktycznymi ćwiczeniami.',
        type: 'Wymowa',
        difficulty: 'Trudny',
        duration: '20 min',
        points: 60,
        progress: 100,
        isNext: false
      }
    ],
    spanish: [
      {
        id: 5,
        title: 'Pretérito Perfecto',
        description: 'Czas przeszły w języku hiszpańskim - teoria i praktyka.',
        type: 'Gramatyka',
        difficulty: 'Średni',
        duration: '16 min',
        points: 50,
        progress: 0,
        isNext: true
      },
      {
        id: 6,
        title: 'Słownictwo - Rodzina',
        description: 'Poznaj słownictwo związane z rodziną w języku hiszpańskim.',
        type: 'Słownictwo',
        difficulty: 'Łatwy',
        duration: '10 min',
        points: 35,
        progress: 60,
        isNext: false
      }
    ],
    french: [
      {
        id: 7,
        title: 'Les articles définis',
        description: 'Rodzajniki określone w języku francuskim - zasady użycia.',
        type: 'Gramatyka',
        difficulty: 'Łatwy',
        duration: '12 min',
        points: 40,
        progress: 0,
        isNext: true,
        locked: true
      }
    ]
  };

  // Dane języków z następnymi lekcjami
  const languages = {
    english: {
      name: 'Angielski',
      flag: '🇺🇸',
      level: 'B2',
      progress: 75,
      totalLessons: 120,
      completedLessons: 90,
      streak: 7,
      weeklyGoal: 5,
      weeklyProgress: 4,
      nextLesson: lessonsData.english.find(lesson => lesson.isNext),
      color: theme.palette.primary.main,
      isActive: true
    },
    spanish: {
      name: 'Hiszpański',
      flag: '🇪🇸',
      level: 'A2',
      progress: 45,
      totalLessons: 80,
      completedLessons: 36,
      streak: 3,
      weeklyGoal: 3,
      weeklyProgress: 2,
      nextLesson: lessonsData.spanish.find(lesson => lesson.isNext),
      color: theme.palette.warning.main,
      isActive: true
    },
    french: {
      name: 'Francuski',
      flag: '🇫🇷',
      level: 'A1',
      progress: 20,
      totalLessons: 60,
      completedLessons: 12,
      streak: 1,
      weeklyGoal: 2,
      weeklyProgress: 1,
      nextLesson: lessonsData.french.find(lesson => lesson.isNext),
      color: theme.palette.info.main,
      isActive: true
    }
  };

  const currentLanguage = languages[selectedLanguage];

  // Funkcja do rozpoczęcia lekcji
  const handleStartLesson = (lesson) => {
    if (lesson && !lesson.locked) {
      // Przekieruj do strony lekcji z konkretną lekcją
      navigate('/lessons', { 
        state: { 
          selectedLesson: lesson,
          language: currentLanguage.name 
        } 
      });
    }
  };

  // Funkcja do przejścia do wszystkich lekcji danego języka
  const handleViewAllLessons = (language) => {
    navigate('/lessons', { 
      state: { 
        selectedLanguage: language,
        filterByLanguage: true 
      } 
    });
  };

  const getTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'gramatyka': return <MenuBook />;
      case 'słownictwo': return <Quiz />;
      case 'wymowa': return <RecordVoiceOver />;
      case 'słuchanie': return <Headphones />;
      default: return <MenuBook />;
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'łatwy': return theme.palette.success.main;
      case 'średni': return theme.palette.warning.main;
      case 'trudny': return theme.palette.error.main;
      default: return theme.palette.info.main;
    }
  };

  return (
    <Card sx={{ height: '100%', borderRadius: 3 }}>
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Language sx={{ color: theme.palette.primary.main }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Moje języki
            </Typography>
          </Box>
        }
        action={
          <IconButton onClick={() => setAddLanguageOpen(true)}>
            <Add />
          </IconButton>
        }
        sx={{ pb: 1 }}
      />
      
      <CardContent sx={{ pt: 0, pb: 2 }}>
        {/* Language Tabs */}
        <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
          {Object.entries(languages).map(([key, lang]) => (
            <Chip
              key={key}
              label={`${lang.flag} ${lang.name}`}
              variant={selectedLanguage === key ? 'filled' : 'outlined'}
              onClick={() => setSelectedLanguage(key)}
              sx={{
                borderColor: lang.color,
                color: selectedLanguage === key ? 'white' : lang.color,
                backgroundColor: selectedLanguage === key ? lang.color : 'transparent',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: selectedLanguage === key ? lang.color : alpha(lang.color, 0.1),
                }
              }}
            />
          ))}
        </Box>

        {/* Current Language Details */}
        <Box
          sx={{
            p: 3,
            borderRadius: 2,
            background: `linear-gradient(135deg, ${alpha(currentLanguage.color, 0.1)}, ${alpha(currentLanguage.color, 0.05)})`,
            border: `1px solid ${alpha(currentLanguage.color, 0.2)}`,
            mb: 3
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography sx={{ fontSize: 32 }}>{currentLanguage.flag}</Typography>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {currentLanguage.name}
                </Typography>
                <Chip
                  label={currentLanguage.level}
                  size="small"
                  sx={{
                    backgroundColor: alpha(currentLanguage.color, 0.2),
                    color: currentLanguage.color,
                    fontWeight: 600
                  }}
                />
              </Box>
            </Box>
            <Button
              variant="outlined"
              size="small"
              onClick={() => handleViewAllLessons(currentLanguage.name)}
              sx={{
                borderColor: currentLanguage.color,
                color: currentLanguage.color,
                '&:hover': {
                  backgroundColor: alpha(currentLanguage.color, 0.1),
                }
              }}
            >
              Zobacz lekcje
            </Button>
          </Box>

          {/* Progress */}
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Ogólny postęp
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600, color: currentLanguage.color }}>
                {currentLanguage.progress}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={currentLanguage.progress}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: alpha(currentLanguage.color, 0.2),
                '& .MuiLinearProgress-bar': {
                  backgroundColor: currentLanguage.color,
                  borderRadius: 4,
                }
              }}
            />
          </Box>

          {/* Stats */}
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: currentLanguage.color }}>
                  {currentLanguage.completedLessons}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Lekcje
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: currentLanguage.color }}>
                  {currentLanguage.streak}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Seria dni
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: currentLanguage.color }}>
                  {currentLanguage.weeklyProgress}/{currentLanguage.weeklyGoal}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Cel tygodniowy
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Next Lesson */}
        {currentLanguage.nextLesson && (
          <Box
            sx={{
              p: 3,
              borderRadius: 2,
              backgroundColor: alpha(theme.palette.background.default, 0.5),
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Następna lekcja
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar
                sx={{
                  backgroundColor: getDifficultyColor(currentLanguage.nextLesson.difficulty),
                  mr: 2,
                  width: 40,
                  height: 40
                }}
              >
                {getTypeIcon(currentLanguage.nextLesson.type)}
              </Avatar>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {currentLanguage.nextLesson.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {currentLanguage.nextLesson.description}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Chip
                    label={currentLanguage.nextLesson.difficulty}
                    size="small"
                    sx={{
                      backgroundColor: alpha(getDifficultyColor(currentLanguage.nextLesson.difficulty), 0.2),
                      color: getDifficultyColor(currentLanguage.nextLesson.difficulty),
                      fontWeight: 600,
                      fontSize: '0.7rem'
                    }}
                  />
                  <Chip
                    label={currentLanguage.nextLesson.type}
                    size="small"
                    sx={{
                      backgroundColor: alpha(currentLanguage.color, 0.2),
                      color: currentLanguage.color,
                      fontWeight: 600,
                      fontSize: '0.7rem'
                    }}
                  />
                </Box>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Schedule sx={{ fontSize: 16, color: theme.palette.text.secondary }} />
                  <Typography variant="caption" color="text.secondary">
                    {currentLanguage.nextLesson.duration}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Star sx={{ fontSize: 16, color: theme.palette.warning.main }} />
                  <Typography variant="caption" color="text.secondary">
                    +{currentLanguage.nextLesson.points} XP
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Button
              fullWidth
              variant="contained"
              startIcon={<PlayArrow />}
              onClick={() => handleStartLesson(currentLanguage.nextLesson)}
              disabled={currentLanguage.nextLesson.locked}
              sx={{
                borderRadius: 2,
                py: 1.5,
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                background: currentLanguage.nextLesson.locked 
                  ? alpha(theme.palette.text.secondary, 0.2)
                  : `linear-gradient(135deg, ${currentLanguage.color}, ${alpha(currentLanguage.color, 0.8)})`,
                '&:hover': !currentLanguage.nextLesson.locked ? {
                  background: `linear-gradient(135deg, ${alpha(currentLanguage.color, 0.9)}, ${alpha(currentLanguage.color, 0.7)})`,
                } : {}
              }}
            >
              {currentLanguage.nextLesson.locked ? 'Zablokowane' : 'Rozpocznij lekcję'}
            </Button>
          </Box>
        )}

        {/* Add Language Dialog */}
        <Dialog
          open={addLanguageOpen}
          onClose={() => setAddLanguageOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Dodaj nowy język
            </Typography>
            <IconButton onClick={() => setAddLanguageOpen(false)}>
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Wybierz język, który chcesz dodać do swojej listy:
            </Typography>
            <List>
              {['🇩🇪 Niemiecki', '🇮🇹 Włoski', '🇵🇹 Portugalski', '🇷🇺 Rosyjski'].map((lang, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton sx={{ borderRadius: 1 }}>
                    <ListItemText primary={lang} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAddLanguageOpen(false)}>
              Anuluj
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default LanguageSelector;
