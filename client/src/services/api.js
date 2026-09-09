import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

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
    console.warn('API unavailable, falling back to client constants:', error.message);
    return null;
  }
};

// Helper function to fetch team roster
export const fetchTeam = async () => {
  try {
    const response = await apiClient.get('/team');
    return response.data;
  } catch (error) {
    console.warn('API unavailable, falling back to client constants:', error.message);
    return null;
  }
};
