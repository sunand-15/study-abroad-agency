import { Link } from 'react-router-dom';
import { FiAward, FiCalendar, FiArrowRight } from 'react-icons/fi';
import { useScholarships } from '../../hooks/useScholarships';
import SkeletonCard from '../../components/common/SkeletonCard';
import EmptyState from '../../components/common/EmptyState';
import ErrorState from '../../components/common/ErrorState';
import SectionHeading from '../../components/common/SectionHeading';

const ScholarshipCard = ({ scholarship }) => (
  <div className="bg-white rounded-2xl border border-navy-100 p-6 hover:shadow-lg transition-shadow flex flex-col">
    <div className="flex items-start justify-between mb-4">
      <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center">
        <FiAward className="text-primary-600" size={24} />
      </div>
      {scholarship.country && (
        <span className="text-2xl">{scholarship.country.flag || '🌍'}</span>
      )}
    </div>

    <h3 className="font-bold text-navy-900 text-lg mb-2 leading-snug line-clamp-2">
      {scholarship.name}
    </h3>

    <p className="text-sm text-navy-600 mb-3">
      by <span className="font-medium">{scholarship.provider}</span>
    </p>

    <div className="bg-primary-50 rounded-xl p-3 mb-4">
      <p className="text-xs text-primary-700 font-semibold mb-0.5">Amount</p>
      <p className="text-sm text-navy-900 font-medium">{scholarship.amount}</p>
    </div>

    <p className="text-navy-600 text-sm line-clamp-3 mb-4 flex-grow">
      {scholarship.description}
    </p>

    {scholarship.deadline && (
      <div className="flex items-center gap-2 text-xs text-navy-500 pt-4 border-t border-navy-100">
        <FiCalendar size={12} />
        Deadline: {new Date(scholarship.deadline).toLocaleDateString()}
      </div>
    )}
  </div>
);

const Scholarships = () => {
  const { data, isLoading, isError, error, refetch } = useScholarships();
  const scholarships = data?.scholarships || [];

  return (
    <section className="py-16 bg-navy-50/30 min-h-[80vh]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Scholarships"
          title="Fund your education"
          subtitle="Discover scholarships, grants, and financial aid opportunities worldwide."
        />

        {isLoading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkeletonCard count={6} />
          </div>
        )}

        {isError && (
          <ErrorState
            message={error?.message || 'Could not load scholarships.'}
            onRetry={refetch}
          />
        )}

        {!isLoading && !isError && scholarships.length === 0 && (
          <EmptyState
            title="No scholarships available"
            description="New scholarships will appear here soon."
          />
        )}

        {!isLoading && !isError && scholarships.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {scholarships.map((s) => (
              <ScholarshipCard key={s._id} scholarship={s} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Scholarships;