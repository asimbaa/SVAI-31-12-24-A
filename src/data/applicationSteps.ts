export interface ApplicationStep {
  title: string;
  description: string;
  tasks: Task[];
  estimatedTime: string;
  tips: string[];
}

interface Task {
  name: string;
  description: string;
  important: boolean;
}

export const applicationSteps: Record<string, ApplicationStep[]> = {
  "189": [
    {
      title: "Skills Assessment",
      description: "Get your qualifications and skills assessed by the relevant authority",
      estimatedTime: "4-8 weeks",
      tasks: [
        {
          name: "Choose Assessing Authority",
          description: "Identify the correct authority for your occupation",
          important: true
        },
        {
          name: "Prepare Documents",
          description: "Gather academic and work experience documents",
          important: true
        },
        {
          name: "Submit Application",
          description: "Apply to the assessing authority with required fees",
          important: true
        }
      ],
      tips: [
        "Ensure all documents are certified copies",
        "Include detailed work reference letters",
        "Check processing times for your assessing authority"
      ]
    },
    {
      title: "English Language Test",
      description: "Take an approved English language test (IELTS, PTE, etc.)",
      estimatedTime: "2-4 weeks",
      tasks: [
        {
          name: "Choose Test Type",
          description: "Select IELTS Academic, PTE Academic, or other approved tests",
          important: true
        },
        {
          name: "Book Test Date",
          description: "Schedule your test at an approved center",
          important: true
        },
        {
          name: "Prepare for Test",
          description: "Study and practice for the test",
          important: true
        }
      ],
      tips: [
        "Book your test well in advance",
        "Take practice tests to familiarize yourself",
        "Ensure you meet minimum scores for your visa type"
      ]
    },
    {
      title: "Expression of Interest (EOI)",
      description: "Submit your EOI through SkillSelect",
      estimatedTime: "1-2 hours",
      tasks: [
        {
          name: "Create SkillSelect Account",
          description: "Register and set up your account",
          important: true
        },
        {
          name: "Fill EOI Details",
          description: "Enter your personal, educational, and work experience details",
          important: true
        },
        {
          name: "Review and Submit",
          description: "Double-check all information before submission",
          important: true
        }
      ],
      tips: [
        "Be accurate with all information provided",
        "Keep your EOI updated if circumstances change",
        "Save your EOI reference number"
      ]
    }
  ]
};