import { useState } from 'react';
import { defaultSettings, type UserSettings } from '../data/settingsData';
import SettingsSection from '../components/SettingsSection';
import { Bell, Globe, Lock } from 'lucide-react';

export default function Settings() {
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <SettingsSection
        title="Notifications"
        description="Choose how you want to receive updates and alerts"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-gray-500" />
              <div>
                <p className="font-medium text-white">Email Notifications</p>
                <p className="text-sm text-white/80">Receive updates via email</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.email}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: {
                    ...settings.notifications,
                    email: e.target.checked
                  }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-gray-500" />
              <div>
                <p className="font-medium text-white">Push Notifications</p>
                <p className="text-sm text-white/80">Receive updates in browser</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.push}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: {
                    ...settings.notifications,
                    push: e.target.checked
                  }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Preferences"
        description="Customize your application experience"
      >
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Globe className="w-5 h-5 text-gray-500" />
              <label className="font-medium text-white">Language</label>
            </div>
            <select
              value={settings.preferences.language}
              onChange={(e) => setSettings({
                ...settings,
                preferences: {
                  ...settings.preferences,
                  language: e.target.value as 'en' | 'ne'
                }
              })}
              className="w-full md:w-64 p-2 bg-black/20 border border-white/10 rounded-md text-white"
            >
              <option value="en">English</option>
              <option value="ne">Nepali</option>
            </select>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-3">
              <Globe className="w-5 h-5 text-gray-500" />
              <label className="font-medium">Theme</label>
            </div>
            <select
              value={settings.preferences.theme}
              onChange={(e) => setSettings({
                ...settings,
                preferences: {
                  ...settings.preferences,
                  theme: e.target.value as 'light' | 'dark' | 'system'
                }
              })}
              className="w-full md:w-64 p-2 border rounded-md"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Privacy"
        description="Control your privacy settings"
      >
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Lock className="w-5 h-5 text-gray-500" />
              <label className="font-medium">Profile Visibility</label>
            </div>
            <select
              value={settings.privacy.profileVisibility}
              onChange={(e) => setSettings({
                ...settings,
                privacy: {
                  ...settings.privacy,
                  profileVisibility: e.target.value as 'public' | 'private'
                }
              })}
              className="w-full md:w-64 p-2 border rounded-md"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-gray-500" />
              <div>
                <p className="font-medium">Share Progress</p>
                <p className="text-sm text-gray-600">Show your application progress to others</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.privacy.showProgress}
                onChange={(e) => setSettings({
                  ...settings,
                  privacy: {
                    ...settings.privacy,
                    showProgress: e.target.checked
                  }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </SettingsSection>
    </div>
  );
}