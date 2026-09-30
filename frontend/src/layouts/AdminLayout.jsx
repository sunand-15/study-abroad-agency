import { useState } from 'react';
import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom';
import {
  FiHome,
  FiInbox,
  FiUsers,
  FiFileText,
  FiGlobe,
  FiBriefcase,
  FiBookOpen,
  FiAward,
  FiCalendar,
  FiEdit3,
  FiMessageSquare,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
} from 'react-icons/fi';
import { HiOutlineAcademicCap } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import ScrollToTop from '../components/common/ScrollToTop';

const navItems = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: FiHome },
  { name: 'Enquiries', path: '/admin/enquiries', icon: FiInbox },
  { name: 'Students', path: '/admin/students', icon: FiUsers },
  { name: 'Applications', path: '/admin/applications', icon: FiFileText },
  { name: 'Countries', path: '/admin/countries', icon: FiGlobe },
  { name: 'Universities', path: '/admin/universities', icon: FiBriefcase },
  { name: 'Courses', path: '/admin/courses', icon: FiBookOpen },
  { name: 'Scholarships', path: '/admin/scholarships', icon: FiAward },
  { name: 'Counselling', path: '/admin/counselling', icon: FiCalendar },
  { name: 'Blogs', path: '/admin/blogs', icon: FiEdit3 },
  { name: 'Testimonials', path: '/admin/testimonials', icon: FiMessageSquare },
  { name: 'Settings', path: '/admin/settings', icon: FiSettings },
];

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out');
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-navy-50/30">
      <ScrollToTop />

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-navy-900 text-navy-100 transform transition-transform duration-200 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-5 border-b border-navy-800">
          <Link to="/admin/dashboard" className="flex items-center gap-2">
            <HiOutlineAcademicCap className="w-7 h-7 text-primary-400" />
            <span className="font-extrabold text-white">
              Compass<span className="text-primary-400"> Admin</span>
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-navy-300 hover:text-white"
          >
            <FiX size={22} />
          </button>
        </div>

        {/* Nav */}
        <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100vh-9rem)]">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-600 text-white'
                      : 'text-navy-300 hover:bg-navy-800 hover:text-white'
                  }`
                }
              >
                <Icon size={18} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom user info */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-navy-800 bg-navy-900">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-9 h-9 rounded-full bg-primary-600 flex items-center justify-center font-bold text-white text-sm">
              {admin?.name?.charAt(0) || 'A'}
            </div>
            <div className="flex-grow min-w-0">
              <p className="text-sm font-semibold text-white truncate">
                {admin?.name}
              </p>
              <p className="text-xs text-navy-400 truncate">{admin?.role}</p>
            </div>
            <button
              onClick={handleLogout}
              title="Logout"
              className="p-2 rounded-lg text-navy-400 hover:text-red-400 hover:bg-navy-800 transition-colors"
            >
              <FiLogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* Main */}
      <div className="lg:pl-64">
        {/* Topbar */}
        <header className="bg-white border-b border-navy-100 sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 sm:px-6 h-16">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-navy-50"
            >
              <FiMenu size={22} />
            </button>
            <div className="text-sm text-navy-500 hidden md:block">
              Admin Panel
            </div>
            <Link
              to="/"
              className="text-sm font-medium text-primary-600 hover:underline"
            >
              View Website →
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;