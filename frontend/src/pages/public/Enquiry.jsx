import SectionHeading from '../../components/common/SectionHeading';
import EnquiryForm from '../../components/enquiry/EnquiryForm';

const Enquiry = () => {
  return (
    <section className="py-16 bg-navy-50/30 min-h-[80vh]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Free Enquiry"
          title="Start your study abroad journey"
          subtitle="Fill out this form and our counsellors will get back to you within 24 hours with personalised guidance."
        />
        <EnquiryForm />
      </div>
    </section>
  );
};

export default Enquiry;