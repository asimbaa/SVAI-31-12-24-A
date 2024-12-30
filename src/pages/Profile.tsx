import { useState, useCallback } from 'react';
import { mockProfile } from '../data/profileData';
import ProfileSection from '../components/ProfileSection';
import { ProfileQuestionnaire } from '../components/profile/ProfileQuestionnaire';
import { ProfileEvaluation } from '../components/profile/ProfileEvaluation';
import { useProfileValidation } from '../hooks/useProfileValidation';

export default function Profile() {
  const [profile, setProfile] = useState(mockProfile);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const { validateProfile: _validateProfile } = useProfileValidation();

  const handleQuestionnaireComplete = useCallback((data: Record<string, string>) => {
    setProfile(prev => ({
      ...prev,
      questionnaire: data
    }));
    setShowQuestionnaire(false);
  }, []);

  const handleStartQuestionnaire = () => {
    setShowQuestionnaire(true);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Profile Management</h1>
        <button
          onClick={handleStartQuestionnaire}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90"
        >
          Update Eligibility
        </button>
      </div>

      {showQuestionnaire ? (
        <div className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-white/10 mb-8">
          <ProfileQuestionnaire onComplete={handleQuestionnaireComplete} />
        </div>
      ) : profile.questionnaire && (
        <ProfileEvaluation data={profile.questionnaire} />
      )}

      <ProfileSection title="Personal Information">
        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(profile.personalInfo).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </label>
              <p className="text-white/80">{value}</p>
            </div>
          ))}
        </div>
      </ProfileSection>

      <ProfileSection title="Application Details">
        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(profile.applicationDetails).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </label>
              <p className="text-gray-600">{value}</p>
            </div>
          ))}
        </div>
      </ProfileSection>

      <ProfileSection title="Preferences">
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="emailNotifications"
              checked={profile.preferences.emailNotifications}
              onChange={(e) => setProfile({
                ...profile,
                preferences: {
                  ...profile.preferences,
                  emailNotifications: e.target.checked
                }
              })}
              disabled={false}
              className="h-4 w-4 text-primary border-gray-300 rounded"
            />
            <label htmlFor="emailNotifications" className="ml-2 text-gray-700">
              Receive email notifications
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Language
            </label>
            {false ? (
              <select
                value={profile.preferences.language}
                onChange={(e) => setProfile({
                  ...profile,
                  preferences: {
                    ...profile.preferences,
                    language: e.target.value
                  }
                })}
                className="w-full md:w-64 p-2 border rounded-md"
              >
                <option value="English">English</option>
                <option value="Nepali">Nepali</option>
              </select>
            ) : (
              <p className="text-gray-600">{profile.preferences.language}</p>
            )}
          </div>
        </div>
      </ProfileSection>
    </div>
  );
}