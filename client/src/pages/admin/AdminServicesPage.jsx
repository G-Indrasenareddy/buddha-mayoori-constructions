import React, { useEffect, useState } from 'react';
import { apiClient } from '../../services/api';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { Edit, ShieldCheck } from 'lucide-react';

export const AdminServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Edit Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    shortDesc: '',
    fullDesc: '',
    displayOrder: 0,
    isPublished: true,
  });
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/admin/services');
      if (response.data && response.data.success) {
        setServices(response.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.error?.message || err.message || 'Failed to fetch services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleOpenEditModal = (service) => {
    setEditingService(service);
    setFormData({
      shortDesc: service.shortDesc || '',
      fullDesc: service.fullDesc || '',
      displayOrder: service.displayOrder || 0,
      isPublished: service.isPublished !== undefined ? service.isPublished : true,
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.shortDesc.trim()) {
      setFormError('Short Description is required');
      return;
    }

    setFormLoading(true);
    setFormError('');

    try {
      await apiClient.put(`/admin/services/${editingService._id}`, formData);
      setIsModalOpen(false);
      fetchServices();
    } catch (err) {
      setFormError(err.response?.data?.error?.message || err.message || 'Failed to update service');
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div>
        <h2 className="text-xl font-bold text-slate-900">Canonical Services Management</h2>
        <p className="text-xs text-slate-500">
          Manage descriptions and ordering for the 9 canonical core services of Buddha Mayoori Constructions.
        </p>
      </div>

      <div className="p-3 bg-amber-50 border border-amber-200 rounded text-amber-900 text-xs font-medium flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
        <span>Canonical service names are protected business data and cannot be deleted or renamed.</span>
      </div>

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
                  <th className="p-3">Service Name</th>
                  <th className="p-3">Icon</th>
                  <th className="p-3">Short Description</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {services.map((service) => (
                  <tr key={service._id} className="hover:bg-slate-50/80">
                    <td className="p-3 font-semibold text-slate-900">{service.title}</td>
                    <td className="p-3 font-mono text-slate-500">{service.iconName}</td>
                    <td className="p-3 text-slate-600 max-w-xs truncate">{service.shortDesc}</td>
                    <td className="p-3">
                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[11px] font-semibold">
                        Confirmed Service
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <Button variant="outline" size="sm" onClick={() => handleOpenEditModal(service)}>
                        <Edit className="w-3.5 h-3.5 mr-1" /> Edit Service
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Service Modal */}
      {isModalOpen && editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 shadow-xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Edit Service: {editingService.title}</h3>
            <p className="text-xs text-slate-500 mb-4">Update the service description and display preferences.</p>

            {formError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded font-medium">
                ⚠️ {formError}
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <Textarea
                id="shortDesc"
                name="shortDesc"
                label="Short Description"
                placeholder="Enter concise service summary..."
                value={formData.shortDesc}
                onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                rows={3}
                required
              />

              <Input
                id="displayOrder"
                name="displayOrder"
                type="number"
                label="Display Order Position"
                value={formData.displayOrder}
                onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value, 10) || 0 })}
              />

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                <Button type="button" variant="secondary" size="sm" onClick={() => setIsModalOpen(false)} disabled={formLoading}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm" disabled={formLoading}>
                  {formLoading ? 'Saving...' : 'Update Service'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
