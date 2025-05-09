import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userVerification, setUserVerification] = useState({
    emailVerified: false,
    phoneVerified: false,
    isVerified: false
  });
  const [userInfo, setUserInfo] = useState(null);

  // Check if the user is authenticated on page load
  useEffect(() => {
    refreshAccessToken(true);
  }, []);

  // Function to refresh the accessToken
  const refreshAccessToken = async (withProfile = false) => {
    setLoading(true);
    try {
      const response = await axios.post('/auth/refresh-token', { withProfile }, { withCredentials: true });
      
      if (response.data.authenticated) {
        setAccessToken(response.data.accessToken);
        setIsAuthenticated(true);
        setUserInfo(response.data.userInfo || null);
        
        // Set verification status if profile was returned
        if (withProfile && response.data) {
          setUserVerification({
            emailVerified: response.data.emailVerified,
            phoneVerified: response.data.phoneVerified,
            isVerified: response.data.isVerified
          });
        }
      } else {
        setAccessToken(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      setAccessToken(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async ({ email, password }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/auth/login', { email, password }, { withCredentials: true });
      if (response.data.status === 'success') {
        setAccessToken(response.data.accessToken);
        setIsAuthenticated(true);
        setUserInfo(response.data.userInfo || null);
        
        // Set verification status returned from login response
        setUserVerification({
          emailVerified: response.data.emailVerified,
          phoneVerified: response.data.phoneVerified,
          isVerified: response.data.isVerified
        });
        
        // Redirect based on verification status
        if (!response.data.emailVerified) {
          navigate('/verify-email');
        } else {
          navigate('/user/dashboard');
        }
      } else {
        setError(response.data.msg || 'An error occurred');
      }
    } catch (error) {
      setError(error.response?.data?.msg || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const register = async ({ firstname, lastname, email, dob, gender, address, state, lga, password }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/auth/register', { 
        firstname, 
        lastname, 
        email, 
        dob, 
        gender, 
        address, 
        state, 
        lga, 
        password 
      }, { withCredentials: true });
      
      if (response.data.status === 'success') {
        setAccessToken(response.data.accessToken);
        setIsAuthenticated(true);
        setUserInfo(response.data.userInfo || null);
        
        // For new registrations, email is always unverified
        setUserVerification({
          emailVerified: false,
          phoneVerified: false,
          isVerified: false
        });
        
        // Redirect to email verification page
        navigate('/verify-email');
      } else {
        setError(response.data.msg || 'An error occurred');
      }
    } catch (error) {
      setError(error.response?.data?.msg || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Request email verification code
  const requestEmailVerification = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        '/auth/request-email-verification',
        {},
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true
        }
      );
      return response.data;
    } catch (error) {
      setError(error.response?.data?.msg || 'Error requesting verification code');
      return { status: 'error', msg: error.response?.data?.msg || 'An error occurred' };
    } finally {
      setLoading(false);
    }
  };

  // Verify email with code
  const verifyEmail = async (code) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        '/auth/verify-email',
        { code },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true
        }
      );
      
      if (response.data.status === 'success') {
        // Update verification status
        setUserVerification(prev => ({
          ...prev,
          emailVerified: response.data.emailVerified,
          isVerified: response.data.isVerified
        }));
      }
      
      return response.data;
    } catch (error) {
      setError(error.response?.data?.msg || 'Error verifying email');
      return { 
        status: 'error', 
        msg: error.response?.data?.msg || 'An error occurred',
        attemptsLeft: error.response?.data?.attemptsLeft
      };
    } finally {
      setLoading(false);
    }
  };

  // New function: Request password reset
  const forgotPassword = async (email) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      setError(error.response?.data?.msg || 'Error requesting password reset');
      return { status: 'error', msg: error.response?.data?.msg || 'An error occurred' };
    } finally {
      setLoading(false);
    }
  };

  // New function: Verify reset token
  const verifyResetToken = async (token) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/auth/verify-reset-token', { token });
      return response.data;
    } catch (error) {
      setError(error.response?.data?.msg || 'Invalid or expired reset token');
      return { status: 'error', msg: error.response?.data?.msg || 'An error occurred' };
    } finally {
      setLoading(false);
    }
  };

  // New function: Reset password
  const resetPassword = async (token, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/auth/reset-password', { token, password });
      if (response.data.status === 'success') {
        return {
          ...response.data,
          email: response.data.email // Make sure the API returns the user's email
        };
      }
      return response.data;
    } catch (error) {
      setError(error.response?.data?.msg || 'Error resetting password');
      return { status: 'error', msg: error.response?.data?.msg || 'An error occurred' };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Call the logout endpoint to clear the refreshToken cookie
      await axios.post('/auth/logout', {}, { withCredentials: true });
      
      // Clear state in React context
      setAccessToken(null);
      setIsAuthenticated(false);
      setUserInfo(null);
      setUserVerification({
        emailVerified: false,
        phoneVerified: false,
        isVerified: false
      });
      
      // Navigate to login page
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if API call fails, clear the client state
      setAccessToken(null);
      setIsAuthenticated(false);
      navigate('/login');
    }
  };

  return (
    <AuthContext.Provider value={{ 
      accessToken, 
      login, 
      register, 
      logout, 
      loading, 
      error, 
      isAuthenticated,
      userInfo,
      userVerification,
      requestEmailVerification,
      verifyEmail,
      forgotPassword,
      verifyResetToken,
      resetPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};