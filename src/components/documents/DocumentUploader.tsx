import { useState } from 'react';
import { Upload, X, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatFileSize } from '@/utils/fileUtils';

interface DocumentUploaderProps {
  onUpload: (file: File) => void;
  acceptedTypes?: string[];
  maxSize?: number;
}

export function DocumentUploader({
  onUpload,
  acceptedTypes = ['.pdf', '.jpg', '.jpeg', '.png'],
  maxSize = 5 * 1024 * 1024 // 5MB
}: DocumentUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (validateFile(file)) {
      setSelectedFile(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      setSelectedFile(file);
    }
  };

  const validateFile = (file: File): boolean => {
    if (!acceptedTypes.some(type => file.name.toLowerCase().endsWith(type))) {
      alert('Invalid file type. Please upload a supported file format.');
      return false;
    }

    if (file.size > maxSize) {
      alert(`File too large. Maximum size is ${formatFileSize(maxSize)}`);
      return false;
    }

    return true;
  };

  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile);
      setSelectedFile(null);
    }
  };

  return (
    <div className="space-y-4">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`p-8 border-2 border-dashed rounded-lg text-center transition-colors ${
          isDragging
            ? 'border-[hsl(var(--gold))] bg-[hsl(var(--gold))]/5'
            : 'border-white/10 hover:border-white/20'
        }`}
      >
        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept={acceptedTypes.join(',')}
          onChange={handleFileSelect}
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer"
        >
          <Upload className="w-8 h-8 text-white/60 mx-auto mb-4" />
          <p className="text-white/80 mb-2">
            Drag and drop your file here, or click to select
          </p>
          <p className="text-sm text-white/60">
            Supported formats: {acceptedTypes.join(', ')} (Max {formatFileSize(maxSize)})
          </p>
        </label>
      </div>

      <AnimatePresence>
        {selectedFile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-4 bg-black/20 rounded-lg flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-white/60" />
              <div>
                <p className="font-medium">{selectedFile.name}</p>
                <p className="text-sm text-white/60">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedFile(null)}
                className="p-1 hover:bg-white/10 rounded"
              >
                <X className="w-5 h-5 text-white/60" />
              </button>
              <button
                onClick={handleUpload}
                className="px-4 py-2 bg-[hsl(var(--gold))] text-[hsl(var(--navy))] rounded-lg hover:bg-[hsl(var(--gold))]/90"
              >
                Upload
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}