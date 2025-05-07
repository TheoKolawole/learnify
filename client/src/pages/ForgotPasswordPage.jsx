import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Alert } from '../components/Alert';
import ThemeToggle from '@/components/ThemeToggle';
import { Mail, ArrowLeft, Loader2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const { forgotPassword, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setMessage('Please enter your email address');
      setMessageType('error');
      return;
    }

    try {
      const response = await forgotPassword(email);
      if (response.status === 'success') {
        setMessage(response.msg);
        setMessageType('success');
        setEmail('');
      } else {
        setMessage(response.msg || 'An error occurred');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
      setMessageType('error');
    }
  };

  return (
    <div className="flex min-h-screen bg-background py-8 transition-colors duration-300">
      <div className="m-auto w-full max-w-md px-4">
        {/* App Logo/Name */}
        <div className="text-center pt-8">
          <h1 className="text-4xl font-bold text-primary mb-4 md:mb-8">Learnify</h1>
        </div>
        
        <div className="overflow-hidden rounded-xl bg-card shadow-lg transition-colors duration-300">
          {/* Theme Toggle Button */}
          <div className="absolute top-4 right-4">
            <ThemeToggle />
          </div>

          {/* Header */}
          <div className="bg-primary px-6 py-8 text-center text-primary-foreground">
            <h1 className="text-3xl font-bold">Forgot Password</h1>
            <p className="mt-2 opacity-80">We'll send you a reset link</p>
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
            
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium text-foreground">
                  Email Address
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    className="w-full rounded-lg border border-input bg-background p-3 pl-10 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring transition-colors"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
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
                    Sending...
                  </div>
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </form>
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