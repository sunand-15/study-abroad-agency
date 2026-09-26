import { Link } from 'react-router-dom';
import { FiMapPin, FiArrowRight } from 'react-icons/fi';

const UniversityCard = ({ university }) => {
  return (
    <Link
      to={`/universities/${university.slug}`}
      className="group bg-white rounded-2xl border border-navy-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="w-16 h-16 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 font-extrabold text-xl flex-shrink-0">
          {university.name.charAt(0)}
        </div>
        <div className="flex-grow min-w-0">
          <h3 className="font-bold text-navy-900 text-base leading-snug mb-1 group-hover:text-primary-600 transition-colors line-clamp-2">
            {university.name}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-navy-500">
            <FiMapPin size={12} />
            <span className="truncate">
              {university.city}
              {university.country && `, ${university.country.name}`}
            </span>
          </div>
        </div>
      </div>

      {university.shortDescription && (
        <p className="text-navy-600 text-sm leading-relaxed line-clamp-2 mb-4 flex-grow">
          {university.shortDescription}
        </p>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-navy-100 mt-auto">
        {university.ranking?.world && (
          <span className="text-xs text-navy-500">
            World Rank: <strong className="text-navy-900">#{university.ranking.world}</strong>
          </span>
        )}
        <FiArrowRight className="text-primary-600 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
};

export default UniversityCard;