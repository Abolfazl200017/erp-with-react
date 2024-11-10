import axios from 'axios';
import { FILE_BASE_URL } from './CONSTANT';
import { SERVER_ERROR } from 'navigation/CONSTANT';

const apiInstance = axios.create({
  baseURL: FILE_BASE_URL,
});

apiInstance.interceptors.response.use(
  response => response,
  async error => {

    if (error.response?.status === 500 || error.response?.status === 0) {
      console.error('A server error occurred. Redirecting to error page...');
      window.location.href = SERVER_ERROR;
    }

    return Promise.reject(error);
  }
);

export default apiInstance;