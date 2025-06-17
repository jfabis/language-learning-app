import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CustomThemeProvider } from './theme/ThemeProvider';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/common/Header';
import Navigation from './components/common/Navigation';
import Dashboard from './pages/Dashboard';
import Lessons from './pages/Lessons';
import Quiz from './pages/Quiz';
import Profile from './pages/Profile';
import Progress from './pages/Progress';
import Achievements from './pages/Achievements';
import Auth from './pages/Auth';
import { Box, CircularProgress } from '@mui/material';

// Komponent do sprawdzania autentykacji
const AuthChecker = ({ children }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    // Sprawdź czy użytkownik jest zalogowany
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh' 
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Auth />;
  }

  return children;
};

function App() {
  return (
    <CustomThemeProvider>
      <AuthProvider>
        <Router>
          <AuthChecker>
            <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
              <Header />
              <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                <Navigation />
                <Box 
                  component="main" 
                  sx={{ 
                    flex: 1, 
                    overflow: 'auto',
                    backgroundColor: (theme) => theme.palette.background.default,
                    position: 'relative',
                    zIndex: 1
                  }}
                >
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/lessons" element={<Lessons />} />
                    <Route path="/quiz" element={<Quiz />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/progress" element={<Progress />} />
                    <Route path="/achievements" element={<Achievements />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </Box>
              </Box>
            </Box>
          </AuthChecker>
        </Router>
      </AuthProvider>
    </CustomThemeProvider>
  );
}

export default App;
