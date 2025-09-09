import { 
  Box, 
  Button, 
  FormControl, 
  InputLabel, 
  MenuItem, 
  Select, 
  TextField, 
  Card,
  CardContent,
  Typography,
  Grid,
  Alert,
  CircularProgress,
  useTheme,
  alpha
} from '@mui/material'
import {
  Add,
  FitnessCenter,
  Timer,
  LocalFireDepartment,
} from '@mui/icons-material'
import React, { useState } from 'react'
import { addActivity } from '../services/api'

const ActivityForm = ({ onActivityAdded }) => {
  const theme = useTheme();
  const [activity, setActivity] = useState({
    type: "RUNNING", 
    duration: '', 
    caloriesBurned: '',
    additionalMetrics: {}
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const activityTypes = [
    { value: "RUNNING", label: "Running", icon: "🏃‍♂️", color: theme.palette.error.main },
    { value: "WALKING", label: "Walking", icon: "🚶‍♂️", color: theme.palette.success.main },
    { value: "CYCLING", label: "Cycling", icon: "🚴‍♂️", color: theme.palette.info.main },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Basic validation
    if (!activity.duration || !activity.caloriesBurned) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    if (activity.duration <= 0 || activity.caloriesBurned <= 0) {
      setError('Duration and calories must be greater than 0');
      setLoading(false);
      return;
    }

    try {
      await addActivity(activity);
      setSuccess(true);
      setActivity({ type: "RUNNING", duration: '', caloriesBurned: ''});
      onActivityAdded();
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error adding activity:', error);
      setError('Failed to add activity. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const selectedActivityType = activityTypes.find(type => type.value === activity.type);

  return (
    <Card sx={{ mb: 4, boxShadow: 3 }}>
      <CardContent sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Add sx={{ mr: 2, color: 'primary.main', fontSize: 28 }} />
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Add New Activity
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Activity added successfully!
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Activity Type</InputLabel>
                <Select
                  value={activity.type}
                  onChange={(e) => setActivity({...activity, type: e.target.value})}
                  label="Activity Type"
                  sx={{ 
                    '& .MuiSelect-select': { 
                      display: 'flex', 
                      alignItems: 'center',
                      gap: 1
                    }
                  }}
                >
                  {activityTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="h6">{type.icon}</Typography>
                        <Typography>{type.label}</Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ 
                p: 2, 
                borderRadius: 2, 
                bgcolor: alpha(selectedActivityType?.color || theme.palette.primary.main, 0.1),
                border: `1px solid ${alpha(selectedActivityType?.color || theme.palette.primary.main, 0.2)}`
              }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Selected Activity
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="h4">{selectedActivityType?.icon}</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {selectedActivityType?.label}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth
                label="Duration (Minutes)"
                type="number"
                value={activity.duration}
                onChange={(e) => setActivity({...activity, duration: e.target.value})}
                InputProps={{
                  startAdornment: <Timer sx={{ mr: 1, color: 'text.secondary' }} />
                }}
                helperText="Enter duration in minutes"
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth
                label="Calories Burned"
                type="number"
                value={activity.caloriesBurned}
                onChange={(e) => setActivity({...activity, caloriesBurned: e.target.value})}
                InputProps={{
                  startAdornment: <LocalFireDepartment sx={{ mr: 1, color: 'error.main' }} />
                }}
                helperText="Estimated calories burned"
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button 
                  variant="outlined" 
                  onClick={() => setActivity({ type: "RUNNING", duration: '', caloriesBurned: ''})}
                  disabled={loading}
                >
                  Clear
                </Button>
                <Button 
                  type="submit" 
                  variant="contained" 
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : <FitnessCenter />}
                  sx={{ 
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 'bold'
                  }}
                >
                  {loading ? 'Adding...' : 'Add Activity'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  )
}

export default ActivityForm