import { StudentVisaQuiz } from '../quiz/StudentVisaQuiz';
import { DocumentChecklist } from '../DocumentChecklist';
import { ApplicationGuide } from '../ApplicationGuide';
import { type JourneyStep } from '../types';

export const STUDENT_JOURNEY_STEPS: JourneyStep[] = [
  { 
    id: 'quiz',
    title: 'Visa Quiz', 
    component: StudentVisaQuiz,
    requirements: [
      { id: 'course', title: 'Course Selection', met: false, required: true },
      { id: 'duration', title: 'Study Duration', met: false, required: true },
      { id: 'institution', title: 'Institution', met: false, required: true }
    ]
  },
  { 
    id: 'documents',
    title: 'Document Checklist', 
    component: DocumentChecklist,
    requirements: [
      { id: 'passport', title: 'Valid Passport', met: false, required: true },
      { id: 'academic', title: 'Academic Documents', met: false, required: true },
      { id: 'english', title: 'English Test Results', met: false, required: true }
    ]
  },
  { 
    id: 'guide',
    title: 'Application Guide', 
    component: ApplicationGuide,
    requirements: [
      { id: 'coe', title: 'Confirmation of Enrolment', met: false, required: true },
      { id: 'health', title: 'Health Insurance', met: false, required: true },
      { id: 'visa', title: 'Visa Application', met: false, required: true }
    ]
  }
];