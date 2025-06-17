import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  LinearProgress,
  Chip,
  Box,
  useTheme,
  alpha
} from '@mui/material';
import { PlayArrow, CheckCircle, Star, AccessTime } from '@mui/icons-material';

const LessonCard = ({ lesson, onStart }) => {
  const theme = useTheme();
  
  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.mode === 'dark' 
          ? alpha(theme.palette.background.paper, 0.6)
          : alpha(theme.palette.background.paper, 1),
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: theme.palette.mode === 'dark' 
            ? '0 10px 20px rgba(0, 0, 0, 0.3)'
            : '0 10px 20px rgba(0, 0, 0, 0.1)'
        }
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        {/* Implementacja zawartości karty lekcji */}
      </CardContent>
      
      <CardActions sx={{ padding: 2, pt: 0 }}>
        <Button 
          fullWidth
          variant={lesson.progress === 100 ? "outlined" : "contained"} 
          startIcon={lesson.progress === 100 ? <CheckCircle /> : <PlayArrow />}
          onClick={() => onStart(lesson.id)}
        >
          {lesson.progress === 100 ? 'Powtórz' : 'Rozpocznij'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default LessonCard;
