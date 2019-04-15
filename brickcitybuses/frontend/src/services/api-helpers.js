import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/'
});

const updateToken = (token) => {
  localStorage.setItem('authToken', token);
  api.defaults.headers.common.authorization = `Bearer ${token}`;
};

//const BASE_URL = "http://localhost:3000/";
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

export function saveTrip(trip, user_id) {
  console.log(user_id);
    const opts = {
        method: "POST",
        body: JSON.stringify({bus: trip}),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    return fetch(`${BASE_URL}/users/${user_id}/trips`, opts)
        .then(resp => resp.json())
        .catch(error => {
            throw Error(error);
        });
}

export function deleteTrip(id, user_id) {
    const opts = {
        method: 'DELETE'
    }

    return fetch(`${BASE_URL}/users/${user_id}/trips/${id}`, opts)
        .then(resp => resp.json())
        .catch(error => {
            throw Error(error);
        });
}

export const updateTrip = async (data, id, user_id) => {
  const resp = await api.put(`/users/${user_id}/trips/${id}`, data);
  return resp.data.bus;
}

export {
  updateToken, api
};
