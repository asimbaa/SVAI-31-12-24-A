export interface VisaType {
  code: string;
  name: string;
  description: string;
  eligibility: string[];
  processingTime: string;
  cost: string;
  requirements: string[];
  financialRequirements: {
    amount: string;
    details: string[];
  };
  checklist: string[];
}

export const visaTypes: VisaType[] = [
  {
    code: "500",
    name: "Student Visa",
    description: "For international students who want to study in Australia at a registered institution",
    eligibility: [
      "Have an accepted offer from an Australian educational institution",
      "Meet English language requirements",
      "Meet genuine temporary entrant requirements",
      "Be at least 6 years of age",
      "Have adequate health insurance"
    ],
    processingTime: "75% of applications: 29 days",
    cost: "AUD 710",
    requirements: [
      "Confirmation of Enrolment (CoE)",
      "Valid passport",
      "English test results",
      "Academic transcripts",
      "Statement of Purpose"
    ],
    financialRequirements: {
      amount: "Required amount in Bank: AUD 21,041 per year + course fees + AUD 2,000-4,000 travel costs",
      details: [
        "Living costs: AUD 21,041 per year",
        "Course fees for one year",
        "Travel costs: AUD 2,000 - AUD 4,000",
        "Dependent costs if applicable: AUD 7,362 per year per dependent"
      ]
    },
    checklist: [
      "Valid passport with at least 6 months validity",
      "Confirmation of Enrolment (CoE)",
      "English test results (IELTS 5.5+, PTE 42+, or equivalent)",
      "Proof of financial capacity",
      "Overseas Student Health Cover (OSHC)",
      "Genuine Temporary Entrant (GTE) statement",
      "Academic transcripts and certificates",
      "Police clearance certificates if required"
    ]
  },
  {
    code: "485",
    name: "Temporary Graduate Visa",
    description: "For international students who have recently graduated from an Australian institution",
    eligibility: [
      "Have completed at least 2 years of study in Australia",
      "Meet English language requirements",
      "Be under 50 years of age",
      "Hold or have held a student visa in the last 6 months"
    ],
    processingTime: "75% of applications: 90 days",
    cost: "AUD 1,730",
    requirements: [
      "Completed qualification from CRICOS registered course",
      "Skills assessment if applicable",
      "English language test results",
      "Health and character requirements"
    ],
    financialRequirements: {
      amount: "Required amount in Bank: AUD 5,000 minimum recommended",
      details: [
        "Must demonstrate sufficient funds for stay",
        "Evidence of employment prospects",
        "Health insurance coverage"
      ]
    },
    checklist: [
      "Completed qualification documents",
      "Academic transcripts",
      "English test results (IELTS 6.0+, PTE 50+, or equivalent)",
      "Police clearance certificates",
      "Health insurance evidence",
      "Form 1221 - Additional personal particulars",
      "Skills assessment (if applicable)"
    ]
  },
  {
    code: "600",
    name: "Visitor Visa",
    description: "For people wanting to visit Australia for tourism or business visitor activities",
    eligibility: [
      "Genuine intention to visit temporarily",
      "Meet health and character requirements",
      "Have sufficient funds for stay",
      "Meet visa conditions"
    ],
    processingTime: "75% of applications: 15 days",
    cost: "AUD 145",
    requirements: [
      "Valid passport",
      "Proof of funds",
      "Travel itinerary",
      "Letter of invitation (if applicable)"
    ],
    financialRequirements: {
      amount: "Required amount in Bank: AUD 5,000 per person + return airfare costs",
      details: [
        "Sufficient funds for entire stay",
        "Return airfare costs",
        "Accommodation costs"
      ]
    },
    checklist: [
      "Valid passport",
      "Completed application form",
      "Bank statements for last 3 months",
      "Travel itinerary",
      "Letter of invitation (if applicable)",
      "Travel insurance",
      "Evidence of ties to home country"
    ]
  },
  {
    code: "189",
    name: "Skilled Independent Visa",
    description: "For skilled workers who want to live and work in Australia permanently",
    eligibility: [
      "Be under 45 years old",
      "Have a skilled occupation on the relevant list",
      "Score at least 65 points",
      "Meet English language requirements"
    ],
    processingTime: "75% of applications: 12-18 months",
    cost: "AUD 4,240",
    requirements: [
      "Positive skills assessment",
      "English language test results",
      "Health and character clearances",
      "Expression of Interest (EOI)"
    ],
    financialRequirements: {
      amount: "Required amount in Bank: AUD 30,000 minimum recommended",
      details: [
        "Must demonstrate ability to support yourself and dependents",
        "Settlement costs consideration",
        "Initial accommodation costs"
      ]
    },
    checklist: [
      "Skills assessment",
      "English test results (IELTS 6.0+ or equivalent)",
      "Work experience documents",
      "Qualification documents",
      "Identity documents",
      "Character certificates",
      "Health examinations",
      "Form 80 - Personal particulars"
    ]
  },
  {
    code: "190",
    name: "Skilled Nominated Visa",
    description: "For skilled workers nominated by a state or territory government",
    eligibility: [
      "Be under 45 years old",
      "Have a skilled occupation on the state nomination list",
      "Score at least 65 points",
      "Receive state nomination"
    ],
    processingTime: "75% of applications: 9-12 months",
    cost: "AUD 4,240",
    requirements: [
      "State nomination",
      "Positive skills assessment",
      "English language test results",
      "Health and character clearances"
    ],
    financialRequirements: {
      amount: "Required amount in Bank: AUD 25,000-35,000 (varies by state)",
      details: [
        "Settlement funds as required by nominating state",
        "Evidence of financial capacity",
        "Ability to establish in nominated state"
      ]
    },
    checklist: [
      "State nomination approval",
      "Skills assessment",
      "English test results (IELTS 6.0+ or equivalent)",
      "Work experience documents",
      "Qualification documents",
      "Identity documents",
      "Character certificates",
      "Health examinations",
      "Form 80 - Personal particulars"
    ]
  },
  {
    code: "186",
    name: "Employer Nomination Visa",
    description: "For skilled workers nominated by an Australian employer for permanent residence",
    eligibility: [
      "Be under 45 years old",
      "Have required skills and qualifications",
      "Meet English language requirements",
      "Have nomination from approved employer"
    ],
    processingTime: "75% of applications: 12 months",
    cost: "AUD 4,240",
    requirements: [
      "Employer nomination",
      "Skills assessment",
      "Work experience evidence",
      "English language test results"
    ],
    financialRequirements: {
      amount: "Required amount in Bank: AUD 25,000 minimum recommended",
      details: [
        "Employer must demonstrate ability to pay market salary",
        "Evidence of employment arrangements"
      ]
    },
    checklist: [
      "Employer nomination approval",
      "Employment contract",
      "Skills assessment",
      "English test results (IELTS 6.0+ or equivalent)",
      "Work experience documents",
      "Qualification documents",
      "Identity documents",
      "Character certificates",
      "Health examinations"
    ]
  },
  {
    code: "491",
    name: "Skilled Work Regional (Provisional) Visa",
    description: "For skilled workers who want to live and work in regional Australia",
    eligibility: [
      "Be under 45 years old",
      "Have a skilled occupation on the relevant list",
      "Score at least 65 points",
      "Be nominated by a state/territory or sponsored by an eligible relative"
    ],
    processingTime: "75% of applications: 9-12 months",
    cost: "AUD 4,240",
    requirements: [
      "State nomination or family sponsorship",
      "Positive skills assessment",
      "English language test results",
      "Commitment to live in regional area"
    ],
    financialRequirements: {
      amount: "Required amount in Bank: AUD 20,000-30,000 (varies by region)",
      details: [
        "Evidence of funds for regional settlement",
        "Ability to support yourself in regional area",
        "Initial settlement costs"
      ]
    },
    checklist: [
      "Nomination or sponsorship approval",
      "Skills assessment",
      "English test results (IELTS 6.0+ or equivalent)",
      "Work experience documents",
      "Qualification documents",
      "Regional commitment statement",
      "Identity documents",
      "Character certificates",
      "Health examinations"
    ]
  },
  {
    code: "309/100",
    name: "Partner Visa",
    description: "For partners of Australian citizens, permanent residents or eligible New Zealand citizens",
    eligibility: [
      "Be in a genuine relationship with an eligible sponsor",
      "Meet health and character requirements",
      "Meet relationship requirements",
      "Sponsor meets eligibility criteria"
    ],
    processingTime: "75% of applications: 24 months",
    cost: "AUD 8,085",
    requirements: [
      "Evidence of genuine relationship",
      "Sponsor eligibility evidence",
      "Health and character clearances",
      "Relationship statements"
    ],
    financialRequirements: {
      amount: "Required amount in Bank: AUD 10,000 minimum recommended",
      details: [
        "Sponsor must meet income requirements if applicable",
        "Evidence of shared financial responsibilities",
        "Joint financial commitments"
      ]
    },
    checklist: [
      "Relationship evidence (joint accounts, lease, photos, etc.)",
      "Sponsor documents",
      "Identity documents",
      "Character certificates",
      "Health examinations",
      "Form 47SP",
      "Form 40SP",
      "Statutory declarations",
      "Evidence of shared residence"
    ]
  }
];