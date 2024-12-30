import { useState, useEffect } from 'react';
import { useDocuments } from './useDocuments';
import { calculateDocumentProgress, type DocumentProgress } from '@/lib/storage/documentProgress';

export function useDocumentProgress() {
  const { documents } = useDocuments();
  const [progress, setProgress] = useState<DocumentProgress>({
    totalProgress: 0,
    categoryProgress: {} as any,
    missingDocuments: []
  });

  useEffect(() => {
    setProgress(calculateDocumentProgress(documents));
  }, [documents]);

  return progress;
}