import { api } from './api-helpers';

export const getTrips = async () => {
  const resp = await api.get('/trips');
  return resp.data.trips;
};

export const createTrip = async (data) => {
  const resp = await api.post('/trips', data);
  return resp.data.trip;
}

export const updateTrip = async (data, id) => {
  const resp = await api.put(`/trips/${id}`, data);
  return resp.data.trip;
}

export const deleteTrip = async (id) => {
  const resp = await api.delete(`/trips/${id}`);
  return resp.data;
};
