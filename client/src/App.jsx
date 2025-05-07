import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import useAxiosAuth from './hooks/useAxiosAuth';
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from './context/ThemeContext';
import { ToastContainer } from './hooks/useToast';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AxiosAuthWrapper>
          <ThemeProvider>
            <AppRoutes />
            <ToastContainer />
          </ThemeProvider>
        </AxiosAuthWrapper>
      </AuthProvider>
    </Router>
  );
}

function AxiosAuthWrapper({ children }) {
  useAxiosAuth();
  return <>{children}</>;
}
