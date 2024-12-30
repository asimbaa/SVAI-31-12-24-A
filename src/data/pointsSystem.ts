export interface AgePoints {
  range: string;
  points: number;
  description: string;
}

export interface QualificationPoints {
  level: string;
  points: number;
  description: string;
}

export interface ExperiencePoints {
  years: string;
  points: number;
  description: string;
}

export interface EnglishPoints {
  level: string;
  points: number;
  description: string;
}

export const pointsSystem = {
  age: [
    { range: "18-24", points: 25, description: "18-24 years" },
    { range: "25-32", points: 30, description: "25-32 years" },
    { range: "33-39", points: 25, description: "33-39 years" },
    { range: "40-44", points: 15, description: "40-44 years" },
    { range: "45+", points: 0, description: "45 years or older" }
  ],
  qualifications: [
    { level: "doctorate", points: 20, description: "Doctorate from an Australian educational institution or a Doctorate from another educational institution of a recognized standard" },
    { level: "masters", points: 15, description: "Masters degree from an Australian educational institution or a Masters degree from another educational institution of a recognized standard" },
    { level: "bachelors", points: 10, description: "Bachelor degree from an Australian educational institution or a Bachelor degree from another educational institution of a recognized standard" }
  ],
  experience: [
    { years: "0-2", points: 0, description: "Less than 3 years" },
    { years: "3-4", points: 5, description: "At least 3 but less than 5 years" },
    { years: "5-7", points: 10, description: "At least 5 but less than 8 years" },
    { years: "8+", points: 15, description: "8 years or more" }
  ],
  english: [
    { level: "superior", points: 20, description: "Superior English (IELTS 8+)" },
    { level: "proficient", points: 10, description: "Proficient English (IELTS 7+)" },
    { level: "competent", points: 0, description: "Competent English (IELTS 6+)" }
  ]
};