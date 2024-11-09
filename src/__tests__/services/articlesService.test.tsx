// articleService.test.ts
import axios from '../../services/axiosInstance';
import { getAllArticles, deleteArticle, updateArticle, addArticle } from '../../services/articlesService';
import { SYSTEM_ERROR } from 'config/CONSTANT';
import { ADD_ARTICLE, DELETE_ARTICLE, GET_ALL_ARTICLES, PATCH_ARTICLE } from '../../services/CONSTANT';
import { ArticleForm } from 'pages/Articles/ArticleDialog';

jest.mock('../../services/axiosInstance');

describe('articleService', () => {
  const mockArticleData = [
    { id: 1, title: 'Test Article 1', content: 'Content 1', author: 'Author 1' },
    { id: 2, title: 'Test Article 2', content: 'Content 2', author: 'Author 2' },
  ];

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  
  afterAll(() => {
    jest.restoreAllMocks();
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllArticles', () => {
    it('resolves with data on successful response', async () => {
      (axios.get as jest.Mock).mockResolvedValue({ data: mockArticleData });
      const result = await getAllArticles();
      expect(result).toEqual(mockArticleData);
      expect(axios.get).toHaveBeenCalledWith(GET_ALL_ARTICLES);
    });

    it('rejects with an error message on failed response', async () => {
      const error = new Error('Network Error');
      (axios.get as jest.Mock).mockRejectedValue(error);

      await expect(getAllArticles()).rejects.toMatchObject({
        message: `Error in getAllArticles axios! ${error.message}`,
      });
    });

    it('rejects with SYSTEM_ERROR on unexpected error', async () => {
      (axios.get as jest.Mock).mockImplementation(() => {
        throw new Error('Unexpected Error');
      });

      await expect(getAllArticles()).rejects.toEqual(SYSTEM_ERROR);
    });
  });

  describe('deleteArticle', () => {
    it('resolves with data on successful delete', async () => {
      const articleId = 1;
      (axios.delete as jest.Mock).mockResolvedValue({ data: {} });

      const result = await deleteArticle(articleId);
      expect(result).toEqual({});
      expect(axios.delete).toHaveBeenCalledWith(`${DELETE_ARTICLE}${articleId}`);
    });

    it('rejects with an error message on failed delete', async () => {
      const error = new Error('Network Error');
      (axios.delete as jest.Mock).mockRejectedValue(error);

      await expect(deleteArticle(1)).rejects.toMatchObject({
        message: `Error in delete article axios! ${error.message}`,
      });
    });

    it('rejects with SYSTEM_ERROR on unexpected error', async () => {
      (axios.delete as jest.Mock).mockImplementation(() => {
        throw new Error('Unexpected Error');
      });

      await expect(deleteArticle(1)).rejects.toEqual(SYSTEM_ERROR);
    });
  });

  describe('updateArticle', () => {
    it('resolves with data on successful patch', async () => {
      const articleId = 1;
      const updatedData: ArticleForm = { title: 'Updated Title', content: 'Updated Content', author: 'Author 1' };
      (axios.patch as jest.Mock).mockResolvedValue({ data: { ...updatedData, id: articleId } });

      const result = await updateArticle(articleId, updatedData);
      expect(result).toEqual({ ...updatedData, id: articleId });
      expect(axios.patch).toHaveBeenCalledWith(`${PATCH_ARTICLE}${articleId}`, updatedData);
    });

    it('rejects with an error message on failed patch', async () => {
      const error = new Error('Network Error');
      (axios.patch as jest.Mock).mockRejectedValue(error);

      await expect(updateArticle(1, {} as ArticleForm)).rejects.toMatchObject({
        message: `Error in patch article axios! ${error.message}`,
      });
    });

    it('rejects with SYSTEM_ERROR on unexpected error', async () => {
      (axios.patch as jest.Mock).mockImplementation(() => {
        throw new Error('Unexpected Error');
      });

      await expect(updateArticle(1, {} as ArticleForm)).rejects.toEqual(SYSTEM_ERROR);
    });
  });

  describe('addArticle', () => {
    it('resolves with data on successful post', async () => {
      const newArticle: ArticleForm = { title: 'New Article', content: 'New Content', author: 'New Author' };
      (axios.post as jest.Mock).mockResolvedValue({ data: { ...newArticle, id: 3 } });

      const result = await addArticle(newArticle);
      expect(result).toEqual({ ...newArticle, id: 3 });
      expect(axios.post).toHaveBeenCalledWith(ADD_ARTICLE, newArticle);
    });

    it('rejects with an error message on failed post', async () => {
      const error = new Error('Network Error');
      (axios.post as jest.Mock).mockRejectedValue(error);

      await expect(addArticle({} as ArticleForm)).rejects.toMatchObject({
        message: `Error in patch article axios! ${error.message}`,
      });
    });

    it('rejects with SYSTEM_ERROR on unexpected error', async () => {
      (axios.post as jest.Mock).mockImplementation(() => {
        throw new Error('Unexpected Error');
      });

      await expect(addArticle({} as ArticleForm)).rejects.toEqual(SYSTEM_ERROR);
    });
  });
});
