import { useState } from 'react';
import { type SettlementGuide } from '../data/settlementData';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

interface SettlementCardProps {
  guide: SettlementGuide;
}

export default function SettlementCard({ guide }: SettlementCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div
        className="p-6 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">{guide.title}</h3>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </div>
        <p className="text-gray-600 mt-2">{guide.description}</p>
      </div>

      {isExpanded && (
        <div className="px-6 pb-6">
          {guide.sections.map((section, index) => (
            <div key={index} className="mt-4">
              <h4 className="font-medium text-lg mb-3">{section.title}</h4>
              <p className="text-gray-600 mb-4">{section.content}</p>

              <div className="mb-4">
                <h5 className="font-medium mb-2">Tips:</h5>
                <ul className="list-disc pl-5 space-y-1">
                  {section.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="text-gray-600">{tip}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="font-medium mb-2">Useful Resources:</h5>
                <div className="space-y-2">
                  {section.resources.map((resource, resourceIndex) => (
                    <a
                      key={resourceIndex}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h6 className="font-medium text-primary">{resource.title}</h6>
                          <p className="text-sm text-gray-600">{resource.description}</p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}