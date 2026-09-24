import React, { useEffect, useState, useRef } from 'react';
import {
  fetchAdminReviews,
  createCustomerReview,
  updateCustomerReview,
  deleteCustomerReview,
  reorderCustomerReviews,
  uploadCustomerPhoto,
} from '../../services/api';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Select } from '../../components/ui/Select';
import { ConfirmModal } from '../../components/admin/ConfirmModal';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { Plus, Edit, Trash2, CheckCircle, XCircle, Upload, Star, ArrowUp, ArrowDown, User } from 'lucide-react';

export const AdminReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const photoInputRef = useRef(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    customerName: '',
    location: '',
    rating: 5,
    reviewText: '',
    customerPhoto: { url: '', publicId: '' },
    isPublished: true,
    displayOrder: 0,
  });

  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  // Delete Confirm State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [targetDeleteId, setTargetDeleteId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const loadReviews = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await fetchAdminReviews();
      if (res && res.success && Array.isArray(res.data)) {
        setReviews(res.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch customer reviews');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const resetForm = () => {
    setFormData({
      customerName: '',
      location: '',
      rating: 5,
      reviewText: '',
      customerPhoto: { url: '', publicId: '' },
      isPublished: true,
      displayOrder: reviews.length,
    });
    setFormError('');
    setIsEditing(false);
    setCurrentId(null);
  };

  const handleOpenCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (review) => {
    setIsEditing(true);
    setCurrentId(review._id);

    let photoObj = { url: '', publicId: '' };
    if (typeof review.customerPhoto === 'string') {
      photoObj.url = review.customerPhoto;
    } else if (review.customerPhoto && typeof review.customerPhoto === 'object') {
      photoObj = {
        url: review.customerPhoto.url || '',
        publicId: review.customerPhoto.publicId || '',
      };
    }

    setFormData({
      customerName: review.customerName || '',
      location: review.location || '',
      rating: review.rating ? Number(review.rating) : 5,
      reviewText: review.reviewText || '',
      customerPhoto: photoObj,
      isPublished: review.isPublished !== undefined ? review.isPublished : true,
      displayOrder: review.displayOrder || 0,
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    const inputEl = e.target;
    if (!file) return;

    const data = new FormData();
    data.append('file', file);

    setUploadingPhoto(true);
    setFormError('');

    try {
      const res = await uploadCustomerPhoto(data);
      if (res.success && res.data) {
        setFormData((prev) => ({
          ...prev,
          customerPhoto: {
            url: res.data.url,
            publicId: res.data.publicId,
          },
        }));
      }
    } catch (err) {
      setFormError(err.message || 'Failed to upload customer photo');
    } finally {
      setUploadingPhoto(false);
      if (inputEl) inputEl.value = '';
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customerName.trim() || !formData.location.trim() || !formData.reviewText.trim()) {
      setFormError('Please fill out Customer Name, Location, and Review Text');
      return;
    }

    setFormLoading(true);
    setFormError('');

    try {
      if (isEditing) {
        await updateCustomerReview(currentId, formData);
      } else {
        await createCustomerReview(formData);
      }
      setIsModalOpen(false);
      resetForm();
      loadReviews();
    } catch (err) {
      setFormError(err.message || 'Failed to save customer review');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!targetDeleteId) return;
    setDeleteLoading(true);
    try {
      await deleteCustomerReview(targetDeleteId);
      setDeleteModalOpen(false);
      setTargetDeleteId(null);
      loadReviews();
    } catch (err) {
      alert(err.message || 'Failed to delete customer review');
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleMoveReview = async (index, direction) => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= reviews.length) return;

    const updated = [...reviews];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);

    setReviews(updated);

    try {
      const orderedIds = updated.map((r) => r._id);
      const res = await reorderCustomerReviews(orderedIds);
      if (res && res.success) {
        setReviews(res.data);
      }
    } catch (err) {
      console.warn('Reorder failed:', err.message);
      loadReviews();
    }
  };

  const ratingOptions = [
    { value: '5', label: '★★★★★ (5 Stars - Excellent)' },
    { value: '4', label: '★★★★☆ (4 Stars - Very Good)' },
    { value: '3', label: '★★★☆☆ (3 Stars - Good)' },
    { value: '2', label: '★★☆☆☆ (2 Stars - Fair)' },
    { value: '1', label: '★☆☆☆☆ (1 Star - Poor)' },
  ];

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Customer Reviews Management</h2>
          <p className="text-xs text-slate-500">Manage client testimonials, star ratings, and homepage showcase items</p>
        </div>
        <Button variant="primary" size="sm" onClick={handleOpenCreateModal} className="flex items-center gap-1.5 self-start">
          <Plus className="w-4 h-4" /> Add New Customer Review
        </Button>
      </div>

      {/* Main Reviews Table */}
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
                  <th className="p-3 w-16 text-center">Photo</th>
                  <th className="p-3">Customer Name</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Rating</th>
                  <th className="p-3">Review Preview</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-center">Order</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {reviews.length > 0 ? (
                  reviews.map((review, idx) => (
                    <tr key={review._id} className="hover:bg-slate-50/80">
                      <td className="p-3 text-center">
                        {review.customerPhoto?.url ? (
                          <img
                            src={review.customerPhoto.url}
                            alt={review.customerName}
                            className="w-10 h-10 rounded-full object-cover border border-slate-300 mx-auto"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center mx-auto text-slate-400">
                            <User className="w-5 h-5" />
                          </div>
                        )}
                      </td>
                      <td className="p-3 font-semibold text-slate-900">{review.customerName}</td>
                      <td className="p-3 text-amber-800 font-medium">📍 {review.location}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-0.5 text-amber-500">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-3.5 h-3.5 ${
                                star <= (review.rating || 5)
                                  ? 'text-amber-500 fill-amber-500'
                                  : 'text-slate-300 fill-slate-100'
                              }`}
                            />
                          ))}
                        </div>
                      </td>
                      <td className="p-3 max-w-xs text-slate-600 truncate" title={review.reviewText}>
                        "{review.reviewText}"
                      </td>
                      <td className="p-3">
                        {review.isPublished ? (
                          <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] font-semibold border border-emerald-200">
                            <CheckCircle className="w-3 h-3" /> Published
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-slate-600 bg-slate-100 px-2 py-0.5 rounded text-[11px] font-semibold border border-slate-200">
                            <XCircle className="w-3 h-3" /> Draft
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-center">
                        <div className="inline-flex items-center gap-1">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => handleMoveReview(idx, 'up')}
                            className="p-1 text-slate-500 hover:text-slate-900 disabled:opacity-30 cursor-pointer"
                            title="Move Up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-bold text-slate-700 w-4 text-center">{idx + 1}</span>
                          <button
                            type="button"
                            disabled={idx === reviews.length - 1}
                            onClick={() => handleMoveReview(idx, 'down')}
                            className="p-1 text-slate-500 hover:text-slate-900 disabled:opacity-30 cursor-pointer"
                            title="Move Down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                      <td className="p-3 text-right space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleOpenEditModal(review)}>
                          <Edit className="w-3.5 h-3.5" /> Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => {
                            setTargetDeleteId(review._id);
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
                    <td colSpan="8" className="p-8 text-center text-xs text-slate-500">
                      No customer reviews created yet. Click "Add New Customer Review" above to create one.
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
          <div className="bg-white rounded-lg max-w-xl w-full p-6 shadow-xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              {isEditing ? 'Edit Customer Review' : 'Create Customer Review'}
            </h3>

            {formError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded font-medium">
                ⚠️ {formError}
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Photo Upload Section */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
                <label className="block text-xs font-bold text-slate-800">
                  Customer Photograph (Required)
                </label>

                <div className="flex items-center gap-4">
                  {formData.customerPhoto?.url ? (
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-amber-500/40 shadow-sm shrink-0">
                      <img src={formData.customerPhoto.url} alt="Customer Preview" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-slate-200 border-2 border-slate-300 flex items-center justify-center text-slate-400 shrink-0">
                      <User className="w-8 h-8" />
                    </div>
                  )}

                  <div className="flex-1 space-y-2">
                    <button
                      type="button"
                      onClick={() => photoInputRef.current?.click()}
                      disabled={uploadingPhoto}
                      className="cursor-pointer bg-white border border-amber-300 hover:bg-amber-50 text-amber-800 text-xs font-semibold px-3 py-1.5 rounded shadow-xs flex items-center gap-1.5"
                    >
                      <Upload className="w-3.5 h-3.5 text-amber-600" />
                      {uploadingPhoto ? 'Uploading...' : 'Upload Customer Photo'}
                    </button>
                    <input
                      ref={photoInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handlePhotoUpload}
                      disabled={uploadingPhoto}
                      className="hidden"
                    />
                    <input
                      type="url"
                      placeholder="Or paste direct photo URL (https://...)"
                      value={formData.customerPhoto?.url || ''}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          customerPhoto: { ...prev.customerPhoto, url: e.target.value },
                        }))
                      }
                      className="w-full text-xs p-1.5 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  id="customerName"
                  name="customerName"
                  label="Customer Name"
                  placeholder="e.g. Anish Varghese"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  required
                />

                <Input
                  id="location"
                  name="location"
                  label="Location"
                  placeholder="e.g. Pathanamthitta, Kerala"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
              </div>

              <Select
                id="rating"
                name="rating"
                label="Star Rating"
                options={ratingOptions}
                value={String(formData.rating)}
                onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                required
              />

              <Textarea
                id="reviewText"
                name="reviewText"
                label="Customer Review Text"
                placeholder="Write the customer's testimonial..."
                value={formData.reviewText}
                onChange={(e) => setFormData({ ...formData, reviewText: e.target.value })}
                rows={4}
                required
              />

              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                />
                Published on Public Homepage
              </label>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                <Button type="button" variant="secondary" size="sm" onClick={() => setIsModalOpen(false)} disabled={formLoading}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm" disabled={formLoading || uploadingPhoto}>
                  {formLoading ? 'Saving...' : isEditing ? 'Update Review' : 'Create Review'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Delete Customer Review"
        message="Are you sure you want to delete this customer review? This action cannot be undone."
        onConfirm={handleDeleteConfirm}
        onCancel={() => {
          setDeleteModalOpen(false);
          setTargetDeleteId(null);
        }}
        confirmText="Delete Review"
        isLoading={deleteLoading}
      />
    </div>
  );
};
