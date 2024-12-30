const STORAGE_KEY = 'auth_data';

export interface StoredAuthData {
  email: string;
  eligibilityData?: {
    formData: Record<string, any>;
    result: any;
  };
}

export const authStorage = {
  save(data: StoredAuthData): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },

  get(): StoredAuthData | null {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  },

  clear(): void {
    localStorage.removeItem(STORAGE_KEY);
  },

  updateEligibilityData(eligibilityData: any): void {
    const currentData = this.get();
    if (currentData) {
      this.save({
        ...currentData,
        eligibilityData
      });
    }
  }
};