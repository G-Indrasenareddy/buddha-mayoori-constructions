import React, { useEffect, useState, useRef } from 'react';
import { apiClient, uploadProjectMedia, deleteProjectMedia } from '../../services/api';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Select } from '../../components/ui/Select';
import { ConfirmModal } from '../../components/admin/ConfirmModal';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { Plus, Edit, Trash2, Search, CheckCircle, XCircle, Upload, Camera, X, Link as LinkIcon } from 'lucide-react';

export const AdminProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Refs for file inputs
  const coverInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'Residential Construction',
    status: 'ONGOING',
    completionYear: '',
    location: '',
    shortDescription: '',
    fullDescription: '',
    coverImage: { url: '', publicId: '', caption: '' },
    galleryImages: [],
    isPublished: true,
    featured: false,
    displayOrder: 0,
  });

  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState('GENERAL');
  const [galleryUrlInput, setGalleryUrlInput] = useState('');
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
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
      status: 'ONGOING',
      completionYear: '',
      location: '',
      shortDescription: '',
      fullDescription: '',
      coverImage: { url: '', publicId: '', caption: '' },
      galleryImages: [],
      isPublished: true,
      featured: false,
      displayOrder: 0,
    });
    setSelectedGalleryCategory('GENERAL');
    setGalleryUrlInput('');
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

    // Normalize coverImage (can be string or object)
    let normCover = { url: '', publicId: '', caption: '' };
    if (typeof project.coverImage === 'string') {
      normCover.url = project.coverImage;
    } else if (project.coverImage && typeof project.coverImage === 'object') {
      normCover = {
        url: project.coverImage.url || '',
        publicId: project.coverImage.publicId || '',
        caption: project.coverImage.caption || '',
      };
    }

    // Normalize galleryImages
    const normGallery = Array.isArray(project.galleryImages)
      ? project.galleryImages.map((img) => {
          if (typeof img === 'string') {
            return { url: img, publicId: '', category: 'GENERAL', caption: '' };
          }
          return {
            _id: img._id,
            url: img.url,
            publicId: img.publicId || '',
            category: img.category || 'GENERAL',
            caption: img.caption || '',
          };
        })
      : [];

    setFormData({
      title: project.title || '',
      category: project.category || 'Residential Construction',
      status: project.status || 'ONGOING',
      completionYear: project.completionYear ? String(project.completionYear) : '',
      location: project.location || '',
      shortDescription: project.shortDescription || '',
      fullDescription: project.fullDescription || '',
      coverImage: normCover,
      galleryImages: normGallery,
      isPublished: project.isPublished !== undefined ? project.isPublished : true,
      featured: project.featured !== undefined ? project.featured : false,
      displayOrder: project.displayOrder || 0,
    });
    setSelectedGalleryCategory('GENERAL');
    setGalleryUrlInput('');
    setFormError('');
    setIsModalOpen(true);
  };

  const handleCoverUpload = async (e) => {
    const file = e.target.files?.[0];
    const inputEl = e.target;
    if (!file) return;

    const data = new FormData();
    data.append('files', file);

    setUploadingCover(true);
    setFormError('');

    try {
      const res = await uploadProjectMedia(data);
      if (res.success && res.data && res.data[0]) {
        const uploaded = res.data[0];
        setFormData((prev) => ({
          ...prev,
          coverImage: {
            url: uploaded.url,
            publicId: uploaded.publicId,
            caption: prev.coverImage.caption || '',
          },
        }));
      }
    } catch (err) {
      setFormError(err.message || 'Failed to upload cover image');
    } finally {
      setUploadingCover(false);
      if (inputEl) inputEl.value = '';
    }
  };

  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    const inputEl = e.target;
    if (!files.length) return;

    const data = new FormData();
    files.forEach((f) => data.append('files', f));

    setUploadingGallery(true);
    setFormError('');

    try {
      const res = await uploadProjectMedia(data);
      if (res.success && res.data) {
        const newItems = res.data.map((item) => ({
          url: item.url,
          publicId: item.publicId,
          category: selectedGalleryCategory,
          caption: '',
        }));

        setFormData((prev) => ({
          ...prev,
          galleryImages: [...prev.galleryImages, ...newItems],
        }));
      }
    } catch (err) {
      setFormError(err.message || 'Failed to upload gallery images');
    } finally {
      setUploadingGallery(false);
      if (inputEl) inputEl.value = '';
    }
  };

  const handleAddGalleryUrl = () => {
    if (!galleryUrlInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      galleryImages: [
        ...prev.galleryImages,
        {
          url: galleryUrlInput.trim(),
          publicId: '',
          category: selectedGalleryCategory,
          caption: '',
        },
      ],
    }));
    setGalleryUrlInput('');
  };

  const handleRemoveGalleryImage = async (index, item) => {
    if (isEditing && currentId && item._id) {
      try {
        await deleteProjectMedia(currentId, item._id);
      } catch (err) {
        setFormError(err.message || 'Failed to delete media asset from backend');
        return;
      }
    }

    setFormData((prev) => ({
      ...prev,
      galleryImages: prev.galleryImages.filter((_, i) => i !== index),
    }));
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
      const payload = {
        ...formData,
        completionYear: formData.status === 'COMPLETED' && formData.completionYear ? Number(formData.completionYear) : undefined,
      };

      if (isEditing) {
        await apiClient.put(`/admin/projects/${currentId}`, payload);
      } else {
        await apiClient.post('/admin/projects', payload);
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

  const statusOptions = [
    { value: 'ONGOING', label: '🏗️ ONGOING CONSTRUCTION' },
    { value: 'COMPLETED', label: '✓ COMPLETED PROJECT' },
  ];

  const galleryCategoryOptions = [
    { value: 'GENERAL', label: 'General Site Photo' },
    { value: 'SITE_PREPARATION', label: 'Site Preparation & Excavation' },
    { value: 'FOUNDATION', label: 'Foundation & Concrete Work' },
    { value: 'STRUCTURAL_FRAME', label: 'Structural Frame & Brickwork' },
    { value: 'ROOFING_SLAB', label: 'Roofing & Slab Casting' },
    { value: 'ELECTRICAL_PLUMBING', label: 'Electrical & Plumbing Installation' },
    { value: 'FINISHING_PAINTING', label: 'Finishing, Plastering & Painting' },
    { value: 'COMPLETED_ELEVATION', label: 'Completed Elevation & Exterior' },
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
          <h2 className="text-xl font-bold text-slate-900">Projects & Gallery Management</h2>
          <p className="text-xs text-slate-500">Manage construction portfolio records, ongoing status, and photo galleries</p>
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
                  <th className="p-3">Project Status</th>
                  <th className="p-3">Photos</th>
                  <th className="p-3">Publish Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((project) => (
                    <tr key={project._id} className="hover:bg-slate-50/80">
                      <td className="p-3 font-semibold text-slate-900">
                        <div>{project.title}</div>
                        <div className="text-[11px] text-slate-500 font-normal">{project.location}</div>
                      </td>
                      <td className="p-3 text-slate-600">{project.category}</td>
                      <td className="p-3">
                        {project.status === 'ONGOING' ? (
                          <span className="inline-flex items-center gap-1 text-amber-800 bg-amber-50 px-2 py-0.5 rounded text-[11px] font-semibold border border-amber-200">
                            🏗️ ONGOING
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded text-[11px] font-semibold border border-emerald-200">
                            ✓ COMPLETED {project.completionYear ? `(${project.completionYear})` : ''}
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-slate-600">
                        <span className="inline-flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                          <Camera className="w-3 h-3 text-slate-500" />
                          {(project.galleryImages?.length || 0) + (project.coverImage?.url ? 1 : 0)} photos
                        </span>
                      </td>
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
                        {project.featured && (
                          <span className="ml-1 text-amber-700 font-semibold bg-amber-50 px-1.5 py-0.5 rounded text-[10px] border border-amber-200">
                            ★ Featured
                          </span>
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
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 shadow-xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              {isEditing ? 'Edit Project Record' : 'Create New Project Record'}
            </h3>

            {formError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded font-medium">
                ⚠️ {formError}
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Select
                  id="status"
                  name="status"
                  label="Project Status"
                  options={statusOptions}
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  required
                />

                {formData.status === 'COMPLETED' ? (
                  <Input
                    id="completionYear"
                    name="completionYear"
                    label="Completion Year"
                    placeholder="e.g. 2024"
                    value={formData.completionYear}
                    onChange={(e) => setFormData({ ...formData, completionYear: e.target.value })}
                  />
                ) : (
                  <Input
                    id="location"
                    name="location"
                    label="Location"
                    placeholder="e.g. Koodal, Pathanamthitta"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                )}
              </div>

              {formData.status === 'COMPLETED' && (
                <Input
                  id="location"
                  name="location"
                  label="Location"
                  placeholder="e.g. Koodal, Pathanamthitta"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
              )}

              <Textarea
                id="shortDescription"
                name="shortDescription"
                label="Short Description"
                placeholder="Provide a brief summary of the project..."
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                rows={2}
                required
              />

              <Textarea
                id="fullDescription"
                name="fullDescription"
                label="Detailed Scope & Specifications (Optional)"
                placeholder="Detailed specifications, structural scope, materials used, etc..."
                value={formData.fullDescription}
                onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                rows={3}
              />

              {/* Cover Image Upload Section */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
                <label className="block text-xs font-bold text-slate-800">
                  Hero Cover Image
                </label>

                {formData.coverImage?.url ? (
                  <div className="relative w-full h-40 rounded-md overflow-hidden border border-slate-300 bg-slate-100 group">
                    <img
                      src={formData.coverImage.url}
                      alt="Cover Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button
                        type="button"
                        variant="danger"
                        size="sm"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            coverImage: { url: '', publicId: '', caption: '' },
                          }))
                        }
                      >
                        Remove Cover Image
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="button"
                      onClick={() => coverInputRef.current?.click()}
                      disabled={uploadingCover}
                      className="cursor-pointer bg-white border border-amber-300 hover:bg-amber-50 text-amber-800 text-xs font-semibold px-4 py-2 rounded-md shadow-xs flex items-center gap-2"
                    >
                      <Upload className="w-4 h-4 text-amber-600" />
                      {uploadingCover ? 'Uploading...' : 'Upload Cover Image File'}
                    </button>
                    <input
                      ref={coverInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleCoverUpload}
                      disabled={uploadingCover}
                      className="hidden"
                    />
                    <span className="text-[11px] text-slate-400">or enter direct URL:</span>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={formData.coverImage?.url || ''}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          coverImage: { ...prev.coverImage, url: e.target.value },
                        }))
                      }
                      className="flex-1 text-xs p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                )}
              </div>

              {/* Photo Gallery Management Section */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2">
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4 text-amber-600" />
                    <span className="text-xs font-bold text-slate-800">
                      Project Photo Gallery ({formData.galleryImages.length})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      value={selectedGalleryCategory}
                      onChange={(e) => setSelectedGalleryCategory(e.target.value)}
                      className="text-[11px] p-1.5 border border-slate-300 rounded bg-white font-medium focus:ring-amber-500"
                    >
                      {galleryCategoryOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>

                    <button
                      type="button"
                      onClick={() => galleryInputRef.current?.click()}
                      disabled={uploadingGallery}
                      className="cursor-pointer bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold px-3 py-1.5 rounded shadow-xs flex items-center gap-1.5"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      {uploadingGallery ? 'Uploading...' : 'Add Photos'}
                    </button>
                    <input
                      ref={galleryInputRef}
                      type="file"
                      multiple
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleGalleryUpload}
                      disabled={uploadingGallery}
                      className="hidden"
                    />
                  </div>
                </div>

                {/* Add Photo by URL option */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="url"
                    placeholder="Or paste photo image URL (https://...)"
                    value={galleryUrlInput}
                    onChange={(e) => setGalleryUrlInput(e.target.value)}
                    className="flex-1 text-xs p-1.5 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddGalleryUrl}
                    disabled={!galleryUrlInput.trim()}
                    className="bg-slate-800 hover:bg-slate-900 disabled:opacity-50 text-white text-xs font-semibold px-3 py-1.5 rounded shadow-xs flex items-center gap-1"
                  >
                    <LinkIcon className="w-3 h-3" /> Add URL
                  </button>
                </div>

                {/* Gallery Thumbnails List */}
                {formData.galleryImages.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
                    {formData.galleryImages.map((img, idx) => (
                      <div key={idx} className="relative bg-white border border-slate-200 rounded-md overflow-hidden shadow-xs group">
                        <div className="w-full h-24 bg-slate-100">
                          <img
                            src={img.url}
                            alt={img.caption || `Gallery ${idx + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/150?text=Invalid+Image+URL';
                            }}
                          />
                        </div>
                        <div className="p-1.5 text-[10px]">
                          <span className="inline-block bg-amber-50 text-amber-800 font-semibold px-1.5 py-0.5 rounded border border-amber-200 truncate max-w-full">
                            {img.category || 'GENERAL'}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveGalleryImage(idx, img)}
                          className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-80 hover:opacity-100 shadow-md"
                          title="Remove photo"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic text-center py-4">
                    No gallery photos added yet. Click "Add Photos" to upload local image files or paste an image URL above.
                  </p>
                )}
              </div>

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
                <Button type="submit" variant="primary" size="sm" disabled={formLoading || uploadingCover || uploadingGallery}>
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
        message="Are you sure you want to delete this project record and all associated media? This action cannot be undone."
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
