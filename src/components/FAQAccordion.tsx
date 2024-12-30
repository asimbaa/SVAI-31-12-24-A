import { useState } from 'react';
import { type FAQ } from '../data/supportData';
import { ChevronDown, ChevronUp, Tag } from 'lucide-react';

interface FAQAccordionProps {
  faq: FAQ;
}

export default function FAQAccordion({ faq }: FAQAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded-lg overflow-hidden">
      <button
        className="w-full p-4 text-left bg-white hover:bg-gray-50 flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">{faq.question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>
      
      {isOpen && (
        <div className="p-4 bg-gray-50 border-t">
          <p className="text-gray-600 mb-4">{faq.answer}</p>
          <div className="flex flex-wrap gap-2">
            {faq.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}