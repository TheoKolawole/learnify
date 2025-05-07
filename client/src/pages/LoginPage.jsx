import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Alert } from '../components/Alert';
import ThemeToggle from '@/components/ThemeToggle';
import { Mail, Lock, Eye, EyeOff, Loader2, Facebook, Chrome } from 'lucide-react';

export default function LoginPage() {
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password, rememberMe });
  }

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
              <h1 className="text-3xl font-bold">Welcome Back</h1>
              <p className="mt-2 opacity-80">Sign in to continue to Learnify</p>
            </div>

          {/* Form */}
          <div className="p-6">
            {error && (
              <Alert status="error" msg={error} />
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

              {/* Password Field */}
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-foreground">
                    Password
                  </label>
                  <Link to="/forgot-password" className="text-xs font-medium text-primary hover:text-primary/80">
                    Forgot password?
                  </Link>
                </div>
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

              {/* Remember Me Checkbox */}
              {/* <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-input bg-background text-primary focus:ring-ring"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-foreground">
                  Remember me
                </label>
              </div> */}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full rounded-lg bg-primary py-3 px-4 text-center font-medium text-primary-foreground shadow-md transition duration-200 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="mr-2 h-5 w-5 animate-spin text-primary-foreground" />
                    Signing in...
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

          </div>

          {/* Footer */}
          <div className="border-t border-border bg-muted p-4 text-center transition-colors duration-300">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/register" className="font-medium text-primary hover:text-primary/80">
                Sign up
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