import { useState } from 'react';
import { mockJobs } from '../data/jobsData';
import JobCard from '../components/JobCard';
import { Search, Filter } from 'lucide-react';

export default function JobSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [visaSponsorshipOnly, setVisaSponsorshipOnly] = useState(false);

  const industries = Array.from(new Set(mockJobs.map(job => job.industry)));
  const locations = Array.from(new Set(mockJobs.map(job => job.location)));

  const filteredJobs = mockJobs
    .filter(job => 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(job => selectedIndustry === 'all' || job.industry === selectedIndustry)
    .filter(job => selectedLocation === 'all' || job.location === selectedLocation)
    .filter(job => !visaSponsorshipOnly || job.visaSponsorship);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Find Jobs in Australia</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="all">All Industries</option>
              {industries.map((industry) => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full p-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="all">All Locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="visaSponsorship"
              checked={visaSponsorshipOnly}
              onChange={(e) => setVisaSponsorshipOnly(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="visaSponsorship">Show only jobs with visa sponsorship</label>
          </div>
        </div>

        <div className="text-sm text-gray-600">
          {filteredJobs.length} jobs found
        </div>
      </div>

      <div className="space-y-6">
        {filteredJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}