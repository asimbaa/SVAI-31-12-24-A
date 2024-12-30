const STORAGE_KEY = 'eligibility_data';

export interface StoredEligibilityData {
  formData: Record<string, any>;
  result: {
    isEligible: boolean;
    score: number;
    feedback: {
      positives: string[];
      improvements: string[];
    };
    nextSteps: string[];
  };
  timestamp: number;
}

export const eligibilityStorage = {
  save(data: StoredEligibilityData): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },

  get(): StoredEligibilityData | null {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  },

  clear(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
};