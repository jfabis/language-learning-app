import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  LinearProgress,
  Chip,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  TextField,
  useTheme,
  alpha,
  Avatar,
  IconButton,
  Fade,
  Grow
} from '@mui/material';
import {
  VolumeUp,
  CheckCircle,
  Cancel,
  Lightbulb,
  Flag,
  Mic,
  Image as ImageIcon,
  Quiz as QuizIcon,
  Timer,
  Star
} from '@mui/icons-material';

const QuizQuestion = ({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  showResult = false,
  userAnswer = null,
  timeLimit = 30,
  onTimeUp,
  showHint = false
}) => {
  const theme = useTheme();
  const [selectedAnswer, setSelectedAnswer] = useState(userAnswer || '');
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [showAnimation, setShowAnimation] = useState(false);
  const [textAnswer, setTextAnswer] = useState('');

  useEffect(() => {
    if (timeLimit > 0 && !showResult) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            onTimeUp && onTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLimit, showResult, onTimeUp]);

  useEffect(() => {
    setShowAnimation(true);
  }, [question]);

  const getQuestionTypeIcon = (type) => {
    switch (type) {
      case 'multiple_choice': return <QuizIcon />;
      case 'true_false': return <Flag />;
      case 'fill_blank': return <Lightbulb />;
      case 'audio': return <VolumeUp />;
      case 'image': return <ImageIcon />;
      default: return <QuizIcon />;
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

  const handleAnswerSelect = (answer) => {
    if (showResult) return;
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    const finalAnswer = question.type === 'fill_blank' ? textAnswer : selectedAnswer;
    onAnswer(finalAnswer);
  };

  const isCorrect = showResult && selectedAnswer === question.correctAnswer;
  const isWrong = showResult && selectedAnswer !== question.correctAnswer && selectedAnswer !== '';

  const timePercentage = (timeLeft / timeLimit) * 100;
  const timeColor = timePercentage > 50 ? theme.palette.success.main : 
                   timePercentage > 20 ? theme.palette.warning.main : 
                   theme.palette.error.main;

  const renderQuestionContent = () => {
    switch (question.type) {
      case 'multiple_choice':
        return (
          <RadioGroup
            value={selectedAnswer}
            onChange={(e) => handleAnswerSelect(e.target.value)}
          >
            {question.options.map((option, index) => {
              const optionLetter = String.fromCharCode(65 + index);
              const isSelected = selectedAnswer === option;
              const isCorrectOption = showResult && option === question.correctAnswer;
              const isWrongSelected = showResult && isSelected && !isCorrectOption;

              return (
                <Grow key={index} in={showAnimation} timeout={300 + index * 100}>
                  <FormControlLabel
                    value={option}
                    control={<Radio />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                        <Typography variant="body1" sx={{ flexGrow: 1 }}>
                          <strong>{optionLetter}.</strong> {option}
                        </Typography>
                        {showResult && isCorrectOption && (
                          <CheckCircle sx={{ color: theme.palette.success.main, ml: 1 }} />
                        )}
                        {showResult && isWrongSelected && (
                          <Cancel sx={{ color: theme.palette.error.main, ml: 1 }} />
                        )}
                      </Box>
                    }
                    sx={{
                      width: '100%',
                      m: 0,
                      mb: 1,
                      p: 2,
                      borderRadius: 2,
                      border: `2px solid ${
                        showResult && isCorrectOption ? theme.palette.success.main :
                        showResult && isWrongSelected ? theme.palette.error.main :
                        isSelected ? theme.palette.primary.main :
                        alpha(theme.palette.divider, 0.2)
                      }`,
                      backgroundColor: showResult && isCorrectOption ? alpha(theme.palette.success.main, 0.1) :
                                     showResult && isWrongSelected ? alpha(theme.palette.error.main, 0.1) :
                                     isSelected ? alpha(theme.palette.primary.main, 0.1) :
                                     'transparent',
                      transition: 'all 0.3s ease',
                      '&:hover': !showResult ? {
                        backgroundColor: alpha(theme.palette.primary.main, 0.05),
                        borderColor: alpha(theme.palette.primary.main, 0.5),
                      } : {},
                      '& .MuiFormControlLabel-label': {
                        width: '100%'
                      }
                    }}
                  />
                </Grow>
              );
            })}
          </RadioGroup>
        );

      case 'true_false':
        return (
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            {['Prawda', 'Fałsz'].map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrectOption = showResult && option === question.correctAnswer;
              const isWrongSelected = showResult && isSelected && !isCorrectOption;

              return (
                <Grow key={option} in={showAnimation} timeout={300 + index * 100}>
                  <Button
                    variant={isSelected ? 'contained' : 'outlined'}
                    size="large"
                    onClick={() => handleAnswerSelect(option)}
                    disabled={showResult}
                    sx={{
                      minWidth: 120,
                      py: 2,
                      borderRadius: 3,
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      borderColor: showResult && isCorrectOption ? theme.palette.success.main :
                                  showResult && isWrongSelected ? theme.palette.error.main :
                                  theme.palette.primary.main,
                      backgroundColor: showResult && isCorrectOption ? alpha(theme.palette.success.main, 0.2) :
                                      showResult && isWrongSelected ? alpha(theme.palette.error.main, 0.2) :
                                      isSelected ? theme.palette.primary.main : 'transparent',
                      color: showResult && isCorrectOption ? theme.palette.success.main :
                            showResult && isWrongSelected ? theme.palette.error.main :
                            isSelected ? '#ffffff' : theme.palette.primary.main,
                      '&:hover': !showResult ? {
                        transform: 'scale(1.05)',
                      } : {}
                    }}
                  >
                    {option}
                  </Button>
                </Grow>
              );
            })}
          </Box>
        );

      case 'fill_blank':
        return (
          <Grow in={showAnimation} timeout={300}>
            <Box>
              <Typography variant="body1" sx={{ mb: 3, fontSize: '1.1rem', lineHeight: 1.6 }}>
                {question.text.split('___').map((part, index, array) => (
                  <React.Fragment key={index}>
                    {part}
                    {index < array.length - 1 && (
                      <TextField
                        value={textAnswer}
                        onChange={(e) => setTextAnswer(e.target.value)}
                        disabled={showResult}
                        sx={{
                          mx: 1,
                          '& .MuiOutlinedInput-root': {
                            minWidth: 120,
                            backgroundColor: showResult ? 
                              (textAnswer.toLowerCase() === question.correctAnswer.toLowerCase() ? 
                                alpha(theme.palette.success.main, 0.1) : 
                                alpha(theme.palette.error.main, 0.1)) : 
                              'transparent'
                          }
                        }}
                      />
                    )}
                  </React.Fragment>
                ))}
              </Typography>
              {showResult && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  <strong>Poprawna odpowiedź:</strong> {question.correctAnswer}
                </Typography>
              )}
            </Box>
          </Grow>
        );

      default:
        return null;
    }
  };

  return (
    <Fade in={showAnimation} timeout={500}>
      <Card
        sx={{
          background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(theme.palette.background.paper, 0.95)})`,
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          borderRadius: 3,
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 3,
            background: `linear-gradient(135deg, ${alpha(getDifficultyColor(question.difficulty), 0.1)}, ${alpha(getDifficultyColor(question.difficulty), 0.05)})`,
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar
                sx={{
                  backgroundColor: getDifficultyColor(question.difficulty),
                  width: 40,
                  height: 40
                }}
              >
                {getQuestionTypeIcon(question.type)}
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Pytanie {questionNumber} z {totalQuestions}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                  <Chip
                    label={question.difficulty || 'Średni'}
                    size="small"
                    sx={{
                      backgroundColor: alpha(getDifficultyColor(question.difficulty), 0.2),
                      color: getDifficultyColor(question.difficulty),
                      fontWeight: 600,
                      fontSize: '0.7rem'
                    }}
                  />
                  <Chip
                    icon={<Star sx={{ fontSize: 14 }} />}
                    label={`${question.points || 10} pkt`}
                    size="small"
                    sx={{
                      backgroundColor: alpha(theme.palette.warning.main, 0.2),
                      color: theme.palette.warning.main,
                      fontWeight: 600,
                      fontSize: '0.7rem'
                    }}
                  />
                </Box>
              </Box>
            </Box>

            {/* Timer */}
            {timeLimit > 0 && (
              <Box sx={{ textAlign: 'center', minWidth: 80 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                  <Timer sx={{ fontSize: 20, color: timeColor, mr: 0.5 }} />
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 700,
                      color: timeColor,
                      fontFamily: 'monospace'
                    }}
                  >
                    {timeLeft}s
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={timePercentage}
                  sx={{
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: alpha(timeColor, 0.2),
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: timeColor,
                      borderRadius: 2,
                    }
                  }}
                />
              </Box>
            )}
          </Box>

          {/* Question Progress */}
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Postęp quizu
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
                {Math.round((questionNumber / totalQuestions) * 100)}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={(questionNumber / totalQuestions) * 100}
              sx={{
                height: 6,
                borderRadius: 3,
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                '& .MuiLinearProgress-bar': {
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  borderRadius: 3,
                }
              }}
            />
          </Box>
        </Box>

        <CardContent sx={{ p: 4 }}>
          {/* Question Text */}
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 600, 
              mb: 3,
              lineHeight: 1.4
            }}
          >
            {question.text}
          </Typography>

          {/* Audio Button */}
          {question.audio && (
            <Box sx={{ mb: 3, textAlign: 'center' }}>
              <IconButton
                sx={{
                  backgroundColor: alpha(theme.palette.info.main, 0.1),
                  color: theme.palette.info.main,
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.info.main, 0.2),
                    transform: 'scale(1.1)',
                  }
                }}
              >
                <VolumeUp />
              </IconButton>
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                Kliknij aby odsłuchać
              </Typography>
            </Box>
          )}

          {/* Question Image */}
          {question.image && (
            <Box sx={{ mb: 3, textAlign: 'center' }}>
              <img
                src={question.image}
                alt="Question"
                style={{
                  maxWidth: '100%',
                  maxHeight: 200,
                  borderRadius: 8,
                  boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, 0.1)}`
                }}
              />
            </Box>
          )}

          {/* Question Content */}
          {renderQuestionContent()}

          {/* Hint */}
          {showHint && question.hint && (
            <Grow in={showHint} timeout={300}>
              <Box
                sx={{
                  mt: 3,
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: alpha(theme.palette.info.main, 0.1),
                  border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Lightbulb sx={{ color: theme.palette.info.main, mr: 1, fontSize: 20 }} />
                  <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.info.main }}>
                    Wskazówka
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {question.hint}
                </Typography>
              </Box>
            </Grow>
          )}

          {/* Submit Button */}
          {!showResult && (
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleSubmit}
                disabled={!selectedAnswer && !textAnswer}
                sx={{
                  minWidth: 200,
                  py: 1.5,
                  borderRadius: 3,
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  '&:hover': {
                    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.9)}, ${alpha(theme.palette.secondary.main, 0.9)})`,
                    transform: 'scale(1.05)',
                  },
                  '&:disabled': {
                    background: alpha(theme.palette.text.secondary, 0.2),
                    color: theme.palette.text.secondary,
                  }
                }}
              >
                Potwierdź odpowiedź
              </Button>
            </Box>
          )}

          {/* Result Explanation */}
          {showResult && question.explanation && (
            <Grow in={showResult} timeout={500}>
              <Box
                sx={{
                  mt: 3,
                  p: 3,
                  borderRadius: 2,
                  backgroundColor: isCorrect ? 
                    alpha(theme.palette.success.main, 0.1) : 
                    alpha(theme.palette.error.main, 0.1),
                  border: `1px solid ${isCorrect ? 
                    alpha(theme.palette.success.main, 0.3) : 
                    alpha(theme.palette.error.main, 0.3)}`
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {isCorrect ? (
                    <CheckCircle sx={{ color: theme.palette.success.main, mr: 1 }} />
                  ) : (
                    <Cancel sx={{ color: theme.palette.error.main, mr: 1 }} />
                  )}
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 600,
                      color: isCorrect ? theme.palette.success.main : theme.palette.error.main
                    }}
                  >
                    {isCorrect ? 'Brawo! Poprawna odpowiedź' : 'Niepoprawna odpowiedź'}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {question.explanation}
                </Typography>
              </Box>
            </Grow>
          )}
        </CardContent>
      </Card>
    </Fade>
  );
};

export default QuizQuestion;
