import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  FitnessCenter,
  Menu as MenuIcon,
  Dashboard,
  Add,
  List as ListIcon,
  Logout,
  Person,
  Settings,
  ArrowBack,
  Home,
} from '@mui/icons-material';
import ThemeToggle from './ThemeToggle';
import { useNavigate, useLocation } from 'react-router';
import { useContext } from 'react';
import { AuthContext } from 'react-oauth2-code-pkce';

const Navbar = () => {
  const { tokenData, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Debug: Check if logOut function is available
  console.log('Navbar - logOut function available:', typeof logOut);
  console.log('Navbar - tokenData:', tokenData);
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleProfileMenuOpen = (event) => {
    console.log('Profile menu opened');
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log('Logout clicked');
    try {
      logOut();
      handleMenuClose();
      // After logout, user will be redirected to landing page automatically
    } catch (error) {
      console.error('Logout error:', error);
      handleMenuClose();
    }
  };

  const handleProfile = () => {
    console.log('Profile clicked');
    handleMenuClose();
    // For now, just show an alert. You can implement a profile page later
    alert('Profile page coming soon!');
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleGoBack = () => {
    navigate(-1); // Go back to previous page
  };

  const handleGoHome = () => {
    navigate('/home'); // Go to home/landing page
  };

  // Check if we should show back button (not on main pages)
  const showBackButton = location.pathname !== '/activities' && location.pathname !== '/' && location.pathname !== '/home';

  const menuItems = [
    { text: 'Home', icon: <Home />, path: '/home', action: handleGoHome },
    { text: 'Dashboard', icon: <Dashboard />, path: '/activities' },
    { text: 'Add Activity', icon: <Add />, path: '/activities' },
    { text: 'All Activities', icon: <ListIcon />, path: '/activities' },
    { text: 'Profile', icon: <Person />, path: null, action: handleProfile },
    { text: 'Logout', icon: <Logout />, path: null, action: handleLogout },
  ];

  // Add back button to mobile menu if not on main page
  if (showBackButton) {
    menuItems.unshift({ text: 'Go Back', icon: <ArrowBack />, path: null, action: handleGoBack });
  }

  const drawer = (
    <Box sx={{ width: 250 }}>
      <Box sx={{ p: 2, textAlign: 'center', borderBottom: 1, borderColor: 'divider' }}>
        <FitnessCenter sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
        <Typography variant="h6" color="primary">
          FitTracker
        </Typography>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => {
              if (item.action) {
                item.action();
              } else {
                navigate(item.path);
              }
              setMobileOpen(false);
            }}
            selected={location.pathname === item.path}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" elevation={1} sx={{ bgcolor: 'background.paper', color: 'text.primary' }}>
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          {/* Back Button - only show when not on main page */}
          {showBackButton && (
            <IconButton
              color="inherit"
              aria-label="go back"
              onClick={handleGoBack}
              sx={{ mr: 1 }}
            >
              <ArrowBack />
            </IconButton>
          )}
          
          {/* Home Button - always show */}
          <IconButton
            color="inherit"
            aria-label="go home"
            onClick={handleGoHome}
            sx={{ mr: 1 }}
          >
            <Home />
          </IconButton>
          
          <FitnessCenter sx={{ mr: 2, color: 'primary.main' }} />
          <Typography
            variant="h6"
            component="div"
            sx={{ 
              flexGrow: 1, 
              color: 'primary.main',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/activities')}
          >
            FitTracker
          </Typography>

          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 1, mr: 2 }}>
              <Button
                color="inherit"
                startIcon={<Dashboard />}
                onClick={() => navigate('/activities')}
                sx={{ 
                  color: location.pathname === '/activities' ? 'primary.main' : 'text.primary',
                  fontWeight: location.pathname === '/activities' ? 'bold' : 'normal'
                }}
              >
                Dashboard
              </Button>
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ThemeToggle />
            <Avatar
              sx={{ 
                width: 32, 
                height: 32, 
                bgcolor: 'primary.main',
                fontSize: '0.875rem'
              }}
            >
              {tokenData?.name?.charAt(0) || 'U'}
            </Avatar>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Settings />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleProfile}>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
