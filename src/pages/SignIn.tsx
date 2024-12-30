import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuthContext } from '@/components/auth/AuthProvider';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { hasProfile } = await login({ email, password });
      if (hasProfile) {
        navigate('/dashboard');
      } else {
        navigate('/dashboard/account');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to sign in');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block text-3xl font-bold text-white">
            Student Visa AI
          </Link>
          <h1 className="text-3xl font-bold mt-6 mb-2">Sign in</h1>
          <p className="text-white/60">Continue your journey to study in Australia</p>
        </div>

        <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-8">
          <form onSubmit={handleContinue} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-sm text-red-200">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-white mb-1">
                Email address
              </label>
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-white mb-1">
                Password
              </label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[hsl(var(--gold))] text-[hsl(var(--navy))]"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Continue'}
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[hsl(var(--navy))] text-white/60">or continue with</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              onClick={() => login({ provider: 'google' })}
            >
              <img src="/google.svg" alt="Google" className="w-5 h-5" />
              Continue with Google
            </Button>

            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              onClick={() => login({ provider: 'microsoft' })}
            >
              <img src="/microsoft.svg" alt="Microsoft" className="w-5 h-5" />
              Continue with Microsoft Account
            </Button>

            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              onClick={() => login({ provider: 'apple' })}
            >
              <img src="/apple.svg" alt="Apple" className="w-5 h-5" />
              Continue with Apple
            </Button>
          </div>

          <p className="mt-8 text-center text-sm text-white/60">
            Don't have an account?{' '}
            <Link to="/register" className="text-[hsl(var(--gold))] hover:text-[hsl(var(--gold))]/80">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}