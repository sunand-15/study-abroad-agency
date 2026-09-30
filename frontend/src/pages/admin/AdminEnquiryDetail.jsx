import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiArrowLeft, FiMail, FiPhone } from 'react-icons/fi';
import toast from 'react-hot-toast';
import api from '../../services/api';

const STATUSES = [
  'NEW', 'CONTACTED', 'COUNSELLING', 'SHORTLISTED', 'DOCUMENTS_PENDING',
  'APPLICATION_READY', 'APPLICATION_SUBMITTED', 'OFFER_RECEIVED',
  'OFFER_ACCEPTED', 'FEES_PAID', 'VISA_PROCESSING', 'VISA_DECISION',
  'PRE_DEPARTURE', 'COMPLETED', 'REJECTED', 'WITHDRAWN', 'ON_HOLD',
];

const AdminEnquiryDetail = () => {
  const { id } = useParams();
  const [enquiry, setEnquiry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newStatus, setNewStatus] = useState('');
  const [note, setNote] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get(`/enquiries/${id}`);
        setEnquiry(res.data.data.enquiry);
        setNewStatus(res.data.data.enquiry.status);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, [id]);

  const updateStatus = async () => {
    if (!newStatus) return;
    setIsUpdating(true);
    try {
      await api.patch(`/enquiries/${id}/status`, { status: newStatus, note });
      toast.success('Status updated');
      setNote('');
      const res = await api.get(`/enquiries/${id}`);
      setEnquiry(res.data.data.enquiry);
    } catch (err) {
      toast.error(err.message || 'Failed to update');
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-navy-500">Loading...</div>;
  }

  if (!enquiry) {
    return <div className="p-8 text-center text-navy-500">Enquiry not found.</div>;
  }

  return (
    <div>
      <Link
        to="/admin/enquiries"
        className="inline-flex items-center gap-2 text-navy-600 hover:text-primary-600 mb-6 text-sm font-medium"
      >
        <FiArrowLeft /> Back to Enquiries
      </Link>

      <div className="mb-8">
        <p className="text-xs font-mono text-primary-600 mb-1">
          {enquiry.enquiryId}
        </p>
        <h1 className="text-3xl font-extrabold text-navy-900">
          {enquiry.fullName}
        </h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-navy-100 p-6">
            <h2 className="font-bold text-navy-900 mb-4">Contact Info</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-navy-700">
                <FiMail className="text-primary-600" />
                <a href={`mailto:${enquiry.email}`} className="hover:underline">
                  {enquiry.email}
                </a>
              </div>
              <div className="flex items-center gap-3 text-navy-700">
                <FiPhone className="text-primary-600" />
                <a href={`tel:${enquiry.phone}`} className="hover:underline">
                  {enquiry.phone}
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-navy-100 p-6">
            <h2 className="font-bold text-navy-900 mb-4">Enquiry Details</h2>
            <dl className="space-y-3 text-sm">
              {[
                ['Preferred Country', enquiry.preferredCountry?.name],
                ['Preferred Course', enquiry.preferredCourse],
                ['Intake', enquiry.intake],
                ['Highest Education', enquiry.highestEducation],
                ['Percentage / CGPA', enquiry.percentage],
                ['English Test Status', enquiry.englishTestStatus],
                ['Budget', enquiry.budget],
              ]
                .filter(([_, v]) => v)
                .map(([label, value]) => (
                  <div key={label} className="flex gap-3">
                    <dt className="text-navy-500 w-40 flex-shrink-0">{label}:</dt>
                    <dd className="text-navy-900">{value}</dd>
                  </div>
                ))}
            </dl>
            {enquiry.message && (
              <div className="mt-4 pt-4 border-t border-navy-100">
                <p className="text-navy-500 text-sm mb-1">Message:</p>
                <p className="text-navy-800">{enquiry.message}</p>
              </div>
            )}
          </div>
        </div>

        {/* Right: status update */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white rounded-2xl border border-navy-100 p-6">
            <h2 className="font-bold text-navy-900 mb-4">Update Status</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-navy-800 mb-2">
                  Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="input-field"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-navy-800 mb-2">
                  Note (optional)
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  className="input-field resize-none"
                  placeholder="Add a note about this status change..."
                />
              </div>

              <button
                onClick={updateStatus}
                disabled={isUpdating}
                className="btn-primary w-full justify-center disabled:opacity-60"
              >
                {isUpdating ? 'Updating...' : 'Update Status'}
              </button>
            </div>

            {enquiry.statusHistory?.length > 0 && (
              <div className="mt-6 pt-6 border-t border-navy-100">
                <h3 className="font-semibold text-navy-900 text-sm mb-3">
                  History
                </h3>
                <div className="space-y-2 text-xs">
                  {enquiry.statusHistory.map((h, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-1.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-navy-900">{h.status}</p>
                        <p className="text-navy-500">
                          {new Date(h.changedAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEnquiryDetail;