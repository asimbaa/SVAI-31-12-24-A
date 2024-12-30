import { useState } from 'react';
import { ProfileSection } from './ProfileSection';
import { CreateProfileForm } from '../profile/CreateProfileForm';
import type { ProfileData } from '@/lib/types/profile';

export function ProfileOverview() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<Partial<ProfileData>>({
    personalInfo: {
      fullName: 'John Doe',
      dateOfBirth: '1995-01-01',
      nationality: 'Nepal',
      passportNumber: 'N1234567',
      passportExpiry: '2028-01-01',
      email: 'john@example.com',
      phone: '+977 98-1234567',
      address: {
        street: '123 Main St',
        city: 'Kathmandu',
        state: 'Bagmati',
        postalCode: '44600',
        country: 'Nepal'
      }
    }
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleProfileUpdate = (data: ProfileData) => {
    setProfileData(data);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <CreateProfileForm
        initialData={profileData}
        onSubmit={handleProfileUpdate}
      />
    );
  }

  return (
    <div>
      <ProfileSection
        title="Personal Information"
        data={profileData}
        onEdit={handleEdit}
      />
      <ProfileSection
        title="Educational Background"
        data={profileData}
        onEdit={handleEdit}
      />
      <ProfileSection
        title="Visa Information"
        data={profileData}
        onEdit={handleEdit}
      />
    </div>
  );
}