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
