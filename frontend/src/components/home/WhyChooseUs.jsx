import {
  HiOutlineUserGroup,
  HiOutlineDocumentText,
  HiOutlineGlobeAlt,
  HiOutlineCurrencyDollar,
} from 'react-icons/hi';
import { FiAward, FiHeadphones } from 'react-icons/fi';
import SectionHeading from '../common/SectionHeading';

const features = [
  {
    icon: HiOutlineUserGroup,
    title: 'Expert Counsellors',
    description:
      'Get personalised guidance from counsellors who have studied abroad and understand the journey firsthand.',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: HiOutlineDocumentText,
    title: 'End-to-End Support',
    description:
      'From university shortlisting to visa filing, we handle every step so you can focus on your goals.',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: HiOutlineGlobeAlt,
    title: '500+ Partner Universities',
    description:
      'Access a curated network of accredited institutions across 30+ countries worldwide.',
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: HiOutlineCurrencyDollar,
    title: 'Scholarship Assistance',
    description:
      'We help you identify and apply for scholarships, grants, and education loans to fund your studies.',
    color: 'bg-yellow-100 text-yellow-600',
  },
  {
    icon: FiAward,
    title: '98% Visa Success Rate',
    description:
      'Our meticulous document preparation and interview coaching maximise your visa approval chances.',
    color: 'bg-red-100 text-red-600',
  },
  {
    icon: FiHeadphones,
    title: 'Lifetime Support',
    description:
      'Our relationship continues even after you land — help with accommodation, banking, and settling in.',
    color: 'bg-indigo-100 text-indigo-600',
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-navy-50/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Trusted by thousands of students"
          subtitle="We combine expert knowledge, transparent processes, and genuine care to make your study abroad dream a reality."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-7 border border-navy-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-5`}
                >
                  <Icon size={28} />
                </div>
                <h3 className="text-lg font-bold text-navy-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-navy-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;