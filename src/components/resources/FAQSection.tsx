import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "What are the minimum English language requirements for a student visa?",
    answer: "For a student visa (subclass 500), you typically need an IELTS score of 5.5 overall (no band less than 5.0), or equivalent scores in PTE, TOEFL, or other accepted tests. However, requirements may vary depending on your course level and institution."
  },
  {
    question: "How much money do I need to show for a student visa?",
    answer: "You need to demonstrate access to AUD 21,041 per year for living costs, plus course fees and travel costs (AUD 2,000-4,000). If bringing dependents, add AUD 7,362 per year per dependent. All funds must be genuinely available and documented."
  },
  {
    question: "Can I work while studying in Australia?",
    answer: "Yes, student visa holders can work up to 48 hours per fortnight during course sessions and unlimited hours during scheduled course breaks. However, you cannot start working until your course has commenced."
  },
  {
    question: "What happens if my visa application is rejected?",
    answer: "If your visa is rejected, you'll receive a detailed explanation. You may be able to appeal the decision through the Administrative Appeals Tribunal (AAT) within set timeframes, or you can submit a new application addressing the reasons for rejection."
  },
  {
    question: "Do I need health insurance for my student visa?",
    answer: "Yes, Overseas Student Health Cover (OSHC) is mandatory for the entire duration of your stay in Australia. You must arrange this before arriving and maintain valid coverage throughout your study period."
  },
  {
    question: "How long does the student visa application process take?",
    answer: "Processing times vary, but typically 75% of applications are processed within 29 days. Complex cases may take longer. It's recommended to apply at least 6-8 weeks before your course start date."
  },
  {
    question: "Can my family members join me in Australia?",
    answer: "Yes, you can include eligible family members (spouse/de facto partner and dependent children) in your student visa application. They must meet health, character, and financial requirements, and additional funds must be shown for their support."
  },
  {
    question: "What documents do I need for a student visa application?",
    answer: "Key documents include: valid passport, Confirmation of Enrolment (CoE), English test results, financial evidence, academic transcripts, OSHC, and a statement of purpose. Additional documents may be required based on your circumstances."
  },
  {
    question: "Can I extend my student visa if needed?",
    answer: "Yes, you can apply for a new student visa if you need to extend your stay to complete your studies. You must apply before your current visa expires and meet all eligibility requirements, including having sufficient funds and maintaining satisfactory course progress."
  },
  {
    question: "What are the pathways to permanent residency after studying?",
    answer: "Common pathways include the Temporary Graduate visa (subclass 485), followed by skilled migration visas like 189, 190, or 491. Eligibility depends on factors like your qualification, occupation, age, and points score."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
          >
            <span className="font-medium text-lg">{faq.question}</span>
            {openIndex === index ? (
              <Minus className="w-5 h-5 text-[hsl(var(--gold))]" />
            ) : (
              <Plus className="w-5 h-5 text-[hsl(var(--gold))]" />
            )}
          </button>
          
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="p-4 pt-0 text-white/80">
                  {faq.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}