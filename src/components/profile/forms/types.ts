import type { ProfileData } from '@/lib/types/profile';

export type EducationFormData = NonNullable<ProfileData['education']>;
export type ExperienceFormData = NonNullable<ProfileData['experience']>;
export type VisaInfoFormData = NonNullable<ProfileData['visaInfo']>;
export type FinancialInfoFormData = NonNullable<ProfileData['financialInfo']>;
export type HealthInfoFormData = NonNullable<ProfileData['healthInfo']>;
export type EmergencyContactsFormData = NonNullable<ProfileData['emergencyContacts']>;
export type AdditionalInfoFormData = NonNullable<ProfileData['additionalInfo']>;