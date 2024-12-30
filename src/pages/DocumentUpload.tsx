import { useState } from 'react';
import { DocumentUploader } from '@/components/documents/DocumentUploader';
import { DocumentList } from '@/components/documents/DocumentList';
import { useDocuments } from '@/hooks/useDocuments';
import { Card } from '@/components/ui/Card';
import { Select } from '@/components/ui/Select';
import { DOCUMENT_TYPES } from '@/lib/ai/documentAnalysis/documentTypes';

export default function DocumentUpload() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const { documents, uploadDocument, deleteDocument } = useDocuments();

  const handleUpload = async (file: File) => {
    if (selectedCategory) {
      await uploadDocument(file, selectedCategory);
      setSelectedCategory('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-white">Document Upload</h1>
      
      <Card className="mb-8">
        <h2 className="text-xl font-semibold mb-6">Upload New Document</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Document Category
            </label>
            <Select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              options={Object.entries(DOCUMENT_TYPES).map(([key, config]) => ({
                value: key,
                label: config.name
              }))}
              placeholder="Select document type"
            >
            </Select>
          </div>

          {selectedCategory && (
            <DocumentUploader
              onUpload={handleUpload}
              acceptedTypes={DOCUMENT_TYPES[selectedCategory].acceptedFormats}
              maxSize={DOCUMENT_TYPES[selectedCategory].maxSize}
            />
          )}
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold mb-6">Uploaded Documents</h2>
        <DocumentList
          documents={documents}
          onDelete={deleteDocument}
        />
      </Card>
    </div>
  );
}