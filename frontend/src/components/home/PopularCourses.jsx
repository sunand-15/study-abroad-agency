import { Link } from 'react-router-dom';
import { FiArrowRight, FiClock, FiMapPin } from 'react-icons/fi';
import SectionHeading from '../common/SectionHeading';

const courses = [
  {
    title: 'MS in Computer Science',
    country: 'United States',
    flag: '🇺🇸',
    duration: '2 Years',
    level: "Master's",
    field: 'Engineering & IT',
  },
  {
    title: 'MBA Global Business',
    country: 'United Kingdom',
    flag: '🇬🇧',
    duration: '1 Year',
    level: "Master's",
    field: 'Business',
  },
  {
    title: 'MEng Mechanical Engineering',
    country: 'Germany',
    flag: '🇩🇪',
    duration: '2 Years',
    level: "Master's",
    field: 'Engineering & IT',
  },
  {
    title: 'Postgraduate Diploma in IT',
    country: 'Canada',
    flag: '🇨🇦',
    duration: '1 Year',
    level: 'PG Diploma',
    field: 'Engineering & IT',
  },
  {
    title: 'BSc Nursing',
    country: 'Australia',
    flag: '🇦🇺',
    duration: '3 Years',
    level: "Bachelor's",
    field: 'Healthcare',
  },
  {
    title: 'MSc Data Science',
    country: 'Ireland',
    flag: '🇮🇪',
    duration: '1 Year',
    level: "Master's",
    field: 'Engineering & IT',
  },
];

const PopularCourses = () => {
  return (
    <section className="py-20 bg-navy-50/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Popular Programs"
          title="Trending courses abroad"
          subtitle="Explore the most in-demand programs chosen by students aiming for global careers."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.title}
              className="bg-white rounded-2xl border border-navy-100 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-3xl">{course.flag}</span>
                <span className="text-xs font-semibold px-3 py-1 bg-primary-50 text-primary-700 rounded-full">
                  {course.level}
                </span>
              </div>

              <h3 className="font-bold text-navy-900 text-lg mb-3 leading-snug">
                {course.title}
              </h3>

              <div className="space-y-2 mb-5 flex-grow">
                <div className="flex items-center gap-2 text-sm text-navy-600">
                  <FiMapPin size={14} />
                  {course.country}
                </div>
                <div className="flex items-center gap-2 text-sm text-navy-600">
                  <FiClock size={14} />
                  {course.duration}
                </div>
              </div>

              <Link
                to="/courses"
                className="inline-flex items-center gap-2 text-primary-600 font-semibold text-sm hover:gap-3 transition-all pt-4 border-t border-navy-100"
              >
                View Details <FiArrowRight />
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/courses" className="btn-outline">
            Browse All Courses <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularCourses;