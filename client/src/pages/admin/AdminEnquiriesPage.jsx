import React, { useEffect, useState } from 'react';
import { apiClient } from '../../services/api';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/admin/StatusBadge';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { Eye, Phone, Mail, MapPin, Calendar, CheckCircle } from 'lucide-react';

export const AdminEnquiriesPage = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');

  // Detail Modal State
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [statusUpdating, setStatusUpdating] = useState(false);

  const fetchEnquiries = async (statusFilter = 'ALL') => {
    try {
      setLoading(true);
      const url = statusFilter === 'ALL' ? '/admin/enquiries' : `/admin/enquiries?status=${statusFilter}`;
      const response = await apiClient.get(url);
      if (response.data && response.data.success) {
        setEnquiries(response.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.error?.message || err.message || 'Failed to fetch enquiries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries(activeTab);
  }, [activeTab]);

  const handleStatusChange = async (newStatus) => {
    if (!selectedEnquiry) return;
    setStatusUpdating(true);
    try {
      const response = await apiClient.patch(`/admin/enquiries/${selectedEnquiry._id}/status`, { status: newStatus });
      if (response.data && response.data.success) {
        setSelectedEnquiry(response.data.data);
        fetchEnquiries(activeTab);
      }
    } catch (err) {
      alert(err.response?.data?.error?.message || 'Failed to update status');
    } finally {
      setStatusUpdating(false);
    }
  };

  const tabs = ['ALL', 'NEW', 'CONTACTED', 'IN_PROGRESS', 'COMPLETED', 'ARCHIVED'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900">Enquiries & Quote Requests</h2>
        <p className="text-xs text-slate-500">View and update customer enquiries submitted through the public website</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              activeTab === tab
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Table */}
      {loading ? (
        <div className="py-12 text-center">
          <LoadingSpinner size="lg" />
        </div>
      ) : error ? (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded">
          ⚠️ {error}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                  <th className="p-3">Type</th>
                  <th className="p-3">Customer Name</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Service / Budget</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Date</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {enquiries.length > 0 ? (
                  enquiries.map((item) => (
                    <tr key={item._id} className="hover:bg-slate-50/80">
                      <td className="p-3">
                        <span className="font-semibold text-[10px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                          {item.type === 'ESTIMATE_REQUEST' ? 'Estimate Request' : 'Contact Inquiry'}
                        </span>
                      </td>
                      <td className="p-3 font-semibold text-slate-900">{item.fullName}</td>
                      <td className="p-3">{item.phone}</td>
                      <td className="p-3 text-slate-600">
                        {item.serviceRequested || 'General'} {item.estimatedBudget ? `(${item.estimatedBudget})` : ''}
                      </td>
                      <td className="p-3">
                        <StatusBadge status={item.status} />
                      </td>
                      <td className="p-3 text-slate-400">{new Date(item.createdAt).toLocaleDateString()}</td>
                      <td className="p-3 text-right">
                        <Button variant="outline" size="sm" onClick={() => setSelectedEnquiry(item)}>
                          <Eye className="w-3.5 h-3.5 mr-1" /> View Detail
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-xs text-slate-500">
                      No enquiry records found for status filter '{activeTab}'.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Enquiry Detail Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 shadow-xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">{selectedEnquiry.fullName}</h3>
                <span className="text-[11px] text-slate-500">Submitted on {new Date(selectedEnquiry.createdAt).toLocaleString()}</span>
              </div>
              <StatusBadge status={selectedEnquiry.status} />
            </div>

            <div className="space-y-3 text-xs text-slate-700 mb-6">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-400" />
                <strong>Phone:</strong> <a href={`tel:${selectedEnquiry.phone}`} className="text-amber-600 font-semibold hover:underline">{selectedEnquiry.phone}</a>
              </p>

              {selectedEnquiry.email && (
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <strong>Email:</strong> <a href={`mailto:${selectedEnquiry.email}`} className="text-amber-600 hover:underline">{selectedEnquiry.email}</a>
                </p>
              )}

              {selectedEnquiry.location && (
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <strong>Location:</strong> {selectedEnquiry.location}
                </p>
              )}

              <p className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                <strong>Service Requested:</strong> {selectedEnquiry.serviceRequested || 'General Inquiry'}
              </p>

              {selectedEnquiry.estimatedBudget && (
                <p className="p-2 bg-slate-50 border border-slate-200 rounded">
                  <strong>Estimated Budget Range:</strong> {selectedEnquiry.estimatedBudget}
                </p>
              )}

              <div className="pt-2">
                <strong className="block text-slate-900 mb-1">Customer Message / Requirements:</strong>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded text-slate-800 leading-relaxed whitespace-pre-wrap">
                  {selectedEnquiry.message}
                </div>
              </div>
            </div>

            {/* Quick Status Update Bar */}
            <div className="pt-4 border-t border-slate-200 space-y-2">
              <span className="text-xs font-semibold text-slate-700 block">Update Record Status:</span>
              <div className="flex flex-wrap gap-1.5">
                {['NEW', 'CONTACTED', 'IN_PROGRESS', 'COMPLETED', 'ARCHIVED'].map((st) => (
                  <button
                    key={st}
                    disabled={statusUpdating || selectedEnquiry.status === st}
                    onClick={() => handleStatusChange(st)}
                    className={`px-2.5 py-1 rounded text-[11px] font-semibold border transition-colors ${
                      selectedEnquiry.status === st
                        ? 'bg-slate-900 text-white border-slate-900 cursor-default'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-4 mt-4 border-t border-slate-200">
              <Button variant="secondary" size="sm" onClick={() => setSelectedEnquiry(null)}>
                Close Detail
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
