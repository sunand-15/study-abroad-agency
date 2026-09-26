import api from './api';

export const universityService = {
  getAll: async (params = {}) => {
    const { data } = await api.get('/universities', { params });
    return data.data; // { universities, pagination }
  },

  getBySlug: async (slug) => {
    const { data } = await api.get(`/universities/${slug}`);
    return data.data.university;
  },

  create: async (payload) => {
    const { data } = await api.post('/universities', payload);
    return data.data.university;
  },

  update: async (id, payload) => {
    const { data } = await api.put(`/universities/id/${id}`, payload);
    return data.data.university;
  },

  delete: async (id) => {
    const { data } = await api.delete(`/universities/id/${id}`);
    return data;
  },
};