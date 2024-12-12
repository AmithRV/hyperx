import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DOMAIN,
});

api.interceptors.request.use(
  function (config) {
    // Modify the request config here if needed
    return config;
  },
  function (error) {
    // Handle request error
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    // Modify the response data here if needed
    return response;
  },
  async function (error) {
    // Handle response error
    return Promise.reject(error);
  }
);

export default api;
