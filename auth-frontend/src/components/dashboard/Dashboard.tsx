import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { logout } from '../../store/slices/authSlice';
import type { RootState } from '../../store';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Avatar,
  CircularProgress,
} from '@mui/material';
import { Logout as LogoutIcon } from '@mui/icons-material';

export const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useAppSelector((state: RootState) => state.auth);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/login');
  };

  if (loading && !user) {
    return (
      <Container maxWidth="md">
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <Box sx={{ mt: 4 }}>
          <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
            <Typography color="error" gutterBottom>
              {error}
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/login')}
              sx={{ mt: 2 }}
            >
              Back to Login
            </Button>
          </Paper>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, alignItems: 'center' }}>
            <Box>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: 'primary.main',
                  fontSize: '2rem',
                }}
              >
                {user?.name?.charAt(0).toUpperCase()}
              </Avatar>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" gutterBottom>
                Welcome, {user?.name}!
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Email: {user?.email}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Role: {user?.role}
              </Typography>
              {user?.createdAt && (
                <Typography variant="body2" color="text.secondary">
                  Member since: {new Date(user.createdAt).toLocaleDateString()}
                </Typography>
              )}
            </Box>
            <Box>
              <Button
                variant="outlined"
                color="error"
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}; 