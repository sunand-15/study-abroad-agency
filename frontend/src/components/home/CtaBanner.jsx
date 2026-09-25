import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const CtaBanner = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-600 to-primary-700 rounded-3xl p-10 md:p-14 text-center">
          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/5 rounded-full" />

          <div className="relative max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-5 leading-tight">
              Ready to begin your study abroad journey?
            </h2>
            <p className="text-primary-100 text-lg mb-8 leading-relaxed">
              Book a free 30-minute consultation with our expert counsellors
              and get a personalised roadmap for your dream university.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/counselling"
                className="inline-flex items-center justify-center gap-2 bg-white text-primary-700 px-7 py-3.5 rounded-full font-bold hover:bg-primary-50 transition-all shadow-lg"
              >
                Book Free Counselling
                <FiArrowRight />
              </Link>
              <Link
                to="/enquiry"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white px-7 py-3.5 rounded-full font-bold hover:bg-white/10 transition-all"
              >
                Submit Enquiry
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;