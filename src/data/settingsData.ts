export interface UserSettings {
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  preferences: {
    language: 'en' | 'ne';
    theme: 'light' | 'dark' | 'system';
    timezone: string;
  };
  privacy: {
    profileVisibility: 'public' | 'private';
    showProgress: boolean;
    shareActivity: boolean;
  };
}

export const defaultSettings: UserSettings = {
  notifications: {
    email: true,
    push: true,
    sms: false,
  },
  preferences: {
    language: 'en',
    theme: 'system',
    timezone: 'Australia/Sydney',
  },
  privacy: {
    profileVisibility: 'public',
    showProgress: true,
    shareActivity: true,
  },
};