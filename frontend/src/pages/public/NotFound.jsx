import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const NotFound = () => {
  return (
    <section className="py-24 min-h-[70vh] flex items-center bg-white">
      <div className="container mx-auto px-4 text-center">
        <p className="text-primary-600 font-bold text-9xl mb-4">404</p>
        <h1 className="text-3xl md:text-4xl font-extrabold text-navy-900 mb-4">
          Page not found
        </h1>
        <p className="text-navy-600 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-primary">
          <FiArrowLeft /> Back to Home
        </Link>
      </div>
    </section>
  );
};

export default NotFound;