import { motion } from 'framer-motion';
import { FileText, CheckCircle, Clock, AlertCircle, Trash2 } from 'lucide-react';
import { formatDate } from '@/utils/dateUtils';

interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  status: 'pending' | 'verified' | 'rejected';
  size: string;
}

interface DocumentListProps {
  documents: Document[];
  onDelete: (id: string) => void;
}

export function DocumentList({ documents, onDelete }: DocumentListProps) {
  const getStatusIcon = (status: Document['status']) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-400" />;
      case 'rejected':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
    }
  };

  return (
    <div className="space-y-4">
      {documents.map((doc, index) => (
        <motion.div
          key={doc.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="p-4 bg-black/20 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <FileText className="w-5 h-5 text-white/60 mt-1" />
              <div>
                <h3 className="font-medium">{doc.name}</h3>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <span>{doc.size}</span>
                  <span>•</span>
                  <span>Uploaded {formatDate(doc.uploadDate)}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {getStatusIcon(doc.status)}
              <button
                onClick={() => onDelete(doc.id)}
                className="p-1 hover:bg-white/10 rounded transition-colors"
              >
                <Trash2 className="w-5 h-5 text-red-400" />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}