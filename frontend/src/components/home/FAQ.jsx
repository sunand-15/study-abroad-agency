import { useState } from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';
import SectionHeading from '../common/SectionHeading';

const faqs = [
  {
    q: 'How much does it cost to study abroad?',
    a: 'Costs vary by country and university. Generally, tuition ranges from $10,000–$50,000 per year, plus living expenses. Germany and some European countries offer low or no tuition. We help you find affordable options and scholarships.',
  },
  {
    q: 'Do you guarantee admission or visa?',
    a: 'No reputable consultancy can guarantee admission or visa — those decisions are made by universities and immigration authorities. What we do is maximise your chances through expert preparation, verified data, and complete guidance.',
  },
  {
    q: 'When should I start the application process?',
    a: 'Ideally 8–12 months before your intended intake. This gives enough time for tests (IELTS/TOEFL/GRE), application prep, and visa processing. Some countries like the UK and Canada have multiple intakes per year.',
  },
  {
    q: 'Can I work while studying abroad?',
    a: 'Most countries allow part-time work (typically 20 hours/week during term). Post-study work visas vary — the UK, Canada, and Australia offer generous post-study work rights. We cover these details in counselling.',
  },
  {
    q: 'What documents do I need?',
    a: 'Typically: academic transcripts, degree certificates, English test scores, passport, SOP, LORs, CV, and financial documents. Requirements vary by country and university — we provide a personalised checklist.',
  },
  {
    q: 'How do I pay for my studies?',
    a: 'Options include family funds, education loans, scholarships, assistantships, and part-time work. We guide you on education loans from banks and help identify scholarships you qualify for.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-20 bg-navy-50/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="FAQs"
          title="Questions? We have answers"
          subtitle="Common questions from students planning their overseas education."
        />

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={faq.q}
                className={`bg-white rounded-2xl border transition-all duration-200 ${
                  isOpen
                    ? 'border-primary-300 shadow-md'
                    : 'border-navy-100'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left"
                >
                  <span className="font-bold text-navy-900 text-base md:text-lg">
                    {faq.q}
                  </span>
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      isOpen
                        ? 'bg-primary-600 text-white'
                        : 'bg-navy-100 text-navy-700'
                    }`}
                  >
                    {isOpen ? <FiMinus size={16} /> : <FiPlus size={16} />}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 -mt-2">
                    <p className="text-navy-600 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;