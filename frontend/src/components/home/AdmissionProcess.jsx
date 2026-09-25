import SectionHeading from '../common/SectionHeading';

const steps = [
  {
    num: '01',
    title: 'Free Counselling',
    desc: 'Share your goals, academics, and budget. We assess your profile and suggest best-fit options.',
  },
  {
    num: '02',
    title: 'University Selection',
    desc: 'Shortlist universities and courses that match your profile, career goals, and finances.',
  },
  {
    num: '03',
    title: 'Application & SOP',
    desc: 'We help craft your SOP, LORs, and CV, then submit applications before deadlines.',
  },
  {
    num: '04',
    title: 'Offer & Acceptance',
    desc: 'Receive offers, compare them with our guidance, and accept the best one for you.',
  },
  {
    num: '05',
    title: 'Visa Filing',
    desc: 'Complete documentation, financial proof, and interview prep for high approval odds.',
  },
  {
    num: '06',
    title: 'Fly & Settle',
    desc: 'Pre-departure briefing, accommodation help, forex, and on-arrival support.',
  },
];

const AdmissionProcess = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="How It Works"
          title="Your admission journey in 6 steps"
          subtitle="A clear, guided path from first enquiry to your first day on campus."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="relative bg-white rounded-2xl border border-navy-100 p-7 hover:border-primary-300 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-5xl font-extrabold text-primary-100 group-hover:text-primary-200 transition-colors">
                  {step.num}
                </span>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 -right-3 w-6 h-0.5 bg-primary-200" />
                )}
              </div>
              <h3 className="text-lg font-bold text-navy-900 mb-2">
                {step.title}
              </h3>
              <p className="text-navy-600 text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdmissionProcess;