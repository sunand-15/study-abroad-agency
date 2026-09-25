import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { HiOutlineAcademicCap } from 'react-icons/hi';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Countries', path: '/countries' },
  { name: 'Universities', path: '/universities' },
  { name: 'Courses', path: '/courses' },
  { name: 'Scholarships', path: '/scholarships' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-navy-100'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <HiOutlineAcademicCap className="w-8 h-8 text-primary-600 group-hover:scale-110 transition-transform" />
            <span className="text-xl md:text-2xl font-extrabold text-navy-900">
              Study Abroad<span className="text-primary-600"> Compass</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isActive
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-navy-700 hover:text-primary-600 hover:bg-primary-50'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/counselling"
              className="text-sm font-semibold text-navy-700 hover:text-primary-600 transition-colors"
            >
              Book Counselling
            </Link>
            <Link
              to="/enquiry"
              className="bg-primary-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary-700 transition-all shadow-md hover:shadow-lg"
            >
              Free Enquiry
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-navy-900 hover:bg-navy-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-white z-40 overflow-y-auto">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl text-base font-medium transition-all ${
                      isActive
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-navy-700 hover:bg-navy-50'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              <hr className="my-4 border-navy-100" />

              <Link
                to="/counselling"
                onClick={() => setIsOpen(false)}
                className="btn-outline text-center"
              >
                Book Counselling
              </Link>
              <Link
                to="/enquiry"
                onClick={() => setIsOpen(false)}
                className="btn-primary text-center"
              >
                Free Enquiry
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;