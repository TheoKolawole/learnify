import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Alert } from '../components/Alert';
import ThemeToggle from '@/components/ThemeToggle';
import { Mail, Lock, Eye, EyeOff, Loader2, User, Phone } from 'lucide-react';

export default function RegisterPage() {
  const { register, loading, error } = useAuth();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrMsg("Passwords do not match");
      return;
    }
    register({
      firstname,
      lastname,
      email,
      password,
    });
  };

  return (
    <div className="flex min-h-screen bg-background py-8 transition-colors duration-300">
      <div className="m-auto w-full max-w-lg px-4 pt-12 md:pt-0">
        {/* App Logo/Name */}
        <div className="text-center pt-8">
          <h1 className="text-4xl font-bold text-primary mb-4 md:mb-8">MyApp</h1>
        </div>
        <div className="overflow-hidden rounded-xl bg-card shadow-lg transition-colors duration-300">
          {/* Theme Toggle Button */}
          <div className="absolute top-4 right-4 z-10">
            <ThemeToggle />
          </div>

          {/* Header */}
          <div className="bg-primary px-6 py-8 text-center text-primary-foreground mt-6 md:mt-0">
            <h1 className="text-3xl font-bold">Create Account</h1>
            <p className="mt-2 opacity-80">Sign up to get started with MyApp</p>
          </div>

          {/* Form */}
          <div className="p-6">
            {(error || errMsg) && (
              <Alert status="error" msg={error || errMsg} />
            )}
            
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstname" className="mb-1 block text-sm font-medium text-foreground">
                    First Name
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <User className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <input
                      id="firstname"
                      type="text"
                      className="w-full rounded-lg border border-input bg-background p-3 pl-10 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring transition-colors"
                      placeholder="First name"
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                      required
                      minLength={2}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="lastname" className="mb-1 block text-sm font-medium text-foreground">
                    Last Name
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <User className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <input
                      id="lastname"
                      type="text"
                      className="w-full rounded-lg border border-input bg-background p-3 pl-10 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring transition-colors"
                      placeholder="Last name"
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                      required
                      minLength={2}
                    />
                  </div>
                </div>
              </div>

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

              {/* Password Fields */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="password" className="mb-1 block text-sm font-medium text-foreground">
                    Password
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
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium text-foreground">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Lock className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <input
                      id="confirmPassword"
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
                    Creating account...
                  </div>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="border-t border-border bg-muted p-4 text-center transition-colors duration-300">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-primary hover:text-primary/80">
                Sign in
              </Link>
            </p>
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