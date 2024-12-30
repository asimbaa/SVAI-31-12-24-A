import { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Edit2 } from 'lucide-react';
import { CreateProfileForm } from '../profile/CreateProfileForm';
import type { ProfileData } from '@/lib/types/profile';

export function AccountOverview() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<Partial<ProfileData>>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      nationality: '',
      dateOfBirth: '',
      passportNumber: '',
      passportExpiry: '',
      address: {
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: ''
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
    <div className="space-y-6">
      <Card>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Personal Information</h2>
          <Button variant="outline" onClick={handleEdit} className="flex items-center gap-2">
            <Edit2 className="w-4 h-4" />
            Edit Profile
          </Button>
        </div>

        {profileData.personalInfo ? (
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-white/60 mb-1">Full Name</p>
              <p className="font-medium">{profileData.personalInfo.fullName}</p>
            </div>
            <div>
              <p className="text-sm text-white/60 mb-1">Email</p>
              <p className="font-medium">{profileData.personalInfo.email}</p>
            </div>
            <div>
              <p className="text-sm text-white/60 mb-1">Phone</p>
              <p className="font-medium">{profileData.personalInfo.phone}</p>
            </div>
            <div>
              <p className="text-sm text-white/60 mb-1">Nationality</p>
              <p className="font-medium">{profileData.personalInfo.nationality}</p>
            </div>
          </div>
        ) : (
          <p className="text-white/60">Please complete your profile to view your information.</p>
        )}
      </Card>

      {profileData.education && (
        <Card>
          <h2 className="text-xl font-semibold mb-6">Educational Background</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-white/60 mb-1">Highest Qualification</p>
              <p className="font-medium">{profileData.education.highestQualification}</p>
            </div>
            <div>
              <p className="text-sm text-white/60 mb-1">Institution</p>
              <p className="font-medium">{profileData.education.institution}</p>
            </div>
          </div>
        </Card>
      )}

      {profileData.visaInfo && (
        <Card>
          <h2 className="text-xl font-semibold mb-6">Visa Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-white/60 mb-1">Study Level</p>
              <p className="font-medium">{profileData.visaInfo.studyLevel}</p>
            </div>
            <div>
              <p className="text-sm text-white/60 mb-1">Intended Course</p>
              <p className="font-medium">{profileData.visaInfo.intendedCourse}</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}