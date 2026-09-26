import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useCountries } from '../../hooks/useCountries';
import CountryCard from '../../components/country/CountryCard';
import SkeletonCard from '../../components/common/SkeletonCard';
import EmptyState from '../../components/common/EmptyState';
import ErrorState from '../../components/common/ErrorState';
import SectionHeading from '../../components/common/SectionHeading';

const Countries = () => {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Simple debounce
  useState(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timer);
  });

  const params = debouncedSearch ? { search: debouncedSearch } : {};
  const { data, isLoading, isError, error, refetch } = useCountries(params);

  const countries = data?.countries || [];

  return (
    <section className="py-16 bg-navy-50/30 min-h-[80vh]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Study Destinations"
          title="Explore countries worldwide"
          subtitle="Choose from top study destinations offering world-class education."
        />

        {/* Search */}
        <div className="max-w-md mx-auto mb-10">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400" />
            <input
              type="text"
              placeholder="Search countries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-11"
            />
          </div>
        </div>

        {/* Content */}
        {isLoading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkeletonCard count={6} />
          </div>
        )}

        {isError && (
          <ErrorState
            message={error?.message || 'Could not load countries.'}
            onRetry={refetch}
          />
        )}

        {!isLoading && !isError && countries.length === 0 && (
          <EmptyState
            title="No countries found"
            description={
              debouncedSearch
                ? `No countries match "${debouncedSearch}". Try a different search.`
                : 'Countries will appear here soon.'
            }
          />
        )}

        {!isLoading && !isError && countries.length > 0 && (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {countries.map((country) => (
                <CountryCard key={country._id} country={country} />
              ))}
            </div>
            <p className="text-center text-sm text-navy-500 mt-8">
              Showing {countries.length} of {data?.pagination?.total || 0} countries
            </p>
          </>
        )}
      </div>
    </section>
  );
};

export default Countries;