import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import SectionHeading from '../common/SectionHeading';

// Phase 2: temporary hardcoded. Phase 4 will replace with API data.
const countries = [
  {
    name: 'United States',
    flag: '🇺🇸',
    universities: '4,500+',
    color: 'from-blue-500 to-blue-700',
  },
  {
    name: 'United Kingdom',
    flag: '🇬🇧',
    universities: '1,300+',
    color: 'from-red-500 to-red-700',
  },
  {
    name: 'Canada',
    flag: '🇨🇦',
    universities: '850+',
    color: 'from-red-400 to-red-600',
  },
  {
    name: 'Australia',
    flag: '🇦🇺',
    universities: '700+',
    color: 'from-orange-400 to-orange-600',
  },
  {
    name: 'Germany',
    flag: '🇩🇪',
    universities: '400+',
    color: 'from-yellow-500 to-yellow-700',
  },
  {
    name: 'Ireland',
    flag: '🇮🇪',
    universities: '300+',
    color: 'from-green-500 to-green-700',
  },
];

const CountriesPreview = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Popular Destinations"
          title="Choose your study destination"
          subtitle="Explore top countries with world-class universities, welcoming communities, and excellent career prospects."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {countries.map((country) => (
            <Link
              key={country.name}
              to="/countries"
              className="group relative bg-white rounded-2xl border border-navy-100 p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${country.color} opacity-0 group-hover:opacity-5 transition-opacity`}
              />
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {country.flag}
              </div>
              <h3 className="font-bold text-navy-900 text-sm md:text-base mb-1">
                {country.name}
              </h3>
              <p className="text-xs text-navy-500">{country.universities} Universities</p>
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