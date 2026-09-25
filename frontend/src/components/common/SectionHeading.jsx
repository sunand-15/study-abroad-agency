const SectionHeading = ({ eyebrow, title, subtitle, centered = true }) => {
  return (
    <div className={`${centered ? 'text-center max-w-3xl mx-auto' : ''} mb-12`}>
      {eyebrow && (
        <p className="text-primary-600 font-semibold text-sm uppercase tracking-wider mb-2">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-extrabold text-navy-900 mb-4 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-navy-600 text-lg leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
};

export default SectionHeading;