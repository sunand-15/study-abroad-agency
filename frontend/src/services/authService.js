import api from './api';

export const authService = {
  login: async (credentials) => {
    const { data } = await api.post('/auth/login', credentials);
    return data.data; // { accessToken, admin }
  },

  logout: async () => {
    const { data } = await api.post('/auth/logout');
    return data;
  },

  refresh: async () => {
    const { data } = await api.post('/auth/refresh');
    return data.data; // { accessToken }
  },

  getMe: async () => {
    const { data } = await api.get('/auth/me');
    return data.data.admin;
  },
};