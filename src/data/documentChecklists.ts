export interface DocumentCategory {
  name: string;
  documents: Document[];
}

export interface Document {
  name: string;
  description: string;
  required: boolean;
  tips: string[];
}

export const documentChecklists: Record<string, DocumentCategory[]> = {
  "189": [
    {
      name: "Identity Documents",
      documents: [
        {
          name: "Valid Passport",
          description: "Current passport with at least 6 months validity",
          required: true,
          tips: [
            "Ensure all pages are clear and readable",
            "Include all pages, even blank ones"
          ]
        },
        {
          name: "Birth Certificate",
          description: "Original or certified copy with English translation",
          required: true,
          tips: [
            "Must be translated by a NAATI certified translator",
            "Both original and translated copies needed"
          ]
        }
      ]
    },
    {
      name: "Educational Documents",
      documents: [
        {
          name: "Academic Transcripts",
          description: "All post-secondary education transcripts",
          required: true,
          tips: [
            "Must be original or certified copies",
            "Include complete marksheets",
            "Get documents attested by authorized bodies"
          ]
        },
        {
          name: "Degree Certificates",
          description: "Certificates for completed degrees",
          required: true,
          tips: [
            "Include provisional certificates if final not available",
            "Must be translated if not in English"
          ]
        }
      ]
    },
    {
      name: "Work Experience",
      documents: [
        {
          name: "Experience Letters",
          description: "Letters from all relevant employers",
          required: true,
          tips: [
            "Must be on company letterhead",
            "Should include job title, duties, and dates",
            "Get reference contact details"
          ]
        },
        {
          name: "Salary Slips",
          description: "Pay slips covering the claimed period",
          required: false,
          tips: [
            "Include at least one slip per quarter",
            "Bank statements showing salary credits helpful"
          ]
        }
      ]
    }
  ]
};