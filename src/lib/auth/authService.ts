import type { AuthUser, LoginCredentials, RegisterData } from './types';

class AuthService {
  private static instance: AuthService;
  private mockUser: AuthUser | null = null;
  private mockProfiles: Record<string, any> = {};

  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(credentials: LoginCredentials): Promise<AuthUser> {
    try {
      // Mock authentication for demo purposes
      await new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          if (!credentials.email || !credentials.password) {
            reject(new Error('Email and password are required'));
            return;
          }

          // Demo validation
          if (credentials.password.length < 1) {
            reject(new Error('Invalid password'));
            return;
          }

          resolve();
        }, 1000);
      });

      // Create mock user
      this.mockUser = {
        id: '1',
        email: credentials.email || '',
        name: 'Demo User',
        country: 'Nepal',
        verified: true,
        createdAt: new Date()
      };

      return this.mockUser;
    } catch (error) {
      throw error;
    }
  }

  async getProfile(userId: string): Promise<any> {
    return this.mockProfiles[userId] || null;
  }

  async saveProfile(userId: string, profileData: any): Promise<void> {
    this.mockProfiles[userId] = profileData;
  }

  async register(data: RegisterData): Promise<AuthUser> {
    try {
      // Mock registration for demo purposes
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

      this.mockUser = {
        id: '1',
        email: data.email,
        name: data.name,
        country: data.country,
        verified: false,
        createdAt: new Date()
      };

      return this.mockUser;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    this.mockUser = null;
  }
}

export const authService = AuthService.getInstance();