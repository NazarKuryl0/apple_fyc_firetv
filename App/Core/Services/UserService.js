// internal
import client from './client';

function validateUser() {
  return client.get('/user/valid/');
}

function fetchUser(data) {
  return client.post('/user/login/', data);
}

export const userService = {
  validateUser,
  fetchUser,
};
