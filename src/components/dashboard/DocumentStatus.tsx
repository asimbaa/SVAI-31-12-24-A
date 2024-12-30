import { motion } from 'framer-motion';
import { FileText, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { Card } from '../ui/Card';
import { Link } from 'react-router-dom';

const documents = [
  {
    name: 'Passport',
    status: 'verified',
    lastUpdated: '2 days ago'
  },
  {
    name: 'Academic Transcripts',
    status: 'pending',
    lastUpdated: '1 day ago'
  },
  {
    name: 'English Test Results',
    status: 'required',
    lastUpdated: null
  },
  {
    name: 'Financial Documents',
    status: 'required',
    lastUpdated: null
  }
];

export function DocumentStatus() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Required Documents</h2>
          <Link 
            to="/document-upload"
            className="text-sm text-[hsl(var(--gold))] hover:text-[hsl(var(--gold))]/80"
          >
            Upload Documents →
          </Link>
        </div>

        <div className="space-y-4">
          {documents.map((doc) => (
            <div
              key={doc.name}
              className="flex items-center justify-between p-3 bg-black/20 rounded-lg hover:bg-black/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-white/60" />
                <div>
                  <p className="font-medium">{doc.name}</p>
                  {doc.lastUpdated && (
                    <p className="text-sm text-white/60">Updated {doc.lastUpdated}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {doc.status === 'verified' && (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                )}
                {doc.status === 'pending' && (
                  <Clock className="w-5 h-5 text-yellow-400" />
                )}
                {doc.status === 'required' && (
                  <AlertCircle className="w-5 h-5 text-red-400" />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-white/10">
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Documents Verified</span>
            <span className="text-[hsl(var(--gold))]">1 of 4</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}