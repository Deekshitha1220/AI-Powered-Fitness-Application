import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Chip,
  useTheme,
  alpha,
} from '@mui/material';
import {
  LocalFireDepartment,
  Timer,
  TrendingUp,
  FitnessCenter,
  Speed,
  CalendarToday,
} from '@mui/icons-material';
import { getActivities } from '../services/api';

const StatCard = ({ title, value, icon, color, subtitle, progress }) => {
  const theme = useTheme();
  
  return (
    <Card
      sx={{
        height: '100%',
        background: `linear-gradient(135deg, ${alpha(color, 0.1)} 0%, ${alpha(color, 0.05)} 100%)`,
        border: `1px solid ${alpha(color, 0.2)}`,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box
            sx={{
              p: 1,
              borderRadius: 2,
              bgcolor: alpha(color, 0.1),
              mr: 2,
            }}
          >
            {React.cloneElement(icon, { sx: { color, fontSize: 24 } })}
          </Box>
          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 'medium' }}>
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
          {value}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        )}
        {progress !== undefined && (
          <Box sx={{ mt: 2 }}>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: alpha(color, 0.1),
                '& .MuiLinearProgress-bar': {
                  bgcolor: color,
                  borderRadius: 4,
                },
              }}
            />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              {progress}% of weekly goal
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  const theme = useTheme();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        console.log('Dashboard: Fetching activities...');
        const response = await getActivities();
        console.log('Dashboard: Activities response:', response);
        setActivities(response.data || []);
      } catch (error) {
        console.error('Dashboard: Error fetching activities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Loading dashboard...</Typography>
      </Box>
    );
  }

  // Calculate statistics
  const totalActivities = activities.length;
  const totalCalories = activities.reduce((sum, activity) => sum + (activity.caloriesBurned || 0), 0);
  const totalDuration = activities.reduce((sum, activity) => sum + (activity.duration || 0), 0);
  const avgDuration = totalActivities > 0 ? Math.round(totalDuration / totalActivities) : 0;
  
  // Get activity types
  const activityTypes = [...new Set(activities.map(activity => activity.type))];
  
  // This week's activities (simplified - you might want to implement proper date filtering)
  const thisWeekActivities = activities.slice(0, Math.min(activities.length, 5));
  const weeklyCalories = thisWeekActivities.reduce((sum, activity) => sum + (activity.caloriesBurned || 0), 0);
  const weeklyGoal = 2000; // Example weekly goal
  const weeklyProgress = Math.min((weeklyCalories / weeklyGoal) * 100, 100);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
        Dashboard Overview
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Activities"
            value={totalActivities}
            icon={<FitnessCenter />}
            color={theme.palette.primary.main}
            subtitle="All time"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Calories Burned"
            value={totalCalories.toLocaleString()}
            icon={<LocalFireDepartment />}
            color={theme.palette.error.main}
            subtitle="Total calories"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Duration"
            value={`${totalDuration}m`}
            icon={<Timer />}
            color={theme.palette.info.main}
            subtitle="Minutes exercised"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Avg Duration"
            value={`${avgDuration}m`}
            icon={<Speed />}
            color={theme.palette.success.main}
            subtitle="Per activity"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                <TrendingUp sx={{ mr: 1, color: 'primary.main' }} />
                Weekly Progress
              </Typography>
              <Box sx={{ mt: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Calories Burned This Week
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {weeklyCalories} / {weeklyGoal}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={weeklyProgress}
                  sx={{
                    height: 12,
                    borderRadius: 6,
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    '& .MuiLinearProgress-bar': {
                      bgcolor: theme.palette.primary.main,
                      borderRadius: 6,
                    },
                  }}
                />
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  {Math.round(weeklyProgress)}% of weekly goal
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                <CalendarToday sx={{ mr: 1, color: 'primary.main' }} />
                Activity Types
              </Typography>
              <Box sx={{ mt: 2 }}>
                {activityTypes.length > 0 ? (
                  activityTypes.map((type, index) => (
                    <Chip
                      key={index}
                      label={type}
                      sx={{
                        mr: 1,
                        mb: 1,
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                        fontWeight: 'medium',
                      }}
                    />
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No activities yet
                  </Typography>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;

