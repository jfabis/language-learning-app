import React from 'react';
import {
  IconButton,
  Tooltip,
  useTheme,
  alpha
} from '@mui/material';
import {
  DarkMode,
  LightMode
} from '@mui/icons-material';
import { useCustomTheme } from '../../theme/ThemeProvider';

const ThemeToggle = () => {
  const theme = useTheme();
  const { darkMode, toggleTheme } = useCustomTheme();

  return (
    <Tooltip 
      title={darkMode ? 'Przełącz na jasny motyw' : 'Przełącz na ciemny motyw'}
      arrow
    >
      <IconButton
        onClick={toggleTheme}
        sx={{
          width: 44,
          height: 44,
          borderRadius: 2,
          backgroundColor: alpha(theme.palette.background.default, 0.8),
          border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
          '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
            transform: 'scale(1.05)',
          },
          '& .MuiSvgIcon-root': {
            fontSize: 20,
            margin: 0,
            display: 'block'
          }
        }}
      >
        {darkMode ? (
          <LightMode sx={{ color: theme.palette.warning.main }} />
        ) : (
          <DarkMode sx={{ color: theme.palette.info.main }} />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
