import { SYSTEM_ERROR } from 'config/CONSTANT';
import axios from './axiosInstance';
import { ADD_ARTICLE, DELETE_ARTICLE, GET_ALL_ARTICLES, PATCH_ARTICLE } from './CONSTANT';
import { Article } from 'pages/Articles/ArticlesContainer';
import { ArticleForm } from 'pages/Articles/ArticleDialog';

export const getAllArticles = () => {
  return new Promise<Article[]>((resolve, reject) => {
    try {
      axios
        .get(GET_ALL_ARTICLES)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          console.log('getAllArticles > axios err=', err);
          reject({ ...err, message: `Error in getAllArticles axios! ${err.message}` });
        });
    } catch (error) {
      console.error('in userServices > getAllArticles, Err===', error);
      reject(SYSTEM_ERROR);
    }
  });
};

export const deleteArticle = (id:number) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .delete(`${DELETE_ARTICLE}${id}`)
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

export const updateArticle = (id:number, updatedData: ArticleForm) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .patch(
          `${PATCH_ARTICLE}${id}`,
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

export const addArticle = (updatedData: ArticleForm) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(
          ADD_ARTICLE,
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