import api from './api';

export const enquiryService = {
  create: async (payload) => {
    const { data } = await api.post('/enquiries', payload);
    return data.data; // { enquiryId, _id, fullName, email, status }
  },

  getAll: async (params = {}) => {
    const { data } = await api.get('/enquiries', { params });
    return data.data;
  },

  getById: async (id) => {
    const { data } = await api.get(`/enquiries/${id}`);
    return data.data.enquiry;
  },

  updateStatus: async (id, payload) => {
    const { data } = await api.patch(`/enquiries/${id}/status`, payload);
    return data.data.enquiry;
  },
};