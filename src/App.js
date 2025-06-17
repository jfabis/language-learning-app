import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CustomThemeProvider } from './theme/ThemeProvider';
import Header from './components/common/Header';
import Navigation from './components/common/Navigation';
import Dashboard from './pages/Dashboard';
import Lessons from './pages/Lessons'; // Upewnij się że to jest poprawne
import Quiz from './pages/Quiz';
import Profile from './pages/Profile';
import { Box } from '@mui/material';

function App() {
  return (
    <CustomThemeProvider>
      <Router>
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Header />
          <Box sx={{ display: 'flex', flex: 1 }}>
            <Navigation />
            <Box 
              component="main" 
              sx={{ 
                flex: 1, 
                overflow: 'auto',
                backgroundColor: (theme) => theme.palette.background.default,
              }}
            >
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/lessons" element={<Lessons />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/progress" element={<Dashboard />} />
                <Route path="/achievements" element={<Dashboard />} />
              </Routes>
            </Box>
          </Box>
        </Box>
      </Router>
    </CustomThemeProvider>
  );
}

export default App;
