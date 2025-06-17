import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Button,
  LinearProgress,
  IconButton,
  Card,
  CardContent,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Chip,
  useTheme,
  alpha,
  Fade,
  Slide,
  Avatar
} from '@mui/material';
import {
  Close,
  VolumeUp,
  CheckCircle,
  Cancel,
  ArrowForward,
  ArrowBack,
  Star,
  Timer,
  Lightbulb,
  Flag
} from '@mui/icons-material';

const LessonContent = ({ lesson, isOpen, onClose, onComplete }) => {
  const theme = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minut

  // Przykładowy content lekcji - różny dla każdego typu
  const getLessonContent = (lesson) => {
    if (!lesson) return [];

    switch (lesson.type?.toLowerCase()) {
      case 'gramatyka':
        return [
          {
            type: 'introduction',
            title: 'Wprowadzenie do Present Perfect',
            content: 'Present Perfect to czas, który łączy przeszłość z teraźniejszością. Używamy go do opisania czynności, które rozpoczęły się w przeszłości, ale mają wpływ na teraźniejszość.',
            example: 'I have lived in London for 5 years.',
            translation: 'Mieszkam w Londynie od 5 lat.'
          },
          {
            type: 'theory',
            title: 'Struktura Present Perfect',
            content: 'Present Perfect tworzymy według wzoru: Subject + have/has + Past Participle',
            examples: [
              { en: 'I have finished my homework.', pl: 'Skończyłem pracę domową.' },
              { en: 'She has visited Paris twice.', pl: 'Ona odwiedziła Paryż dwa razy.' },
              { en: 'They have never seen this movie.', pl: 'Oni nigdy nie widzieli tego filmu.' }
            ]
          },
          {
            type: 'exercise',
            title: 'Ćwiczenie 1',
            question: 'Wybierz poprawną formę Present Perfect:',
            text: 'I _____ never _____ to Japan.',
            options: ['have / been', 'has / been', 'had / been', 'am / been'],
            correct: 'have / been',
            explanation: 'Używamy "have" z pierwszą osobą liczby pojedynczej (I) oraz past participle "been".'
          },
          {
            type: 'exercise',
            title: 'Ćwiczenie 2',
            question: 'Przetłumacz zdanie:',
            text: 'She has just finished her work.',
            type_ex: 'translation',
            correct: 'Ona właśnie skończyła swoją pracę.',
            hints: ['just = właśnie', 'finished = skończyła', 'work = praca']
          },
          {
            type: 'exercise',
            title: 'Ćwiczenie 3',
            question: 'Uzupełnij zdanie:',
            text: 'We _____ _____ this song before.',
            options: ['has heard','have heard', 'had heard', 'are hearing'],
            correct: 'have heard',
            explanation: 'Z "we" używamy "have" + past participle "heard".'
          }
        ];

      case 'słownictwo':
        return [
          {
            type: 'introduction',
            title: 'Słownictwo - Rodzina',
            content: 'Poznaj podstawowe słownictwo związane z rodziną w języku angielskim.',
            image: '/images/family.jpg'
          },
          {
            type: 'vocabulary',
            title: 'Nowe słowa',
            words: [
              { en: 'mother', pl: 'matka', pronunciation: '/ˈmʌðər/' },
              { en: 'father', pl: 'ojciec', pronunciation: '/ˈfɑːðər/' },
              { en: 'sister', pl: 'siostra', pronunciation: '/ˈsɪstər/' },
              { en: 'brother', pl: 'brat', pronunciation: '/ˈbrʌðər/' },
              { en: 'grandmother', pl: 'babcia', pronunciation: '/ˈɡrænmʌðər/' },
              { en: 'grandfather', pl: 'dziadek', pronunciation: '/ˈɡrænfɑːðər/' }
            ]
          },
          {
            type: 'exercise',
            title: 'Dopasuj słowa',
            question: 'Wybierz poprawne tłumaczenie słowa "sister":',
            options: ['brat', 'siostra', 'matka', 'córka'],
            correct: 'siostra',
            word: 'sister'
          },
          {
            type: 'exercise',
            title: 'Uzupełnij zdanie',
            question: 'My _____ is very kind.',
            text: 'Moja matka jest bardzo miła.',
            options: ['father', 'mother', 'brother', 'sister'],
            correct: 'mother',
            explanation: 'Mother = matka'
          }
        ];

      case 'wymowa':
        return [
          {
            type: 'introduction',
            title: 'Wymowa dźwięków TH',
            content: 'Dźwięki "th" to jedne z najtrudniejszych w języku angielskim. Istnieją dwa rodzaje: dźwięczny /ð/ i bezdźwięczny /θ/.',
            audio: '/audio/th-sounds.mp3'
          },
          {
            type: 'theory',
            title: 'Jak wymawiać TH',
            content: 'Umieść język między zębami i delikatnie wydmuchuj powietrze. Dla /θ/ (think) - bez drgania strun głosowych. Dla /ð/ (this) - z drganiem.',
            examples: [
              { word: 'think', phonetic: '/θɪŋk/', audio: '/audio/think.mp3' },
              { word: 'this', phonetic: '/ðɪs/', audio: '/audio/this.mp3' },
              { word: 'three', phonetic: '/θriː/', audio: '/audio/three.mp3' },
              { word: 'that', phonetic: '/ðæt/', audio: '/audio/that.mp3' }
            ]
          },
          {
            type: 'exercise',
            title: 'Rozpoznaj dźwięk',
            question: 'Posłuchaj i wybierz, który dźwięk słyszysz w słowie "think":',
            audio: '/audio/think.mp3',
            options: ['/θ/ (bezdźwięczny)', '/ð/ (dźwięczny)'],
            correct: '/θ/ (bezdźwięczny)',
            explanation: 'W słowie "think" występuje bezdźwięczny dźwięk /θ/.'
          }
        ];

      case 'słuchanie':
        return [
          {
            type: 'introduction',
            title: 'Rozmowa w restauracji',
            content: 'Posłuchaj autentycznej rozmowy między kelnerem a klientem w restauracji.',
            audio: '/audio/restaurant-conversation.mp3'
          },
          {
            type: 'listening',
            title: 'Posłuchaj dialogu',
            audio: '/audio/restaurant-full.mp3',
            transcript: `
              Waiter: Good evening! Welcome to our restaurant. How many people?
              Customer: Good evening. Table for two, please.
              Waiter: Right this way. Here's your table. Can I get you something to drink?
              Customer: I'll have a glass of water, please.
              Waiter: And for you, sir?
              Customer 2: A coffee for me, thank you.
            `
          },
          {
            type: 'exercise',
            title: 'Pytanie o szczegóły',
            question: 'Ile osób szukało stolika?',
            audio: '/audio/restaurant-question1.mp3',
            options: ['Jedna', 'Dwie', 'Trzy', 'Cztery'],
            correct: 'Dwie',
            explanation: 'Klient powiedział "Table for two" - stolik dla dwóch osób.'
          }
        ];

      default:
        return [
          {
            type: 'introduction',
            title: lesson.title,
            content: lesson.description
          }
        ];
    }
  };

  const lessonSteps = getLessonContent(lesson);

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setAnswers({});
      setShowResult(false);
      setScore(0);
      setTimeLeft(300);
    }
  }, [isOpen, lesson]);

  useEffect(() => {
    if (isOpen && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isOpen, timeLeft]);

  const handleAnswer = (stepIndex, answer) => {
    setAnswers(prev => ({
      ...prev,
      [stepIndex]: answer
    }));
  };

  const handleNext = () => {
    if (currentStep < lessonSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Zakończ lekcję
      const correctAnswers = lessonSteps.filter((step, index) => {
        if (step.type === 'exercise') {
          return answers[index] === step.correct;
        }
        return true;
      }).length;
      
      const totalExercises = lessonSteps.filter(step => step.type === 'exercise').length;
      const finalScore = Math.round((correctAnswers / totalExercises) * 100);
      
      setScore(finalScore);
      setShowResult(true);
    }
  };

  const handleComplete = () => {
    onComplete(lesson, { answers, score, timeSpent: 300 - timeLeft });
    onClose();
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const currentStepData = lessonSteps[currentStep];
  const progress = ((currentStep + 1) / lessonSteps.length) * 100;

  const renderStepContent = (step, stepIndex) => {
    switch (step.type) {
      case 'introduction':
        return (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: theme.palette.primary.main }}>
              {step.title}
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, fontSize: '1.1rem', lineHeight: 1.6 }}>
              {step.content}
            </Typography>
            {step.example && (
              <Card sx={{ maxWidth: 600, mx: 'auto', mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    Przykład:
                  </Typography>
                  <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 1 }}>
                    "{step.example}"
                  </Typography>
                  {step.translation && (
                    <Typography variant="body2" color="text.secondary">
                      {step.translation}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            )}
            {step.audio && (
              <Button
                startIcon={<VolumeUp />}
                variant="outlined"
                sx={{ mt: 2 }}
              >
                Odtwórz audio
              </Button>
            )}
          </Box>
        );

      case 'theory':
        return (
          <Box sx={{ py: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
              {step.title}
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, fontSize: '1.1rem', lineHeight: 1.6 }}>
              {step.content}
            </Typography>
            {step.examples && (
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Przykłady:
                </Typography>
                {step.examples.map((example, index) => (
                  <Card key={index} sx={{ mb: 2 }}>
                    <CardContent>
                      <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
                        {example.en}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {example.pl}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )}
          </Box>
        );

      case 'vocabulary':
        return (
          <Box sx={{ py: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
              {step.title}
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 2 }}>
              {step.words.map((word, index) => (
                <Card key={index} sx={{ cursor: 'pointer', '&:hover': { transform: 'scale(1.02)' } }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {word.en}
                      </Typography>
                      <IconButton size="small">
                        <VolumeUp />
                      </IconButton>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {word.pronunciation}
                    </Typography>
                    <Typography variant="body1">
                      {word.pl}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        );

      case 'exercise':
        return (
          <Box sx={{ py: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
              {step.title}
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, fontSize: '1.1rem' }}>
              {step.question}
            </Typography>
            
            {step.text && (
              <Card sx={{ mb: 3, backgroundColor: alpha(theme.palette.primary.main, 0.1) }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontStyle: 'italic' }}>
                    "{step.text}"
                  </Typography>
                </CardContent>
              </Card>
            )}

            {step.audio && (
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Button
                  startIcon={<VolumeUp />}
                  variant="contained"
                  size="large"
                >
                  Odtwórz audio
                </Button>
              </Box>
            )}

            {step.type_ex === 'translation' ? (
              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="Wpisz tłumaczenie..."
                value={answers[stepIndex] || ''}
                onChange={(e) => handleAnswer(stepIndex, e.target.value)}
                sx={{ mb: 3 }}
              />
            ) : (
              <RadioGroup
                value={answers[stepIndex] || ''}
                onChange={(e) => handleAnswer(stepIndex, e.target.value)}
              >
                {step.options.map((option, index) => (
                  <FormControlLabel
                    key={index}
                    value={option}
                    control={<Radio />}
                    label={option}
                    sx={{
                      mb: 1,
                      p: 2,
                      borderRadius: 2,
                      border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.05),
                      }
                    }}
                  />
                ))}
              </RadioGroup>
            )}

            {step.hints && (
              <Box sx={{ mt: 2 }}>
                <Button
                  startIcon={<Lightbulb />}
                  variant="outlined"
                  size="small"
                >
                  Pokaż wskazówki
                </Button>
              </Box>
            )}
          </Box>
        );

      default:
        return (
          <Box sx={{ py: 4, textAlign: 'center' }}>
            <Typography variant="h5">
              Nieznany typ kroku: {step.type}
            </Typography>
          </Box>
        );
    }
  };

  if (!lesson) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth={false}
      fullScreen
      sx={{
        '& .MuiDialog-paper': {
          background: theme.palette.background.default,
        }
      }}
    >
      <DialogContent sx={{ p: 0, height: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
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
              {lesson.title}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
              <Chip label={lesson.type} size="small" color="primary" />
              <Chip label={lesson.difficulty} size="small" />
              <Chip icon={<Timer />} label={formatTime(timeLeft)} size="small" />
            </Box>
          </Box>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>

        {/* Progress Bar */}
        <Box sx={{ px: 3, py: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Krok {currentStep + 1} z {lessonSteps.length}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
              {Math.round(progress)}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={progress}
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

        {/* Content */}
        <Box sx={{ flex: 1, overflow: 'auto', px: 3 }}>
          {showResult ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  mx: 'auto',
                  mb: 3,
                  backgroundColor: score >= 70 ? theme.palette.success.main : theme.palette.warning.main,
                  fontSize: '3rem'
                }}
              >
                {score >= 70 ? <CheckCircle /> : <Flag />}
              </Avatar>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
                {score}%
              </Typography>
              <Typography variant="h5" sx={{ mb: 3 }}>
                {score >= 70 ? 'Gratulacje!' : 'Dobra próba!'}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                {score >= 70 
                  ? 'Ukończyłeś lekcję z bardzo dobrym wynikiem!'
                  : 'Spróbuj ponownie, aby poprawić swój wynik.'
                }
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleComplete}
                  startIcon={<CheckCircle />}
                >
                  Zakończ lekcję
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => {
                    setCurrentStep(0);
                    setAnswers({});
                    setShowResult(false);
                    setScore(0);
                  }}
                >
                  Spróbuj ponownie
                </Button>
              </Box>
            </Box>
          ) : (
            <Fade in={true} key={currentStep}>
              <Box>
                {currentStepData && renderStepContent(currentStepData, currentStep)}
              </Box>
            </Fade>
          )}
        </Box>

        {/* Navigation */}
        {!showResult && (
          <Box
            sx={{
              p: 3,
              borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Button
              startIcon={<ArrowBack />}
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
            >
              Poprzedni
            </Button>

            <Box sx={{ display: 'flex', gap: 1 }}>
              {lessonSteps.map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: index <= currentStep 
                      ? theme.palette.primary.main 
                      : alpha(theme.palette.primary.main, 0.3)
                  }}
                />
              ))}
            </Box>

            <Button
              endIcon={<ArrowForward />}
              variant="contained"
              onClick={handleNext}
              disabled={
                currentStepData?.type === 'exercise' && 
                !answers[currentStep]
              }
            >
              {currentStep === lessonSteps.length - 1 ? 'Zakończ' : 'Następny'}
            </Button>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LessonContent;
