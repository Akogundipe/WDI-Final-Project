const BASE_URL = "http://localhost:3000";

export function getTrips() {
    return fetch(`${BASE_URL}/users/${user_id}/trips`)
        .then(resp => resp.json())
        .catch(error => {
            throw Error(error);
        });
}

export function getTrip(id) {
    return fetch(`${BASE_URL}/users/${user_id}/trips/${id}`)
    .then(resp => resp.json())
    .catch(error => {
        throw Error(error);
    });
}

export function saveTrip(trip, method, id) {
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

export function deleteTrip(id) {
    const opts = {
        method: 'DELETE'
    }

    return fetch(`${BASE_URL}/users/${user_id}/trips/${id}`, opts)
        .then(resp => resp.json())
        .catch(error => {
            throw Error(error);
        });
}
