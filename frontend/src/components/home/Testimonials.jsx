import { FiStar } from 'react-icons/fi';
import SectionHeading from '../common/SectionHeading';

const testimonials = [
  {
    name: 'Ananya Sharma',
    course: 'MS Computer Science',
    university: 'Arizona State University, USA',
    text: 'From shortlisting universities to my visa interview, the team guided me at every step. I got a 40% scholarship and am now living my dream in the US.',
    rating: 5,
    initials: 'AS',
    color: 'bg-blue-600',
  },
  {
    name: 'Rahul Mehta',
    course: 'PG Diploma in IT',
    university: 'Humber College, Canada',
    text: 'The process felt overwhelming at first, but my counsellor broke everything down. I received my study permit without any issues. Highly recommend!',
    rating: 5,
    initials: 'RM',
    color: 'bg-purple-600',
  },
  {
    name: 'Priya Nair',
    course: 'MSc Management',
    university: 'University of Manchester, UK',
    text: 'The SOP guidance was invaluable. They helped me present my story in the best way. Now I\'m studying at one of the top UK universities.',
    rating: 5,
    initials: 'PN',
    color: 'bg-green-600',
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Success Stories"
          title="What our students say"
          subtitle="Real journeys, real outcomes. Hear from students who trusted us with their dreams."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-2xl border border-navy-100 p-7 hover:shadow-lg transition-shadow flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[...Array(t.rating)].map((_, i) => (
                  <FiStar
                    key={i}
                    size={16}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="text-navy-700 leading-relaxed mb-6 flex-grow">
                "{t.text}"
              </p>

              <div className="flex items-center gap-3 pt-5 border-t border-navy-100">
                <div
                  className={`w-12 h-12 rounded-full ${t.color} flex items-center justify-center text-white font-bold`}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="font-bold text-navy-900 text-sm">{t.name}</p>
                  <p className="text-xs text-navy-500">
                    {t.course} • {t.university}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;