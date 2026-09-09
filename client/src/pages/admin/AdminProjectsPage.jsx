import React, { useEffect, useState } from 'react';
import { apiClient } from '../../services/api';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Select } from '../../components/ui/Select';
import { ConfirmModal } from '../../components/admin/ConfirmModal';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { Plus, Edit, Trash2, Search, CheckCircle, XCircle } from 'lucide-react';

export const AdminProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'Residential Construction',
    location: '',
    shortDescription: '',
    fullDescription: '',
    coverImage: '',
    isPublished: true,
    featured: false,
    displayOrder: 0,
  });
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  // Delete Confirm State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [targetDeleteId, setTargetDeleteId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/admin/projects');
      if (response.data && response.data.success) {
        setProjects(response.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.error?.message || err.message || 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const resetForm = () => {
    setFormData({
      title: '',
      category: 'Residential Construction',
      location: '',
      shortDescription: '',
      fullDescription: '',
      coverImage: '',
      isPublished: true,
      featured: false,
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

  const handleOpenEditModal = (project) => {
    setIsEditing(true);
    setCurrentId(project._id);
    setFormData({
      title: project.title || '',
      category: project.category || 'Residential Construction',
      location: project.location || '',
      shortDescription: project.shortDescription || '',
      fullDescription: project.fullDescription || '',
      coverImage: project.coverImage || '',
      isPublished: project.isPublished !== undefined ? project.isPublished : true,
      featured: project.featured !== undefined ? project.featured : false,
      displayOrder: project.displayOrder || 0,
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.location.trim() || !formData.shortDescription.trim()) {
      setFormError('Please fill out Title, Location, and Short Description');
      return;
    }

    setFormLoading(true);
    setFormError('');

    try {
      if (isEditing) {
        await apiClient.put(`/admin/projects/${currentId}`, formData);
      } else {
        await apiClient.post('/admin/projects', formData);
      }
      setIsModalOpen(false);
      resetForm();
      fetchProjects();
    } catch (err) {
      setFormError(err.response?.data?.error?.message || err.message || 'Failed to save project');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!targetDeleteId) return;
    setDeleteLoading(true);
    try {
      await apiClient.delete(`/admin/projects/${targetDeleteId}`);
      setDeleteModalOpen(false);
      setTargetDeleteId(null);
      fetchProjects();
    } catch (err) {
      alert(err.response?.data?.error?.message || 'Failed to delete project');
    } finally {
      setDeleteLoading(false);
    }
  };

  const categoryOptions = [
    { value: 'Residential Construction', label: 'Residential Construction' },
    { value: 'Commercial Construction', label: 'Commercial Construction' },
    { value: 'House Renovation', label: 'House Renovation' },
    { value: 'Interior Design', label: 'Interior Design' },
    { value: 'Structural Design', label: 'Structural Design' },
  ];

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Projects Management</h2>
          <p className="text-xs text-slate-500">Add, edit, publish, or remove construction portfolio records</p>
        </div>
        <Button variant="primary" size="sm" onClick={handleOpenCreateModal} className="flex items-center gap-1.5 self-start">
          <Plus className="w-4 h-4" /> Add New Project
        </Button>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search projects by title or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
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
                  <th className="p-3">Title</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Featured</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((project) => (
                    <tr key={project._id} className="hover:bg-slate-50/80">
                      <td className="p-3 font-semibold text-slate-900">{project.title}</td>
                      <td className="p-3 text-slate-600">{project.category}</td>
                      <td className="p-3">{project.location}</td>
                      <td className="p-3">
                        {project.isPublished ? (
                          <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] font-semibold border border-emerald-200">
                            <CheckCircle className="w-3 h-3" /> Published
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-slate-600 bg-slate-100 px-2 py-0.5 rounded text-[11px] font-semibold border border-slate-200">
                            <XCircle className="w-3 h-3" /> Draft
                          </span>
                        )}
                      </td>
                      <td className="p-3">
                        {project.featured ? (
                          <span className="text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded text-[10px] border border-amber-200">★ Featured</span>
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </td>
                      <td className="p-3 text-right space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleOpenEditModal(project)}>
                          <Edit className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => {
                            setTargetDeleteId(project._id);
                            setDeleteModalOpen(true);
                          }}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-xs text-slate-500">
                      No project records found. Click "Add New Project" above to create one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create / Edit Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 shadow-xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-slate-900 mb-4">{isEditing ? 'Edit Project Record' : 'Create New Project Record'}</h3>

            {formError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded font-medium">
                ⚠️ {formError}
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-3">
              <Input
                id="title"
                name="title"
                label="Project Title"
                placeholder="e.g. Modern Residential Villa"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />

              <Select
                id="category"
                name="category"
                label="Category"
                options={categoryOptions}
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              />

              <Input
                id="location"
                name="location"
                label="Location"
                placeholder="e.g. Koodal, Pathanamthitta"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />

              <Textarea
                id="shortDescription"
                name="shortDescription"
                label="Short Description"
                placeholder="Provide a brief summary of the project..."
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                rows={3}
                required
              />

              <Input
                id="coverImage"
                name="coverImage"
                label="Cover Image URL / Path (Optional)"
                placeholder="e.g. https://example.com/image.jpg"
                value={formData.coverImage}
                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                helperText="Optional image URL reference"
              />

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                  />
                  Published on Public Site
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                  />
                  Feature on Homepage
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                <Button type="button" variant="secondary" size="sm" onClick={() => setIsModalOpen(false)} disabled={formLoading}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm" disabled={formLoading}>
                  {formLoading ? 'Saving...' : isEditing ? 'Update Project' : 'Create Project'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Delete Project Record"
        message="Are you sure you want to delete this project record? This action cannot be undone."
        onConfirm={handleDeleteConfirm}
        onCancel={() => {
          setDeleteModalOpen(false);
          setTargetDeleteId(null);
        }}
        confirmText="Delete Project"
        isLoading={deleteLoading}
      />
    </div>
  );
};
