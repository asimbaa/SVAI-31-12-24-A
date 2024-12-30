import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { RegisterForm } from '../components/auth/RegisterForm';
import { useAuthContext } from '../components/auth/AuthProvider';
import AustralianLogo from '../components/AustralianLogo';

export default function Register() {
  const { register } = useAuthContext();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <AustralianLogo />
          </Link>
          <h1 className="text-3xl font-bold mt-6 mb-2">Create Account</h1>
          <p className="text-white/60">Join us on your immigration journey</p>
        </div>

        <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-6">
          <RegisterForm onSubmit={async (data) => {
            await register(data);
          }} />
          
          <div className="mt-6 text-center">
            <p className="text-white/60">
              Already have an account?{' '}
              <Link 
                to="/signin" 
                className="text-[hsl(var(--gold))] hover:text-[hsl(var(--gold))]/80"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}