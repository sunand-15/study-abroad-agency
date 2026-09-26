import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

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

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/countries" element={<Countries />} />
        <Route path="/countries/:slug" element={<CountryDetail />} />
        <Route path="/universities" element={<Universities />} />
        <Route path="/universities/:slug" element={<UniversityDetail />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:slug" element={<CourseDetail />} />
        <Route path="/scholarships" element={<Scholarships />} />
        <Route path="/admission-process" element={<AdmissionProcess />} />
        <Route path="/visa-guidance" element={<VisaGuidance />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/enquiry" element={<Enquiry />} />
        <Route path="/counselling" element={<Counselling />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;