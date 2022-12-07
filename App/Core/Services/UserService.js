// internal
import client from './client';

function validateUser(authToken) {
  return client.get('/user/valid/', { headers: { Authorization: authToken } });
}

function fetchUser(data) {
  return client.post('/user/login/', data);
}

export const userService = {
  validateUser,
  fetchUser,
};
