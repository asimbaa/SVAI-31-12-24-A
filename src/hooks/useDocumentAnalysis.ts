import { useState } from 'react';
import { documentAnalyzer } from '@/lib/ai/documentAnalysis/documentAnalyzer';
import { useNotifications } from './useNotifications';
import type { DocumentAnalysisResult, DocumentType } from '@/lib/ai/documentAnalysis/types';

export function useDocumentAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const { addNotification } = useNotifications();

  const analyzeDocument = async (file: File, type?: DocumentType): Promise<DocumentAnalysisResult> => {
    setIsAnalyzing(true);
    setProgress(0);

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 500);

      const result = await documentAnalyzer.analyzeDocument(file, type);

      clearInterval(progressInterval);
      setProgress(100);

      if (!result.isValid) {
        addNotification({
          type: 'error',
          message: 'Document validation failed. Please check the issues below.'
        });
      } else {
        addNotification({
          type: 'success',
          message: 'Document successfully validated!'
        });
      }

      return result;
    } catch (error) {
      addNotification({
        type: 'error',
        message: 'Failed to analyze document. Please try again.'
      });
      throw error;
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    analyzeDocument,
    isAnalyzing,
    progress
  };
}