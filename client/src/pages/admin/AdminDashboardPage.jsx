import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiClient } from '../../services/api';
import { StatusBadge } from '../../components/admin/StatusBadge';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { LayoutDashboard, MessageSquare, FolderKanban, Wrench, Users, ArrowRight } from 'lucide-react';

export const AdminDashboardPage = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await apiClient.get('/admin/dashboard/summary');
        if (response.data && response.data.success) {
          setSummary(response.data.data);
        }
      } catch (err) {
        setError(err.response?.data?.error?.message || err.message || 'Failed to load summary');
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) {
    return (
      <div className="py-12 text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-3 text-xs text-slate-500 font-medium">Loading Dashboard Metrics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded text-red-700 text-xs font-medium">
        ⚠️ {error}
      </div>
    );
  }

  const { metrics, enquiryStatusCounts, recentEnquiries } = summary || {};

  return (
    <div className="space-y-6">
      {/* Overview Title */}
      <div>
        <h2 className="text-xl font-bold text-slate-900">Dashboard Overview</h2>
        <p className="text-xs text-slate-500">Real-time business website management summary</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium block">Total Enquiries</span>
            <span className="text-2xl font-bold text-slate-900">{metrics?.totalEnquiries || 0}</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
            <FolderKanban className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium block">Total Projects</span>
            <span className="text-2xl font-bold text-slate-900">{metrics?.totalProjects || 0}</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Wrench className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium block">Canonical Services</span>
            <span className="text-2xl font-bold text-slate-900">{metrics?.totalServices || 9}</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium block">Team Members</span>
            <span className="text-2xl font-bold text-slate-900">{metrics?.totalTeamMembers || 10}</span>
          </div>
        </div>
      </div>

      {/* Enquiry Status Breakdown */}
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 mb-3">Enquiry Status Breakdown</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded text-center">
            <span className="text-xs font-semibold text-blue-700 block">NEW</span>
            <span className="text-lg font-bold text-slate-900">{enquiryStatusCounts?.NEW || 0}</span>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded text-center">
            <span className="text-xs font-semibold text-amber-700 block">CONTACTED</span>
            <span className="text-lg font-bold text-slate-900">{enquiryStatusCounts?.CONTACTED || 0}</span>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded text-center">
            <span className="text-xs font-semibold text-purple-700 block">IN PROGRESS</span>
            <span className="text-lg font-bold text-slate-900">{enquiryStatusCounts?.IN_PROGRESS || 0}</span>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded text-center">
            <span className="text-xs font-semibold text-emerald-700 block">COMPLETED</span>
            <span className="text-lg font-bold text-slate-900">{enquiryStatusCounts?.COMPLETED || 0}</span>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded text-center">
            <span className="text-xs font-semibold text-slate-600 block">ARCHIVED</span>
            <span className="text-lg font-bold text-slate-900">{enquiryStatusCounts?.ARCHIVED || 0}</span>
          </div>
        </div>
      </div>

      {/* Recent Enquiries Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Recent Customer Enquiries</h3>
          <Link to="/admin/enquiries" className="text-xs font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1">
            View All Enquiries <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentEnquiries && recentEnquiries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                  <th className="p-3">Customer Name</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Service</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {recentEnquiries.map((enquiry) => (
                  <tr key={enquiry._id} className="hover:bg-slate-50/80">
                    <td className="p-3 font-semibold text-slate-900">{enquiry.fullName}</td>
                    <td className="p-3">{enquiry.phone}</td>
                    <td className="p-3">{enquiry.serviceRequested || 'General Consultation'}</td>
                    <td className="p-3">
                      <StatusBadge status={enquiry.status} />
                    </td>
                    <td className="p-3 text-slate-400">{new Date(enquiry.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-xs text-slate-500">
            No customer enquiries submitted yet.
          </div>
        )}
      </div>
    </div>
  );
};
