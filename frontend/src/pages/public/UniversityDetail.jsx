import { Link, useParams } from 'react-router-dom';
import {
  FiArrowLeft,
  FiMapPin,
  FiGlobe,
  FiAward,
  FiCheckCircle,
} from 'react-icons/fi';
import { useUniversity } from '../../hooks/useUniversity';
import Loader from '../../components/common/Loader';
import ErrorState from '../../components/common/ErrorState';

const UniversityDetail = () => {
  const { slug } = useParams();
  const { data: university, isLoading, isError, error, refetch } = useUniversity(slug);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader size="lg" text="Loading university..." />
      </div>
    );
  }

  if (isError) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ErrorState
            message={error?.message || 'University not found.'}
            onRetry={refetch}
          />
        </div>
      </section>
    );
  }

  if (!university) return null;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 to-white border-b border-navy-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <Link
            to="/universities"
            className="inline-flex items-center gap-2 text-navy-600 hover:text-primary-600 mb-6 text-sm font-medium"
          >
            <FiArrowLeft /> Back to Universities
          </Link>

          <div className="flex items-start gap-6">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-primary-600 flex items-center justify-center text-white text-3xl font-extrabold flex-shrink-0">
              {university.name.charAt(0)}
            </div>
            <div className="flex-grow">
              <h1 className="text-3xl md:text-4xl font-extrabold text-navy-900 mb-3">
                {university.name}
              </h1>

              <div className="flex flex-wrap gap-4 text-sm text-navy-600">
                {university.city && (
                  <div className="flex items-center gap-1.5">
                    <FiMapPin />
                    {university.city}
                    {university.country && `, ${university.country.name}`}
                  </div>
                )}
                {university.website && (
                  <a
                    href={university.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-primary-600 hover:underline"
                  >
                    <FiGlobe />
                    Official Website
                  </a>
                )}
                {university.ranking?.world && (
                  <div className="flex items-center gap-1.5">
                    <FiAward />
                    World Rank #{university.ranking.world}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-10">
              {university.description && (
                <div>
                  <h2 className="text-2xl font-bold text-navy-900 mb-4">
                    About {university.name}
                  </h2>
                  <p className="text-navy-700 leading-relaxed whitespace-pre-line">
                    {university.description}
                  </p>
                </div>
              )}

              {university.popularCourses?.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-navy-900 mb-4">
                    Popular Courses
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {university.popularCourses.map((course, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-medium"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {university.admissionRequirements && (
                <div>
                  <h2 className="text-2xl font-bold text-navy-900 mb-4">
                    Admission Requirements
                  </h2>
                  <div className="space-y-4 text-navy-700">
                    {university.admissionRequirements.academic?.length > 0 && (
                      <div>
                        <p className="font-semibold mb-2 text-navy-900">Academic:</p>
                        <ul className="space-y-1">
                          {university.admissionRequirements.academic.map((req, i) => (
                            <li key={i} className="flex gap-2">
                              <FiCheckCircle className="text-primary-600 flex-shrink-0 mt-1" size={14} />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {university.admissionRequirements.english?.length > 0 && (
                      <div>
                        <p className="font-semibold mb-2 text-navy-900">English:</p>
                        <ul className="space-y-1">
                          {university.admissionRequirements.english.map((req, i) => (
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

              {university.englishRequirements && (
                <div>
                  <h2 className="text-2xl font-bold text-navy-900 mb-4">
                    English Test Scores
                  </h2>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {university.englishRequirements.ielts && (
                      <div className="bg-white rounded-xl border border-navy-100 p-4">
                        <p className="text-xs text-navy-500 mb-1">IELTS</p>
                        <p className="font-bold text-navy-900">
                          {university.englishRequirements.ielts}
                        </p>
                      </div>
                    )}
                    {university.englishRequirements.toefl && (
                      <div className="bg-white rounded-xl border border-navy-100 p-4">
                        <p className="text-xs text-navy-500 mb-1">TOEFL</p>
                        <p className="font-bold text-navy-900">
                          {university.englishRequirements.toefl}
                        </p>
                      </div>
                    )}
                    {university.englishRequirements.pte && (
                      <div className="bg-white rounded-xl border border-navy-100 p-4">
                        <p className="text-xs text-navy-500 mb-1">PTE</p>
                        <p className="font-bold text-navy-900">
                          {university.englishRequirements.pte}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                {university.tuition && (
                  <div className="bg-white rounded-2xl border border-navy-100 p-6">
                    <p className="text-sm text-navy-500 mb-1">Tuition Range</p>
                    <p className="text-2xl font-extrabold text-navy-900">
                      {university.tuition.currency} {university.tuition.min?.toLocaleString()}
                      {university.tuition.max && ` - ${university.tuition.max.toLocaleString()}`}
                    </p>
                    <p className="text-xs text-navy-500 mt-1">per year</p>
                  </div>
                )}

                <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-6 text-white">
                  <h3 className="font-bold text-lg mb-2">Get free guidance</h3>
                  <p className="text-primary-100 text-sm mb-4">
                    Talk to our experts about admissions.
                  </p>
                  <Link
                    to="/counselling"
                    className="block w-full text-center bg-white text-primary-700 py-3 rounded-full font-semibold hover:bg-primary-50 transition-colors"
                  >
                    Book Counselling
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UniversityDetail;