import api from './api';

export const courseService = {
  getAll: async (params = {}) => {
    const { data } = await api.get('/courses', { params });
    return data.data; // { courses, pagination }
  },

  getBySlug: async (slug) => {
    const { data } = await api.get(`/courses/${slug}`);
    return data.data.course;
  },

  create: async (payload) => {
    const { data } = await api.post('/courses', payload);
    return data.data.course;
  },

  update: async (id, payload) => {
    const { data } = await api.put(`/courses/id/${id}`, payload);
    return data.data.course;
  },

  delete: async (id) => {
    const { data } = await api.delete(`/courses/id/${id}`);
    return data;
  },
};