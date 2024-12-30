export interface FAQCategory {
  id: string;
  title: string;
  description: string;
  faqs: FAQ[];
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  tags: string[];
}

export const faqCategories: FAQCategory[] = [
  {
    id: "visa",
    title: "Visa Application",
    description: "Common questions about visa applications and processes",
    faqs: [
      {
        id: "v1",
        question: "What are the basic requirements for a Skilled Independent visa (subclass 189)?",
        answer: "The basic requirements include: being under 45 years old, having competent English, having a skilled occupation on the relevant list, obtaining a positive skills assessment, and scoring at least 65 points.",
        tags: ["visa-189", "requirements", "points"]
      },
      {
        id: "v2",
        question: "How long does the visa application process usually take?",
        answer: "Processing times vary depending on the visa type and individual circumstances. For skilled visas, it typically takes 12-18 months from submission to decision.",
        tags: ["processing-time", "timeline"]
      }
    ]
  },
  {
    id: "documents",
    title: "Documentation",
    description: "Questions about required documents and paperwork",
    faqs: [
      {
        id: "d1",
        question: "What documents do I need for skills assessment?",
        answer: "Typically required documents include: academic transcripts, degree certificates, employment references, passport, CV/resume, and English test results. Specific requirements may vary by assessing authority.",
        tags: ["skills-assessment", "documents"]
      },
      {
        id: "d2",
        question: "Do I need to translate my documents?",
        answer: "Yes, all documents not in English must be translated by a NAATI-certified translator or equivalent authorized translator in your country.",
        tags: ["translation", "documents"]
      }
    ]
  },
  {
    id: "points",
    title: "Points System",
    description: "Understanding the points-based system for skilled migration",
    faqs: [
      {
        id: "p1",
        question: "How are points calculated for skilled migration?",
        answer: "Points are awarded based on factors including age, English language ability, skilled employment experience, educational qualifications, and other factors like partner skills or Australian study.",
        tags: ["points-test", "eligibility"]
      },
      {
        id: "p2",
        question: "What is the minimum points score required?",
        answer: "The minimum points requirement for skilled migration visas is 65 points. However, due to competition, you typically need a higher score to receive an invitation to apply.",
        tags: ["points-requirement", "invitation"]
      }
    ]
  }
];