import { useState } from 'react';
import type { StoredDocument } from '@/lib/storage/documentStorage';
import type { DocumentType } from '@/lib/ai/documentAnalysis/types';
import type { DocumentAnalysisResult } from '@/lib/types/documents';
import { DocumentAnalysisResult as AnalysisResultComponent } from './document/DocumentAnalysisResult';
import { useDocumentAnalysis } from '../hooks/useDocumentAnalysis';
import { useNotifications } from '../hooks/useNotifications';

export default function DocumentUpload() {
  const [documents, setDocuments] = useState<StoredDocument[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [currentAnalysis, setCurrentAnalysis] = useState<DocumentAnalysisResult | null>(null);
  const { analyzeDocument, isAnalyzing, progress } = useDocumentAnalysis();
  const { addNotification } = useNotifications();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && selectedCategory) {
      try {
        const analysis = await analyzeDocument(file);
        setCurrentAnalysis(analysis);
        
        if (!analysis.isValid) {
          return;
        }

        const newDoc: StoredDocument = {
          id: `doc${Date.now()}`,
          name: file.name,
          type: selectedCategory as DocumentType,
          uploadDate: new Date().toISOString(),
          status: analysis.confidence > 0.9 ? 'verified' : 'pending',
          size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          metadata: {},
          version: 1
        };
        setDocuments([newDoc, ...documents]);
        setSelectedCategory('');
        event.target.value = '';
        setCurrentAnalysis(null);
      } catch (error) {
        console.error('Document analysis failed:', error);
        addNotification({
          type: 'error',
          message: 'Failed to analyze document. Please try again.'
        });
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4 mb-6">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full md:w-64 p-2 bg-black/20 border border-white/10 rounded-lg text-white"
        >
          <option value="">Select category...</option>
          <option value="Identity">Identity Documents</option>
          <option value="Academic">Academic Documents</option>
          <option value="Financial">Financial Documents</option>
        </select>
        <input
          type="file"
          onChange={handleFileUpload}
          accept=".pdf,.jpg,.jpeg,.png"
          className="flex-1 p-2 bg-black/20 border border-white/10 rounded-lg text-white"
          disabled={!selectedCategory}
        />
      </div>
      {currentAnalysis && (
        <AnalysisResultComponent
          result={currentAnalysis}
          onRetry={() => {
            setCurrentAnalysis(null);
            setSelectedCategory('');
          }}
        />
      )}

      {isAnalyzing && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-primary h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-white/60 mt-2">
            Analyzing document... {progress}%
          </p>
        </div>
      )}
    </div>
  );
}