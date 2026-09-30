import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiInbox,
  FiFileText,
  FiUsers,
  FiCheckCircle,
  FiClock,
  FiTrendingUp,
} from 'react-icons/fi';
import api from '../../services/api';

const StatCard = ({ icon: Icon, label, value, color, loading }) => (
  <div className="bg-white rounded-2xl border border-navy-100 p-6">
    <div className="flex items-start justify-between mb-4">
      <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center`}>
        <Icon size={22} className="text-white" />
      </div>
    </div>
    <p className="text-sm text-navy-500 mb-1">{label}</p>
    {loading ? (
      <div className="h-8 w-20 bg-navy-100 rounded animate-pulse" />
    ) : (
      <p className="text-3xl font-extrabold text-navy-900">{value}</p>
    )}
  </div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalEnquiries: 0,
    newEnquiries: 0,
    contacted: 0,
    completed: 0,
  });
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/enquiries?limit=5');
        const { enquiries, pagination } = res.data.data;

        setRecentEnquiries(enquiries || []);
        setStats({
          totalEnquiries: pagination?.total || 0,
          newEnquiries: enquiries.filter((e) => e.status === 'NEW').length,
          contacted: enquiries.filter((e) => e.status === 'CONTACTED').length,
          completed: enquiries.filter((e) => e.status === 'COMPLETED').length,
        });
      } catch (err) {
        console.error('Failed to load dashboard stats:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-navy-900 mb-1">
          Dashboard
        </h1>
        <p className="text-navy-500">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard
          icon={FiInbox}
          label="Total Enquiries"
          value={stats.totalEnquiries}
          color="bg-blue-500"
          loading={isLoading}
        />
        <StatCard
          icon={FiTrendingUp}
          label="New Enquiries"
          value={stats.newEnquiries}
          color="bg-green-500"
          loading={isLoading}
        />
        <StatCard
          icon={FiClock}
          label="In Progress"
          value={stats.contacted}
          color="bg-yellow-500"
          loading={isLoading}
        />
        <StatCard
          icon={FiCheckCircle}
          label="Completed"
          value={stats.completed}
          color="bg-purple-500"
          loading={isLoading}
        />
      </div>

      {/* Recent enquiries */}
      <div className="bg-white rounded-2xl border border-navy-100 overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-navy-100">
          <h2 className="text-lg font-bold text-navy-900">Recent Enquiries</h2>
          <Link
            to="/admin/enquiries"
            className="text-sm font-medium text-primary-600 hover:underline"
          >
            View all →
          </Link>
        </div>

        {isLoading ? (
          <div className="p-8 text-center text-navy-500">Loading...</div>
        ) : recentEnquiries.length === 0 ? (
          <div className="p-8 text-center text-navy-500">
            No enquiries yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-navy-50 text-navy-600">
                <tr>
                  <th className="text-left font-semibold px-5 py-3">ID</th>
                  <th className="text-left font-semibold px-5 py-3">Name</th>
                  <th className="text-left font-semibold px-5 py-3">Email</th>
                  <th className="text-left font-semibold px-5 py-3">Status</th>
                  <th className="text-left font-semibold px-5 py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentEnquiries.map((enq) => (
                  <tr
                    key={enq._id}
                    className="border-t border-navy-100 hover:bg-navy-50/50"
                  >
                    <td className="px-5 py-3 font-mono text-xs text-primary-600">
                      {enq.enquiryId}
                    </td>
                    <td className="px-5 py-3 font-medium text-navy-900">
                      {enq.fullName}
                    </td>
                    <td className="px-5 py-3 text-navy-600">{enq.email}</td>
                    <td className="px-5 py-3">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                        {enq.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-navy-500">
                      {new Date(enq.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;