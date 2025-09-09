import { 
  Card, 
  CardContent, 
  Grid, 
  Typography, 
  Box, 
  Chip, 
  IconButton,
  useTheme,
  alpha,
  Skeleton,
  Alert
} from '@mui/material'
import {
  LocalFireDepartment,
  Timer,
  CalendarToday,
  TrendingUp,
  MoreVert,
} from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { getActivities } from '../services/api';

const ActivityCard = ({ activity, onClick }) => {
  const theme = useTheme();
  
  const getActivityColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'running': return theme.palette.error.main;
      case 'walking': return theme.palette.success.main;
      case 'cycling': return theme.palette.info.main;
      default: return theme.palette.primary.main;
    }
  };

  const getActivityIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'running': return '🏃‍♂️';
      case 'walking': return '🚶‍♂️';
      case 'cycling': return '🚴‍♂️';
      default: return '💪';
    }
  };

  return (
    <Card
      sx={{
        height: '100%',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        border: `1px solid ${alpha(getActivityColor(activity.type), 0.2)}`,
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: 6,
          border: `1px solid ${getActivityColor(activity.type)}`,
        },
      }}
      onClick={onClick}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h4" sx={{ mr: 1 }}>
              {getActivityIcon(activity.type)}
            </Typography>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', lineHeight: 1.2 }}>
                {activity.type}
              </Typography>
              <Chip
                label={activity.type}
                size="small"
                sx={{
                  bgcolor: alpha(getActivityColor(activity.type), 0.1),
                  color: getActivityColor(activity.type),
                  fontWeight: 'medium',
                  mt: 0.5,
                }}
              />
            </Box>
          </Box>
          <IconButton size="small" sx={{ color: 'text.secondary' }}>
            <MoreVert />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Timer sx={{ fontSize: 20, color: 'text.secondary', mr: 1 }} />
            <Box>
              <Typography variant="body2" color="text.secondary">
                Duration
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {activity.duration}m
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocalFireDepartment sx={{ fontSize: 20, color: 'error.main', mr: 1 }} />
            <Box>
              <Typography variant="body2" color="text.secondary">
                Calories
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'error.main' }}>
                {activity.caloriesBurned}
              </Typography>
            </Box>
          </Box>
        </Box>

        {activity.createdAt && (
          <Box sx={{ display: 'flex', alignItems: 'center', pt: 2, borderTop: 1, borderColor: 'divider' }}>
            <CalendarToday sx={{ fontSize: 16, color: 'text.secondary', mr: 1 }} />
            <Typography variant="caption" color="text.secondary">
              {new Date(activity.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

const ActivityList = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchActivities = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('ActivityList: Fetching activities...');
      const response = await getActivities();
      console.log('ActivityList: Activities response:', response);
      setActivities(response.data || []);
    } catch (error) {
      console.error('ActivityList: Error fetching activities:', error);
      setError('Failed to load activities. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  if (loading) {
    return (
      <Grid container spacing={3}>
        {[...Array(6)].map((_, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Skeleton variant="text" width="60%" height={32} />
                <Skeleton variant="text" width="40%" height={24} sx={{ mt: 1 }} />
                <Skeleton variant="rectangular" height={60} sx={{ mt: 2, borderRadius: 1 }} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 3 }}>
        {error}
      </Alert>
    );
  }

  if (activities.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          No activities yet
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Start tracking your fitness journey by adding your first activity!
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Your Activities ({activities.length})
        </Typography>
        <Chip
          icon={<TrendingUp />}
          label="All Activities"
          variant="outlined"
          color="primary"
        />
      </Box>
      
      <Grid container spacing={3}>
        {activities.map((activity) => (
          <Grid item xs={12} sm={6} md={4} key={activity.id}>
            <ActivityCard
              activity={activity}
              onClick={() => navigate(`/activities/${activity.id}`)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ActivityList