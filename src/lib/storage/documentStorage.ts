import { type DocumentType } from '../ai/documentAnalysis/types';

export interface StoredDocument {
  id: string;
  name: string;
  type: DocumentType;
  uploadDate: string;
  expiryDate?: string;
  status: 'pending' | 'verified' | 'rejected';
  size: string;
  metadata: Record<string, any>;
  version: number;
  previousVersions?: Array<{
    id: string;
    uploadDate: string;
    verificationResult?: StoredDocument['verificationResult'];
  }>;
  verificationResult?: {
    isValid: boolean;
    confidence: number;
    issues?: string[];
    suggestions?: string[];
  };
  tags?: string[];
  category?: string;
}

const STORAGE_KEY = 'uploaded_documents';

export const documentStorage = {
  save(documents: StoredDocument[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(documents));
  },

  get(): StoredDocument[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  getExpiringSoon(daysThreshold: number = 30): StoredDocument[] {
    const documents = this.get();
    const thresholdDate = new Date();
    thresholdDate.setDate(thresholdDate.getDate() + daysThreshold);

    return documents.filter(doc => 
      doc.expiryDate && new Date(doc.expiryDate) <= thresholdDate
    );
  },

  search(query: string): StoredDocument[] {
    const documents = this.get();
    const searchTerms = query.toLowerCase().split(' ');

    return documents.filter(doc => {
      const searchableText = [
        doc.name,
        doc.type,
        doc.category,
        ...(doc.tags || [])
      ].join(' ').toLowerCase();

      return searchTerms.every(term => searchableText.includes(term));
    });
  },

  filter<T extends DocumentType>(criteria: {
    category?: string;
    type?: T;
    status?: StoredDocument['status'];
    tags?: string[];
  }): StoredDocument[] {
    const documents = this.get();

    return documents.filter(doc => {
      if (criteria.category && doc.category !== criteria.category) return false;
      if (criteria.type && doc.type !== criteria.type) return false;
      if (criteria.status && doc.status !== criteria.status) return false;
      if (criteria.tags?.length && !criteria.tags.every(tag => doc.tags?.includes(tag))) return false;
      return true;
    });
  },

  add(document: StoredDocument): void {
    const documents = this.get();
    // Set version number
    document.version = 1;
    documents.unshift(document);
    this.save(documents);
  },

  update(id: string, updates: Partial<StoredDocument>): void {
    const documents = this.get();
    const index = documents.findIndex(doc => doc.id === id);
    if (index !== -1) {
      // Store previous version if verification result changes
      if (updates.verificationResult && documents[index].verificationResult) {
        const previousVersions = documents[index].previousVersions || [];
        previousVersions.push({
          id: `${id}_v${documents[index].version}`,
          uploadDate: documents[index].uploadDate,
          verificationResult: documents[index].verificationResult
        });
        updates.previousVersions = previousVersions;
        updates.version = (documents[index].version || 1) + 1;
      }
      documents[index] = { ...documents[index], ...updates };
      this.save(documents);
    }
  },

  remove(id: string): void {
    const documents = this.get();
    const filtered = documents.filter(doc => doc.id !== id);
    this.save(filtered);
  },

  clear(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
};