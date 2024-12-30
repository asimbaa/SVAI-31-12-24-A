import { useState } from 'react';
import { visaTypes, type VisaType } from '../data/visaTypes';

export default function VisaTypes() {
  const [selectedVisa, setSelectedVisa] = useState<VisaType | null>(null);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-white">Australian Visa Types</h1>
      <p className="text-white/80 mb-8">
        Explore different visa options available for Nepalese citizens looking to migrate to Australia.
        Click on a visa type to learn more about its requirements and eligibility criteria.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {visaTypes.map((visa) => (
          <div
            key={visa.code}
            className="group bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-white/10 hover:border-white/20 transition-all cursor-pointer"
            onClick={() => setSelectedVisa(visa)}
          >
            <h2 className="text-xl font-semibold mb-2 text-white group-hover:text-[hsl(var(--gold))] transition-colors">
              {visa.name} (subclass {visa.code})
            </h2>
            <p className="text-white/80 mb-4">{visa.description}</p>
            <div className="text-sm text-[hsl(var(--gold))]">Click to view details →</div>
          </div>
        ))}
      </div>

      {selectedVisa && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-black/40 backdrop-blur-sm rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 border border-white/10">
            <h2 className="text-2xl font-bold mb-4 text-white">
              {selectedVisa.name} (subclass {selectedVisa.code})
            </h2>
            <p className="text-white/80 mb-6">{selectedVisa.description}</p>

            <div className="space-y-6">
              <section>
                <h3 className="text-lg font-semibold mb-2 text-white">Eligibility Criteria</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {selectedVisa.eligibility.map((criterion, index) => (
                    <li key={index} className="text-white/80">{criterion}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2 text-white">Requirements</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {selectedVisa.requirements.map((requirement, index) => (
                    <li key={index} className="text-white/80">{requirement}</li>
                  ))}
                </ul>
              </section>

              <section className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Processing Time</h3>
                  <p className="text-white/80">{selectedVisa.processingTime}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Visa Cost</h3>
                  <p className="text-white/80">{selectedVisa.cost}</p>
                </div>
              </section>
            </div>

            <button
              onClick={() => setSelectedVisa(null)}
              className="mt-6 w-full bg-[hsl(var(--gold))] text-[hsl(var(--navy))] font-semibold py-3 px-4 rounded-lg hover:bg-[hsl(var(--gold))]/90 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}