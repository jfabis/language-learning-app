import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  LinearProgress,
  IconButton,
  Chip,
  Stepper,
  Step,
  StepLabel,
  useTheme,
  alpha,
  Dialog,
  DialogContent,
  Slide
} from '@mui/material';
import {
  Close,
  VolumeUp,
  Mic,
  CheckCircle,
  ArrowForward,
  ArrowBack,
  Home,
  Lightbulb,
  Quiz as QuizIcon
} from '@mui/icons-material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const LessonContent = ({ 
  lesson, 
  isOpen, 
  onClose, 
  onComplete 
}) => {
  const theme = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});

  // Przykładowa zawartość lekcji
  const lessonSteps = [
    {
      type: 'introduction',
      title: 'Wprowadzenie',
      content: 'Witaj w lekcji Present Perfect! Poznasz zastosowanie tego czasu gramatycznego.',
      hasAudio: true
    },
    {
      type: 'theory',
      title: 'Teoria',
      content: 'Present Perfect używamy do opisania czynności, które miały miejsce w przeszłości, ale mają związek z teraźniejszością.',
      examples: [
        'I have lived here for 5 years.',
        'She has just finished her homework.',
        'We have never been to Japan.'
      ]
    },
    {
      type: 'exercise',
      title: 'Ćwiczenie',
      question: 'Wybierz poprawną formę czasownika:',
      content: 'I _____ (live) in this city since 2010.',
      options: ['live', 'lived', 'have lived', 'am living'],
      correctAnswer: 2
    },
    {
      type: 'summary',
      title: 'Podsumowanie',
      content: 'Gratulacje! Ukończyłeś lekcję Present Perfect. Pamiętaj o strukturze: have/has + past participle.',
      points: 50
    }
  ];

  const currentStepData = lessonSteps[currentStep];
  const progress = ((currentStep + 1) / lessonSteps.length) * 100;

  const handleNext = () => {
    if (currentStep < lessonSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    onComplete && onComplete(lesson, userAnswers);
    onClose();
  };

  const handleAnswerSelect = (answerIndex) => {
    setUserAnswers({
      ...userAnswers,
      [currentStep]: answerIndex
    });
  };

  const playAudio = () => {
    // Tutaj implementacja odtwarzania audio
    console.log('Playing audio for:', currentStepData.title);
  };

  const renderStepContent = () => {
    switch (currentStepData.type) {
      case 'introduction':
        return (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3,
                boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.3)}`,
              }}
            >
              <Lightbulb sx={{ fontSize: 40, color: 'white' }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              {currentStepData.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 400, mx: 'auto' }}>
              {currentStepData.content}
            </Typography>
            {currentStepData.hasAudio && (
              <Button
                startIcon={<VolumeUp />}
                onClick={playAudio}
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 500
                }}
              >
                Odtwórz wymowę
              </Button>
            )}
          </Box>
        );

      case 'theory':
        return (
          <Box sx={{ py: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
              {currentStepData.title}
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
              {currentStepData.content}
            </Typography>
            {currentStepData.examples && (
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Przykłady:
                </Typography>
                {currentStepData.examples.map((example, index) => (
                  <Box
                    key={index}
                    sx={{
                      p: 2,
                      mb: 1,
                      borderRadius: 2,
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                    }}
                  >
                    <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '1rem' }}>
                      {example}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        );

      case 'exercise':
        return (
          <Box sx={{ py: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <QuizIcon sx={{ color: theme.palette.warning.main, mr: 1 }} />
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {currentStepData.title}
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {currentStepData.question}
            </Typography>
            <Box
              sx={{
                p: 3,
                mb: 3,
                borderRadius: 2,
                backgroundColor: alpha(theme.palette.background.default, 0.5),
                border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
              }}
            >
              <Typography variant="h6" sx={{ fontFamily: 'monospace' }}>
                {currentStepData.content}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {currentStepData.options.map((option, index) => (
                <Button
                  key={index}
                  variant={userAnswers[currentStep] === index ? "contained" : "outlined"}
                  onClick={() => handleAnswerSelect(index)}
                  sx={{
                    justifyContent: 'flex-start',
                    textTransform: 'none',
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 500
                  }}
                >
                  {String.fromCharCode(65 + index)}. {option}
                </Button>
              ))}
            </Box>
          </Box>
        );

      case 'summary':
        return (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${theme.palette.success.main}, ${theme.palette.success.light})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3,
                boxShadow: `0 8px 24px ${alpha(theme.palette.success.main, 0.3)}`,
              }}
            >
              <CheckCircle sx={{ fontSize: 40, color: 'white' }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              {currentStepData.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 400, mx: 'auto' }}>
              {currentStepData.content}
            </Typography>
            <Chip
              label={`+${currentStepData.points} XP`}
              sx={{
                backgroundColor: alpha(theme.palette.success.main, 0.2),
                color: theme.palette.success.main,
                fontWeight: 600,
                fontSize: '1rem',
                px: 2,
                py: 1
              }}
            />
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      fullScreen
      TransitionComponent={Transition}
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
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {lesson?.title}
            </Typography>
            <IconButton onClick={onClose}>
              <Close />
            </IconButton>
          </Box>
          
          <Box sx={{ mb: 2 }}>
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
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                '& .MuiLinearProgress-bar': {
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  borderRadius: 4,
                }
              }}
            />
          </Box>

          <Stepper activeStep={currentStep} alternativeLabel>
            {lessonSteps.map((step, index) => (
              <Step key={index}>
                <StepLabel>{step.title}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, p: 4, overflow: 'auto' }}>
          <Card
            sx={{
              maxWidth: 800,
              mx: 'auto',
              background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(theme.palette.background.paper, 0.95)})`,
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              borderRadius: 3,
            }}
          >
            <CardContent sx={{ p: 4 }}>
              {renderStepContent()}
            </CardContent>
          </Card>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            p: 3,
            borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(theme.palette.background.paper, 0.95)})`,
            backdropFilter: 'blur(20px)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Button
            startIcon={<Home />}
            onClick={onClose}
            sx={{ textTransform: 'none', fontWeight: 500 }}
          >
            Wróć do lekcji
          </Button>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              startIcon={<ArrowBack />}
              onClick={handleBack}
              disabled={currentStep === 0}
              sx={{ textTransform: 'none', fontWeight: 500 }}
            >
              Wstecz
            </Button>
            <Button
              endIcon={currentStep === lessonSteps.length - 1 ? <CheckCircle /> : <ArrowForward />}
              onClick={handleNext}
              variant="contained"
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 2,
                px: 3
              }}
            >
              {currentStep === lessonSteps.length - 1 ? 'Zakończ' : 'Dalej'}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LessonContent;
