import axios from 'axios';

const client = axios.create();

function responseSuccessHandler({status, data}) {
  return Promise.resolve({status, data});
}

function responseFailureHandler({response}) {
  const status = response ? response.status : null;
  const message =
    (response && response.data && response.data.message) ||
    'Something went wrong';
  const data = {
    success: false,
    message,
  };
  return Promise.resolve({status, data});
}

client.defaults.baseURL = null;
client.defaults.headers = {
  'Content-Type': 'application/json',
  Referer: null,
  Accept: 'application/json',
};
client.interceptors.response.use(
  responseSuccessHandler,
  responseFailureHandler,
);

export default client;
