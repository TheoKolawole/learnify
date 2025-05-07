import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import VerifyEmailPage from '../pages/VerifyEmailPage';
import AuthRoutes from './AuthRoutes';
import { useAuth } from '../context/AuthContext';
import ProtectedRoutes from './ProtectedRoutes';
import VerificationRequiredRoutes from './VerificationRequiredRoutes';
import AccountRoutes from './AccountRoutes';
import ForgotPasswordPage from '@/pages/ForgotPasswordPage';
import ResetPasswordPage from '@/pages/ResetPasswordPage';

const AppRoutes = () => {
  const { isAuthenticated, userVerification } = useAuth();
  return (
    <Routes>
      {/* Public authentication routes */}
      <Route element={<AuthRoutes isAuthenticated={isAuthenticated} />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
      </Route>
      
      {/* Protected routes that only require authentication (email verification not required) */}
      <Route element={<ProtectedRoutes isAuthenticated={isAuthenticated} />}>
        {/* Email verification page */}
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        
        {/* Account routes that require both authentication AND email verification */}
        <Route element={<VerificationRequiredRoutes isEmailVerified={userVerification?.emailVerified} />}>
          <Route path="/user/*" element={<AccountRoutes />} />
        </Route>
      </Route>
      
      {/* Redirect root to login */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      
      {/* Catch-all for undefined routes */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;