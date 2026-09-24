import React, { useEffect, useState } from 'react';
import { apiClient, uploadTeamPhoto } from '../../services/api';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { ConfirmModal } from '../../components/admin/ConfirmModal';
import { StatusBadge } from '../../components/admin/StatusBadge';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { Plus, Edit, Trash2, Upload, User } from 'lucide-react';
import jaikumarImg from '../../assets/jaikumar-ramachandran.jpg';

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
    avatar: '',
    status: 'CONFIRMED_FROM_PROVIDED_MATERIAL',
    confirmationNote: '',
    isPendingName: false,
    displayOrder: 0,
  });
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

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
      avatar: '',
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
      avatar: member.avatar || '',
      status: member.status || 'CONFIRMED_FROM_PROVIDED_MATERIAL',
      confirmationNote: member.confirmationNote || '',
      isPendingName: member.isPendingName || false,
      displayOrder: member.displayOrder || 0,
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append('file', file);

    setUploadingPhoto(true);
    setFormError('');

    try {
      const res = await uploadTeamPhoto(uploadData);
      if (res.success && res.data?.url) {
        setFormData((prev) => ({
          ...prev,
          avatar: res.data.url,
        }));
      }
    } catch (err) {
      setFormError(err.message || 'Failed to upload team photo');
    } finally {
      setUploadingPhoto(false);
    }
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

  const getMemberAvatarSrc = (member) => {
    if (
      member.memberId === 'jayakumar-ramachandran' ||
      (member.name && member.name.toLowerCase().includes('jayakumar ramachandran'))
    ) {
      return jaikumarImg;
    }
    if (member.avatar && member.avatar !== '/assets/team-placeholder.jpg' && member.avatar.trim() !== '') {
      return member.avatar;
    }
    return null;
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
                  <th className="p-3">Photo</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Location / Region</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {team.map((member) => {
                  const avatarSrc = getMemberAvatarSrc(member);
                  return (
                    <tr key={member._id} className="hover:bg-slate-50/80">
                      <td className="p-3">
                        <div className="w-9 h-9 rounded-full overflow-hidden border border-amber-500/30 bg-slate-100 flex items-center justify-center shrink-0">
                          {avatarSrc ? (
                            <img src={avatarSrc} alt={member.name} className="w-full h-full object-cover" />
                          ) : (
                            <User className="w-5 h-5 text-slate-400" />
                          )}
                        </div>
                      </td>
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
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 shadow-xl border border-slate-200 my-8">
            <h3 className="text-lg font-bold text-slate-900 mb-4">{isEditing ? 'Edit Team Member' : 'Add Team Member'}</h3>

            {formError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded font-medium">
                ⚠️ {formError}
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Photo Upload Section */}
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                <label className="block text-xs font-semibold text-slate-700">Team Member Photo</label>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-amber-500/30 bg-slate-100 flex items-center justify-center shrink-0">
                    {formData.avatar && formData.avatar !== '/assets/team-placeholder.jpg' ? (
                      <img src={formData.avatar} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-7 h-7 text-slate-400" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer">
                      <Upload className="w-3.5 h-3.5 text-amber-600" />
                      {uploadingPhoto ? 'Uploading...' : 'Upload Photo'}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handlePhotoUpload}
                        disabled={uploadingPhoto}
                      />
                    </label>
                    <input
                      type="url"
                      className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded focus:ring-1 focus:ring-amber-500"
                      placeholder="Or enter photo URL directly..."
                      value={formData.avatar}
                      onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                    />
                  </div>
                </div>
              </div>

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

              <div className="flex items-center gap-2 pt-1 pb-1">
                <input
                  type="checkbox"
                  id="isPendingName"
                  name="isPendingName"
                  checked={formData.isPendingName}
                  onChange={(e) => setFormData({ ...formData, isPendingName: e.target.checked })}
                  className="h-4 w-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
                />
                <label htmlFor="isPendingName" className="text-xs font-medium text-slate-700 cursor-pointer select-none">
                  Name Pending Official Confirmation
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                <Button type="button" variant="secondary" size="sm" onClick={() => setIsModalOpen(false)} disabled={formLoading || uploadingPhoto}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm" disabled={formLoading || uploadingPhoto}>
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

