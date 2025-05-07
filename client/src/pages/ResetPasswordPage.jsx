import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Alert } from '../components/Alert';
import ThemeToggle from '@/components/ThemeToggle';
import { Lock, Eye, EyeOff, Loader2, ArrowLeft, CheckCircle } from 'lucide-react';

export default function ResetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [validToken, setValidToken] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { verifyResetToken, resetPassword, login, loading } = useAuth();
  
  // Verify the token on component mount
  useEffect(() => {
    const checkToken = async () => {
      if (token) {
        try {
          const response = await verifyResetToken(token);
          if (response.status === 'success' && response.valid) {
            setValidToken(true);
            setMessage('');
            setMessageType('');
          } else {
            setMessage('Invalid or expired reset token. Please request a new password reset link.');
            setMessageType('error');
          }
        } catch (error) {
          setMessage('An error occurred. Please try again later.');
          setMessageType('error');
        }
      } else {
        navigate('/forgot-password');
      }
    };

    checkToken();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Form validation
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      setMessageType('error');
      return;
    }

    // Check password pattern (same as register page)
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordPattern.test(password)) {
      setMessage('Password must be at least 8 characters, include a letter, a number, and a special character.');
      setMessageType('error');
      return;
    }

    try {
      const response = await resetPassword(token, password);
      if (response.status === 'success') {
        setMessage(response.msg || 'Password reset successful!');
        setMessageType('success');
        setIsSuccess(true);
        
        // Extract email from the response if available
        if (response.email) {
          // Auto-login with new password after 3 seconds
          setTimeout(() => {
            login({ email: response.email, password });
          }, 3000);
        }
        // No redirect - the login function will handle redirection
      } else {
        setMessage(response.msg || 'An error occurred');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
      setMessageType('error');
    }
  };

  if (!token) {
    return <div>Invalid request</div>;
  }

  return (
    <div className="flex min-h-screen bg-background py-8 transition-colors duration-300">
      <div className="m-auto w-full max-w-md px-4">
        {/* App Logo/Name */}
        <div className="text-center pt-8">
          <h1 className="text-4xl font-bold text-primary mb-4 md:mb-8">MyApp</h1>
        </div>
        
        <div className="overflow-hidden rounded-xl bg-card shadow-lg transition-colors duration-300">
          {/* Theme Toggle Button */}
          <div className="absolute top-4 right-4">
            <ThemeToggle />
          </div>

          {/* Header */}
          <div className="bg-primary px-6 py-8 text-center text-primary-foreground">
            <h1 className="text-3xl font-bold">Reset Password</h1>
            <p className="mt-2 opacity-80">Create a new secure password</p>
          </div>

          {/* Form */}
          <div className="p-6">
            {message && (
              <Alert 
                status={messageType} 
                msg={message} 
                className="mb-4"
              />
            )}
            
            {isSuccess ? (
              <div className="text-center py-8">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Password Reset Successfully</h3>
                <p className="text-muted-foreground mb-6">Logging you in automatically...</p>
                <div className="flex items-center justify-center">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              </div>
            ) : validToken && (
              <form className="space-y-5" onSubmit={handleSubmit}>
                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="mb-1 block text-sm font-medium text-foreground">
                    New Password
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Lock className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      className="w-full rounded-lg border border-input bg-background p-3 pl-10 pr-10 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring transition-colors"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                      title="Password must be at least 8 characters, include a letter, a number, and a special character."
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <Eye className="h-5 w-5" />
                      ) : (
                        <EyeOff className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Password must be at least 8 characters and include a letter, a number, and a special character
                  </p>
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label htmlFor="confirm-password" className="mb-1 block text-sm font-medium text-foreground">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Lock className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      className="w-full rounded-lg border border-input bg-background p-3 pl-10 pr-10 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring transition-colors"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                      {showConfirmPassword ? (
                        <Eye className="h-5 w-5" />
                      ) : (
                        <EyeOff className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full rounded-lg bg-primary py-3 px-4 text-center font-medium text-primary-foreground shadow-md transition duration-200 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <Loader2 className="mr-2 h-5 w-5 animate-spin text-primary-foreground" />
                      Resetting...
                    </div>
                  ) : (
                    "Reset Password"
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-border bg-muted p-4 text-center transition-colors duration-300">
            <Link to="/login" className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to login
            </Link>
          </div>
        </div>

        {/* Terms and Privacy */}
        <p className="mt-4 text-center text-xs text-muted-foreground">
          By continuing, you agree to our{" "}
          <Link to="/terms" className="text-primary hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}