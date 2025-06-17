import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Tabs,
  Tab,
  Chip,
  Button,
  TextField,
  InputAdornment,
  useTheme,
  alpha,
  Container
} from '@mui/material';
import {
  Search,
  FilterList,
  Sort,
  MenuBook,
  Quiz as QuizIcon,
  RecordVoiceOver,
  Headphones,
  Add
} from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
import LessonCard from '../components/lessons/LessonCard';
import LessonContent from '../components/lessons/LessonContent';
import ProgressBar from '../components/lessons/ProgressBar';

const Lessons = () => {
  const theme = useTheme();
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isLessonOpen, setIsLessonOpen] = useState(false);

  // Przykładowe dane lekcji - ZSYNCHRONIZOWANE Z DASHBOARD
  const lessons = [
    {
      id: 1,
      title: 'Present Perfect - Wprowadzenie',
      description: 'Poznaj podstawy czasu Present Perfect i jego zastosowanie w codziennych sytuacjach.',
      type: 'Gramatyka',
      difficulty: 'Średni',
      duration: '15 min',
      points: 50,
      progress: 0,
      isFavorite: false,
      language: 'Angielski',
      isNext: true // Następna lekcja z Dashboard
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
      isFavorite: true,
      language: 'Angielski'
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
      isFavorite: false,
      language: 'Angielski'
    },
    {
      id: 4,
      title: 'Słuchanie - Rozmowa w restauracji',
      description: 'Ćwicz rozumienie ze słuchu poprzez autentyczne rozmowy w restauracji.',
      type: 'Słuchanie',
      difficulty: 'Średni',
      duration: '18 min',
      points: 55,
      progress: 30,
      isFavorite: true,
      language: 'Angielski'
    },
    {
      id: 5,
      title: 'Pretérito Perfecto',
      description: 'Czas przeszły w języku hiszpańskim - teoria i praktyka.',
      type: 'Gramatyka',
      difficulty: 'Średni',
      duration: '16 min',
      points: 50,
      progress: 0,
      isFavorite: false,
      language: 'Hiszpański',
      isNext: true // Następna lekcja dla hiszpańskiego
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
      isFavorite: false,
      language: 'Hiszpański'
    },
    {
      id: 7,
      title: 'Les articles définis',
      description: 'Rodzajniki określone w języku francuskim - zasady użycia.',
      type: 'Gramatyka',
      difficulty: 'Łatwy',
      duration: '12 min',
      points: 40,
      progress: 0,
      isFavorite: false,
      language: 'Francuski',
      locked: true,
      isNext: true // Następna lekcja dla francuskiego (ale zablokowana)
    },
    {
      id: 8,
      title: 'Pronunciation française',
      description: 'Podstawy wymowy francuskiej z nagraniami native speakerów.',
      type: 'Wymowa',
      difficulty: 'Trudny',
      duration: '25 min',
      points: 70,
      progress: 0,
      isFavorite: false,
      language: 'Francuski',
      locked: true
    }
  ];

  const tabs = [
    { label: 'Wszystkie', value: 'all', icon: <MenuBook /> },
    { label: 'Gramatyka', value: 'Gramatyka', icon: <MenuBook /> },
    { label: 'Słownictwo', value: 'Słownictwo', icon: <QuizIcon /> },
    { label: 'Wymowa', value: 'Wymowa', icon: <RecordVoiceOver /> },
    { label: 'Słuchanie', value: 'Słuchanie', icon: <Headphones /> }
  ];

  const progressSteps = [
    { label: 'Podstawy', locked: false },
    { label: 'Średni', locked: false },
    { label: 'Zaawansowany', locked: true },
    { label: 'Ekspert', locked: true }
  ];

  // OBSŁUGA PRZEKIEROWANIA Z DASHBOARD
  useEffect(() => {
    if (location.state?.selectedLesson) {
      const lesson = location.state.selectedLesson;
      console.log('Opening lesson from Dashboard:', lesson);
      handleStartLesson(lesson);
      
      // Wyczyść state żeby nie otwierało się ponownie
      window.history.replaceState({}, document.title);
    }
    
    // Obsługa filtrowania po języku z Dashboard
    if (location.state?.selectedLanguage) {
      const language = location.state.selectedLanguage;
      console.log('Filtering by language:', language);
      // Możesz dodać logikę filtrowania tutaj
    }
  }, [location.state]);

  const filteredLessons = lessons.filter(lesson => {
    const matchesTab = selectedTab === 0 || lesson.type === tabs[selectedTab].value;
    const matchesSearch = lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lesson.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleStartLesson = (lesson) => {
    console.log('Starting lesson:', lesson);
    setSelectedLesson(lesson);
    setIsLessonOpen(true);
  };

  const handleFavorite = (lessonId) => {
    console.log('Toggle favorite for lesson:', lessonId);
    // Tutaj możesz dodać logikę zapisywania ulubionych do localStorage
  };

  const handleCompleteLesson = (lesson, answers) => {
    console.log('Lesson completed:', lesson, answers);
    setIsLessonOpen(false);
    // Tutaj możesz dodać logikę zapisywania postępu
  };

  const overallProgress = Math.round(
    lessons.reduce((acc, lesson) => acc + lesson.progress, 0) / lessons.length
  );

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 700, 
            mb: 2,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Lekcje
        </Typography>
        
        {/* Overall Progress */}
        <Box 
          sx={{ 
            p: 3, 
            mb: 3,
            borderRadius: 3,
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Twój postęp w nauce
          </Typography>
          <ProgressBar
            progress={overallProgress}
            label="Ogólny postęp"
            color="primary"
            size="large"
            animated={true}
            showSteps={true}
            steps={progressSteps}
            showReward={true}
            rewardPoints={250}
          />
        </Box>

        {/* Search and Filters */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          <TextField
            placeholder="Szukaj lekcji..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ 
              flexGrow: 1, 
              minWidth: 300,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              }
            }}
          />
          <Button
            startIcon={<FilterList />}
            variant="outlined"
            sx={{ borderRadius: 2, textTransform: 'none' }}
          >
            Filtry
          </Button>
          <Button
            startIcon={<Sort />}
            variant="outlined"
            sx={{ borderRadius: 2, textTransform: 'none' }}
          >
            Sortuj
          </Button>
        </Box>

        {/* Tabs */}
        <Tabs
          value={selectedTab}
          onChange={(e, newValue) => setSelectedTab(newValue)}
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 500,
              borderRadius: 2,
              mr: 1,
              minHeight: 48,
            },
            '& .Mui-selected': {
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.main,
            }
          }}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {tab.icon}
                  {tab.label}
                </Box>
              }
            />
          ))}
        </Tabs>
      </Box>

      {/* Results Summary */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="body1" color="text.secondary">
          Znaleziono {filteredLessons.length} lekcji
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip label="Nowe" size="small" color="primary" />
          <Chip label="Popularne" size="small" color="secondary" />
          <Chip label="Ukończone" size="small" color="success" />
        </Box>
      </Box>

      {/* Lessons Grid */}
      <Grid container spacing={3}>
        {filteredLessons.map((lesson) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={lesson.id}>
            <LessonCard
              lesson={lesson}
              onStart={handleStartLesson}
              onFavorite={handleFavorite}
              isLocked={lesson.locked}
            />
          </Grid>
        ))}
      </Grid>

      {/* Empty State */}
      {filteredLessons.length === 0 && (
        <Box 
          sx={{ 
            textAlign: 'center', 
            py: 8,
            background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.5)}, ${alpha(theme.palette.background.paper, 0.8)})`,
            borderRadius: 3,
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          }}
        >
          <MenuBook sx={{ fontSize: 64, color: theme.palette.text.secondary, mb: 2 }} />
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Nie znaleziono lekcji
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Spróbuj zmienić kryteria wyszukiwania lub wybierz inną kategorię
          </Typography>
          <Button
            startIcon={<Add />}
            variant="contained"
            sx={{ borderRadius: 2, textTransform: 'none' }}
          >
            Przeglądaj wszystkie lekcje
          </Button>
        </Box>
      )}

      {/* Lesson Content Dialog */}
      <LessonContent
        lesson={selectedLesson}
        isOpen={isLessonOpen}
        onClose={() => setIsLessonOpen(false)}
        onComplete={handleCompleteLesson}
      />
    </Container>
  );
};

export default Lessons;
