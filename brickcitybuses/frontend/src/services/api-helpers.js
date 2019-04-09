import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000'
});

const updateToken = (token) => {
  localStorage.setItem('authToken', token);
  api.defaults.headers.common.authorization = `Bearer ${token}`;
};

const BASE_URL = "http://localhost:3000";

export function getTrips() {
    return fetch(`${BASE_URL}/users/1/trips`)
        .then(resp => resp.json())
        .catch(error => {
            throw Error(error);
        });
}

export function getTrip(user_id, id) {
    return fetch(`${BASE_URL}/users/1/trips/${id}`)
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

    return fetch(`${BASE_URL}/users/1/trips/${id}`, opts)
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

export {
  updateToken, api
};
