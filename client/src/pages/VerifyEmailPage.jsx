import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Alert } from '../components/Alert';
import ThemeToggle from '@/components/ThemeToggle';
import { Mail, Check, Loader2, RefreshCw } from 'lucide-react';

const VerifyEmailPage = () => {
  const { userAuthentication, requestEmailVerification, verifyEmail, loading, logout } = useAuth();
  const [verificationCode, setVerificationCode] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const [attemptsLeft, setAttemptsLeft] = useState(null);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();

  const hasSentOtp = useRef(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (userAuthentication?.emailVerified) {
      navigate('/user/dashboard');
    } else if (!hasSentOtp.current) {
      handleInitialRequest();
      hasSentOtp.current = true;
    }
  }, [userAuthentication?.emailVerified]);

  useEffect(() => {
    if (countdown > 0) {
      timerRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [countdown]);

  const startCountdown = (seconds = 30) => {
    setCountdown(seconds);
    setResendDisabled(true);
  };

  const handleInitialRequest = async () => {
    if (!loading) {
      const result = await requestEmailVerification();

      if (result.status === 'success') {
        setMessage(result.msg || 'Verification code sent to your email');
        setMessageType('success');
        startCountdown();
      } else {
        setMessage(result.msg || 'Failed to send verification code');
        setMessageType('error');
      }
    }
  };

  const handleRequestCode = async () => {
    if (loading || resendDisabled) return;

    setMessage('');
    setMessageType('');

    const result = await requestEmailVerification();

    if (result.status === 'success') {
      setMessage(result.msg || 'Verification code sent to your email');
      setMessageType('success');
      startCountdown();
    } else {
      setMessage(result.msg || 'Failed to send verification code');
      setMessageType('error');
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');

    if (!verificationCode.trim()) {
      setMessage('Please enter the verification code');
      setMessageType('error');
      return;
    }

    const result = await verifyEmail(verificationCode);

    if (result.status === 'success') {
      setMessage(result.msg || 'Email verified successfully');
      setMessageType('success');
      setVerificationCode('');

      setTimeout(() => {
        navigate('/user/dashboard');
      }, 1500);
    } else {
      setMessage(result.msg || 'Failed to verify email');
      setMessageType('error');
      if (result.attemptsLeft !== undefined) {
        setAttemptsLeft(result.attemptsLeft);
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-background py-8 transition-colors duration-300">
      <div className="m-auto w-full max-w-md px-4">
        <div className="text-center pt-8">
          <h1 className="text-4xl font-bold text-primary mb-4 md:mb-8">Learnify</h1>
        </div>

        <div className="overflow-hidden rounded-xl bg-card shadow-lg transition-colors duration-300">
          <div className="absolute top-4 right-4">
            <ThemeToggle />
          </div>

          <div className="bg-primary px-6 py-8 text-center text-primary-foreground">
            <h1 className="text-3xl font-bold">Verify Your Email</h1>
            <p className="mt-2 opacity-80">Complete your account setup to continue</p>
          </div>

          <div className="p-6">
            {message && (
              <Alert status={messageType} msg={message} className="mb-4" />
            )}

            <div className="mb-6">
              <p className="text-foreground mb-4">
                We've sent a verification code to your email address. Please enter it below to verify your account.
              </p>

              <button
                onClick={handleRequestCode}
                disabled={loading || resendDisabled}
                className="w-full flex items-center justify-center rounded-lg border border-input bg-background py-2 px-4 text-foreground hover:bg-muted transition-colors mb-6 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : resendDisabled ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Code Sent ({countdown}s)
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Resend Verification Code
                  </>
                )}
              </button>
            </div>

            <form onSubmit={handleVerify} className="space-y-5">
              <div>
                <label htmlFor="code" className="mb-1 block text-sm font-medium text-foreground">
                  Verification Code
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    type="text"
                    id="code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="Enter verification code"
                    className="w-full rounded-lg border border-input bg-background p-3 pl-10 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring transition-colors"
                    required
                  />
                </div>
                {attemptsLeft !== null && (
                  <p className="text-sm text-muted-foreground mt-1">Attempts left: {attemptsLeft}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading || !verificationCode.trim()}
                className="w-full rounded-lg bg-primary py-3 px-4 text-center font-medium text-primary-foreground shadow-md transition duration-200 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Verifying...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Check className="mr-2 h-5 w-5" />
                    Verify Email
                  </div>
                )}
              </button>
            </form>
          </div>

          <div className="border-t border-border bg-muted p-4 text-center transition-colors duration-300">
            <button className="text-sm text-muted-foreground" onClick={logout}>
              Back to{' '}
              <Link to="/login" className="font-medium text-primary hover:text-primary/80">
                Sign in
              </Link>
            </button>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          By continuing, you agree to our{' '}
          <Link to="/terms" className="text-primary hover:underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link to="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
