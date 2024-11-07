import { SYSTEM_ERROR } from 'config/CONSTANT';
import axios from './axiosInstance';
import { DELETE_USER, GET_ALL_USERS } from './CONSTANT';
import { UserData } from '../redux/users/usersSlice';

export const getAllUsers = () => {
  return new Promise<UserData[]>((resolve, reject) => {
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

export const deleteUser = (id:number) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .delete(`${DELETE_USER}${id}`)
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

export const updateUser = (userId:number, updatedData) => {
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