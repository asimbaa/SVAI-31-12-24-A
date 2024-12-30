import { createContext, useContext } from 'react';
import { useAuth } from '@/hooks/useAuth';
import type { AuthContextType } from '@/lib/auth/types';

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={{
      user: auth.user,
      isLoading: auth.isLoading,
      error: auth.error,
      login: async (credentials) => {
        const { user } = await auth.login(credentials);
        return user;
      },
      register: auth.register,
      logout: auth.logout,
      setUser: auth.setUser,
      reset: auth.reset
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}