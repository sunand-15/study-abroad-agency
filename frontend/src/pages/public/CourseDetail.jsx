import { Link, useParams } from 'react-router-dom';
import {
  FiArrowLeft,
  FiClock,
  FiMapPin,
  FiCalendar,
  FiDollarSign,
  FiCheckCircle,
} from 'react-icons/fi';
import { useCourse } from '../../hooks/useCourse';
import Loader from '../../components/common/Loader';
import ErrorState from '../../components/common/ErrorState';

const CourseDetail = () => {
  const { slug } = useParams();
  const { data: course, isLoading, isError, error, refetch } = useCourse(slug);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader size="lg" text="Loading course..." />
      </div>
    );
  }

  if (isError) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ErrorState
            message={error?.message || 'Course not found.'}
            onRetry={refetch}
          />
        </div>
      </section>
    );
  }

  if (!course) return null;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 to-white border-b border-navy-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-navy-600 hover:text-primary-600 mb-6 text-sm font-medium"
          >
            <FiArrowLeft /> Back to Courses
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-semibold">
              {course.degreeLevel}
            </span>
            {course.category && (
              <span className="px-3 py-1 bg-navy-100 text-navy-700 rounded-full text-xs font-semibold">
                {course.category}
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-navy-900 mb-4">
            {course.name}
          </h1>

          {course.university && (
            <p className="text-lg text-navy-600 mb-6">
              at{' '}
              <Link
                to={`/universities/${course.university.slug}`}
                className="text-primary-600 hover:underline font-semibold"
              >
                {course.university.name}
              </Link>
              {course.country && ` • ${course.country.name}`}
            </p>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl">
            <div className="bg-white rounded-xl px-4 py-3 border border-navy-100">
              <p className="text-xs text-navy-500 mb-1">Duration</p>
              <p className="font-bold text-navy-900 flex items-center gap-1.5">
                <FiClock size={14} /> {course.duration}
              </p>
            </div>
            {course.tuition?.amount && (
              <div className="bg-white rounded-xl px-4 py-3 border border-navy-100">
                <p className="text-xs text-navy-500 mb-1">Tuition</p>
                <p className="font-bold text-navy-900 flex items-center gap-1.5">
                  <FiDollarSign size={14} /> {course.tuition.currency} {course.tuition.amount.toLocaleString()}
                </p>
              </div>
            )}
            {course.country && (
              <div className="bg-white rounded-xl px-4 py-3 border border-navy-100">
                <p className="text-xs text-navy-500 mb-1">Country</p>
                <p className="font-bold text-navy-900 flex items-center gap-1.5">
                  <FiMapPin size={14} /> {course.country.name}
                </p>
              </div>
            )}
            {course.intakes?.length > 0 && (
              <div className="bg-white rounded-xl px-4 py-3 border border-navy-100">
                <p className="text-xs text-navy-500 mb-1">Intakes</p>
                <p className="font-bold text-navy-900 flex items-center gap-1.5">
                  <FiCalendar size={14} /> {course.intakes[0]}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-10">
              <div>
                <h2 className="text-2xl font-bold text-navy-900 mb-4">
                  About this course
                </h2>
                <p className="text-navy-700 leading-relaxed whitespace-pre-line">
                  {course.description}
                </p>
              </div>

              {course.eligibility && (
                <div>
                  <h2 className="text-2xl font-bold text-navy-900 mb-4">
                    Eligibility
                  </h2>
                  <div className="space-y-4 text-navy-700">
                    {course.eligibility.academic?.length > 0 && (
                      <div>
                        <p className="font-semibold mb-2 text-navy-900">Academic:</p>
                        <ul className="space-y-1">
                          {course.eligibility.academic.map((req, i) => (
                            <li key={i} className="flex gap-2">
                              <FiCheckCircle className="text-primary-600 flex-shrink-0 mt-1" size={14} />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {course.eligibility.english?.length > 0 && (
                      <div>
                        <p className="font-semibold mb-2 text-navy-900">English:</p>
                        <ul className="space-y-1">
                          {course.eligibility.english.map((req, i) => (
                            <li key={i} className="flex gap-2">
                              <FiCheckCircle className="text-primary-600 flex-shrink-0 mt-1" size={14} />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {course.englishRequirements && (
                <div>
                  <h2 className="text-2xl font-bold text-navy-900 mb-4">
                    English Requirements
                  </h2>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {course.englishRequirements.ielts && (
                      <div className="bg-white rounded-xl border border-navy-100 p-4">
                        <p className="text-xs text-navy-500 mb-1">IELTS</p>
                        <p className="font-bold text-navy-900">{course.englishRequirements.ielts}</p>
                      </div>
                    )}
                    {course.englishRequirements.toefl && (
                      <div className="bg-white rounded-xl border border-navy-100 p-4">
                        <p className="text-xs text-navy-500 mb-1">TOEFL</p>
                        <p className="font-bold text-navy-900">{course.englishRequirements.toefl}</p>
                      </div>
                    )}
                    {course.englishRequirements.pte && (
                      <div className="bg-white rounded-xl border border-navy-100 p-4">
                        <p className="text-xs text-navy-500 mb-1">PTE</p>
                        <p className="font-bold text-navy-900">{course.englishRequirements.pte}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {course.intakes?.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-navy-900 mb-4">Intakes</h2>
                  <div className="flex flex-wrap gap-2">
                    {course.intakes.map((intake, i) => (
                      <span key={i} className="px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-medium">
                        {intake}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-6 text-white">
                  <h3 className="font-bold text-lg mb-2">Interested in this course?</h3>
                  <p className="text-primary-100 text-sm mb-4">
                    Get personalised guidance for admission.
                  </p>
                  <Link
                    to="/counselling"
                    className="block w-full text-center bg-white text-primary-700 py-3 rounded-full font-semibold hover:bg-primary-50 transition-colors"
                  >
                    Book Counselling
                  </Link>
                </div>
                <Link to="/enquiry" className="block w-full text-center btn-outline">
                  Submit Enquiry
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CourseDetail;