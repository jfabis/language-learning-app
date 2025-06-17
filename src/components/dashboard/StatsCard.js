import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  useTheme,
  alpha,
  Chip,
  IconButton
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  MoreVert,
  Timeline,
  Speed,
  EmojiEvents,
  LocalFireDepartment
} from '@mui/icons-material';

const StatsCard = ({ 
  title, 
  value, 
  subtitle, 
  trend, 
  trendValue, 
  icon: IconComponent, 
  color = 'primary',
  progress,
  isLoading = false 
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
  const isPositiveTrend = trend === 'up';

  return (
    <Card
      sx={{
        height: '100%',
        background: `linear-gradient(135deg, ${alpha(selectedColor, 0.05)}, ${alpha(selectedColor, 0.02)})`,
        border: `1px solid ${alpha(selectedColor, 0.1)}`,
        borderRadius: 3,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.palette.mode === 'dark'
            ? `0 12px 40px ${alpha(selectedColor, 0.15)}`
            : `0 12px 40px ${alpha(selectedColor, 0.1)}`,
          '& .stats-icon': {
            transform: 'scale(1.1) rotate(5deg)',
          },
          '& .trend-indicator': {
            transform: 'scale(1.05)',
          }
        }
      }}
    >
      {/* Gradient Overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 100,
          height: 100,
          background: `radial-gradient(circle, ${alpha(selectedColor, 0.1)} 0%, transparent 70%)`,
          borderRadius: '50%',
          transform: 'translate(30px, -30px)',
        }}
      />

      <CardContent sx={{ p: 3, position: 'relative', zIndex: 1 }}>
        {/* Header z ikoną i menu */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box
            className="stats-icon"
            sx={{
              width: 56,
              height: 56,
              borderRadius: 2,
              background: `linear-gradient(135deg, ${selectedColor}, ${alpha(selectedColor, 0.8)})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.3s ease',
              boxShadow: `0 8px 24px ${alpha(selectedColor, 0.3)}`,
            }}
          >
            <IconComponent sx={{ fontSize: 28, color: 'white' }} />
          </Box>
          
          <IconButton size="small" sx={{ color: theme.palette.text.secondary }}>
            <MoreVert fontSize="small" />
          </IconButton>
        </Box>

        {/* Tytuł */}
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            fontWeight: 500,
            mb: 1,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            fontSize: '0.75rem'
          }}
        >
          {title}
        </Typography>

        {/* Główna wartość */}
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 800,
            mb: 1,
            background: `linear-gradient(135deg, ${theme.palette.text.primary}, ${alpha(theme.palette.text.primary, 0.7)})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1.2
          }}
        >
          {isLoading ? '...' : value}
        </Typography>

        {/* Subtitle */}
        {subtitle && (
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ mb: 2, fontSize: '0.85rem' }}
          >
            {subtitle}
          </Typography>
        )}

        {/* Progress Bar */}
        {progress !== undefined && (
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Postęp
              </Typography>
              <Typography variant="caption" sx={{ fontWeight: 600, color: selectedColor }}>
                {progress}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 6,
                borderRadius: 3,
                backgroundColor: alpha(selectedColor, 0.1),
                '& .MuiLinearProgress-bar': {
                  background: `linear-gradient(90deg, ${selectedColor}, ${alpha(selectedColor, 0.8)})`,
                  borderRadius: 3,
                }
              }}
            />
          </Box>
        )}

        {/* Trend Indicator */}
        {trendValue && (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Chip
              className="trend-indicator"
              icon={isPositiveTrend ? <TrendingUp /> : <TrendingDown />}
              label={`${isPositiveTrend ? '+' : ''}${trendValue}%`}
              size="small"
              sx={{
                backgroundColor: alpha(isPositiveTrend ? theme.palette.success.main : theme.palette.error.main, 0.15),
                color: isPositiveTrend ? theme.palette.success.main : theme.palette.error.main,
                fontWeight: 600,
                transition: 'transform 0.2s ease',
                '& .MuiChip-icon': {
                  fontSize: 16,
                  color: isPositiveTrend ? theme.palette.success.main : theme.palette.error.main,
                }
              }}
            />
            <Typography variant="caption" color="text.secondary">
              vs ostatni tydzień
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCard;
