import api from './api';

export const fetchIncidents = async () => {
  const response = await api.get('/incidents');
  return response.data;
};

export const createIncident = async (title, description) => {
  const response = await api.post('/incidents', { title, description });
  return response.data;
};
