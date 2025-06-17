import React from 'react';
import { IconButton } from '@mui/material';
import { Brightness7, Brightness4 } from '@mui/icons-material';
import { useTheme } from '../../theme/ThemeProvider';

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {darkMode ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
};

export default ThemeToggle;
