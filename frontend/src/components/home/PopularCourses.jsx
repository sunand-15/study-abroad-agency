import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import SectionHeading from '../common/SectionHeading';
import CourseCard from '../course/CourseCard';
import { useCourses } from '../../hooks/useCourses';

const PopularCourses = () => {
  const { data, isLoading } = useCourses({ limit: 6, isFeatured: true });
  const courses = data?.courses || [];

  return (
    <section className="py-20 bg-navy-50/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Popular Programs"
          title="Trending courses abroad"
          subtitle="Explore the most in-demand programs chosen by students aiming for global careers."
        />

        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-navy-100 p-6 animate-pulse">
                <div className="h-4 bg-navy-100 rounded w-1/2 mb-3" />
                <div className="h-4 bg-navy-100 rounded w-3/4 mb-4" />
                <div className="h-3 bg-navy-100 rounded w-full" />
              </div>
            ))}
          </div>
        ) : courses.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        ) : (
          <p className="text-center text-navy-500">No featured courses yet.</p>
        )}

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