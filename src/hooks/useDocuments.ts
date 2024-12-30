import { useState, useCallback, useEffect } from 'react';
import { documentStorage } from '@/lib/storage/documentStorage';
import { documentAnalyzer } from '@/lib/ai/documentAnalysis/documentAnalyzer';
import { useNotifications } from './useNotifications';
import { formatFileSize } from '@/utils/fileUtils';
import type { DocumentType } from '@/lib/ai/documentAnalysis/types';
import type { StoredDocument } from '@/lib/storage/documentStorage';

interface Filters {
  category?: string;
  type?: DocumentType;
  status?: StoredDocument['status'];
  tags?: string[];
}

export function useDocuments() {
  const [documents, setDocuments] = useState<StoredDocument[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Filters>({});
  const { addNotification } = useNotifications();

  // Load documents on mount
  useEffect(() => {
    setDocuments(documentStorage.get());
  }, []);

  const filteredDocuments = useCallback(() => {
    let results = documents;
    
    if (searchQuery) {
      results = documentStorage.search(searchQuery);
    }
    
    if (Object.keys(filters).length > 0) {
      results = documentStorage.filter(filters);
    }
    
    return results;
  }, [documents, searchQuery, filters]);

  const uploadDocument = useCallback(async (file: File, type: DocumentType) => {
    setIsLoading(true);
    try {
      // Analyze document
      const result = await documentAnalyzer.analyzeDocument(file);

      // Create document record
      const document: StoredDocument = {
        id: `doc_${Date.now()}`,
        name: file.name,
        type,
        uploadDate: new Date().toISOString(),
        status: result.isValid ? 'verified' : 'pending',
        size: formatFileSize(file.size),
        metadata: result.metadata,
        version: 1,
        verificationResult: {
          isValid: result.isValid,
          confidence: result.confidence,
          issues: result.issues,
          suggestions: result.suggestions
        }
      };

      // Save document
      documentStorage.add(document);
      setDocuments(documentStorage.get());

      addNotification({
        type: result.isValid ? 'success' : 'warning',
        message: result.isValid 
          ? 'Document uploaded and verified successfully'
          : 'Document uploaded but requires review'
      });

      return document;
    } catch (error) {
      addNotification({
        type: 'error',
        message: 'Failed to upload document'
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [addNotification]);

  const deleteDocument = useCallback((id: string) => {
    documentStorage.remove(id);
    setDocuments(documentStorage.get());
    addNotification({
      type: 'success',
      message: 'Document deleted successfully'
    });
  }, [addNotification]);

  const updateDocument = useCallback((id: string, updates: Partial<StoredDocument>) => {
    documentStorage.update(id, updates);
    setDocuments(documentStorage.get());
  }, []);

  return {
    documents: filteredDocuments(),
    isLoading,
    uploadDocument,
    deleteDocument,
    updateDocument,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    getExpiringSoon: useCallback((days: number) => 
      documentStorage.getExpiringSoon(days), [])
  };
}