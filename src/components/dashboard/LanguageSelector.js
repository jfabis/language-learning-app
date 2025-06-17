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
  Close
} from '@mui/icons-material';

const LanguageSelector = () => {
  const theme = useTheme();
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [addLanguageOpen, setAddLanguageOpen] = useState(false);

  const languages = [
    {
      id: 'english',
      name: 'Angielski',
      nativeName: 'English',
      flag: '🇺🇸',
      level: 'B2',
      progress: 75,
      totalLessons: 120,
      completedLessons: 90,
      streak: 7,
      weeklyGoal: 5,
      weeklyProgress: 4,
      nextLesson: 'Present Perfect Continuous',
      estimatedTime: '15 min',
      color: theme.palette.primary.main,
      isActive: true
    },
    {
      id: 'spanish',
      name: 'Hiszpański',
      nativeName: 'Español',
      flag: '🇪🇸',
      level: 'A2',
      progress: 45,
      totalLessons: 80,
      completedLessons: 36,
      streak: 3,
      weeklyGoal: 3,
      weeklyProgress: 2,
      nextLesson: 'Pretérito Perfecto',
      estimatedTime: '12 min',
      color: theme.palette.warning.main,
      isActive: true
    },
    {
      id: 'french',
      name: 'Francuski',
      nativeName: 'Français',
      flag: '🇫🇷',
      level: 'A1',
      progress: 20,
      totalLessons: 60,
      completedLessons: 12,
      streak: 1,
      weeklyGoal: 2,
      weeklyProgress: 1,
      nextLesson: 'Les articles définis',
      estimatedTime: '10 min',
      color: theme.palette.info.main,
      isActive: true
    }
  ];

  const availableLanguages = [
    { id: 'german', name: 'Niemiecki', nativeName: 'Deutsch', flag: '🇩🇪' },
    { id: 'italian', name: 'Włoski', nativeName: 'Italiano', flag: '🇮🇹' },
    { id: 'portuguese', name: 'Portugalski', nativeName: 'Português', flag: '🇵🇹' },
    { id: 'russian', name: 'Rosyjski', nativeName: 'Русский', flag: '🇷🇺' },
    { id: 'japanese', name: 'Japoński', nativeName: '日本語', flag: '🇯🇵' },
    { id: 'chinese', name: 'Chiński', nativeName: '中文', flag: '🇨🇳' },
  ];

  const currentLanguage = languages.find(lang => lang.id === selectedLanguage);

  const handleAddLanguage = () => {
    setAddLanguageOpen(true);
  };

  return (
    <>
      <Card
        sx={{
          background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.8)}, ${alpha(theme.palette.background.paper, 0.95)})`,
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          borderRadius: 3,
          backdropFilter: 'blur(20px)',
        }}
      >
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
            <Button
              startIcon={<Add />}
              variant="outlined"
              size="small"
              onClick={handleAddLanguage}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 500
              }}
            >
              Dodaj język
            </Button>
          }
        />

        <CardContent>
          {/* Selektor języków */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {languages.map((language) => (
              <Grid item xs={12} sm={4} key={language.id}>
                <Card
                  sx={{
                    cursor: 'pointer',
                    border: selectedLanguage === language.id 
                      ? `2px solid ${language.color}`
                      : `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    background: selectedLanguage === language.id
                      ? `linear-gradient(135deg, ${alpha(language.color, 0.1)}, ${alpha(language.color, 0.05)})`
                      : 'transparent',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: `0 8px 25px ${alpha(language.color, 0.15)}`,
                    }
                  }}
                  onClick={() => setSelectedLanguage(language.id)}
                >
                  <CardContent sx={{ p: 2, textAlign: 'center' }}>
                    <Typography sx={{ fontSize: 32, mb: 1 }}>
                      {language.flag}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {language.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {language.nativeName}
                    </Typography>
                    <Chip
                      label={language.level}
                      size="small"
                      sx={{
                        backgroundColor: alpha(language.color, 0.2),
                        color: language.color,
                        fontWeight: 600
                      }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Szczegóły wybranego języka */}
          {currentLanguage && (
            <Box
              sx={{
                p: 3,
                borderRadius: 3,
                background: `linear-gradient(135deg, ${alpha(currentLanguage.color, 0.08)}, ${alpha(currentLanguage.color, 0.03)})`,
                border: `1px solid ${alpha(currentLanguage.color, 0.2)}`,
              }}
            >
              <Grid container spacing={3}>
                {/* Lewa kolumna - Postęp */}
                <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Ogólny postęp
                      </Typography>
                      <Typography variant="h6" sx={{ color: currentLanguage.color, fontWeight: 700 }}>
                        {currentLanguage.progress}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={currentLanguage.progress}
                      sx={{
                        height: 12,
                        borderRadius: 6,
                        backgroundColor: alpha(currentLanguage.color, 0.1),
                        '& .MuiLinearProgress-bar': {
                          background: `linear-gradient(90deg, ${currentLanguage.color}, ${alpha(currentLanguage.color, 0.8)})`,
                          borderRadius: 6,
                        }
                      }}
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {currentLanguage.completedLessons} z {currentLanguage.totalLessons} lekcji ukończonych
                    </Typography>
                  </Box>

                  {/* Statystyki */}
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, backgroundColor: alpha(theme.palette.background.default, 0.5) }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                          <EmojiEvents sx={{ color: '#ff6b35', mr: 0.5 }} />
                          <Typography variant="h5" sx={{ fontWeight: 700, color: '#ff6b35' }}>
                            {currentLanguage.streak}
                          </Typography>
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                          Dni z rzędu
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, backgroundColor: alpha(theme.palette.background.default, 0.5) }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                          <Star sx={{ color: theme.palette.warning.main, mr: 0.5 }} />
                          <Typography variant="h5" sx={{ fontWeight: 700, color: theme.palette.warning.main }}>
                            {currentLanguage.level}
                          </Typography>
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                          Poziom
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>

                {/* Prawa kolumna - Następna lekcja */}
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      p: 3,
                      borderRadius: 2,
                      background: `linear-gradient(135deg, ${alpha(currentLanguage.color, 0.1)}, ${alpha(currentLanguage.color, 0.05)})`,
                      border: `1px solid ${alpha(currentLanguage.color, 0.2)}`,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                        Następna lekcja
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: currentLanguage.color }}>
                        {currentLanguage.nextLesson}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <Schedule sx={{ fontSize: 16, color: theme.palette.text.secondary }} />
                        <Typography variant="body2" color="text.secondary">
                          Szacowany czas: {currentLanguage.estimatedTime}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Button
                      variant="contained"
                      startIcon={<PlayArrow />}
                      fullWidth
                      sx={{
                        borderRadius: 2,
                        py: 1.5,
                        background: `linear-gradient(135deg, ${currentLanguage.color}, ${alpha(currentLanguage.color, 0.8)})`,
                        textTransform: 'none',
                        fontWeight: 600,
                        fontSize: '1rem',
                        '&:hover': {
                          background: `linear-gradient(135deg, ${alpha(currentLanguage.color, 0.9)}, ${alpha(currentLanguage.color, 0.7)})`,
                        }
                      }}
                    >
                      Rozpocznij lekcję
                    </Button>
                  </Box>
                </Grid>
              </Grid>

              {/* Cel tygodniowy */}
              <Box sx={{ mt: 3, p: 2, borderRadius: 2, backgroundColor: alpha(theme.palette.background.default, 0.3) }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Cel tygodniowy
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: currentLanguage.color }}>
                    {currentLanguage.weeklyProgress} / {currentLanguage.weeklyGoal} lekcji
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(currentLanguage.weeklyProgress / currentLanguage.weeklyGoal) * 100}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: alpha(currentLanguage.color, 0.1),
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: currentLanguage.color,
                      borderRadius: 4,
                    }
                  }}
                />
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Dialog dodawania języka */}
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
          <List>
            {availableLanguages.map((language) => (
              <ListItem key={language.id} disablePadding>
                <ListItemButton
                  sx={{
                    borderRadius: 2,
                    mb: 1,
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    }
                  }}
                  onClick={() => {
                    // Tutaj logika dodawania języka
                    setAddLanguageOpen(false);
                  }}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ backgroundColor: 'transparent', fontSize: 24 }}>
                      {language.flag}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={language.name}
                    secondary={language.nativeName}
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LanguageSelector;
