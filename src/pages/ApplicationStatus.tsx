import { useState } from 'react';
import { motion } from 'framer-motion';
import { ApplicationStatusCard } from '@/components/applications/ApplicationStatusCard';
import { ApplicationTimeline } from '@/components/applications/ApplicationTimeline';
import type { Application } from '@/lib/types/application';

// Mock data - replace with actual API call
const mockApplications: Application[] = [
  {
    id: '1',
    type: 'scholarship',
    referenceId: '1',
    status: 'under-review',
    submittedAt: '2024-02-20T10:00:00Z',
    lastUpdated: '2024-02-21T15:30:00Z',
    documents: [
      { name: 'Academic Transcript', status: 'verified' },
      { name: 'Statement of Purpose', status: 'pending' }
    ],
    timeline: [
      {
        date: '2024-02-20T10:00:00Z',
        status: 'submitted',
        message: 'Application submitted successfully'
      },
      {
        date: '2024-02-21T15:30:00Z',
        status: 'under-review',
        message: 'Application is being reviewed by the scholarship committee'
      }
    ],
    nextSteps: [
      'Upload certified translation of academic transcript',
      'Complete online assessment'
    ]
  }
];

export default function ApplicationStatus() {
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-4">Application Status</h1>
        <p className="text-white/80">
          Track the progress of your scholarship and university applications.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {mockApplications.map((application) => (
          <ApplicationStatusCard
            key={application.id}
            application={application}
            onClick={() => setSelectedApplication(application)}
          />
        ))}
      </div>

      {selectedApplication && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-black/40 p-6 rounded-lg border border-white/10 max-w-2xl w-full"
          >
            <h2 className="text-2xl font-bold mb-6">Application Timeline</h2>
            <ApplicationTimeline application={selectedApplication} />
            
            <button
              onClick={() => setSelectedApplication(null)}
              className="mt-6 w-full bg-[hsl(var(--gold))] text-[hsl(var(--navy))] px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}