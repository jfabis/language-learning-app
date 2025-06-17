import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  LinearProgress,
  Chip,
  Box,
  IconButton,
  Avatar,
  useTheme,
  alpha,
  Tooltip
} from '@mui/material';
import {
  PlayArrow,
  CheckCircle,
  Lock,
  Star,
  AccessTime,
  Quiz,
  MenuBook,
  Headphones,
  RecordVoiceOver,
  Favorite,
  FavoriteBorder,
  MoreVert
} from '@mui/icons-material';

const LessonCard = ({ 
  lesson, 
  onStart, 
  onFavorite,
  isLocked = false,
  showProgress = true 
}) => {
  const theme = useTheme();
  
  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'łatwy': return theme.palette.success.main;
      case 'średni': return theme.palette.warning.main;
      case 'trudny': return theme.palette.error.main;
      default: return theme.palette.info.main;
    }
  };

  const getTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'gramatyka': return <MenuBook />;
      case 'słownictwo': return <Quiz />;
      case 'wymowa': return <RecordVoiceOver />;
      case 'słuchanie': return <Headphones />;
      default: return <MenuBook />;
    }
  };

  const difficultyColor = getDifficultyColor(lesson.difficulty);
  const isCompleted = lesson.progress === 100;
  const canStart = !isLocked && lesson.progress < 100;

  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(theme.palette.background.paper, 0.95)})`,
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        borderRadius: 3,
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: theme.palette.mode === 'dark' 
            ? `0 20px 40px ${alpha(theme.palette.common.black, 0.3)}`
            : `0 20px 40px ${alpha(theme.palette.common.black, 0.1)}`,
          '& .lesson-icon': {
            transform: 'scale(1.1) rotate(5deg)',
          },
          '& .lesson-image': {
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
          width: 120,
          height: 120,
          background: `radial-gradient(circle, ${alpha(difficultyColor, 0.1)} 0%, transparent 70%)`,
          borderRadius: '50%',
          transform: 'translate(40px, -40px)',
        }}
      />

      {/* Header Image/Icon */}
      <Box
        sx={{
          height: 120,
          background: `linear-gradient(135deg, ${alpha(difficultyColor, 0.1)}, ${alpha(difficultyColor, 0.05)})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {lesson.image ? (
          <Box
            className="lesson-image"
            component="img"
            src={lesson.image}
            alt={lesson.title}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.3s ease',
            }}
          />
        ) : (
          <Avatar
            className="lesson-icon"
            sx={{
              width: 64,
              height: 64,
              background: `linear-gradient(135deg, ${difficultyColor}, ${alpha(difficultyColor, 0.8)})`,
              transition: 'transform 0.3s ease',
              boxShadow: `0 8px 24px ${alpha(difficultyColor, 0.3)}`,
            }}
          >
            {getTypeIcon(lesson.type)}
          </Avatar>
        )}

        {/* Status Badge */}
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            display: 'flex',
            gap: 1
          }}
        >
          {isLocked && (
            <Chip
              icon={<Lock sx={{ fontSize: 16 }} />}
              label="Zablokowane"
              size="small"
              sx={{
                backgroundColor: alpha(theme.palette.text.secondary, 0.2),
                color: theme.palette.text.secondary,
                fontWeight: 600
              }}
            />
          )}
          {isCompleted && (
            <Chip
              icon={<CheckCircle sx={{ fontSize: 16 }} />}
              label="Ukończone"
              size="small"
              sx={{
                backgroundColor: alpha(theme.palette.success.main, 0.2),
                color: theme.palette.success.main,
                fontWeight: 600
              }}
            />
          )}
        </Box>

        {/* Favorite Button */}
        <IconButton
          onClick={() => onFavorite && onFavorite(lesson.id)}
          sx={{
            position: 'absolute',
            top: 8,
            left: 8,
            backgroundColor: alpha(theme.palette.background.paper, 0.9),
            '&:hover': {
              backgroundColor: alpha(theme.palette.background.paper, 1),
              transform: 'scale(1.1)',
            }
          }}
        >
          {lesson.isFavorite ? (
            <Favorite sx={{ color: theme.palette.error.main, fontSize: 20 }} />
          ) : (
            <FavoriteBorder sx={{ fontSize: 20 }} />
          )}
        </IconButton>
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        {/* Title and Menu */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography 
            variant="h6" 
            component="h3"
            sx={{ 
              fontWeight: 600,
              lineHeight: 1.3,
              flexGrow: 1,
              mr: 1
            }}
          >
            {lesson.title}
          </Typography>
          <IconButton size="small" sx={{ color: theme.palette.text.secondary }}>
            <MoreVert fontSize="small" />
          </IconButton>
        </Box>

        {/* Tags */}
        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
          <Chip
            label={lesson.difficulty || 'Średni'}
            size="small"
            sx={{
              backgroundColor: alpha(difficultyColor, 0.15),
              color: difficultyColor,
              fontWeight: 600,
              fontSize: '0.7rem'
            }}
          />
          <Chip
            label={lesson.type || 'Gramatyka'}
            size="small"
            sx={{
              backgroundColor: alpha(theme.palette.info.main, 0.15),
              color: theme.palette.info.main,
              fontWeight: 600,
              fontSize: '0.7rem'
            }}
          />
        </Box>

        {/* Description */}
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mb: 2,
            lineHeight: 1.5,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {lesson.description}
        </Typography>

        {/* Stats */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <AccessTime sx={{ fontSize: 16, color: theme.palette.text.secondary }} />
            <Typography variant="caption" color="text.secondary">
              {lesson.duration || '15 min'}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Star sx={{ fontSize: 16, color: theme.palette.warning.main }} />
            <Typography variant="caption" color="text.secondary">
              +{lesson.points || 50} XP
            </Typography>
          </Box>
        </Box>

        {/* Progress Bar */}
        {showProgress && lesson.progress !== undefined && (
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Postęp
              </Typography>
              <Typography variant="caption" sx={{ fontWeight: 600, color: difficultyColor }}>
                {lesson.progress}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={lesson.progress}
              sx={{
                height: 6,
                borderRadius: 3,
                backgroundColor: alpha(difficultyColor, 0.1),
                '& .MuiLinearProgress-bar': {
                  background: `linear-gradient(90deg, ${difficultyColor}, ${alpha(difficultyColor, 0.8)})`,
                  borderRadius: 3,
                }
              }}
            />
          </Box>
        )}
      </CardContent>
      
      <CardActions sx={{ p: 3, pt: 0 }}>
        <Button 
          fullWidth
          variant={isCompleted ? "outlined" : "contained"}
          startIcon={
            isLocked ? <Lock /> : 
            isCompleted ? <CheckCircle /> : 
            <PlayArrow />
          }
          onClick={() => onStart && onStart(lesson)}
          disabled={isLocked}
          sx={{
            borderRadius: 2,
            py: 1.5,
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.95rem',
            ...(isCompleted ? {
              borderColor: difficultyColor,
              color: difficultyColor,
              '&:hover': {
                backgroundColor: alpha(difficultyColor, 0.1),
                borderColor: difficultyColor,
              }
            } : {
              background: `linear-gradient(135deg, ${difficultyColor}, ${alpha(difficultyColor, 0.8)})`,
              '&:hover': {
                background: `linear-gradient(135deg, ${alpha(difficultyColor, 0.9)}, ${alpha(difficultyColor, 0.7)})`,
              }
            })
          }}
        >
          {isLocked ? 'Zablokowane' :
           isCompleted ? 'Powtórz lekcję' : 
           'Rozpocznij lekcję'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default LessonCard;
