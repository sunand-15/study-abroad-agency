import { Link } from 'react-router-dom';
import { FiArrowRight, FiPlayCircle } from 'react-icons/fi';
import { HiOutlineAcademicCap } from 'react-icons/hi';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-50/50">
      {/* Decorative blobs */}
      <div className="absolute top-20 -left-20 w-72 h-72 bg-primary-200 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-primary-300 rounded-full blur-3xl opacity-20" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-5rem)] py-16 lg:py-20">
          {/* Left content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white border border-primary-200 rounded-full px-4 py-2 mb-6 shadow-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-navy-700">
                Admissions open for 2026 intake
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy-900 leading-tight mb-6">
              Your Gateway to{' '}
              <span className="text-primary-600 relative inline-block">
                Global Education
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 12"
                  fill="none"
                >
                  <path
                    d="M2 9C50 3 150 3 198 9"
                    stroke="#60a5fa"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-navy-600 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              Expert guidance for students dreaming of studying abroad.
              From university selection to visa approval — we make it simple,
              transparent, and stress-free.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <Link to="/enquiry" className="btn-primary text-base">
                Free Consultation
                <FiArrowRight />
              </Link>
              <Link to="/countries" className="btn-outline text-base">
                <FiPlayCircle />
                Explore Destinations
              </Link>
            </div>

            {/* Trust strip */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-6 border-t border-navy-100">
              {[
                { num: '10k+', label: 'Students Guided' },
                { num: '30+', label: 'Countries' },
                { num: '500+', label: 'Universities' },
                { num: '98%', label: 'Visa Success' },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <p className="text-2xl font-extrabold text-navy-900">
                    {stat.num}
                  </p>
                  <p className="text-xs text-navy-500 uppercase tracking-wider font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right visual */}
          <div className="hidden lg:flex items-center justify-center relative">
            <div className="relative w-full max-w-lg">
              {/* Main card */}
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-navy-100 relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary-600 flex items-center justify-center">
                    <HiOutlineAcademicCap className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-navy-500">Next Session Starts</p>
                    <p className="font-bold text-navy-900">Free Counselling</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { label: 'USA', unis: '150+ Universities' },
                    { label: 'UK', unis: '120+ Universities' },
                    { label: 'Canada', unis: '90+ Universities' },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between p-4 bg-navy-50 rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-bold text-primary-600">
                          {item.label[0]}
                        </div>
                        <div>
                          <p className="font-semibold text-navy-900">
                            {item.label}
                          </p>
                          <p className="text-xs text-navy-500">{item.unis}</p>
                        </div>
                      </div>
                      <FiArrowRight className="text-primary-600" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badge 1 */}
              <div className="absolute -top-6 -left-6 bg-white rounded-2xl shadow-lg p-4 border border-navy-100 z-20 hidden xl:block">
                <p className="text-2xl font-extrabold text-primary-600">98%</p>
                <p className="text-xs text-navy-600">Visa Success</p>
              </div>

              {/* Floating badge 2 */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-lg p-4 border border-navy-100 z-20 hidden xl:block">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {['#2563eb', '#7c3aed', '#db2777'].map((c) => (
                      <div
                        key={c}
                        className="w-8 h-8 rounded-full border-2 border-white"
                        style={{ background: c }}
                      />
                    ))}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-navy-900">2,300+</p>
                    <p className="text-[10px] text-navy-500">Active Students</p>
                  </div>
                </div>
              </div>

              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-3xl transform rotate-6 opacity-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;