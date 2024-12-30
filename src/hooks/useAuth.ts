import { useCallback } from 'react';
import { useAuthStore } from '@/lib/auth/authStore';
import { authService } from '@/lib/auth/authService';
import { eligibilityStorage } from '@/lib/storage/eligibilityStorage';
import { authStorage } from '@/lib/storage/authStorage';
import type { LoginCredentials, RegisterData } from '@/lib/auth/types';

export function useAuth() {
  const { user, isLoading, error, setUser, setLoading, setError, reset } = useAuthStore();

  const login = useCallback(async (credentials: LoginCredentials) => {
    setLoading(true);
    setError(null);
    let hasProfile = false;

    try {
      if (!credentials.provider && (!credentials.email || !credentials.password)) {
        throw new Error('Email and password are required');
      }

      const user = await authService.login(credentials);
      
      // Check if user has a complete profile
      const profileData = await authService.getProfile(user.id);
      hasProfile = !!profileData;
      
      setUser(user);
      return { user, hasProfile };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      setError(message);
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [setUser, setLoading, setError]);

  const register = useCallback(async (data: RegisterData) => {
    setLoading(true);
    setError(null);
    try {
      // Save auth data with eligibility results if available
      const eligibilityData = eligibilityStorage.get();
      if (eligibilityData) {
        authStorage.save({
          email: data.email,
          eligibilityData: {
            formData: eligibilityData.formData,
            result: eligibilityData.result
          }
        });
      }

      const user = await authService.register(data);
      setUser(user);
      eligibilityStorage.clear(); // Clear eligibility data after successful registration
      return user;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Registration failed');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [setUser, setLoading, setError]);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
      reset();
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, [reset]);

  return {
    user,
    isLoading,
    error,
    setUser,
    login,
    register,
    logout,
    reset
  };
}