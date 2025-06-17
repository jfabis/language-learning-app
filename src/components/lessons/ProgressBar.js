import React from 'react';
import {
  Box,
  LinearProgress,
  Typography,
  useTheme,
  alpha,
  Chip
} from '@mui/material';
import {
  CheckCircle,
  RadioButtonUnchecked,
  Lock,
  Star
} from '@mui/icons-material';

const ProgressBar = ({ 
  progress = 0, 
  total = 100, 
  label, 
  showPercentage = true,
  showSteps = false,
  steps = [],
  color = 'primary',
  size = 'medium',
  animated = true,
  showReward = false,
  rewardPoints = 0
}) => {
  const theme = useTheme();
  
  const colorMap = {
    primary: theme.palette.primary.main,
    secondary: theme.palette.secondary.main,
    success: theme.palette.success.main,
    warning: theme.palette.warning.main,
    error: theme.palette.error.main,
    info: theme.palette.info.main,
  };

  const selectedColor = colorMap[color] || theme.palette.primary.main;
  const percentage = Math.min((progress / total) * 100, 100);
  
  const getHeight = () => {
    switch (size) {
      case 'small': return 6;
      case 'large': return 12;
      default: return 8;
    }
  };

  const renderSteps = () => {
    if (!showSteps || !steps.length) return null;

    return (
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, px: 0.5 }}>
        {steps.map((step, index) => {
          const stepProgress = ((index + 1) / steps.length) * 100;
          const isCompleted = percentage >= stepProgress;
          const isLocked = step.locked;
          
          return (
            <Box
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 0.5,
                cursor: step.onClick ? 'pointer' : 'default',
                transition: 'transform 0.2s ease',
                '&:hover': step.onClick ? {
                  transform: 'scale(1.05)'
                } : {}
              }}
              onClick={step.onClick}
            >
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: isLocked 
                    ? alpha(theme.palette.text.secondary, 0.2)
                    : isCompleted 
                      ? selectedColor
                      : alpha(selectedColor, 0.2),
                  color: isLocked 
                    ? theme.palette.text.secondary
                    : isCompleted 
                      ? '#ffffff'
                      : selectedColor,
                  transition: 'all 0.3s ease',
                  boxShadow: isCompleted && !isLocked
                    ? `0 4px 12px ${alpha(selectedColor, 0.3)}`
                    : 'none'
                }}
              >
                {isLocked ? (
                  <Lock sx={{ fontSize: 12 }} />
                ) : isCompleted ? (
                  <CheckCircle sx={{ fontSize: 14 }} />
                ) : (
                  <RadioButtonUnchecked sx={{ fontSize: 14 }} />
                )}
              </Box>
              <Typography 
                variant="caption" 
                sx={{ 
                  fontSize: '0.7rem',
                  textAlign: 'center',
                  color: isLocked 
                    ? theme.palette.text.secondary
                    : isCompleted 
                      ? selectedColor
                      : theme.palette.text.secondary,
                  fontWeight: isCompleted ? 600 : 400,
                  maxWidth: 60,
                  lineHeight: 1.2
                }}
              >
                {step.label}
              </Typography>
            </Box>
          );
        })}
      </Box>
    );
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Header */}
      {(label || showPercentage || showReward) && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography 
            variant="body2" 
            sx={{ 
              fontWeight: 500,
              color: theme.palette.text.primary
            }}
          >
            {label}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {showReward && rewardPoints > 0 && (
              <Chip
                icon={<Star sx={{ fontSize: 14 }} />}
                label={`+${rewardPoints} XP`}
                size="small"
                sx={{
                  height: 20,
                  backgroundColor: alpha(theme.palette.warning.main, 0.2),
                  color: theme.palette.warning.main,
                  fontWeight: 600,
                  fontSize: '0.7rem'
                }}
              />
            )}
            {showPercentage && (
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: 600,
                  color: selectedColor,
                  minWidth: 40,
                  textAlign: 'right'
                }}
              >
                {Math.round(percentage)}%
              </Typography>
            )}
          </Box>
        </Box>
      )}

      {/* Progress Bar - PROSTY BEZ EFEKTÓW */}
      <LinearProgress
        variant="determinate"
        value={percentage}
        sx={{
          height: getHeight(),
          borderRadius: getHeight() / 2,
          backgroundColor: alpha(selectedColor, 0.2),
          '& .MuiLinearProgress-bar': {
            background: `linear-gradient(90deg, ${selectedColor}, ${alpha(selectedColor, 0.8)})`,
            borderRadius: getHeight() / 2,
          }
        }}
      />

      {/* Steps */}
      {renderSteps()}

      {/* Progress Text */}
      {total !== 100 && (
        <Typography 
          variant="caption" 
          color="text.secondary" 
          sx={{ 
            mt: 0.5,
            display: 'block',
            textAlign: 'center',
            fontSize: '0.75rem'
          }}
        >
          {progress} z {total} ukończonych
        </Typography>
      )}
    </Box>
  );
};

export default ProgressBar;
