export interface UploadedDocument {
  id: string;
  name: string;
  type: string;
  category: string;
  uploadDate: string;
  status: 'pending' | 'verified' | 'rejected';
  size: string;
}

export const mockDocuments: UploadedDocument[] = [
  {
    id: "doc1",
    name: "Passport.pdf",
    type: "application/pdf",
    category: "Identity Documents",
    uploadDate: "2024-02-15",
    status: "verified",
    size: "2.4 MB"
  },
  {
    id: "doc2",
    name: "Degree_Certificate.pdf",
    type: "application/pdf",
    category: "Educational Documents",
    uploadDate: "2024-02-14",
    status: "pending",
    size: "1.8 MB"
  },
  {
    id: "doc3",
    name: "Work_Reference.pdf",
    type: "application/pdf",
    category: "Employment Documents",
    uploadDate: "2024-02-13",
    status: "rejected",
    size: "3.1 MB"
  }
];