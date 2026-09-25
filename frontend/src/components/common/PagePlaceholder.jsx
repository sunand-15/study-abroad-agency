import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const PagePlaceholder = ({ title, description }) => {
  return (
    <section className="py-24 bg-white min-h-[60vh] flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-2xl">
        <p className="text-primary-600 font-semibold text-sm uppercase tracking-wider mb-3">
          Coming Soon
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-navy-900 mb-5">
          {title}
        </h1>
        <p className="text-navy-600 text-lg mb-8 leading-relaxed">
          {description || 'This page is under construction and will be available in a later phase.'}
        </p>
        <Link to="/" className="btn-primary">
          <FiArrowLeft /> Back to Home
        </Link>
      </div>
    </section>
  );
};

export default PagePlaceholder;