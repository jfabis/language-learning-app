import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Alert,
  useTheme,
  alpha,
  Fade
} from '@mui/material';
import { School } from '@mui/icons-material';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';

const Auth = () => {
  const theme = useTheme();
  const [isLogin, setIsLogin] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSwitchToRegister = () => {
    setIsLogin(false);
    setSuccessMessage('');
  };

  const handleSwitchToLogin = () => {
    setIsLogin(true);
    setSuccessMessage('');
  };

  const handleRegisterSuccess = () => {
    setSuccessMessage('Rejestracja zakończona sukcesem! Możesz się teraz zalogować.');
    setIsLogin(true);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
        display: 'flex',
        alignItems: 'center',
        py: 4
      }}
    >
      <Container maxWidth="sm">
        {/* Logo */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
            <School 
              sx={{ 
                fontSize: 48, 
                color: theme.palette.primary.main,
                mr: 2
              }} 
            />
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 800,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              KappaLingo
            </Typography>
          </Box>
          <Typography variant="h6" color="text.secondary">
            Twoja podróż z językami zaczyna się tutaj
          </Typography>
        </Box>

        {/* Success Message */}
        {successMessage && (
          <Fade in={Boolean(successMessage)} timeout={500}>
            <Alert 
              severity="success" 
              sx={{ mb: 3, borderRadius: 2 }}
              onClose={() => setSuccessMessage('')}
            >
              {successMessage}
            </Alert>
          </Fade>
        )}

        {/* Forms */}
        <Fade in={true} timeout={500} key={isLogin ? 'login' : 'register'}>
          <Box>
            {isLogin ? (
              <LoginForm onSwitchToRegister={handleSwitchToRegister} />
            ) : (
              <RegisterForm 
                onSwitchToLogin={handleSwitchToLogin}
                onSuccess={handleRegisterSuccess}
              />
            )}
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default Auth;
