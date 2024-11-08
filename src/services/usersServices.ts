import { SYSTEM_ERROR } from 'config/CONSTANT';
import axios from './axiosInstance';
import { ADD_USER, DELETE_USER, GET_ALL_USERS, PATCH_USER } from './CONSTANT';
import { UserData } from '../redux/users/usersSlice';
import { UserForm } from '../pages/UsersList/UserDialog';

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
          reject({ ...err, message: `Error in delete user axios! ${err.message}` });
        });
    } catch (error) {
      console.error('in userServices > delete user, Err===', error);
      reject(SYSTEM_ERROR);
    }
  });
};

export const updateUser = (id:number, updatedData: UserForm) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .patch(
          `${PATCH_USER}${id}`,
          updatedData,
        )
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject({ ...err, message: `Error in patch user axios! ${err.message}` });
        });
    } catch (error) {
      console.error('in userServices > patch user, Err===', error);
      reject(SYSTEM_ERROR);
    }
  });
};

export const addUser = (updatedData: UserForm) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(
          ADD_USER,
          updatedData,
        )
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject({ ...err, message: `Error in patch user axios! ${err.message}` });
        });
    } catch (error) {
      console.error('in userServices > patch user, Err===', error);
      reject(SYSTEM_ERROR);
    }
  });
};