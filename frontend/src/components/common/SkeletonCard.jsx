const SkeletonCard = ({ count = 6 }) => {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl border border-navy-100 p-6 animate-pulse"
        >
          <div className="w-16 h-16 bg-navy-100 rounded-full mb-4" />
          <div className="h-4 bg-navy-100 rounded w-3/4 mb-3" />
          <div className="h-3 bg-navy-100 rounded w-full mb-2" />
          <div className="h-3 bg-navy-100 rounded w-5/6" />
        </div>
      ))}
    </>
  );
};

export default SkeletonCard;