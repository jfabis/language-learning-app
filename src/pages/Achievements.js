import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  useTheme,
  alpha,
  Container,
  Avatar,
  Chip,
  Button,
  LinearProgress,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fade,
  Grow
} from '@mui/material';
import {
  EmojiEvents,
  Star,
  Lock,
  CheckCircle,
  School,
  Quiz,
  MenuBook,
  LocalFireDepartment,
  Speed,
  Timer,
  Language,
  Headphones,
  RecordVoiceOver,
  TrendingUp,
  Flag,
  Diamond,
  WorkspacePremium,
  Security,
  Close,
  Info
} from '@mui/icons-material';

const Achievements = () => {
  const theme = useTheme();
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('english');

  // Dane osiągnięć dla każdego języka
  const achievementTrees = {
    english: {
      name: 'Angielski',
      flag: '🇺🇸',
      color: theme.palette.primary.main,
      totalPoints: 1247,
      completedAchievements: 12,
      totalAchievements: 25,
      categories: [
        {
          id: 'grammar',
          name: 'Gramatyka',
          icon: <MenuBook />,
          color: theme.palette.primary.main,
          achievements: [
            {
              id: 'grammar_1',
              title: 'Pierwsze Kroki',
              description: 'Ukończ pierwszą lekcję gramatyki',
              icon: <School />,
              points: 50,
              unlocked: true,
              completed: true,
              progress: 100,
              requirement: 'Ukończ 1 lekcję gramatyki',
              tier: 'bronze'
            },
            {
              id: 'grammar_2',
              title: 'Grammar Novice',
              description: 'Ukończ 10 lekcji gramatyki',
              icon: <MenuBook />,
              points: 100,
              unlocked: true,
              completed: true,
              progress: 100,
              requirement: 'Ukończ 10 lekcji gramatyki',
              tier: 'bronze'
            },
            {
              id: 'grammar_3',
              title: 'Grammar Expert',
              description: 'Ukończ 25 lekcji gramatyki',
              icon: <Star />,
              points: 200,
              unlocked: true,
              completed: false,
              progress: 68,
              requirement: 'Ukończ 25 lekcji gramatyki (17/25)',
              tier: 'silver'
            },
            {
              id: 'grammar_4',
              title: 'Grammar Master',
              description: 'Ukończ 50 lekcji gramatyki',
              icon: <WorkspacePremium />,
              points: 500,
              unlocked: false,
              completed: false,
              progress: 0,
              requirement: 'Ukończ 50 lekcji gramatyki',
              tier: 'gold'
            }
          ]
        },
        {
          id: 'vocabulary',
          name: 'Słownictwo',
          icon: <Quiz />,
          color: theme.palette.success.main,
          achievements: [
            {
              id: 'vocab_1',
              title: 'Word Collector',
              description: 'Naucz się 100 nowych słów',
              icon: <Quiz />,
              points: 75,
              unlocked: true,
              completed: true,
              progress: 100,
              requirement: 'Naucz się 100 słów',
              tier: 'bronze'
            },
            {
              id: 'vocab_2',
              title: 'Vocabulary Builder',
              description: 'Naucz się 500 nowych słów',
              icon: <Star />,
              points: 150,
              unlocked: true,
              completed: false,
              progress: 45,
              requirement: 'Naucz się 500 słów (225/500)',
              tier: 'silver'
            },
            {
              id: 'vocab_3',
              title: 'Word Master',
              description: 'Naucz się 1000 nowych słów',
              icon: <Diamond />,
              points: 300,
              unlocked: false,
              completed: false,
              progress: 0,
              requirement: 'Naucz się 1000 słów',
              tier: 'gold'
            }
          ]
        },
        {
          id: 'speaking',
          name: 'Wymowa',
          icon: <RecordVoiceOver />,
          color: theme.palette.warning.main,
          achievements: [
            {
              id: 'speak_1',
              title: 'First Words',
              description: 'Ukończ pierwsze ćwiczenie wymowy',
              icon: <RecordVoiceOver />,
              points: 50,
              unlocked: true,
              completed: true,
              progress: 100,
              requirement: 'Ukończ 1 ćwiczenie wymowy',
              tier: 'bronze'
            },
            {
              id: 'speak_2',
              title: 'Pronunciation Pro',
              description: 'Zdobądź 90% w 10 ćwiczeniach wymowy',
              icon: <Star />,
              points: 200,
              unlocked: true,
              completed: false,
              progress: 30,
              requirement: 'Zdobądź 90% w 10 ćwiczeniach (3/10)',
              tier: 'silver'
            }
          ]
        },
        {
          id: 'listening',
          name: 'Słuchanie',
          icon: <Headphones />,
          color: theme.palette.info.main,
          achievements: [
            {
              id: 'listen_1',
              title: 'Good Listener',
              description: 'Ukończ 5 ćwiczeń słuchania',
              icon: <Headphones />,
              points: 75,
              unlocked: true,
              completed: true,
              progress: 100,
              requirement: 'Ukończ 5 ćwiczeń słuchania',
              tier: 'bronze'
            },
            {
              id: 'listen_2',
              title: 'Audio Expert',
              description: 'Zdobądź 95% w ćwiczeniach słuchania',
              icon: <Star />,
              points: 150,
              unlocked: false,
              completed: false,
              progress: 0,
              requirement: 'Zdobądź 95% średniej w słuchaniu',
              tier: 'silver'
            }
          ]
        },
        {
          id: 'streaks',
          name: 'Serie',
          icon: <LocalFireDepartment />,
          color: '#ff6b35',
          achievements: [
            {
              id: 'streak_1',
              title: 'Getting Started',
              description: 'Naucz się przez 3 dni z rzędu',
              icon: <LocalFireDepartment />,
              points: 50,
              unlocked: true,
              completed: true,
              progress: 100,
              requirement: '3 dni z rzędu',
              tier: 'bronze'
            },
            {
              id: 'streak_2',
              title: 'Week Warrior',
              description: 'Naucz się przez 7 dni z rzędu',
              icon: <LocalFireDepartment />,
              points: 100,
              unlocked: true,
              completed: true,
              progress: 100,
              requirement: '7 dni z rzędu',
              tier: 'bronze'
            },
            {
              id: 'streak_3',
              title: 'Month Master',
              description: 'Naucz się przez 30 dni z rzędu',
              icon: <WorkspacePremium />,
              points: 500,
              unlocked: true,
              completed: false,
              progress: 23,
              requirement: '30 dni z rzędu (7/30)',
              tier: 'gold'
            }
          ]
        }
      ]
    },
    spanish: {
      name: 'Hiszpański',
      flag: '🇪🇸',
      color: theme.palette.warning.main,
      totalPoints: 634,
      completedAchievements: 6,
      totalAchievements: 20,
      categories: [
        {
          id: 'grammar',
          name: 'Gramática',
          icon: <MenuBook />,
          color: theme.palette.warning.main,
          achievements: [
            {
              id: 'grammar_1',
              title: 'Primeros Pasos',
              description: 'Ukończ pierwszą lekcję hiszpańskiej gramatyki',
              icon: <School />,
              points: 50,
              unlocked: true,
              completed: true,
              progress: 100,
              requirement: 'Ukończ 1 lekcję gramatyki',
              tier: 'bronze'
            },
            {
              id: 'grammar_2',
              title: 'Conjugation King',
              description: 'Opanuj koniugację czasowników regularnych',
              icon: <Star />,
              points: 150,
              unlocked: true,
              completed: false,
              progress: 60,
              requirement: 'Ukończ 15 lekcji koniugacji (9/15)',
              tier: 'silver'
            }
          ]
        }
      ]
    },
    french: {
      name: 'Francuski',
      flag: '🇫🇷',
      color: theme.palette.info.main,
      totalPoints: 234,
      completedAchievements: 3,
      totalAchievements: 15,
      categories: [
        {
          id: 'grammar',
          name: 'Grammaire',
          icon: <MenuBook />,
          color: theme.palette.info.main,
          achievements: [
            {
              id: 'grammar_1',
              title: 'Bonjour!',
              description: 'Ukończ pierwszą lekcję francuskiego',
              icon: <School />,
              points: 50,
              unlocked: true,
              completed: true,
              progress: 100,
              requirement: 'Ukończ 1 lekcję',
              tier: 'bronze'
            }
          ]
        }
      ]
    }
  };

  const languages = Object.keys(achievementTrees);
  const currentTree = achievementTrees[selectedLanguage];

  const getTierColor = (tier) => {
    switch (tier) {
      case 'bronze': return '#cd7f32';
      case 'silver': return '#c0c0c0';
      case 'gold': return '#ffd700';
      case 'diamond': return '#b9f2ff';
      default: return theme.palette.text.secondary;
    }
  };

  const getTierIcon = (tier) => {
  switch (tier) {
    case 'bronze': return <Security />; // Zmienione z Military na Security
    case 'silver': return <Star />;
    case 'gold': return <WorkspacePremium />; // Zmienione z Crown na WorkspacePremium
    case 'diamond': return <Diamond />;
    default: return <EmojiEvents />;
  }
};


  const handleAchievementClick = (achievement) => {
    setSelectedAchievement(achievement);
  };

  const renderAchievementCard = (achievement, categoryColor) => (
    <Grow in={true} timeout={300} key={achievement.id}>
      <Card
        onClick={() => handleAchievementClick(achievement)}
        sx={{
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 3,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          background: achievement.completed
            ? `linear-gradient(135deg, ${alpha(categoryColor, 0.2)}, ${alpha(categoryColor, 0.1)})`
            : achievement.unlocked
            ? `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(theme.palette.background.paper, 0.95)})`
            : `linear-gradient(135deg, ${alpha(theme.palette.text.secondary, 0.1)}, ${alpha(theme.palette.text.secondary, 0.05)})`,
          border: achievement.completed
            ? `2px solid ${categoryColor}`
            : achievement.unlocked
            ? `1px solid ${alpha(theme.palette.divider, 0.2)}`
            : `1px solid ${alpha(theme.palette.text.secondary, 0.1)}`,
          filter: achievement.unlocked ? 'none' : 'grayscale(100%)',
          opacity: achievement.unlocked ? 1 : 0.6,
          '&:hover': achievement.unlocked ? {
            transform: 'translateY(-8px) scale(1.02)',
            boxShadow: `0 20px 40px ${alpha(categoryColor, 0.3)}`,
          } : {}
        }}
      >
        {/* Tier Badge */}
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 2
          }}
        >
          <Avatar
            sx={{
              width: 24,
              height: 24,
              backgroundColor: getTierColor(achievement.tier),
              fontSize: 12
            }}
          >
            {getTierIcon(achievement.tier)}
          </Avatar>
        </Box>

        {/* Lock Overlay */}
        {!achievement.unlocked && (
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 3
            }}
          >
            <Lock sx={{ fontSize: 40, color: theme.palette.text.secondary }} />
          </Box>
        )}

        {/* Completed Badge */}
        {achievement.completed && (
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              left: 8,
              zIndex: 2
            }}
          >
            <CheckCircle sx={{ color: categoryColor, fontSize: 24 }} />
          </Box>
        )}

        <CardContent sx={{ p: 3, textAlign: 'center' }}>
          <Avatar
            sx={{
              width: 64,
              height: 64,
              mx: 'auto',
              mb: 2,
              backgroundColor: achievement.completed ? categoryColor : theme.palette.text.secondary,
              transform: achievement.completed ? 'scale(1.1)' : 'scale(1)',
              transition: 'transform 0.3s ease'
            }}
          >
            {achievement.icon}
          </Avatar>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              mb: 1,
              color: achievement.completed ? categoryColor : theme.palette.text.primary
            }}
          >
            {achievement.title}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2, minHeight: 40 }}
          >
            {achievement.description}
          </Typography>

          {achievement.unlocked && !achievement.completed && (
            <Box sx={{ mb: 2 }}>
              <LinearProgress
                variant="determinate"
                value={achievement.progress}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: alpha(categoryColor, 0.2),
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: categoryColor,
                    borderRadius: 3,
                  }
                }}
              />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                {achievement.progress}% ukończone
              </Typography>
            </Box>
          )}

          <Chip
            label={`${achievement.points} XP`}
            size="small"
            sx={{
              backgroundColor: alpha(theme.palette.warning.main, 0.2),
              color: theme.palette.warning.main,
              fontWeight: 600
            }}
          />
        </CardContent>
      </Card>
    </Grow>
  );

  const renderLanguageSelector = () => (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        Wybierz język
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        {languages.map((langKey) => {
          const lang = achievementTrees[langKey];
          const isSelected = selectedLanguage === langKey;
          
          return (
            <Card
              key={langKey}
              onClick={() => setSelectedLanguage(langKey)}
              sx={{
                cursor: 'pointer',
                minWidth: 200,
                border: isSelected ? `2px solid ${lang.color}` : `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                borderRadius: 2,
                transition: 'all 0.3s ease',
                background: isSelected 
                  ? `linear-gradient(135deg, ${alpha(lang.color, 0.1)}, ${alpha(lang.color, 0.05)})`
                  : 'transparent',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: `0 8px 25px ${alpha(lang.color, 0.2)}`,
                }
              }}
            >
              <CardContent sx={{ p: 2, textAlign: 'center' }}>
                <Typography sx={{ fontSize: 24, mb: 1 }}>{lang.flag}</Typography>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  {lang.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {lang.completedAchievements}/{lang.totalAchievements} osiągnięć
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.warning.main }}>
                  {lang.totalPoints} XP
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
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
        Osiągnięcia
      </Typography>

      {/* Language Selector */}
      {renderLanguageSelector()}

      {/* Achievement Categories */}
      {currentTree.categories.map((category) => (
        <Box key={category.id} sx={{ mb: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar
              sx={{
                backgroundColor: category.color,
                mr: 2,
                width: 40,
                height: 40
              }}
            >
              {category.icon}
            </Avatar>
            <Typography variant="h5" sx={{ fontWeight: 600, color: category.color }}>
              {category.name}
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {category.achievements.map((achievement) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={achievement.id}>
                {renderAchievementCard(achievement, category.color)}
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}

      {/* Achievement Detail Dialog */}
      <Dialog
        open={Boolean(selectedAchievement)}
        onClose={() => setSelectedAchievement(null)}
        maxWidth="sm"
        fullWidth
      >
        {selectedAchievement && (
          <>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                  sx={{
                    backgroundColor: selectedAchievement.completed ? currentTree.color : theme.palette.text.secondary,
                    mr: 2,
                    width: 48,
                    height: 48
                  }}
                >
                  {selectedAchievement.icon}
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {selectedAchievement.title}
                  </Typography>
                  <Chip
                    label={selectedAchievement.tier.toUpperCase()}
                    size="small"
                    sx={{
                      backgroundColor: alpha(getTierColor(selectedAchievement.tier), 0.2),
                      color: getTierColor(selectedAchievement.tier),
                      fontWeight: 600
                    }}
                  />
                </Box>
              </Box>
              <IconButton onClick={() => setSelectedAchievement(null)}>
                <Close />
              </IconButton>
            </DialogTitle>

            <DialogContent>
              <Typography variant="body1" sx={{ mb: 3 }}>
                {selectedAchievement.description}
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  <strong>Wymagania:</strong> {selectedAchievement.requirement}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Nagroda:</strong> {selectedAchievement.points} XP
                </Typography>
              </Box>

              {selectedAchievement.unlocked && !selectedAchievement.completed && (
                <Box>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
                    Postęp: {selectedAchievement.progress}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={selectedAchievement.progress}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: alpha(currentTree.color, 0.2),
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: currentTree.color,
                        borderRadius: 4,
                      }
                    }}
                  />
                </Box>
              )}

              {selectedAchievement.completed && (
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: alpha(theme.palette.success.main, 0.1),
                    border: `1px solid ${alpha(theme.palette.success.main, 0.3)}`,
                    textAlign: 'center'
                  }}
                >
                  <CheckCircle sx={{ color: theme.palette.success.main, fontSize: 32, mb: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.success.main }}>
                    Osiągnięcie Ukończone!
                  </Typography>
                </Box>
              )}
            </DialogContent>

            <DialogActions>
              <Button onClick={() => setSelectedAchievement(null)}>
                Zamknij
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default Achievements;
