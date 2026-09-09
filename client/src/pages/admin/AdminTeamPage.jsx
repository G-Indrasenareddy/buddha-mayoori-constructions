import React, { useEffect, useState } from 'react';
import { apiClient } from '../../services/api';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { ConfirmModal } from '../../components/admin/ConfirmModal';
import { StatusBadge } from '../../components/admin/StatusBadge';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { Plus, Edit, Trash2 } from 'lucide-react';

export const AdminTeamPage = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    location: '',
    status: 'CONFIRMED_FROM_PROVIDED_MATERIAL',
    confirmationNote: '',
    isPendingName: false,
    displayOrder: 0,
  });
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  // Delete Confirm State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [targetDeleteId, setTargetDeleteId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchTeam = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/admin/team');
      if (response.data && response.data.success) {
        setTeam(response.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.error?.message || err.message || 'Failed to fetch team members');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const resetForm = () => {
    setFormData({
      name: '',
      role: '',
      location: '',
      status: 'CONFIRMED_FROM_PROVIDED_MATERIAL',
      confirmationNote: '',
      isPendingName: false,
      displayOrder: 0,
    });
    setFormError('');
    setIsEditing(false);
    setCurrentId(null);
  };

  const handleOpenCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (member) => {
    setIsEditing(true);
    setCurrentId(member._id);
    setFormData({
      name: member.name || '',
      role: member.role || '',
      location: member.location || '',
      status: member.status || 'CONFIRMED_FROM_PROVIDED_MATERIAL',
      confirmationNote: member.confirmationNote || '',
      isPendingName: member.isPendingName || false,
      displayOrder: member.displayOrder || 0,
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.role.trim()) {
      setFormError('Please fill out Name and Role');
      return;
    }

    setFormLoading(true);
    setFormError('');

    try {
      if (isEditing) {
        await apiClient.put(`/admin/team/${currentId}`, formData);
      } else {
        await apiClient.post('/admin/team', formData);
      }
      setIsModalOpen(false);
      resetForm();
      fetchTeam();
    } catch (err) {
      setFormError(err.response?.data?.error?.message || err.message || 'Failed to save team member');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!targetDeleteId) return;
    setDeleteLoading(true);
    try {
      await apiClient.delete(`/admin/team/${targetDeleteId}`);
      setDeleteModalOpen(false);
      setTargetDeleteId(null);
      fetchTeam();
    } catch (err) {
      alert(err.response?.data?.error?.message || 'Failed to delete team member');
    } finally {
      setDeleteLoading(false);
    }
  };

  const statusOptions = [
    { value: 'CONFIRMED_FROM_PROVIDED_MATERIAL', label: 'Confirmed Claim' },
    { value: 'REQUIRES_BUSINESS_CONFIRMATION', label: 'Requires Business Confirmation' },
  ];

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Team Roster Management</h2>
          <p className="text-xs text-slate-500">Manage all approved team members and leadership roster entries</p>
        </div>
        <Button variant="primary" size="sm" onClick={handleOpenCreateModal} className="flex items-center gap-1.5 self-start">
          <Plus className="w-4 h-4" /> Add Team Member
        </Button>
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
                  <th className="p-3">Name</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Location / Region</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {team.map((member) => (
                  <tr key={member._id} className="hover:bg-slate-50/80">
                    <td className="p-3 font-semibold text-slate-900">{member.name}</td>
                    <td className="p-3 text-slate-600">{member.role}</td>
                    <td className="p-3">{member.location || 'Kerala'}</td>
                    <td className="p-3">
                      <StatusBadge status={member.status} />
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleOpenEditModal(member)}>
                        <Edit className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => {
                          setTargetDeleteId(member._id);
                          setDeleteModalOpen(true);
                        }}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 shadow-xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4">{isEditing ? 'Edit Team Member' : 'Add Team Member'}</h3>

            {formError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded font-medium">
                ⚠️ {formError}
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-3">
              <Input
                id="name"
                name="name"
                label="Full Name"
                placeholder="e.g. Sarath Jayakumar"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />

              <Input
                id="role"
                name="role"
                label="Role / Title"
                placeholder="e.g. Project Manager"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                required
              />

              <Input
                id="location"
                name="location"
                label="Location / Region (Optional)"
                placeholder="e.g. Koodal, Pathanamthitta, Kerala"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />

              <Select
                id="status"
                name="status"
                label="Verification Status"
                options={statusOptions}
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              />

              <Input
                id="confirmationNote"
                name="confirmationNote"
                label="Confirmation Note (Optional)"
                placeholder="e.g. Name to be confirmed"
                value={formData.confirmationNote}
                onChange={(e) => setFormData({ ...formData, confirmationNote: e.target.value })}
              />

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                <Button type="button" variant="secondary" size="sm" onClick={() => setIsModalOpen(false)} disabled={formLoading}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm" disabled={formLoading}>
                  {formLoading ? 'Saving...' : isEditing ? 'Update Member' : 'Add Member'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Delete Team Member"
        message="Are you sure you want to delete this team roster entry?"
        onConfirm={handleDeleteConfirm}
        onCancel={() => {
          setDeleteModalOpen(false);
          setTargetDeleteId(null);
        }}
        confirmText="Delete Member"
        isLoading={deleteLoading}
      />
    </div>
  );
};
