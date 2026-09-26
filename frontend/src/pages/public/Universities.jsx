import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { useUniversities } from '../../hooks/useUniversities';
import { useCountries } from '../../hooks/useCountries';
import UniversityCard from '../../components/university/UniversityCard';
import SkeletonCard from '../../components/common/SkeletonCard';
import EmptyState from '../../components/common/EmptyState';
import ErrorState from '../../components/common/ErrorState';
import SectionHeading from '../../components/common/SectionHeading';

const Universities = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [countryFilter, setCountryFilter] = useState(searchParams.get('country') || '');

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

  // Fetch countries for filter dropdown
  const { data: countriesData } = useCountries({ limit: 100 });
  const countries = countriesData?.countries || [];

  // Build params
  const params = {};
  if (debouncedSearch) params.search = debouncedSearch;
  if (countryFilter) params.country = countryFilter;

  const { data, isLoading, isError, error, refetch } = useUniversities(params);
  const universities = data?.universities || [];

  // Update URL when filters change
  useEffect(() => {
    const newParams = {};
    if (debouncedSearch) newParams.search = debouncedSearch;
    if (countryFilter) newParams.country = countryFilter;
    setSearchParams(newParams, { replace: true });
  }, [debouncedSearch, countryFilter, setSearchParams]);

  return (
    <section className="py-16 bg-navy-50/30 min-h-[80vh]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Universities"
          title="Find your dream university"
          subtitle="Browse top-ranked universities across the world."
        />

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-navy-100 p-5 mb-10 grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400" />
            <input
              type="text"
              placeholder="Search by name or city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-11"
            />
          </div>
          <select
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
            className="input-field"
          >
            <option value="">All Countries</option>
            {countries.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Content */}
        {isLoading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkeletonCard count={6} />
          </div>
        )}

        {isError && (
          <ErrorState
            message={error?.message || 'Could not load universities.'}
            onRetry={refetch}
          />
        )}

        {!isLoading && !isError && universities.length === 0 && (
          <EmptyState
            title="No universities found"
            description="Try adjusting your search or filters."
          />
        )}

        {!isLoading && !isError && universities.length > 0 && (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {universities.map((uni) => (
                <UniversityCard key={uni._id} university={uni} />
              ))}
            </div>
            <p className="text-center text-sm text-navy-500 mt-8">
              Showing {universities.length} of {data?.pagination?.total || 0} universities
            </p>
          </>
        )}
      </div>
    </section>
  );
};

export default Universities;