// internal
import client from './client';

function fetchUser(data) {
  return client.post('/user/login/', data);
}

export const userService = {
  fetchUser,
};
