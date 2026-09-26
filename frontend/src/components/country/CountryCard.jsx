import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const CountryCard = ({ country }) => {
  return (
    <Link
      to={`/countries/${country.slug}`}
      className="group bg-white rounded-2xl border border-navy-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
          {country.flag || '🌍'}
        </span>
        {country.stats?.universities && (
          <span className="text-xs font-semibold px-3 py-1 bg-primary-50 text-primary-700 rounded-full">
            {country.stats.universities}+ Unis
          </span>
        )}
      </div>

      <h3 className="text-xl font-bold text-navy-900 mb-2 group-hover:text-primary-600 transition-colors">
        {country.name}
      </h3>

      <p className="text-navy-600 text-sm leading-relaxed line-clamp-3 mb-4 flex-grow">
        {country.shortDescription}
      </p>

      <div className="inline-flex items-center gap-2 text-primary-600 font-semibold text-sm mt-auto">
        Explore <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
};

export default CountryCard;