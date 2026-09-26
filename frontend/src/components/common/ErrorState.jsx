import { FiAlertCircle } from 'react-icons/fi';

const ErrorState = ({ message = 'Something went wrong.', onRetry }) => {
  return (
    <div className="text-center py-20">
      <div className="w-20 h-20 rounded-full bg-red-50 mx-auto flex items-center justify-center mb-5">
        <FiAlertCircle className="text-red-500" size={36} />
      </div>
      <h3 className="text-xl font-bold text-navy-900 mb-2">Oops!</h3>
      <p className="text-navy-500 max-w-md mx-auto mb-6">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-primary">
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorState;