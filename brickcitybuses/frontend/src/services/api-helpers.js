import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000'
  //baseURL: 'https://infinite-coast-14557.herokuapp.com/'
});

const updateToken = (token) => {
  localStorage.setItem('authToken', token);
  api.defaults.headers.common.authorization = `Bearer ${token}`;
};

const BASE_URL = "http://localhost:3000";
//const BASE_URL = "https://infinite-coast-14557.herokuapp.com/";

export const getTrips = async (user_id) => {
    return await fetch(`${BASE_URL}/users/${user_id}/trips`)
        .then(resp => resp.json())
        .catch(error => {
            throw Error(error);
        });
}

export const getTrip = async (user_id, id) => {
    return await fetch(`${BASE_URL}/users/${user_id}/trips/${id}`)
    .then(resp => resp.json())
    .catch(error => {
        throw Error(error);
    });
}

// export const saveTrip = async (trip, user_id) => {
//   console.log(user_id);
//     const opts = await {
//         method: "POST",
//         body: JSON.stringify({bus: trip}),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     }
//
//     return fetch(`${BASE_URL}/users/${user_id}/trips`, opts)
//         .then(resp => resp.json())
//         .catch(error => {
//             throw Error(error);
//         });
// }

export const saveTrip = async (trip, user_id) => {
  try{
    const response = await api.post(`/users/${user_id}/trips`, trip);
    return response.data
  }catch(e){
    console.error(e.message);
  }
}

export const deleteTrip = async (id, user_id) => {
  try{
    const data = await api.delete(`/users/${user_id}/trips/${id}`)
    return data.data
  } catch(e){
    console.log(e.message);
  }
}

// export function deleteTrip(id, user_id) {
//     const opts = {
//         method: 'DELETE'
//     }
//
//     return fetch(`${BASE_URL}/users/${user_id}/trips/${id}`, opts)
//         .then(resp => resp.json())
//         .catch(error => {
//             throw Error(error);
//         });
// }

export const updateTrip = async (data, id, user_id) => {
  const resp = await api.put(`/users/${user_id}/trips/${id}`, data);
  return resp.data.bus;
}

export {
  updateToken, api
};
