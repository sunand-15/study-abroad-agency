import api from './api';

export const countryService = {
  // GET /api/countries?search=&page=&limit=
  getAll: async (params = {}) => {
    const { data } = await api.get('/countries', { params });
    return data.data; // { countries, pagination }
  },

  // GET /api/countries/:slug
  getBySlug: async (slug) => {
    const { data } = await api.get(`/countries/${slug}`);
    return data.data.country;
  },

  // Admin only (Phase 7 will use)
  create: async (payload) => {
    const { data } = await api.post('/countries', payload);
    return data.data.country;
  },

  update: async (id, payload) => {
    const { data } = await api.put(`/countries/id/${id}`, payload);
    return data.data.country;
  },

  delete: async (id) => {
    const { data } = await api.delete(`/countries/id/${id}`);
    return data;
  },
};