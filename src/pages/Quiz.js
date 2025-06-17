import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Avatar,
  useTheme,
  alpha,
  Container,
  Dialog,
  DialogContent,
  Fade,
  Grow,
  LinearProgress,
  IconButton,
  Tooltip,
  Divider
} from '@mui/material';
import {
  Quiz as QuizIcon,
  Timer,
  Star,
  EmojiEvents,
  TrendingUp,
  PlayArrow,
  Refresh,
  Close,
  School,
  Speed,
  CheckCircle,
  Language,
  MenuBook,
  Headphones,
  RecordVoiceOver,
  LocalFireDepartment,
  Flag
} from '@mui/icons-material';
import QuizQuestion from '../components/quiz/QuizQuestion';
import QuizResults from '../components/quiz/QuizResults';
import QuizTimer from '../components/quiz/QuizTimer';

const Quiz = () => {
  const theme = useTheme();
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [quizStartTime, setQuizStartTime] = useState(null);
  const [timeSpent, setTimeSpent] = useState(0);

  // Przykładowe dane quizów
  const quizzes = [
    {
      id: 1,
      title: 'Present Perfect - Test wiedzy',
      description: 'Sprawdź swoją znajomość czasu Present Perfect w języku angielskim',
      difficulty: 'Średni',
      questions: 10,
      timeLimit: 600, // 10 minut
      points: 100,
      category: 'Gramatyka',
      language: 'Angielski',
      icon: <MenuBook />,
      color: theme.palette.primary.main,
      popularity: 95,
      completions: 1247,
      averageScore: 78,
      questions_data: [
        {
          id: 1,
          text: 'I _____ never _____ to Paris.',
          type: 'multiple_choice',
          options: ['have / been', 'has / been', 'had / been', 'am / been'],
          correctAnswer: 'have / been',
          points: 10,
          difficulty: 'Średni',
          explanation: 'Present Perfect tworzymy z have/has + past participle. "Never" wskazuje na doświadczenie życiowe.',
          hint: 'Pamiętaj o strukturze: have/has + past participle'
        },
        {
          id: 2,
          text: 'She _____ just _____ her homework.',
          type: 'multiple_choice',
          options: ['has / finished', 'have / finished', 'had / finished', 'is / finished'],
          correctAnswer: 'has / finished',
          points: 10,
          difficulty: 'Łatwy',
          explanation: 'Z "just" używamy Present Perfect. "She" to trzecia osoba liczby pojedynczej, więc "has".',
          hint: 'Zwróć uwagę na podmiot "She"'
        }
      ]
    },
    {
      id: 2,
      title: 'Czasowniki nieregularne',
      description: 'Quiz z najważniejszych czasowników nieregularnych',
      difficulty: 'Łatwy',
      questions: 15,
      timeLimit: 450,
      points: 150,
      category: 'Słownictwo',
      language: 'Angielski',
      icon: <QuizIcon />,
      color: theme.palette.success.main,
      popularity: 88,
      completions: 2156,
      averageScore: 85,
      questions_data: [
        {
          id: 1,
          text: 'Jaka jest forma Past Participle czasownika "go"?',
          type: 'multiple_choice',
          options: ['went', 'gone', 'going', 'goed'],
          correctAnswer: 'gone',
          points: 10,
          difficulty: 'Łatwy',
          explanation: 'Czasownik "go" ma formy: go - went - gone',
          hint: 'To jeden z najczęściej używanych czasowników nieregularnych'
        }
      ]
    },
    {
      id: 3,
      title: 'Wymowa angielska - Test słuchowy',
      description: 'Sprawdź swoją umiejętność rozpoznawania dźwięków angielskich',
      difficulty: 'Trudny',
      questions: 12,
      timeLimit: 720,
      points: 120,
      category: 'Wymowa',
      language: 'Angielski',
      icon: <Headphones />,
      color: theme.palette.warning.main,
      popularity: 72,
      completions: 856,
      averageScore: 65,
      questions_data: [
        {
          id: 1,
          text: 'Posłuchaj nagrania i wybierz poprawną transkrypcję:',
          type: 'multiple_choice',
          options: ['/θɪŋk/', '/sɪŋk/', '/fɪŋk/', '/tɪŋk/'],
          correctAnswer: '/θɪŋk/',
          points: 10,
          difficulty: 'Trudny',
          audio: true,
          explanation: 'Dźwięk "th" w "think" to /θ/ - dźwięk bezdźwięczny',
          hint: 'Zwróć uwagę na dźwięk "th"'
        }
      ]
    },
    {
      id: 4,
      title: 'Pretérito Perfecto',
      description: 'Test z czasu przeszłego w języku hiszpańskim',
      difficulty: 'Średni',
      questions: 8,
      timeLimit: 480,
      points: 80,
      category: 'Gramatyka',
      language: 'Hiszpański',
      icon: <School />,
      color: theme.palette.secondary.main,
      popularity: 79,
      completions: 634,
      averageScore: 71,
      questions_data: [
        {
          id: 1,
          text: 'Yo _____ comido paella.',
          type: 'multiple_choice',
          options: ['he', 'has', 'ha', 'hemos'],
          correctAnswer: 'he',
          points: 10,
          difficulty: 'Średni',
          explanation: 'Pretérito Perfecto dla "yo" to "he" + participio pasado',
          hint: 'Pamiętaj o koniugacji czasownika "haber"'
        }
      ]
    },
    {
      id: 5,
      title: 'Szybki test - True/False',
      description: 'Błyskawiczny test prawda/fałsz z różnych dziedzin',
      difficulty: 'Łatwy',
      questions: 20,
      timeLimit: 1200,
      points: 100,
      category: 'Mieszane',
      language: 'Wszystkie',
      icon: <Flag />,
      color: theme.palette.info.main,
      popularity: 91,
      completions: 3421,
      averageScore: 82,
      questions_data: [
        {
            id: 1,
            text: 'Present Perfect używamy do opisania czynności zakończonych w przeszłości.',
            type: 'true_false',
            options: ['Prawda', 'Fałsz'],
            correctAnswer: 'Fałsz',
            points: 5,
            difficulty: 'Łatwy'
        },
        {
            id: 2,
            text: 'Czasownik "go" ma formy: go - went - gone.',
            type: 'true_false',
            options: ['Prawda', 'Fałsz'],
            correctAnswer: 'Prawda',
            points: 5,
            difficulty: 'Łatwy'
        },
        {
            id: 3,
            text: 'W języku angielskim wszystkie czasowniki są regularne.',
            type: 'true_false',
            options: ['Prawda', 'Fałsz'],
            correctAnswer: 'Fałsz',
            points: 5,
            difficulty: 'Łatwy'
        },
        {
            id: 4,
            text: 'Artykuł "the" to artykuł nieokreślony.',
            type: 'true_false',
            options: ['Prawda', 'Fałsz'],
            correctAnswer: 'Fałsz',
            points: 5,
            difficulty: 'Łatwy'
        },
        {
            id: 5,
            text: 'Past Simple używamy z "yesterday".',
            type: 'true_false',
            options: ['Prawda', 'Fałsz'],
            correctAnswer: 'Prawda',
            points: 5,
            difficulty: 'Łatwy'
        },
        {
            id: 6,
            text: 'W języku hiszpańskim rodzajnik męski to "la".',
            type: 'true_false',
            options: ['Prawda', 'Fałsz'],
            correctAnswer: 'Fałsz',
            points: 5,
            difficulty: 'Łatwy'
        },
        {
            id: 7,
            text: 'Czasownik "be" ma formy: be - was/were - been.',
            type: 'true_false',
            options: ['Prawda', 'Fałsz'],
            correctAnswer: 'Prawda',
            points: 5,
            difficulty: 'Łatwy'
        },
        {
            id: 8,
            text: 'Future Simple tworzymy z "will + infinitive".',
            type: 'true_false',
            options: ['Prawda', 'Fałsz'],
            correctAnswer: 'Prawda',
            points: 5,
            difficulty: 'Łatwy'
        },
        {
            id: 9,
            text: 'W języku francuskim wszystkie rzeczowniki są rodzaju męskiego.',
            type: 'true_false',
            options: ['Prawda', 'Fałsz'],
            correctAnswer: 'Fałsz',
            points: 5,
            difficulty: 'Łatwy'
        },
        {
            id: 10,
            text: 'Gerund kończy się na "-ing".',
            type: 'true_false',
            options: ['Prawda', 'Fałsz'],
            correctAnswer: 'Prawda',
            points: 5,
            difficulty: 'Łatwy'
        },
        {
            id: 11,
            text: 'Conditional używamy do wyrażania warunków.',
            type: 'true_false',
            options: ['Prawda', 'Fałsz'],
            correctAnswer: 'Prawda',
            points: 5,
            difficulty: 'Łatwy'
        },
        {
            id: 12,
            text: 'W języku angielskim przymiotniki odmieniają się przez przypadki.',
            type: 'true_false',
            options: ['Prawda', 'Fałsz'],
            correctAnswer: 'Fałsz',
            points: 5,
            difficulty: 'Łatwy'
        },
        {
            id: 13,
            text: 'Passive Voice tworzymy z "be + past participle".',
            type: 'true_false',
            options: ['Prawda', 'Fałsz'],
            correctAnswer: 'Prawda',
            points: 5,
            difficulty: 'Łatwy'
        },
        {
            id: 14,
            text: 'Modal verbs to: can, could, may, might, must, should, will, would.',
            type: 'true_false',
            options: ['Prawda', 'Fałsz'],
            correctAnswer: 'Prawda',
            points: 5,
            difficulty: 'Łatwy'
        },
        {
            id: 15,
            text: 'W języku hiszpańskim czasownik "ser" oznacza "mieć".',
            type: 'true_false',
            options: ['Prawda', 'Fałsz'],
            correctAnswer: 'Fałsz',
            points: 5,
            difficulty: 'Łatwy'
        },
        {
            id: 16,
            text: 'Comparative degree przymiotnika "good" to "better".',
            type: 'true_false',
            options: ['Prawda', 'Fałsz'],
            correctAnswer: 'Prawda',
            points: 5,
            difficulty: 'Łatwy'
        },
        {
            id: 17,
            text: 'Present Continuous używamy z "always" dla wyrażenia irytacji.',
            type: 'true_false',
            options: ['Prawda', 'Fałsz'],
            correctAnswer: 'Prawda',
            points: 5,
            difficulty: 'Łatwy'
        },
        {
            id: 18,
            text: 'W języku francuskim "avoir" oznacza "być".',
            type: 'true_false',
            options: ['Prawda', 'Fałsz'],
            correctAnswer: 'Fałsz',
            points: 5,
            difficulty: 'Łatwy'
        },
        {
            id: 19,
            text: 'Zero Conditional używa "if + present simple, present simple".',
            type: 'true_false',
            options: ['Prawda', 'Fałsz'],
            correctAnswer: 'Prawda',
            points: 5,
            difficulty: 'Łatwy'
        },
        {
            id: 20,
            text: 'Superlative degree przymiotnika "bad" to "worst".',
            type: 'true_false',
            options: ['Prawda', 'Fałsz'],
            correctAnswer: 'Prawda',
            points: 5,
            difficulty: 'Łatwy'
        }
        ]
    },
    {
      id: 6,
      title: 'Zaawansowana gramatyka',
      description: 'Dla ekspertów - najtrudniejsze zagadnienia gramatyczne',
      difficulty: 'Trudny',
      questions: 15,
      timeLimit: 900,
      points: 200,
      category: 'Gramatyka',
      language: 'Angielski',
      icon: <EmojiEvents />,
      color: theme.palette.error.main,
      popularity: 45,
      completions: 234,
      averageScore: 58,
      locked: true,
      requirements: 'Ukończ 5 quizów z wynikiem min. 80%'
    }
  ];

  const categories = [
    { name: 'Wszystkie', icon: <QuizIcon />, count: quizzes.length },
    { name: 'Gramatyka', icon: <MenuBook />, count: quizzes.filter(q => q.category === 'Gramatyka').length },
    { name: 'Słownictwo', icon: <QuizIcon />, count: quizzes.filter(q => q.category === 'Słownictwo').length },
    { name: 'Wymowa', icon: <RecordVoiceOver />, count: quizzes.filter(q => q.category === 'Wymowa').length },
    { name: 'Mieszane', icon: <Flag />, count: quizzes.filter(q => q.category === 'Mieszane').length }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'łatwy': return theme.palette.success.main;
      case 'średni': return theme.palette.warning.main;
      case 'trudny': return theme.palette.error.main;
      default: return theme.palette.info.main;
    }
  };

  const handleStartQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setIsQuizActive(true);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setShowResults(false);
    setQuizStartTime(Date.now());
  };

  const handleAnswerQuestion = (answer) => {
    const currentQuestion = selectedQuiz.questions_data[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;
    
    const answerData = {
      questionId: currentQuestion.id,
      question: currentQuestion.text,
      userAnswer: answer,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect: isCorrect,
      points: currentQuestion.points,
      timeSpent: 0 // Można dodać tracking czasu na pytanie
    };

    const newAnswers = [...userAnswers, answerData];
    setUserAnswers(newAnswers);

    // Przejdź do następnego pytania lub pokaż wyniki
    if (currentQuestionIndex < selectedQuiz.questions_data.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 1500); // Krótka pauza po odpowiedzi
    } else {
      // Quiz zakończony
      setTimeout(() => {
        setTimeSpent(Math.floor((Date.now() - quizStartTime) / 1000));
        setShowResults(true);
        setIsQuizActive(false);
      }, 1500);
    }
  };

  const handleQuizComplete = () => {
    setSelectedQuiz(null);
    setIsQuizActive(false);
    setShowResults(false);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
  };

  const handleRetryQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setShowResults(false);
    setIsQuizActive(true);
    setQuizStartTime(Date.now());
  };

  const totalQuizzes = quizzes.length;
  const completedQuizzes = 3; // Przykładowa wartość
  const totalPoints = 1247; // Przykładowa wartość
  const averageScore = 78; // Przykładowa wartość

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
          Quiz
        </Typography>

        {/* Stats Overview */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.primary.main, 0.05)})`,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                borderRadius: 3
              }}
            >
              <CardContent sx={{ textAlign: 'center', py: 3 }}>
                <Avatar
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    mx: 'auto',
                    mb: 2,
                    width: 56,
                    height: 56
                  }}
                >
                  <QuizIcon sx={{ fontSize: 28 }} />
                </Avatar>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  {totalQuizzes}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Dostępne quizy
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                background: `linear-gradient(135deg, ${alpha(theme.palette.success.main, 0.1)}, ${alpha(theme.palette.success.main, 0.05)})`,
                border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                borderRadius: 3
              }}
            >
              <CardContent sx={{ textAlign: 'center', py: 3 }}>
                <Avatar
                  sx={{
                    backgroundColor: theme.palette.success.main,
                    mx: 'auto',
                    mb: 2,
                    width: 56,
                    height: 56
                  }}
                >
                  <CheckCircle sx={{ fontSize: 28 }} />
                </Avatar>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  {completedQuizzes}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ukończone
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                background: `linear-gradient(135deg, ${alpha(theme.palette.warning.main, 0.1)}, ${alpha(theme.palette.warning.main, 0.05)})`,
                border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`,
                borderRadius: 3
              }}
            >
              <CardContent sx={{ textAlign: 'center', py: 3 }}>
                <Avatar
                  sx={{
                    backgroundColor: theme.palette.warning.main,
                    mx: 'auto',
                    mb: 2,
                    width: 56,
                    height: 56
                  }}
                >
                  <Star sx={{ fontSize: 28 }} />
                </Avatar>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  {totalPoints}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Punkty XP
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                background: `linear-gradient(135deg, ${alpha(theme.palette.info.main, 0.1)}, ${alpha(theme.palette.info.main, 0.05)})`,
                border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
                borderRadius: 3
              }}
            >
              <CardContent sx={{ textAlign: 'center', py: 3 }}>
                <Avatar
                  sx={{
                    backgroundColor: theme.palette.info.main,
                    mx: 'auto',
                    mb: 2,
                    width: 56,
                    height: 56
                  }}
                >
                  <TrendingUp sx={{ fontSize: 28 }} />
                </Avatar>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  {averageScore}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Średni wynik
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Categories */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Kategorie
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {categories.map((category, index) => (
              <Chip
                key={index}
                icon={category.icon}
                label={`${category.name} (${category.count})`}
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  py: 2,
                  px: 1,
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    borderColor: theme.palette.primary.main,
                  }
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>

      {/* Quizzes Grid */}
      <Grid container spacing={3}>
        {quizzes.map((quiz) => (
          <Grid item xs={12} sm={6} md={4} key={quiz.id}>
            <Grow in={true} timeout={300 + quiz.id * 100}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  background: `linear-gradient(135deg, ${alpha(quiz.color, 0.1)}, ${alpha(quiz.color, 0.05)})`,
                  border: `1px solid ${alpha(quiz.color, 0.2)}`,
                  borderRadius: 3,
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 20px 40px ${alpha(quiz.color, 0.2)}`,
                    '& .quiz-icon': {
                      transform: 'scale(1.1) rotate(5deg)',
                    }
                  }
                }}
              >
                {/* Locked Overlay */}
                {quiz.locked && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: alpha(theme.palette.background.paper, 0.8),
                      backdropFilter: 'blur(4px)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 2,
                      borderRadius: 3
                    }}
                  >
                    <EmojiEvents sx={{ fontSize: 48, color: theme.palette.warning.main, mb: 2 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, textAlign: 'center' }}>
                      Zablokowane
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', px: 2 }}>
                      {quiz.requirements}
                    </Typography>
                  </Box>
                )}

                {/* Popularity Badge */}
                <Chip
                  icon={<LocalFireDepartment sx={{ fontSize: 16 }} />}
                  label={`${quiz.popularity}%`}
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    backgroundColor: alpha('#ff6b35', 0.2),
                    color: '#ff6b35',
                    fontWeight: 600,
                    zIndex: 1
                  }}
                />

                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  {/* Icon and Title */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                      className="quiz-icon"
                      sx={{
                        backgroundColor: quiz.color,
                        mr: 2,
                        width: 48,
                        height: 48,
                        transition: 'transform 0.3s ease'
                      }}
                    >
                      {quiz.icon}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, lineHeight: 1.3 }}>
                        {quiz.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {quiz.language}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Description */}
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ 
                      mb: 3,
                      lineHeight: 1.5,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {quiz.description}
                  </Typography>

                  {/* Tags */}
                  <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
                    <Chip
                      label={quiz.difficulty}
                      size="small"
                      sx={{
                        backgroundColor: alpha(getDifficultyColor(quiz.difficulty), 0.2),
                        color: getDifficultyColor(quiz.difficulty),
                        fontWeight: 600,
                        fontSize: '0.7rem'
                      }}
                    />
                    <Chip
                      label={quiz.category}
                      size="small"
                      sx={{
                        backgroundColor: alpha(quiz.color, 0.2),
                        color: quiz.color,
                        fontWeight: 600,
                        fontSize: '0.7rem'
                      }}
                    />
                  </Box>

                  {/* Stats */}
                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={6}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {quiz.questions}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          pytań
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {Math.floor(quiz.timeLimit / 60)} min
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          czas
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>

                  {/* Additional Stats */}
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        Średni wynik
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 600, color: quiz.color }}>
                        {quiz.averageScore}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={quiz.averageScore}
                      sx={{
                        height: 4,
                        borderRadius: 2,
                        backgroundColor: alpha(quiz.color, 0.2),
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: quiz.color,
                          borderRadius: 2,
                        }
                      }}
                    />
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                      {quiz.completions.toLocaleString()} ukończeń
                    </Typography>
                  </Box>
                </CardContent>

                {/* Action Button */}
                <Box sx={{ p: 3, pt: 0 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<PlayArrow />}
                    onClick={() => handleStartQuiz(quiz)}
                    disabled={quiz.locked}
                    sx={{
                      borderRadius: 2,
                      py: 1.5,
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: '1rem',
                      background: quiz.locked ? 
                        alpha(theme.palette.text.secondary, 0.2) :
                        `linear-gradient(135deg, ${quiz.color}, ${alpha(quiz.color, 0.8)})`,
                      '&:hover': !quiz.locked ? {
                        background: `linear-gradient(135deg, ${alpha(quiz.color, 0.9)}, ${alpha(quiz.color, 0.7)})`,
                        transform: 'scale(1.02)',
                      } : {},
                      '&:disabled': {
                        color: theme.palette.text.secondary,
                      }
                    }}
                  >
                    {quiz.locked ? 'Zablokowane' : 'Rozpocznij quiz'}
                  </Button>
                </Box>
              </Card>
            </Grow>
          </Grid>
        ))}
      </Grid>

      {/* Quiz Dialog */}
      <Dialog
        open={isQuizActive || showResults}
        onClose={() => {}}
        maxWidth="md"
        fullWidth
        fullScreen
        sx={{
          '& .MuiDialog-paper': {
            background: theme.palette.background.default,
          }
        }}
      >
        <DialogContent sx={{ p: 0, height: '100vh', display: 'flex', flexDirection: 'column' }}>
          {/* Quiz Header */}
          <Box
            sx={{
              p: 3,
              borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(theme.palette.background.paper, 0.95)})`,
              backdropFilter: 'blur(20px)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {selectedQuiz?.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedQuiz?.description}
              </Typography>
            </Box>
            <Tooltip title="Zamknij quiz">
              <IconButton onClick={handleQuizComplete}>
                <Close />
              </IconButton>
            </Tooltip>
          </Box>

          {/* Quiz Content */}
          <Box sx={{ flex: 1, overflow: 'auto' }}>
            {showResults ? (
              <QuizResults
                quizData={selectedQuiz}
                userAnswers={userAnswers}
                timeSpent={timeSpent}
                onRetry={handleRetryQuiz}
                onGoHome={handleQuizComplete}
                onShare={() => console.log('Share results')}
              />
            ) : (
              selectedQuiz && selectedQuiz.questions_data && (
                <Box sx={{ p: 4 }}>
                  <QuizQuestion
                    question={selectedQuiz.questions_data[currentQuestionIndex]}
                    questionNumber={currentQuestionIndex + 1}
                    totalQuestions={selectedQuiz.questions_data.length}
                    onAnswer={handleAnswerQuestion}
                    timeLimit={Math.floor(selectedQuiz.timeLimit / selectedQuiz.questions_data.length)}
                    onTimeUp={() => handleAnswerQuestion('')}
                  />
                </Box>
              )
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Quiz;
