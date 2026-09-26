import { FiInbox } from 'react-icons/fi';

const EmptyState = ({ title = 'Nothing here yet', description = 'No results found.', icon: Icon = FiInbox }) => {
  return (
    <div className="text-center py-20">
      <div className="w-20 h-20 rounded-full bg-navy-50 mx-auto flex items-center justify-center mb-5">
        <Icon className="text-navy-400" size={36} />
      </div>
      <h3 className="text-xl font-bold text-navy-900 mb-2">{title}</h3>
      <p className="text-navy-500 max-w-md mx-auto">{description}</p>
    </div>
  );
};

export default EmptyState;