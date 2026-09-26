import { Link } from 'react-router-dom';
import { FiClock, FiMapPin, FiArrowRight } from 'react-icons/fi';

const CourseCard = ({ course }) => {
  return (
    <Link
      to={`/courses/${course.slug}`}
      className="group bg-white rounded-2xl border border-navy-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-3xl">{course.country?.flag || '🌍'}</span>
        <span className="text-xs font-semibold px-3 py-1 bg-primary-50 text-primary-700 rounded-full">
          {course.degreeLevel}
        </span>
      </div>

      <h3 className="font-bold text-navy-900 text-lg mb-3 leading-snug group-hover:text-primary-600 transition-colors line-clamp-2">
        {course.name}
      </h3>

      {course.university && (
        <p className="text-sm text-navy-600 font-medium mb-3 line-clamp-1">
          {course.university.name}
        </p>
      )}

      <div className="space-y-2 mb-5 flex-grow">
        {course.country && (
          <div className="flex items-center gap-2 text-sm text-navy-600">
            <FiMapPin size={14} />
            {course.country.name}
          </div>
        )}
        <div className="flex items-center gap-2 text-sm text-navy-600">
          <FiClock size={14} />
          {course.duration}
        </div>
      </div>

      <div className="inline-flex items-center gap-2 text-primary-600 font-semibold text-sm pt-4 border-t border-navy-100 mt-auto">
        View Details <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
};

export default CourseCard;