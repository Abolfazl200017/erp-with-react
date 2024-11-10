import axios from 'axios';
import { API_BASE_URL } from './CONSTANT';
import { SERVER_ERROR } from 'navigation/CONSTANT';

const apiInstance = axios.create({
  baseURL: API_BASE_URL //process.env.REACT_APP_API_BASE_URL
});

apiInstance.interceptors.response.use(
  response => response, // Directly return successful responses.
  async error => {

    if (error.response?.status === 500 || error.response?.status === 0) {
      console.error('A server error occurred. Redirecting to error page...');
      window.location.href = SERVER_ERROR; // Redirect to a dedicated 500 error page
    }

    return Promise.reject(error); // For all other errors, return the error as is.
  }
);

export default apiInstance;