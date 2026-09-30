import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FiLock, FiMail, FiArrowLeft } from 'react-icons/fi';
import { HiOutlineAcademicCap } from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';

const AdminLogin = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin/dashboard';

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  // If already logged in, redirect
  if (isAuthenticated) {
    navigate(from, { replace: true });
  }

  const onSubmit = async (credentials) => {
    setIsSubmitting(true);
    try {
      await login(credentials);
      toast.success('Logged in successfully');
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message || 'Login failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-50 via-white to-primary-50 p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <HiOutlineAcademicCap className="w-10 h-10 text-primary-600" />
            <span className="text-2xl font-extrabold text-navy-900">
              Study Abroad<span className="text-primary-600"> Compass</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-navy-900">Admin Login</h1>
          <p className="text-navy-500 text-sm mt-1">
            Sign in to access the admin dashboard
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-navy-100 p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-navy-800 mb-2">
                Email
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400" />
                <input
                  type="email"
                  {...register('email', { required: 'Email is required' })}
                  className="input-field pl-11"
                  placeholder="admin@studyabroad.com"
                  autoComplete="email"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy-800 mb-2">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400" />
                <input
                  type="password"
                  {...register('password', { required: 'Password is required' })}
                  className="input-field pl-11"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full justify-center disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-navy-100 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-navy-600 hover:text-primary-600"
            >
              <FiArrowLeft /> Back to website
            </Link>
          </div>
        </div>

        {/* Demo credentials hint */}
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
          <p className="text-xs text-amber-800 font-semibold mb-1">
            Demo credentials
          </p>
          <p className="text-xs text-amber-700">
            admin@studyabroad.com / Admin@123456
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;