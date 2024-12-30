export const eligibilityQuestions = [
  {
    id: 'course_level',
    title: 'Course Level',
    description: 'What level of study are you planning to undertake in Australia?',
    type: 'select',
    options: [
      'English Language Course',
      'Vocational Education (VET)',
      'Bachelor Degree',
      'Master Degree',
      'Doctoral Degree'
    ],
    required: true
  },
  {
    id: 'institution',
    title: 'Educational Institution',
    description: 'Have you received an offer from an Australian educational institution?',
    type: 'select',
    options: [
      'Yes, I have a confirmed offer (CoE)',
      'Yes, I have a conditional offer',
      'No, still searching',
      'No, not started yet'
    ],
    required: true
  },
  {
    id: 'english',
    title: 'English Proficiency',
    description: 'What is your English language test score?',
    type: 'select',
    options: [
      'IELTS 7.0 or higher',
      'IELTS 6.5',
      'IELTS 6.0',
      'IELTS 5.5',
      'TOEFL iBT 79 or higher',
      'PTE Academic 58 or higher',
      'Not taken yet'
    ],
    required: true
  },
  {
    id: 'financial_capacity',
    title: 'Financial Capacity',
    description: 'Can you demonstrate access to sufficient funds for tuition fees, living costs, and travel?',
    type: 'select',
    options: [
      'Yes, I can demonstrate full financial capacity',
      'Yes, with family/sponsor support',
      'Partial - need more information',
      'No, not yet'
    ],
    required: true
  },
  {
    id: 'age',
    title: 'Date of Birth',
    description: 'Please enter your date of birth',
    type: 'date',
    required: true,
    validation: {
      min: '1954-01-01', // 70 years ago
      max: '2008-01-01'  // 16 years ago
    }
  },
  {
    id: 'study_gap',
    title: 'Study Gap',
    description: 'How long has it been since you last studied formally?',
    type: 'select',
    options: [
      'Currently studying',
      'Less than 6 months',
      '6 months to 1 year',
      '1-2 years',
      '2-5 years',
      'More than 5 years'
    ],
    required: true
  },
  {
    id: 'visa_history',
    title: 'Visa History',
    description: 'Have you had any visa refusals or cancellations?',
    type: 'select',
    options: [
      'No visa refusals or cancellations',
      'Yes, Australian visa refusal/cancellation',
      'Yes, other country visa refusal/cancellation',
      'Multiple visa refusals/cancellations'
    ],
    required: true
  },
  {
    id: 'study_location',
    title: 'Study Location Preference',
    description: 'Which location in Australia do you prefer to study?',
    type: 'select',
    options: [
      'Major City (Sydney/Melbourne)',
      'Regional Area (Additional Points)',
      'No preference yet',
      'Need more information'
    ],
    required: true
  },
  {
    id: 'health_insurance',
    title: 'Health Insurance',
    description: 'Do you understand the Overseas Student Health Cover (OSHC) requirements?',
    type: 'select',
    options: [
      'Yes, I understand and will arrange OSHC',
      'Need more information about OSHC',
      'No, not familiar with OSHC'
    ],
    required: true
  },
  {
    id: 'health_check',
    title: 'Health Requirements',
    description: 'Are you willing to undergo a health examination if required?',
    type: 'select',
    options: [
      'Yes, I understand and agree',
      'Need more information',
      'Have medical conditions to declare',
      'No'
    ],
    required: true
  },
  {
    id: 'genuine_student',
    title: 'Genuine Student',
    description: 'Can you demonstrate that you are a genuine temporary entrant?',
    type: 'select',
    options: [
      'Yes, I can explain my study plans',
      'Need help with GTE statement',
      'Not sure what this means'
    ],
    required: true
  },
  {
    id: 'character',
    title: 'Character Requirements',
    description: 'Do you meet the character requirements for Australian visa?',
    type: 'select',
    options: [
      'Yes, I meet all requirements',
      'Have minor offenses to declare',
      'Need to check requirements',
      'Not sure'
    ],
    required: true
  }
] as const;