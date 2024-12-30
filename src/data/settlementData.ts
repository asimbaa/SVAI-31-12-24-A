export interface SettlementGuide {
  id: string;
  title: string;
  description: string;
  sections: SettlementSection[];
}

interface SettlementSection {
  title: string;
  content: string;
  tips: string[];
  resources: Resource[];
}

interface Resource {
  title: string;
  url: string;
  description: string;
}

export const settlementGuides: SettlementGuide[] = [
  {
    id: "housing",
    title: "Finding Housing",
    description: "Guide to finding and securing accommodation in Australia",
    sections: [
      {
        title: "Rental Process",
        content: "Understanding the Australian rental market and application process...",
        tips: [
          "Start your search 2-3 weeks before arrival",
          "Prepare necessary documents (passport, visa, bank statements)",
          "Consider short-term accommodation initially",
          "Budget for bond (usually 4 weeks rent) and advance rent"
        ],
        resources: [
          {
            title: "Domain",
            url: "https://www.domain.com.au",
            description: "Popular property listing website"
          },
          {
            title: "RealEstate.com.au",
            url: "https://www.realestate.com.au",
            description: "Australia's largest property portal"
          }
        ]
      }
    ]
  },
  {
    id: "healthcare",
    title: "Healthcare System",
    description: "Understanding Medicare and the Australian healthcare system",
    sections: [
      {
        title: "Medicare Registration",
        content: "How to register for Medicare and access healthcare services...",
        tips: [
          "Register for Medicare as soon as possible after arrival",
          "Consider private health insurance",
          "Find a local GP (General Practitioner)",
          "Keep important medical documents handy"
        ],
        resources: [
          {
            title: "Medicare Online",
            url: "https://www.servicesaustralia.gov.au/medicare",
            description: "Official Medicare registration portal"
          }
        ]
      }
    ]
  },
  {
    id: "banking",
    title: "Banking Setup",
    description: "Guide to setting up bank accounts and managing finances",
    sections: [
      {
        title: "Opening Bank Account",
        content: "Steps to open a bank account and manage your finances...",
        tips: [
          "Open account before arriving if possible",
          "Bring multiple forms of ID",
          "Compare different banks and their offers",
          "Set up internet banking immediately"
        ],
        resources: [
          {
            title: "Commonwealth Bank",
            url: "https://www.commbank.com.au",
            description: "One of Australia's largest banks"
          }
        ]
      }
    ]
  }
];