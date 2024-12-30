import { JobPosting } from '../data/jobsData';
import { Building2, MapPin, Clock, Briefcase, DollarSign } from 'lucide-react';

interface JobCardProps {
  job: JobPosting;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">{job.title}</h3>
          <div className="space-y-2">
            <div className="flex items-center text-gray-600">
              <Building2 className="w-4 h-4 mr-2" />
              {job.company}
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-2" />
              {job.location}
            </div>
            <div className="flex items-center text-gray-600">
              <DollarSign className="w-4 h-4 mr-2" />
              {job.salary}
            </div>
            <div className="flex items-center text-gray-600">
              <Briefcase className="w-4 h-4 mr-2" />
              {job.type}
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="w-4 h-4 mr-2" />
              Posted: {job.postedDate}
            </div>
          </div>
        </div>
        {job.visaSponsorship && (
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
            Visa Sponsorship
          </span>
        )}
      </div>

      <div className="mb-4">
        <p className="text-gray-600">{job.description}</p>
      </div>

      <div className="mb-4">
        <h4 className="font-medium mb-2">Required Skills:</h4>
        <div className="flex flex-wrap gap-2">
          {job.skills.map((skill) => (
            <span
              key={skill}
              className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <button className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors">
        Apply Now
      </button>
    </div>
  );
}