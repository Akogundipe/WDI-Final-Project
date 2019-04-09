import { updateToken, api } from './api-helpers';

export const registerUser = async (user) => {
  const { email, password } = user;
  const last_name = user.lastName;
  const first_name = user.firstName;

  const resp = await api.post('/users/', {
    email,
    password,
    first_name,
    last_name
  });

  const { data } = resp;

  updateToken(data.token);

  return data;
};

export const verifyToken = async () => {
  const token = localStorage.getItem('authToken');
  if (token === null) {
    return false;
  } else {

    try {

      const resp = await api.get('/users/verify', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      updateToken(token);
      return resp.data;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}

export const loginUser = async ({ email, password }) => {
  const resp = await api.post('/users/login', {
    email,
    password
  });
  const data = resp.data;

  updateToken(data.token);

  return data;
}
