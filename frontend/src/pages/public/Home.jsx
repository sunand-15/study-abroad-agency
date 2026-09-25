import Hero from '../../components/home/Hero';
import CountriesPreview from '../../components/home/CountriesPreview';
import StatsBar from '../../components/home/StatsBar';
import WhyChooseUs from '../../components/home/WhyChooseUs';
import PopularCourses from '../../components/home/PopularCourses';
import AdmissionProcess from '../../components/home/AdmissionProcess';
import Testimonials from '../../components/home/Testimonials';
import FAQ from '../../components/home/FAQ';
import CtaBanner from '../../components/home/CtaBanner';

const Home = () => {
  return (
    <>
      <Hero />
      <CountriesPreview />
      <StatsBar />
      <WhyChooseUs />
      <PopularCourses />
      <AdmissionProcess />
      <Testimonials />
      <FAQ />
      <CtaBanner />
    </>
  );
};

export default Home;