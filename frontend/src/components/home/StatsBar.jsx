const stats = [
  { value: '10,000+', label: 'Students Guided' },
  { value: '500+', label: 'Partner Universities' },
  { value: '30+', label: 'Countries' },
  { value: '12+', label: 'Years of Experience' },
];

const StatsBar = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-primary-700 to-primary-600">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-2">
                {stat.value}
              </p>
              <p className="text-primary-100 text-sm md:text-base font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;