import { Link } from 'react-router-dom';
import {
  FiFacebook,
  FiInstagram,
  FiLinkedin,
  FiYoutube,
  FiMail,
  FiPhone,
  FiMapPin,
} from 'react-icons/fi';
import { HiOutlineAcademicCap } from 'react-icons/hi';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-900 text-navy-100 pt-16 pb-8 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <HiOutlineAcademicCap className="w-8 h-8 text-primary-400" />
              <span className="text-xl font-extrabold text-white">
                Study Abroad<span className="text-primary-400"> Compass</span>
              </span>
            </div>
            <p className="text-navy-300 text-sm leading-relaxed mb-6">
              Your trusted partner for overseas education. Guiding students
              towards world-class universities across 30+ countries.
            </p>
            <div className="flex gap-3">
              {[
                { icon: FiFacebook, label: 'Facebook' },
                { icon: FiInstagram, label: 'Instagram' },
                { icon: FiLinkedin, label: 'LinkedIn' },
                { icon: FiYoutube, label: 'YouTube' },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-10 h-10 rounded-full bg-navy-800 hover:bg-primary-600 flex items-center justify-center transition-colors"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Countries', path: '/countries' },
                { name: 'Universities', path: '/universities' },
                { name: 'Courses', path: '/courses' },
                { name: 'Scholarships', path: '/scholarships' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-navy-300 hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Services</h4>
            <ul className="space-y-3 text-sm">
              {[
                { name: 'Admission Process', path: '/admission-process' },
                { name: 'Visa Guidance', path: '/visa-guidance' },
                { name: 'Book Counselling', path: '/counselling' },
                { name: 'Free Enquiry', path: '/enquiry' },
                { name: 'Blog', path: '/blog' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-navy-300 hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Get in Touch</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <FiMapPin className="text-primary-400 mt-1 flex-shrink-0" size={18} />
                <span className="text-navy-300">
                  123 Education Street,<br />
                  New Delhi, India 110001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="text-primary-400 flex-shrink-0" size={18} />
                <a
                  href="tel:+919999999999"
                  className="text-navy-300 hover:text-primary-400 transition-colors"
                >
                  +91 99999 99999
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="text-primary-400 flex-shrink-0" size={18} />
                <a
                  href="mailto:hello@studyabroadcompass.com"
                  className="text-navy-300 hover:text-primary-400 transition-colors"
                >
                  hello@studyabroadcompass.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-navy-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-navy-400">
          <p>© {year} Study Abroad Compass. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-primary-400 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-primary-400 transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;