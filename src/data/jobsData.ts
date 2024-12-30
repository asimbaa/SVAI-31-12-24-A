export interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: 'full-time' | 'part-time' | 'contract' | 'casual';
  description: string;
  requirements: string[];
  skills: string[];
  visaSponsorship: boolean;
  postedDate: string;
  industry: string;
}

export const mockJobs: JobPosting[] = [
  {
    id: "j1",
    title: "Senior Software Engineer",
    company: "TechCorp Australia",
    location: "Sydney, NSW",
    salary: "130,000 - 150,000 AUD",
    type: "full-time",
    description: "Looking for an experienced software engineer to join our growing team...",
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "5+ years of experience in software development",
      "Strong knowledge of React and Node.js",
      "Experience with cloud platforms (AWS/Azure)"
    ],
    skills: ["React", "Node.js", "AWS", "TypeScript", "Agile"],
    visaSponsorship: true,
    postedDate: "2024-02-15",
    industry: "Technology"
  },
  {
    id: "j2",
    title: "Civil Engineer",
    company: "BuildWell Construction",
    location: "Melbourne, VIC",
    salary: "90,000 - 110,000 AUD",
    type: "full-time",
    description: "Seeking a qualified civil engineer for infrastructure projects...",
    requirements: [
      "Bachelor's degree in Civil Engineering",
      "3+ years of experience",
      "Knowledge of Australian building codes",
      "Project management experience"
    ],
    skills: ["AutoCAD", "Project Management", "Structural Design", "Cost Estimation"],
    visaSponsorship: true,
    postedDate: "2024-02-14",
    industry: "Construction"
  },
  {
    id: "j3",
    title: "Registered Nurse",
    company: "HealthCare Plus",
    location: "Brisbane, QLD",
    salary: "75,000 - 85,000 AUD",
    type: "full-time",
    description: "Join our dedicated nursing team in providing excellent patient care...",
    requirements: [
      "Bachelor of Nursing degree",
      "AHPRA registration",
      "Minimum 2 years experience",
      "Strong communication skills"
    ],
    skills: ["Patient Care", "Clinical Documentation", "Team Leadership", "Emergency Response"],
    visaSponsorship: true,
    postedDate: "2024-02-13",
    industry: "Healthcare"
  }
];