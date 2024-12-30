import { useState } from 'react';
import { visaTypes } from '../data/visaTypes';
import { documentChecklists } from '../data/documentChecklists';

export default function DocumentChecklist() {
  const [selectedVisa, setSelectedVisa] = useState(visaTypes[0].code);

  const checklist = documentChecklists[selectedVisa] || [];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-white">Document Checklist</h1>
      <p className="text-white/80 mb-8">
        Get a comprehensive list of required documents for your visa application.
        Select your visa type to see the specific requirements.
      </p>

      <div className="mb-8">
        <label htmlFor="visa-select" className="block text-sm font-medium text-gray-700 mb-2">
          Select Visa Type
        </label>
        <select
          id="visa-select"
          value={selectedVisa}
          onChange={(e) => setSelectedVisa(e.target.value)}
          className="w-full md:w-64 p-2 border border-white/10 rounded-md bg-black/20 text-white"
        >
          {visaTypes.map((visa) => (
            <option key={visa.code} value={visa.code}>
              {visa.name} (subclass {visa.code})
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-8">
        {checklist.map((category, index) => (
          <div key={index} className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-white/10">
            <h2 className="text-xl font-semibold mb-4">{category.name}</h2>
            <div className="space-y-6">
              {category.documents.map((doc, docIndex) => (
                <div key={docIndex} className="border-b pb-4 last:border-b-0 last:pb-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-medium text-white">{doc.name}</h3>
                    <span className={`px-2 py-1 rounded text-sm ${
                      doc.required 
                        ? 'bg-red-500/20 text-red-200' 
                        : 'bg-gray-500/20 text-gray-200'
                    }`}>
                      {doc.required ? 'Required' : 'Optional'}
                    </span>
                  </div>
                  <p className="text-white/80 mb-2">{doc.description}</p>
                  {doc.tips.length > 0 && (
                    <div className="mt-2">
                      <h4 className="text-sm font-semibold text-white mb-1">Tips:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {doc.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="text-sm text-white/80">{tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}