import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  LinearProgress,
  IconButton,
  Chip,
  useTheme,
  alpha,
  Tooltip,
  Fade
} from '@mui/material';
import {
  PlayArrow,
  Pause,
  Stop,
  Timer,
  Warning,
  Speed
} from '@mui/icons-material';

const QuizTimer = ({
  initialTime = 300, // 5 minut w sekundach
  onTimeUp,
  onTick,
  isActive = true,
  showControls = false,
  warningThreshold = 60, // ostrzeżenie przy 1 minucie
  criticalThreshold = 30, // krytyczne przy 30 sekundach
  autoStart = true,
  format = 'mm:ss' // 'mm:ss' lub 'ss'
}) => {
  const theme = useTheme();
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(autoStart && isActive);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && isActive && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1;
          
          // Callback z aktualnym czasem
          onTick && onTick(newTime);
          
          // Sprawdź czy czas się skończył
          if (newTime <= 0) {
            setIsRunning(false);
            onTimeUp && onTimeUp();
            return 0;
          }
          
          return newTime;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, isActive, isPaused, onTick, onTimeUp]);

  useEffect(() => {
    setIsRunning(autoStart && isActive);
  }, [isActive, autoStart]);

  const formatTime = (seconds) => {
    if (format === 'ss') {
      return seconds.toString();
    }
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getTimeColor = () => {
    if (timeLeft <= criticalThreshold) {
      return theme.palette.error.main;
    } else if (timeLeft <= warningThreshold) {
      return theme.palette.warning.main;
    }
    return theme.palette.success.main;
  };

  const getTimeStatus = () => {
    if (timeLeft <= criticalThreshold) {
      return { label: 'Krytyczne!', icon: <Warning />, severity: 'error' };
    } else if (timeLeft <= warningThreshold) {
      return { label: 'Uwaga!', icon: <Warning />, severity: 'warning' };
    }
    return { label: 'OK', icon: <Timer />, severity: 'success' };
  };

  const handlePlayPause = () => {
    if (isRunning) {
      setIsPaused(!isPaused);
    } else {
      setIsRunning(true);
      setIsPaused(false);
    }
  };

  const handleStop = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTimeLeft(initialTime);
  };

  const percentage = (timeLeft / initialTime) * 100;
  const timeColor = getTimeColor();
  const timeStatus = getTimeStatus();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
        p: 2,
        borderRadius: 3,
        backgroundColor: alpha(timeColor, 0.1),
        border: `2px solid ${alpha(timeColor, 0.3)}`,
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Pulsing Background for Critical Time */}
      {timeLeft <= criticalThreshold && isRunning && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: alpha(theme.palette.error.main, 0.1),
            animation: 'pulse 1s infinite',
            '@keyframes pulse': {
              '0%': { opacity: 0.3 },
              '50%': { opacity: 0.7 },
              '100%': { opacity: 0.3 }
            }
          }}
        />
      )}

      {/* Status Chip */}
      <Fade in={timeLeft <= warningThreshold} timeout={300}>
        <Chip
          icon={timeStatus.icon}
          label={timeStatus.label}
          size="small"
          color={timeStatus.severity}
          sx={{
            fontWeight: 600,
            fontSize: '0.7rem',
            position: 'relative',
            zIndex: 1
          }}
        />
      </Fade>

      {/* Main Timer Display */}
      <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            color: timeColor,
            fontFamily: 'monospace',
            textShadow: `0 2px 8px ${alpha(timeColor, 0.3)}`,
            transition: 'all 0.3s ease',
            transform: timeLeft <= criticalThreshold ? 'scale(1.1)' : 'scale(1)'
          }}
        >
          {formatTime(timeLeft)}
        </Typography>
        
        {format === 'mm:ss' && (
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
            min:sek
          </Typography>
        )}
      </Box>

      {/* Progress Bar */}
      <Box sx={{ width: '100%', position: 'relative', zIndex: 1 }}>
        <LinearProgress
          variant="determinate"
          value={percentage}
          sx={{
            height: 8,
            borderRadius: 4,
            backgroundColor: alpha(timeColor, 0.2),
            '& .MuiLinearProgress-bar': {
              backgroundColor: timeColor,
              borderRadius: 4,
              transition: 'background-color 0.3s ease'
            }
          }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
          <Typography variant="caption" color="text.secondary">
            0:00
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {formatTime(initialTime)}
          </Typography>
        </Box>
      </Box>

      {/* Controls */}
      {showControls && (
        <Box sx={{ display: 'flex', gap: 1, position: 'relative', zIndex: 1 }}>
          <Tooltip title={isRunning && !isPaused ? 'Pauza' : 'Start'}>
            <IconButton
              onClick={handlePlayPause}
              sx={{
                backgroundColor: alpha(timeColor, 0.2),
                color: timeColor,
                '&:hover': {
                  backgroundColor: alpha(timeColor, 0.3),
                  transform: 'scale(1.1)'
                }
              }}
            >
              {isRunning && !isPaused ? <Pause /> : <PlayArrow />}
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Stop">
            <IconButton
              onClick={handleStop}
              sx={{
                backgroundColor: alpha(theme.palette.error.main, 0.2),
                color: theme.palette.error.main,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.error.main, 0.3),
                  transform: 'scale(1.1)'
                }
              }}
            >
              <Stop />
            </IconButton>
          </Tooltip>
        </Box>
      )}

      {/* Speed Indicator */}
      {isRunning && !isPaused && (
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            display: 'flex',
            alignItems: 'center',
            gap: 0.5
          }}
        >
          <Speed
            sx={{
              fontSize: 16,
              color: timeColor,
              animation: 'spin 2s linear infinite',
              '@keyframes spin': {
                '0%': { transform: 'rotate(0deg)' },
                '100%': { transform: 'rotate(360deg)' }
              }
            }}
          />
        </Box>
      )}

      {/* Paused Indicator */}
      {isPaused && (
        <Fade in={isPaused} timeout={300}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: alpha(theme.palette.background.paper, 0.9),
              borderRadius: 2,
              px: 2,
              py: 1,
              border: `1px solid ${alpha(theme.palette.divider, 0.3)}`
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              PAUZA
            </Typography>
          </Box>
        </Fade>
      )}
    </Box>
  );
};

export default QuizTimer;
