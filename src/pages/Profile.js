import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  TextField,
  useTheme,
  alpha,
  Container,
  Chip,
  IconButton,
  Alert,
  LinearProgress,
  CircularProgress
} from '@mui/material';
import {
  Person,
  Edit,
  PhotoCamera,
  Save,
  Cancel,
  Star,
  EmojiEvents,
  LocalFireDepartment,
  Language,
  TrendingUp
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const theme = useTheme();
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    bio: user?.bio || ''
  });
  const [saveMessage, setSaveMessage] = useState('');

  // Dane użytkownika z wartościami domyślnymi
  const currentLevel = 12;
  const currentXP = 1247;
  const nextLevelXP = 1500;
  const streakDays = 7;
  const xpProgress = (currentXP / nextLevelXP) * 100;

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      location: user?.location || '',
      bio: user?.bio || ''
    });
  };

  const handleSave = () => {
    const result = updateProfile(editData);
    if (result.success) {
      setSaveMessage('Profil został zaktualizowany pomyślnie!');
      setIsEditing(false);
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      location: user?.location || '',
      bio: user?.bio || ''
    });
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Postęp w językach jak w zakładce Postępy
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

  const userStats = [
    {
      label: 'Ukończone lekcje',
      value: user?.profile?.completedLessons || 127,
      icon: <EmojiEvents />,
      color: theme.palette.primary.main
    },
    {
      label: 'Punkty XP',
      value: currentXP,
      icon: <Star />,
      color: theme.palette.warning.main
    },
    {
      label: 'Seria dni',
      value: streakDays,
      icon: <LocalFireDepartment />,
      color: '#ff6b35'
    },
    {
      label: 'Poziom',
      value: currentLevel,
      icon: <Language />,
      color: theme.palette.secondary.main
    }
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Professional Progress Header */}
      <Card
        sx={{
          mb: 4,
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          borderRadius: 3,
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {/* Gradient Overlay */}
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

        <CardContent sx={{ p: 4, position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            {/* Streak Counter */}
            <Grid item xs={12} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1,
                    p: 2,
                    borderRadius: 3,
                    background: `linear-gradient(135deg, ${alpha('#ff6b35', 0.2)}, ${alpha('#ff6b35', 0.1)})`,
                    border: `2px solid ${alpha('#ff6b35', 0.3)}`,
                    mb: 1
                  }}
                >
                  <LocalFireDepartment 
                    sx={{ 
                      fontSize: 32, 
                      color: '#ff6b35',
                      filter: 'drop-shadow(0 2px 4px rgba(255, 107, 53, 0.3))',
                      animation: 'flicker 2s infinite alternate',
                      '@keyframes flicker': {
                        '0%': { opacity: 1 },
                        '100%': { opacity: 0.8 }
                      }
                    }} 
                  />
                  <Typography 
                    variant="h3" 
                    sx={{ 
                      fontWeight: 800, 
                      color: '#ff6b35',
                      textShadow: '0 2px 4px rgba(255, 107, 53, 0.3)'
                    }}
                  >
                    {streakDays}
                  </Typography>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#ff6b35' }}>
                  Dni z rzędu
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Kontynuuj serię!
                </Typography>
              </Box>
            </Grid>

            {/* Level Progress - Center */}
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: 'center' }}>
                {/* Level Badge */}
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1,
                    mb: 2,
                    p: 1.5,
                    borderRadius: 3,
                    background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${alpha(theme.palette.secondary.main, 0.8)})`,
                    boxShadow: `0 8px 24px ${alpha(theme.palette.secondary.main, 0.3)}`
                  }}
                >
                  <Star sx={{ color: 'white', fontSize: 24 }} />
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontWeight: 800, 
                      color: 'white',
                      textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    Level {currentLevel}
                  </Typography>
                </Box>

                {/* Minimalistyczny XP Progress Bar - BEZ KROPKI */}
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                      Postęp do następnego poziomu
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: theme.palette.secondary.main }}>
                      {Math.round(xpProgress)}%
                    </Typography>
                  </Box>
                  
                  <LinearProgress
                    variant="determinate"
                    value={xpProgress}
                    sx={{
                      height: 16,
                      borderRadius: 8,
                      backgroundColor: alpha(theme.palette.secondary.main, 0.2),
                      '& .MuiLinearProgress-bar': {
                        background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                        borderRadius: 8,
                        // USUNIĘTO SHIMMER EFFECT I GLOW EFFECT
                      }
                    }}
                  />
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.secondary.main }}>
                      {currentXP.toLocaleString()} XP
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {nextLevelXP.toLocaleString()} XP
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="body2" color="text.secondary">
                  Jeszcze {(nextLevelXP - currentXP).toLocaleString()} XP do Level {currentLevel + 1}
                </Typography>
              </Box>
            </Grid>

            {/* Total Stats */}
            <Grid item xs={12} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 800, color: theme.palette.primary.main, mb: 1 }}>
                  {currentXP.toLocaleString()}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Łączne XP
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Wszystkie zdobyte punkty
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Success Message */}
      {saveMessage && (
        <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
          {saveMessage}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Left Column - Profile Info */}
        <Grid item xs={12} md={4}>
          {/* Profile Card */}
          <Card
            sx={{
              background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              borderRadius: 3,
              mb: 3
            }}
          >
            <CardContent sx={{ p: 4, textAlign: 'center' }}>
              <Box sx={{ position: 'relative', display: 'inline-block', mb: 3 }}>
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    mx: 'auto',
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    fontSize: '3rem',
                    fontWeight: 700
                  }}
                >
                  {user?.firstName ? user.firstName.charAt(0).toUpperCase() : 'U'}
                </Avatar>
                <IconButton
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    backgroundColor: theme.palette.primary.main,
                    color: 'white',
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.8),
                    }
                  }}
                >
                  <PhotoCamera />
                </IconButton>
              </Box>

              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                {user?.firstName || 'Użytkownik'} {user?.lastName || ''}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                @{user?.username || 'username'}
              </Typography>
              <Chip
                label="Premium"
                sx={{
                  backgroundColor: alpha(theme.palette.warning.main, 0.2),
                  color: theme.palette.warning.main,
                  fontWeight: 600
                }}
              />
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <Grid container spacing={2}>
            {userStats.map((stat, index) => (
              <Grid item xs={6} key={index}>
                <Card
                  sx={{
                    background: `linear-gradient(135deg, ${alpha(stat.color, 0.1)}, ${alpha(stat.color, 0.05)})`,
                    border: `1px solid ${alpha(stat.color, 0.2)}`,
                    borderRadius: 2,
                    textAlign: 'center'
                  }}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Avatar
                      sx={{
                        backgroundColor: stat.color,
                        mx: 'auto',
                        mb: 1,
                        width: 40,
                        height: 40
                      }}
                    >
                      {stat.icon}
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: stat.color }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Right Column - Profile Details */}
        <Grid item xs={12} md={8}>
          {/* Personal Information */}
          <Card sx={{ mb: 3, borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Informacje osobiste
                </Typography>
                {!isEditing ? (
                  <Button
                    startIcon={<Edit />}
                    onClick={handleEdit}
                    sx={{ textTransform: 'none' }}
                  >
                    Edytuj
                  </Button>
                ) : (
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      startIcon={<Save />}
                      variant="contained"
                      onClick={handleSave}
                      sx={{ textTransform: 'none' }}
                    >
                      Zapisz
                    </Button>
                    <Button
                      startIcon={<Cancel />}
                      onClick={handleCancel}
                      sx={{ textTransform: 'none' }}
                    >
                      Anuluj
                    </Button>
                  </Box>
                )}
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  {isEditing ? (
                    <TextField
                      fullWidth
                      label="Imię"
                      value={editData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  ) : (
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        Imię
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {user?.firstName || 'Nie podano'}
                      </Typography>
                    </Box>
                  )}
                </Grid>

                <Grid item xs={12} sm={6}>
                  {isEditing ? (
                    <TextField
                      fullWidth
                      label="Nazwisko"
                      value={editData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  ) : (
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        Nazwisko
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {user?.lastName || 'Nie podano'}
                      </Typography>
                    </Box>
                  )}
                </Grid>

                <Grid item xs={12} sm={6}>
                  {isEditing ? (
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      value={editData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  ) : (
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        Email
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {user?.email || 'Nie podano'}
                      </Typography>
                    </Box>
                  )}
                </Grid>

                <Grid item xs={12} sm={6}>
                  {isEditing ? (
                    <TextField
                      fullWidth
                      label="Telefon"
                      value={editData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  ) : (
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        Telefon
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {user?.phone || 'Nie podano'}
                      </Typography>
                    </Box>
                  )}
                </Grid>

                <Grid item xs={12}>
                  {isEditing ? (
                    <TextField
                      fullWidth
                      label="Lokalizacja"
                      value={editData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  ) : (
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        Lokalizacja
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {user?.location || 'Nie podano'}
                      </Typography>
                    </Box>
                  )}
                </Grid>

                <Grid item xs={12}>
                  {isEditing ? (
                    <TextField
                      fullWidth
                      label="O mnie"
                      multiline
                      rows={3}
                      value={editData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  ) : (
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        O mnie
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {user?.bio || 'Brak opisu'}
                      </Typography>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Advanced Language Progress */}
          <Card sx={{ borderRadius: 3 }}>
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
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
