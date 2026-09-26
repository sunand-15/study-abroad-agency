import { Link } from 'react-router-dom';
import { FiCheckCircle, FiCopy, FiArrowRight } from 'react-icons/fi';
import { useState } from 'react';

const SuccessMessage = ({ enquiry }) => {
  const [copied, setCopied] = useState(false);

  const copyId = () => {
    navigator.clipboard.writeText(enquiry.enquiryId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
        <FiCheckCircle className="text-green-600" size={40} />
      </div>

      <h2 className="text-3xl md:text-4xl font-extrabold text-navy-900 mb-3">
        Thank you, {enquiry.fullName}!
      </h2>
      <p className="text-navy-600 text-lg mb-8">
        We've received your enquiry. Our team will contact you within 24 hours at{' '}
        <strong className="text-navy-900">{enquiry.email}</strong>.
      </p>

      {/* Enquiry ID box */}
      <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl border-2 border-primary-200 p-8 mb-8">
        <p className="text-sm text-navy-500 mb-2 uppercase tracking-wider font-semibold">
          Your Enquiry ID
        </p>
        <div className="flex items-center justify-center gap-3">
          <p className="text-3xl md:text-4xl font-extrabold text-primary-600 tracking-wider">
            {enquiry.enquiryId}
          </p>
          <button
            onClick={copyId}
            className="p-2 rounded-lg hover:bg-primary-50 transition-colors"
            aria-label="Copy enquiry ID"
          >
            <FiCopy className={copied ? 'text-green-600' : 'text-primary-600'} size={20} />
          </button>
        </div>
        {copied && (
          <p className="text-xs text-green-600 mt-2 font-medium">Copied to clipboard!</p>
        )}
        <p className="text-sm text-navy-500 mt-4">
          Please save this ID for future reference.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/" className="btn-outline">
          Back to Home
        </Link>
        <Link to="/counselling" className="btn-primary">
          Book Counselling <FiArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default SuccessMessage;