import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { useCourses } from '../../hooks/useCourses';
import { useCountries } from '../../hooks/useCountries';
import CourseCard from '../../components/course/CourseCard';
import SkeletonCard from '../../components/common/SkeletonCard';
import EmptyState from '../../components/common/EmptyState';
import ErrorState from '../../components/common/ErrorState';
import SectionHeading from '../../components/common/SectionHeading';

const DEGREE_LEVELS = [
  "Bachelor's",
  "Master's",
  'PhD',
  'Diploma',
  'PG Diploma',
  'Certificate',
];

const CATEGORIES = [
  'Engineering & IT',
  'Business',
  'Healthcare',
  'Arts & Design',
  'Science',
  'Law',
  'Education',
  'Other',
];

const Courses = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [countryFilter, setCountryFilter] = useState(searchParams.get('country') || '');
  const [levelFilter, setLevelFilter] = useState(searchParams.get('degreeLevel') || '');
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get('category') || '');

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

  const { data: countriesData } = useCountries({ limit: 100 });
  const countries = countriesData?.countries || [];

  const params = {};
  if (debouncedSearch) params.search = debouncedSearch;
  if (countryFilter) params.country = countryFilter;
  if (levelFilter) params.degreeLevel = levelFilter;
  if (categoryFilter) params.category = categoryFilter;

  const { data, isLoading, isError, error, refetch } = useCourses(params);
  const courses = data?.courses || [];

  useEffect(() => {
    const newParams = {};
    if (debouncedSearch) newParams.search = debouncedSearch;
    if (countryFilter) newParams.country = countryFilter;
    if (levelFilter) newParams.degreeLevel = levelFilter;
    if (categoryFilter) newParams.category = categoryFilter;
    setSearchParams(newParams, { replace: true });
  }, [debouncedSearch, countryFilter, levelFilter, categoryFilter, setSearchParams]);

  const clearFilters = () => {
    setSearch('');
    setCountryFilter('');
    setLevelFilter('');
    setCategoryFilter('');
  };

  const hasFilters = search || countryFilter || levelFilter || categoryFilter;

  return (
    <section className="py-16 bg-navy-50/30 min-h-[80vh]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Courses"
          title="Browse programs worldwide"
          subtitle="Explore thousands of programs offered by universities across the globe."
        />

        <div className="bg-white rounded-2xl border border-navy-100 p-5 mb-10 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-4 gap-4 mb-4">
            <div className="relative md:col-span-2">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400" />
              <input
                type="text"
                placeholder="Search courses..."
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
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="input-field"
            >
              <option value="">All Levels</option>
              {DEGREE_LEVELS.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="input-field flex-grow"
            >
              <option value="">All Categories</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-navy-600 hover:text-primary-600 font-medium whitespace-nowrap"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {isLoading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkeletonCard count={6} />
          </div>
        )}

        {isError && (
          <ErrorState
            message={error?.message || 'Could not load courses.'}
            onRetry={refetch}
          />
        )}

        {!isLoading && !isError && courses.length === 0 && (
          <EmptyState
            title="No courses found"
            description="Try adjusting your filters or search query."
          />
        )}

        {!isLoading && !isError && courses.length > 0 && (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
            <p className="text-center text-sm text-navy-500 mt-8">
              Showing {courses.length} of {data?.pagination?.total || 0} courses
            </p>
          </>
        )}
      </div>
    </section>
  );
};

export default Courses;