import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  LinearProgress,
  Chip,
  Grid,
  Avatar,
  useTheme,
  alpha,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton,
  Fade,
  Grow
} from '@mui/material';
import {
  EmojiEvents,
  Star,
  CheckCircle,
  Cancel,
  TrendingUp,
  TrendingDown,
  Refresh,
  Share,
  Home,
  ExpandMore,
  ExpandLess,
  Timer,
  Quiz as QuizIcon,
  School,
  LocalFireDepartment
} from '@mui/icons-material';

const QuizResults = ({
  quizData,
  userAnswers,
  timeSpent,
  onRetry,
  onGoHome,
  onShare,
  showDetailed = true
}) => {
  const theme = useTheme();
  const [showDetails, setShowDetails] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);

  const correctAnswers = userAnswers.filter(answer => answer.isCorrect).length;
  const totalQuestions = userAnswers.length;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  const totalPoints = userAnswers.reduce((sum, answer) => sum + (answer.isCorrect ? answer.points : 0), 0);
  const maxPoints = userAnswers.reduce((sum, answer) => sum + answer.points, 0);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimationStep(prev => {
        if (prev < 3) return prev + 1;
        clearInterval(timer);
        return prev;
      });
    }, 500);

    return () => clearInterval(timer);
  }, []);

  const getGrade = (percentage) => {
    if (percentage >= 90) return { grade: 'A+', color: theme.palette.success.main, label: 'Doskonale!' };
    if (percentage >= 80) return { grade: 'A', color: theme.palette.success.main, label: 'Bardzo dobrze!' };
    if (percentage >= 70) return { grade: 'B', color: theme.palette.info.main, label: 'Dobrze!' };
    if (percentage >= 60) return { grade: 'C', color: theme.palette.warning.main, label: 'Zadowalająco' };
    if (percentage >= 50) return { grade: 'D', color: theme.palette.warning.main, label: 'Słabo' };
    return { grade: 'F', color: theme.palette.error.main, label: 'Niewystarczająco' };
  };

  const gradeInfo = getGrade(percentage);

  const getAchievements = () => {
    const achievements = [];
    
    if (percentage === 100) {
      achievements.push({ 
        icon: <EmojiEvents />, 
        title: 'Perfekcja!', 
        description: '100% poprawnych odpowiedzi',
        color: theme.palette.warning.main
      });
    }
    
    if (correctAnswers >= 5) {
      achievements.push({ 
        icon: <LocalFireDepartment />, 
        title: 'Na fali!', 
        description: `${correctAnswers} poprawnych odpowiedzi z rzędu`,
        color: '#ff6b35'
      });
    }
    
    if (timeSpent < 60) {
      achievements.push({ 
        icon: <Timer />, 
        title: 'Błyskawica!', 
        description: 'Ukończono w mniej niż minutę',
        color: theme.palette.info.main
      });
    }

    return achievements;
  };

  const achievements = getAchievements();

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      {/* Main Results Card */}
      <Fade in={animationStep >= 0} timeout={800}>
        <Card
          sx={{
            background: `linear-gradient(135deg, ${alpha(gradeInfo.color, 0.1)}, ${alpha(gradeInfo.color, 0.05)})`,
            border: `2px solid ${alpha(gradeInfo.color, 0.3)}`,
            borderRadius: 4,
            mb: 3,
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          {/* Confetti Effect for High Scores */}
          {percentage >= 80 && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `radial-gradient(circle at 20% 20%, ${alpha(theme.palette.warning.main, 0.1)} 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, ${alpha(theme.palette.secondary.main, 0.1)} 0%, transparent 50%),
                           radial-gradient(circle at 40% 40%, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 50%)`,
                pointerEvents: 'none'
              }}
            />
          )}

          <CardContent sx={{ p: 4, textAlign: 'center', position: 'relative', zIndex: 1 }}>
            {/* Grade Circle */}
            <Grow in={animationStep >= 1} timeout={800}>
              <Box sx={{ mb: 3 }}>
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    mx: 'auto',
                    mb: 2,
                    background: `linear-gradient(135deg, ${gradeInfo.color}, ${alpha(gradeInfo.color, 0.8)})`,
                    fontSize: '3rem',
                    fontWeight: 800,
                    boxShadow: `0 8px 32px ${alpha(gradeInfo.color, 0.3)}`,
                    animation: percentage >= 80 ? 'bounce 2s infinite' : 'none',
                    '@keyframes bounce': {
                      '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
                      '40%': { transform: 'translateY(-10px)' },
                      '60%': { transform: 'translateY(-5px)' }
                    }
                  }}
                >
                  {gradeInfo.grade}
                </Avatar>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  {gradeInfo.label}
                </Typography>
                <Typography variant="h2" sx={{ fontWeight: 800, color: gradeInfo.color }}>
                  {percentage}%
                </Typography>
              </Box>
            </Grow>

            {/* Score Summary */}
            <Grow in={animationStep >= 2} timeout={800}>
              <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.success.main }}>
                      {correctAnswers}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Poprawne
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.error.main }}>
                      {totalQuestions - correctAnswers}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Błędne
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.warning.main }}>
                      {totalPoints}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Punkty
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.info.main }}>
                      {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Czas
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grow>

            {/* Progress Bar */}
            <Grow in={animationStep >= 3} timeout={800}>
              <Box sx={{ mb: 3 }}>
                <LinearProgress
                  variant="determinate"
                  value={percentage}
                  sx={{
                    height: 12,
                    borderRadius: 6,
                    backgroundColor: alpha(gradeInfo.color, 0.2),
                    '& .MuiLinearProgress-bar': {
                      background: `linear-gradient(90deg, ${gradeInfo.color}, ${alpha(gradeInfo.color, 0.8)})`,
                      borderRadius: 6,
                      animation: 'fillProgress 2s ease-in-out',
                      '@keyframes fillProgress': {
                        '0%': { transform: 'scaleX(0)' },
                        '100%': { transform: 'scaleX(1)' }
                      }
                    }
                  }}
                />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {correctAnswers} z {totalQuestions} pytań ({percentage}%)
                </Typography>
              </Box>
            </Grow>
          </CardContent>
        </Card>
      </Fade>

      {/* Achievements */}
      {achievements.length > 0 && (
        <Fade in={animationStep >= 3} timeout={1000}>
          <Card sx={{ mb: 3, borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center' }}>
                <EmojiEvents sx={{ mr: 1, color: theme.palette.warning.main }} />
                Osiągnięcia
              </Typography>
              <Grid container spacing={2}>
                {achievements.map((achievement, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Grow in={true} timeout={1000 + index * 200}>
                      <Box
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          backgroundColor: alpha(achievement.color, 0.1),
                          border: `1px solid ${alpha(achievement.color, 0.3)}`,
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <Avatar
                          sx={{
                            backgroundColor: achievement.color,
                            mr: 2,
                            width: 40,
                            height: 40
                          }}
                        >
                          {achievement.icon}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {achievement.title}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {achievement.description}
                          </Typography>
                        </Box>
                      </Box>
                    </Grow>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Fade>
      )}

      {/* Detailed Results */}
      {showDetailed && (
        <Card sx={{ mb: 3, borderRadius: 3 }}>
          <CardContent sx={{ p: 0 }}>
            <Box
              sx={{
                p: 3,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer'
              }}
              onClick={() => setShowDetails(!showDetails)}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Szczegółowe wyniki
              </Typography>
              <IconButton>
                {showDetails ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </Box>
            
            <Collapse in={showDetails}>
              <Divider />
              <List sx={{ p: 0 }}>
                {userAnswers.map((answer, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      borderBottom: index < userAnswers.length - 1 ? `1px solid ${alpha(theme.palette.divider, 0.1)}` : 'none',
                      py: 2
                    }}
                  >
                    <ListItemIcon>
                      <Avatar
                        sx={{
                          backgroundColor: answer.isCorrect ? theme.palette.success.main : theme.palette.error.main,
                          width: 32,
                          height: 32
                        }}
                      >
                        {answer.isCorrect ? <CheckCircle /> : <Cancel />}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          Pytanie {index + 1}: {answer.question}
                        </Typography>
                      }
                      secondary={
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            <strong>Twoja odpowiedź:</strong> {answer.userAnswer}
                          </Typography>
                          {!answer.isCorrect && (
                            <Typography variant="body2" color="text.secondary">
                              <strong>Poprawna odpowiedź:</strong> {answer.correctAnswer}
                            </Typography>
                          )}
                        </Box>
                      }
                    />
                    <Box sx={{ textAlign: 'right' }}>
                      <Chip
                        label={`${answer.isCorrect ? answer.points : 0}/${answer.points} pkt`}
                        size="small"
                        color={answer.isCorrect ? 'success' : 'error'}
                        sx={{ fontWeight: 600 }}
                      />
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <Fade in={animationStep >= 3} timeout={1200}>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            startIcon={<Refresh />}
            onClick={onRetry}
            sx={{
              borderRadius: 3,
              textTransform: 'none',
              fontWeight: 600,
              px: 4,
              py: 1.5
            }}
          >
            Spróbuj ponownie
          </Button>
          <Button
            variant="outlined"
            startIcon={<Share />}
            onClick={onShare}
            sx={{
              borderRadius: 3,
              textTransform: 'none',
              fontWeight: 600,
              px: 4,
              py: 1.5
            }}
          >
            Udostępnij wynik
          </Button>
          <Button
            variant="outlined"
            startIcon={<Home />}
            onClick={onGoHome}
            sx={{
              borderRadius: 3,
              textTransform: 'none',
              fontWeight: 600,
              px: 4,
              py: 1.5
            }}
          >
            Powrót do menu
          </Button>
        </Box>
      </Fade>
    </Box>
  );
};

export default QuizResults;
