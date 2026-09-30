import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

// Authentication / Admin
import ProtectedRoute from '../components/auth/ProtectedRoute';
import AdminLayout from '../layouts/AdminLayout';

// Public Pages
import Home from '../pages/public/Home';
import About from '../pages/public/About';
import Countries from '../pages/public/Countries';
import CountryDetail from '../pages/public/CountryDetail';
import Universities from '../pages/public/Universities';
import UniversityDetail from '../pages/public/UniversityDetail';
import Courses from '../pages/public/Courses';
import CourseDetail from '../pages/public/CourseDetail';
import Scholarships from '../pages/public/Scholarships';
import AdmissionProcess from '../pages/public/AdmissionProcess';
import VisaGuidance from '../pages/public/VisaGuidance';
import Blog from '../pages/public/Blog';
import Contact from '../pages/public/Contact';
import Enquiry from '../pages/public/Enquiry';
import Counselling from '../pages/public/Counselling';
import NotFound from '../pages/public/NotFound';

// Admin Pages
import AdminLogin from '../pages/admin/AdminLogin';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminEnquiries from '../pages/admin/AdminEnquiries';
import AdminEnquiryDetail from '../pages/admin/AdminEnquiryDetail';

const AppRoutes = () => {
  return (
    <Routes>

      {/* ===============
          PUBLIC WEBSITE
          =============== */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/countries" element={<Countries />} />
        <Route path="/countries/:slug" element={<CountryDetail />} />

        <Route path="/universities" element={<Universities />} />
        <Route
          path="/universities/:slug"
          element={<UniversityDetail />}
        />

        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:slug" element={<CourseDetail />} />

        <Route path="/scholarships" element={<Scholarships />} />

        <Route
          path="/admission-process"
          element={<AdmissionProcess />}
        />

        <Route
          path="/visa-guidance"
          element={<VisaGuidance />}
        />

        <Route path="/blog" element={<Blog />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/enquiry" element={<Enquiry />} />

        <Route path="/counselling" element={<Counselling />} />
      </Route>


      {/* ======================
          ADMIN LOGIN - PUBLIC
          ====================== */}
      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />


      {/* =========================
          ADMIN PANEL - PROTECTED
          ========================= */}
      <Route
        element={
          <ProtectedRoute
            allowedRoles={[
              'SUPER_ADMIN',
              'ADMIN',
              'COUNSELLOR',
            ]}
          >
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        {/* Dashboard */}
        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

        {/* Enquiries */}
        <Route
          path="/admin/enquiries"
          element={<AdminEnquiries />}
        />

        {/* Enquiry Details */}
        <Route
          path="/admin/enquiries/:id"
          element={<AdminEnquiryDetail />}
        />
      </Route>


      {/* ====================
          404 - KEEP LAST
          ==================== */}
      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
};

export default AppRoutes;

