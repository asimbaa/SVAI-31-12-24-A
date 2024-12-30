import { useState } from 'react';
import { Upload, File, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { formatFileSize, isValidFileType } from '@/utils/fileUtils';

interface Document {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadDate: string;
  status: 'pending' | 'verified' | 'rejected';
}

interface DocumentManagerProps {
  documents: Document[];
  onUpload: (file: File) => void;
  onDelete: (id: string) => void;
  allowedTypes?: string[];
  maxSize?: number;
}

export function DocumentManager({
  documents,
  onUpload,
  onDelete,
  allowedTypes = ['pdf', 'jpg', 'jpeg', 'png'],
  maxSize = 5 * 1024 * 1024 // 5MB
}: DocumentManagerProps) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!isValidFileType(file, allowedTypes)) {
      alert(`Invalid file type. Allowed types: ${allowedTypes.join(', ')}`);
      return;
    }

    if (file.size > maxSize) {
      alert(`File too large. Maximum size: ${formatFileSize(maxSize)}`);
      return;
    }

    onUpload(file);
  };

  return (
    <div className="space-y-6">
      <div
        className={`p-8 border-2 border-dashed rounded-lg text-center ${
          dragActive
            ? 'border-[hsl(var(--gold))] bg-[hsl(var(--gold))]/5'
            : 'border-white/10 hover:border-white/20'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className="w-8 h-8 text-white/60 mx-auto mb-4" />
        <p className="text-white/80 mb-2">
          Drag and drop your files here, or click to select files
        </p>
        <p className="text-sm text-white/60">
          Supported formats: {allowedTypes.join(', ')}
        </p>
        <input
          type="file"
          className="hidden"
          accept={allowedTypes.map(type => `.${type}`).join(',')}
          onChange={(e) => e.target.files && handleFile(e.target.files[0])}
        />
      </div>

      <div className="space-y-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between p-4 bg-black/20 border border-white/10 rounded-lg"
          >
            <div className="flex items-center gap-4">
              <File className="w-6 h-6 text-white/60" />
              <div>
                <p className="font-medium">{doc.name}</p>
                <p className="text-sm text-white/60">
                  {formatFileSize(doc.size)} • Uploaded {doc.uploadDate}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className={`px-2 py-1 rounded text-sm ${
                doc.status === 'verified'
                  ? 'bg-green-500/20 text-green-200'
                  : doc.status === 'rejected'
                  ? 'bg-red-500/20 text-red-200'
                  : 'bg-yellow-500/20 text-yellow-200'
              }`}>
                {doc.status}
              </span>
              <Button
                variant="outline"
                onClick={() => onDelete(doc.id)}
                className="text-red-500 hover:text-red-400"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}