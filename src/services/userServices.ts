import { SYSTEM_ERROR } from 'config/CONSTANT';
import axios from './axiosInstance';
import { GET_ALL_USERS } from './CONSTANT';

export const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(GET_ALL_USERS)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          console.log('getAllUsers > axios err=', err);
          reject({ ...err, message: `Error in getAllUsers axios! ${err.message}` });
        });
    } catch (error) {
      console.error('in userServices > getAllUsers, Err===', error);
      reject(SYSTEM_ERROR);
    }
  });
};
