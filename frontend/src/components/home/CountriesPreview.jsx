import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import SectionHeading from '../common/SectionHeading';
import { useCountries } from '../../hooks/useCountries';

const CountriesPreview = () => {
  const { data, isLoading } = useCountries({ limit: 6 });
  const countries = data?.countries || [];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Popular Destinations"
          title="Choose your study destination"
          subtitle="Explore top countries with world-class universities, welcoming communities, and excellent career prospects."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {isLoading
            ? [...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-navy-100 p-6 text-center animate-pulse"
                >
                  <div className="w-14 h-14 bg-navy-100 rounded-full mx-auto mb-3" />
                  <div className="h-3 bg-navy-100 rounded w-3/4 mx-auto" />
                </div>
              ))
            : countries.map((country) => (
                <Link
                  key={country._id}
                  to={`/countries/${country.slug}`}
                  className="group bg-white rounded-2xl border border-navy-100 p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {country.flag || '🌍'}
                  </div>
                  <h3 className="font-bold text-navy-900 text-sm md:text-base mb-1">
                    {country.name}
                  </h3>
                  {country.stats?.universities && (
                    <p className="text-xs text-navy-500">
                      {country.stats.universities}+ Universities
                    </p>
                  )}
                </Link>
              ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/countries"
            className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:gap-3 transition-all"
          >
            View all destinations <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CountriesPreview;