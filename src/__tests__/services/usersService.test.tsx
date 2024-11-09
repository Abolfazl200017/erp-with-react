// userService.test.ts
import axios from '../../services/axiosInstance';
import { getAllUsers, deleteUser, updateUser, addUser } from '../../services/usersService';
import { SYSTEM_ERROR } from 'config/CONSTANT';
import { ADD_USER, DELETE_USER, GET_ALL_USERS, PATCH_USER } from '../../services/CONSTANT';
import { UserForm } from '../../pages/Users/UserDialog';

jest.mock('../../services/axiosInstance');

describe('userService', () => {
  const mockUserData = [
    { id: 1, username: 'user1', firstName: 'John', lastName: 'Doe', email: 'john@example.com', gender: 'male', age: 25 },
    { id: 2, username: 'user2', firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com', gender: 'female', age: 30 },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllUsers', () => {
    it('resolves with data on successful response', async () => {
      (axios.get as jest.Mock).mockResolvedValue({ data: mockUserData });
      const result = await getAllUsers();
      expect(result).toEqual(mockUserData);
      expect(axios.get).toHaveBeenCalledWith(GET_ALL_USERS);
    });

    it('rejects with an error message on failed response', async () => {
      const error = new Error('Network Error');
      (axios.get as jest.Mock).mockRejectedValue(error);

      await expect(getAllUsers()).rejects.toMatchObject({
        message: `Error in getAllUsers axios! ${error.message}`,
      });
    });

    it('rejects with SYSTEM_ERROR on unexpected error', async () => {
      (axios.get as jest.Mock).mockImplementation(() => {
        throw new Error('Unexpected Error');
      });

      await expect(getAllUsers()).rejects.toEqual(SYSTEM_ERROR);
    });
  });

  describe('deleteUser', () => {
    it('resolves with data on successful delete', async () => {
      const userId = 1;
      (axios.delete as jest.Mock).mockResolvedValue({ data: {} });

      const result = await deleteUser(userId);
      expect(result).toEqual({});
      expect(axios.delete).toHaveBeenCalledWith(`${DELETE_USER}${userId}`);
    });

    it('rejects with an error message on failed delete', async () => {
      const error = new Error('Network Error');
      (axios.delete as jest.Mock).mockRejectedValue(error);

      await expect(deleteUser(1)).rejects.toMatchObject({
        message: `Error in delete user axios! ${error.message}`,
      });
    });

    it('rejects with SYSTEM_ERROR on unexpected error', async () => {
      (axios.delete as jest.Mock).mockImplementation(() => {
        throw new Error('Unexpected Error');
      });

      await expect(deleteUser(1)).rejects.toEqual(SYSTEM_ERROR);
    });
  });

  describe('updateUser', () => {
    it('resolves with data on successful patch', async () => {
      const userId = 1;
      const updatedData: UserForm = { username: 'user1', firstName: 'John', lastName: 'Doe', email: 'john@example.com', gender: 'male', age: 26 };
      (axios.patch as jest.Mock).mockResolvedValue({ data: { ...updatedData, id: userId } });

      const result = await updateUser(userId, updatedData);
      expect(result).toEqual({ ...updatedData, id: userId });
      expect(axios.patch).toHaveBeenCalledWith(`${PATCH_USER}${userId}`, updatedData);
    });

    it('rejects with an error message on failed patch', async () => {
      const error = new Error('Network Error');
      (axios.patch as jest.Mock).mockRejectedValue(error);

      await expect(updateUser(1, {} as UserForm)).rejects.toMatchObject({
        message: `Error in patch user axios! ${error.message}`,
      });
    });

    it('rejects with SYSTEM_ERROR on unexpected error', async () => {
      (axios.patch as jest.Mock).mockImplementation(() => {
        throw new Error('Unexpected Error');
      });

      await expect(updateUser(1, {} as UserForm)).rejects.toEqual(SYSTEM_ERROR);
    });
  });

  describe('addUser', () => {
    it('resolves with data on successful post', async () => {
      const newUser: UserForm = { username: 'user3', firstName: 'Alice', lastName: 'Smith', email: 'alice@example.com', gender: 'female', age: 28 };
      (axios.post as jest.Mock).mockResolvedValue({ data: { ...newUser, id: 3 } });

      const result = await addUser(newUser);
      expect(result).toEqual({ ...newUser, id: 3 });
      expect(axios.post).toHaveBeenCalledWith(ADD_USER, newUser);
    });

    it('rejects with an error message on failed post', async () => {
      const error = new Error('Network Error');
      (axios.post as jest.Mock).mockRejectedValue(error);

      await expect(addUser({} as UserForm)).rejects.toMatchObject({
        message: `Error in patch user axios! ${error.message}`,
      });
    });

    it('rejects with SYSTEM_ERROR on unexpected error', async () => {
      (axios.post as jest.Mock).mockImplementation(() => {
        throw new Error('Unexpected Error');
      });

      await expect(addUser({} as UserForm)).rejects.toEqual(SYSTEM_ERROR);
    });
  });
});
