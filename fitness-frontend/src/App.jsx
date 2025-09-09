import { Box, Container, CssBaseline } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "react-oauth2-code-pkce";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router";
import { setCredentials } from "./store/authSlice";
import ActivityForm from "./components/ActivityForm";
import ActivityList from "./components/ActivityList";
import ActivityDetail from "./components/ActivityDetail";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import { CustomThemeProvider } from "./components/ThemeToggle";

const ActivitiesPage = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleActivityAdded = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <ActivityForm onActivityAdded={handleActivityAdded} />
      <ActivityList key={refreshKey} />
    </Container>
  );
};

function App() {
  const { token, tokenData, logIn, logOut } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [authReady, setAuthReady] = useState(false);
  
  useEffect(() => {
    if (token) {
      dispatch(setCredentials({token, user: tokenData}));
      setAuthReady(true);
    }
  }, [token, tokenData, dispatch]);

  // Create a wrapper function to avoid circular reference issues
  const handleLogin = () => {
    try {
      logIn();
    } catch (error) {
      console.error('Login error:', error);
    }
  };
  
  return (
    <CustomThemeProvider>
      <CssBaseline />
      <Router>
        {!token ? (
          <LandingPage onLogin={handleLogin} />
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default' }}>
              <Routes>
                <Route path="/home" element={<LandingPage onLogin={handleLogin} />} />
                <Route path="/activities" element={<ActivitiesPage />} />
                <Route path="/activities/:id" element={<ActivityDetail />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/" element={<Navigate to="/activities" replace />} />
              </Routes>
            </Box>
          </Box>
        )}
      </Router>
    </CustomThemeProvider>
  );
}

export default App