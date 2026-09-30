import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import api from '../../services/api';

const STATUSES = [
  'NEW',
  'CONTACTED',
  'COUNSELLING',
  'SHORTLISTED',
  'DOCUMENTS_PENDING',
  'APPLICATION_READY',
  'APPLICATION_SUBMITTED',
  'OFFER_RECEIVED',
  'OFFER_ACCEPTED',
  'FEES_PAID',
  'VISA_PROCESSING',
  'VISA_DECISION',
  'PRE_DEPARTURE',
  'COMPLETED',
  'REJECTED',
  'WITHDRAWN',
  'ON_HOLD',
];

const statusColor = (status) => {
  const map = {
    NEW: 'bg-blue-100 text-blue-700',
    CONTACTED: 'bg-yellow-100 text-yellow-700',
    COUNSELLING: 'bg-purple-100 text-purple-700',
    COMPLETED: 'bg-green-100 text-green-700',
    REJECTED: 'bg-red-100 text-red-700',
    WITHDRAWN: 'bg-gray-100 text-gray-700',
  };
  return map[status] || 'bg-navy-100 text-navy-700';
};

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        const params = {};
        if (search) params.search = search;
        if (statusFilter) params.status = statusFilter;
        const res = await api.get('/enquiries', { params });
        setEnquiries(res.data.data.enquiries || []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    const timer = setTimeout(fetch, 400);
    return () => clearTimeout(timer);
  }, [search, statusFilter]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-navy-900 mb-1">
          Enquiries
        </h1>
        <p className="text-navy-500">
          Manage and respond to student enquiries.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-navy-100 p-5 mb-6 grid md:grid-cols-2 gap-4">
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400" />
          <input
            type="text"
            placeholder="Search by name, email, or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-11"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="input-field"
        >
          <option value="">All Statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-navy-100 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-navy-500">Loading...</div>
        ) : enquiries.length === 0 ? (
          <div className="p-8 text-center text-navy-500">
            No enquiries found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-navy-50 text-navy-600">
                <tr>
                  <th className="text-left font-semibold px-5 py-3">ID</th>
                  <th className="text-left font-semibold px-5 py-3">Name</th>
                  <th className="text-left font-semibold px-5 py-3">Email</th>
                  <th className="text-left font-semibold px-5 py-3">Phone</th>
                  <th className="text-left font-semibold px-5 py-3">Country</th>
                  <th className="text-left font-semibold px-5 py-3">Status</th>
                  <th className="text-left font-semibold px-5 py-3">Date</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((enq) => (
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
                    <td className="px-5 py-3 text-navy-600">{enq.phone}</td>
                    <td className="px-5 py-3 text-navy-600">
                      {enq.preferredCountry?.name || '—'}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColor(
                          enq.status
                        )}`}
                      >
                        {enq.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-navy-500">
                      {new Date(enq.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <Link
                        to={`/admin/enquiries/${enq._id}`}
                        className="text-primary-600 hover:underline font-medium"
                      >
                        View
                      </Link>
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

export default AdminEnquiries;