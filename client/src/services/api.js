import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor to attach Bearer token if present
apiClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('bmc_admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle unauthenticated 401 errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      sessionStorage.removeItem('bmc_admin_token');
      sessionStorage.removeItem('bmc_admin_user');
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// Helper function to submit contact or building estimate request
export const submitEnquiry = async (enquiryData) => {
  try {
    const response = await apiClient.post('/enquiries', enquiryData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data.error || new Error('Failed to submit enquiry');
    }
    throw new Error(error.message || 'Network error while submitting enquiry');
  }
};

// Helper function to fetch canonical services
export const fetchServices = async () => {
  try {
    const response = await apiClient.get('/services');
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data.error || new Error('Failed to fetch services');
    }
    throw new Error(error.message || 'Network error while fetching services');
  }
};

// Helper function to fetch team roster
export const fetchTeam = async () => {
  try {
    const response = await apiClient.get('/team');
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data.error || new Error('Failed to fetch team roster');
    }
    throw new Error(error.message || 'Network error while fetching team roster');
  }
};

// Helper function to fetch public projects
export const fetchProjects = async (params = {}) => {
  try {
    const response = await apiClient.get('/projects', { params });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data.error || new Error('Failed to fetch projects');
    }
    throw new Error(error.message || 'Network error while fetching projects');
  }
};

// Helper function to fetch single project by slug
export const fetchProjectBySlug = async (slug) => {
  try {
    const response = await apiClient.get(`/projects/${slug}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data.error || new Error('Failed to fetch project details');
    }
    throw new Error(error.message || 'Network error while fetching project details');
  }
};

// Helper function to upload project media asset (cover or gallery image) to Cloudinary
export const uploadProjectMedia = async (formData) => {
  try {
    const response = await apiClient.post('/admin/projects/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data.error || new Error('Failed to upload media asset');
    }
    throw new Error(error.message || 'Network error while uploading media asset');
  }
};

// Helper function to delete media asset belonging to a specific project
export const deleteProjectMedia = async (projectId, mediaId) => {
  try {
    const response = await apiClient.delete(`/admin/projects/${projectId}/media/${mediaId}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data.error || new Error('Failed to delete media asset');
    }
    throw new Error(error.message || 'Network error while deleting media asset');
  }
};

// Helper function to fetch public homepage slider items
export const fetchHomepageSlider = async () => {
  try {
    const response = await apiClient.get('/projects/homepage-slider');
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data.error || new Error('Failed to fetch homepage slider photos');
    }
    throw new Error(error.message || 'Network error while fetching homepage slider photos');
  }
};

// Admin helper function to fetch homepage slider items
export const fetchAdminHomepageSlider = async () => {
  try {
    const response = await apiClient.get('/admin/homepage-slider');
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data.error || new Error('Failed to fetch admin homepage slider');
    }
    throw new Error(error.message || 'Network error while fetching admin homepage slider');
  }
};

// Admin helper function to select a photo for the homepage slider
export const selectHomepageMedia = async (projectId, mediaId, mediaType) => {
  try {
    const response = await apiClient.post('/admin/homepage-slider/select', {
      projectId,
      mediaId,
      mediaType,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data.error || new Error('Failed to select homepage photo');
    }
    throw new Error(error.message || 'Network error while selecting homepage photo');
  }
};

// Admin helper function to deselect a photo from the homepage slider
export const deselectHomepageMedia = async (mediaId) => {
  try {
    const response = await apiClient.post(`/admin/homepage-slider/deselect/${mediaId}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data.error || new Error('Failed to deselect homepage photo');
    }
    throw new Error(error.message || 'Network error while deselecting homepage photo');
  }
};

// Admin helper function to reorder homepage slider photos
export const reorderHomepageSlider = async (orderedMediaIds) => {
  try {
    const response = await apiClient.put('/admin/homepage-slider/reorder', {
      orderedMediaIds,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data.error || new Error('Failed to reorder homepage slider photos');
    }
    throw new Error(error.message || 'Network error while reordering homepage slider photos');
  }
};

// Helper function to fetch public published customer reviews
export const fetchPublicReviews = async () => {
  try {
    const response = await apiClient.get('/reviews');
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data.error || new Error('Failed to fetch customer reviews');
    }
    throw new Error(error.message || 'Network error while fetching customer reviews');
  }
};

// Admin helper function to fetch all customer reviews
export const fetchAdminReviews = async () => {
  try {
    const response = await apiClient.get('/admin/reviews');
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data.error || new Error('Failed to fetch admin customer reviews');
    }
    throw new Error(error.message || 'Network error while fetching admin customer reviews');
  }
};

// Admin helper function to upload customer photo
export const uploadCustomerPhoto = async (formData) => {
  try {
    const response = await apiClient.post('/admin/reviews/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data.error || new Error('Failed to upload customer photo');
    }
    throw new Error(error.message || 'Network error while uploading customer photo');
  }
};

// Admin helper function to create customer review
export const createCustomerReview = async (reviewData) => {
  try {
    const response = await apiClient.post('/admin/reviews', reviewData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data.error || new Error('Failed to create customer review');
    }
    throw new Error(error.message || 'Network error while creating customer review');
  }
};

// Admin helper function to update customer review
export const updateCustomerReview = async (id, reviewData) => {
  try {
    const response = await apiClient.put(`/admin/reviews/${id}`, reviewData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data.error || new Error('Failed to update customer review');
    }
    throw new Error(error.message || 'Network error while updating customer review');
  }
};

// Admin helper function to delete customer review
export const deleteCustomerReview = async (id) => {
  try {
    const response = await apiClient.delete(`/admin/reviews/${id}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data.error || new Error('Failed to delete customer review');
    }
    throw new Error(error.message || 'Network error while deleting customer review');
  }
};

// Admin helper function to reorder customer reviews
export const reorderCustomerReviews = async (orderedIds) => {
  try {
    const response = await apiClient.put('/admin/reviews/reorder', { orderedIds });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data.error || new Error('Failed to reorder customer reviews');
    }
    throw new Error(error.message || 'Network error while reordering customer reviews');
  }
};

// Admin helper function to upload team member photo
export const uploadTeamPhoto = async (formData) => {
  try {
    const response = await apiClient.post('/admin/team/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data.error || new Error('Failed to upload team photo');
    }
    throw new Error(error.message || 'Network error while uploading team photo');
  }
};



