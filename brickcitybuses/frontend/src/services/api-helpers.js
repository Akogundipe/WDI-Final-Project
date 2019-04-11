import axios from 'axios';

const api = axios.create({
  baseURL: 'https://infinite-coast-14557.herokuapp.com/'
});

const updateToken = (token) => {
  localStorage.setItem('authToken', token);
  api.defaults.headers.common.authorization = `Bearer ${token}`;
};

const BASE_URL = "https://infinite-coast-14557.herokuapp.com/";

export function getTrips(user_id) {
    return fetch(`${BASE_URL}/users/${user_id}/trips`)
        .then(resp => resp.json())
        .catch(error => {
            throw Error(error);
        });
}

export function getTrip(user_id, id) {
    return fetch(`${BASE_URL}/users/${user_id}/trips/${id}`)
    .then(resp => resp.json())
    .catch(error => {
        throw Error(error);
    });
}

export function saveTrip(trip, method, id, user_id) {
    const opts = {
        method: method,
        body: JSON.stringify(trip),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    return fetch(`${BASE_URL}/users/${user_id}/trips/${id}`, opts)
        .then(resp => resp.json())
        .catch(error => {
            throw Error(error);
        });
}

export function deleteTrip(id, user_id) {
    const opts = {
        method: 'DELETE'
    }

    return fetch(`${BASE_URL}/users/1/trips/${id}`, opts)
        .then(resp => resp.json())
        .catch(error => {
            throw Error(error);
        });
}

export const updateTrip = async (data, id, user_id) => {
  const resp = await api.put(`/users/${user_id}/trips/${id}`, data);
  return resp.data.trip;
}

export {
  updateToken, api
};
