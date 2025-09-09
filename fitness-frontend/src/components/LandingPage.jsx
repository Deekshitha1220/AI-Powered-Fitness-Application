import React from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  useTheme,
  alpha,
} from '@mui/material';
import {
  FitnessCenter,
  TrendingUp,
  Timer,
  LocalFireDepartment,
  Speed,
  Favorite,
  Dashboard,
} from '@mui/icons-material';

const LandingPage = ({ onLogin }) => {
  const theme = useTheme();

  const handleLogin = (event) => {
    event.preventDefault();
    try {
      onLogin();
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleGoToActivities = () => {
    window.location.href = '/activities';
  };

  const features = [
    {
      icon: <Timer sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Track Activities',
      description: 'Log your workouts, runs, and exercises with detailed metrics and progress tracking.',
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40, color: 'success.main' }} />,
      title: 'Monitor Progress',
      description: 'Visualize your fitness journey with charts and statistics to stay motivated.',
    },
    {
      icon: <LocalFireDepartment sx={{ fontSize: 40, color: 'error.main' }} />,
      title: 'Calorie Tracking',
      description: 'Keep track of calories burned during your activities and maintain your fitness goals.',
    },
    {
      icon: <Speed sx={{ fontSize: 40, color: 'warning.main' }} />,
      title: 'Performance Insights',
      description: 'Get AI-powered recommendations to improve your workout efficiency and safety.',
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
          py: 12,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Typography
                  variant="h2"
                  component="h1"
                  gutterBottom
                  sx={{
                    fontWeight: 'bold',
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 2,
                  }}
                >
                  Transform Your Fitness Journey
                </Typography>
                <Typography
                  variant="h5"
                  color="text.secondary"
                  paragraph
                  sx={{ mb: 4, lineHeight: 1.6 }}
                >
                  Track your activities, monitor your progress, and achieve your fitness goals with our intelligent workout companion.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleLogin}
                    sx={{
                      py: 2,
                      px: 4,
                      fontSize: '1.1rem',
                      borderRadius: 3,
                      textTransform: 'none',
                      boxShadow: 3,
                      '&:hover': {
                        boxShadow: 6,
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Get Started Now
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<Dashboard />}
                    onClick={handleGoToActivities}
                    sx={{
                      py: 2,
                      px: 4,
                      fontSize: '1.1rem',
                      borderRadius: 3,
                      textTransform: 'none',
                      borderWidth: 2,
                      '&:hover': {
                        borderWidth: 2,
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Go to Activities
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                }}
              >
                <FitnessCenter
                  sx={{
                    fontSize: 200,
                    color: alpha(theme.palette.primary.main, 0.1),
                    position: 'absolute',
                    zIndex: 0,
                  }}
                />
                <Box
                  sx={{
                    position: 'relative',
                    zIndex: 1,
                    p: 4,
                    borderRadius: 4,
                    bgcolor: alpha(theme.palette.background.paper, 0.8),
                    backdropFilter: 'blur(10px)',
                    boxShadow: 3,
                  }}
                >
                  <Typography variant="h4" color="primary" gutterBottom>
                    Your Fitness Dashboard
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Track • Analyze • Improve
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            Why Choose FitTracker?
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Our comprehensive fitness tracking platform helps you stay motivated and achieve your health goals.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  p: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            Ready to Start Your Fitness Journey?
          </Typography>
          <Typography variant="h6" paragraph sx={{ mb: 4, opacity: 0.9 }}>
            Join thousands of users who are already tracking their progress and achieving their goals.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'center' }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleLogin}
              sx={{
                bgcolor: 'background.paper',
                color: 'primary.main',
                py: 2,
                px: 4,
                fontSize: '1.1rem',
                borderRadius: 3,
                textTransform: 'none',
                '&:hover': {
                  bgcolor: alpha(theme.palette.background.paper, 0.9),
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Start Tracking Now
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<Dashboard />}
              onClick={handleGoToActivities}
              sx={{
                borderColor: 'background.paper',
                color: 'background.paper',
                py: 2,
                px: 4,
                fontSize: '1.1rem',
                borderRadius: 3,
                textTransform: 'none',
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                  bgcolor: alpha(theme.palette.background.paper, 0.1),
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Go to Activities
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;

