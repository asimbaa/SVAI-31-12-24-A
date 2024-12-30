import { UploadedDocument } from '../data/documentsData';

interface DocumentListProps {
  documents: UploadedDocument[];
  onDelete: (id: string) => void;
}

export default function DocumentList({ documents, onDelete }: DocumentListProps) {
  const getStatusColor = (status: UploadedDocument['status']) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="space-y-4">
      {documents.map((doc) => (
        <div
          key={doc.id}
          className="bg-white p-4 rounded-lg border flex items-start justify-between"
        >
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-medium">{doc.name}</h3>
              <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(doc.status)}`}>
                {doc.status}
              </span>
            </div>
            <div className="text-sm text-gray-500 space-y-1">
              <p>Category: {doc.category}</p>
              <p>Uploaded: {doc.uploadDate}</p>
              <p>Size: {doc.size}</p>
            </div>
          </div>
          <button
            onClick={() => onDelete(doc.id)}
            className="text-red-600 hover:text-red-800"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}