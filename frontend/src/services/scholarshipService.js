import api from './api';

export const scholarshipService = {
  getAll: async (params = {}) => {
    const { data } = await api.get('/scholarships', { params });
    return data.data; // { scholarships, pagination }
  },

  getBySlug: async (slug) => {
    const { data } = await api.get(`/scholarships/${slug}`);
    return data.data.scholarship;
  },
};