import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { addUser, deleteUser } from '../../../services/usersService';
import { UserData } from '../../../pages/Users/UsersContainer';
import UserDialog from '../../../pages/Users/UserDialog';
import AppProviders from '../../../contexts/AppProvider';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../../../services/usersService');
jest.mock('../../../components/Snackbar/useSnackbar', () => jest.fn(() => jest.fn()));

// const mockEnqueueSnackbar = jest.requireMock('../../../components/Snackbar/useSnackbar');

const mockUser: UserData = {
  id: 1,
  username: 'user1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  gender: 'male',
  age: 30,
};

const renderUserDialog = (props = {}) =>
  render(
    <BrowserRouter>
      <AppProviders>
        <UserDialog
          open={true}
          onClose={jest.fn()}
          updateUsersState={jest.fn()}
          dialogAction="add"
          selectedUser={null}
          {...props}
        />
      </AppProviders>
    </BrowserRouter>,
  );

describe('UserDialog', () => {
  it('renders add user dialog correctly', () => {
    renderUserDialog({ dialogAction: 'add' });

    expect(screen.getByText('افزودن کاربر جدید')).toBeInTheDocument();
    expect(screen.getByLabelText('نام کاربری')).toBeInTheDocument();
  });

  it('renders edit user dialog correctly', () => {
    renderUserDialog({ dialogAction: 'edit', selectedUser: mockUser });

    expect(screen.getByText('ویرایش کاربر')).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockUser.username)).toBeInTheDocument();
  });

  it('renders delete user dialog correctly', () => {
    renderUserDialog({ dialogAction: 'delete', selectedUser: mockUser });

    expect(
      screen.getByText(`آیا مطمئن هستید که می‌خواهید کاربر ${mockUser.firstName} را حذف کنید؟`),
    ).toBeInTheDocument();

    expect(screen.getByText('حذف')).toBeInTheDocument();
  });

  it('calls addUser service when form is submitted in add mode', async () => {
    (addUser as jest.Mock).mockResolvedValue(mockUser);
    const updateUsersState = jest.fn();
    renderUserDialog({ dialogAction: 'add', updateUsersState });

    act(() => {
      fireEvent.change(screen.getByRole('textbox', {  name: /نام کاربری/i}), { target: { value: 'user1' } });
      fireEvent.change(screen.getByRole('textbox', {  name: 'نام'}), { target: { value: 'John' } });
      fireEvent.change(screen.getByRole('textbox', {  name: /نام خانوادگی/i}), { target: { value: 'Doe' } });
      fireEvent.change(screen.getByRole('textbox', {  name: /ایمیل/i}), { target: { value: 'john@example.com' } });
      // fireEvent.change(screen.getByRole('combobox', {  name: /جنسیت/i}), { target: { value: 'male' } });
      fireEvent.change(screen.getByRole('spinbutton', {  name: /سن/i}), { target: { value: '30' } });
      fireEvent.click(screen.getByRole('button', {  name: /افزودن/i}));
    });

    await waitFor(() => {
      expect(addUser).toHaveBeenCalledWith({
        username: 'user1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        gender: 'male',
        age: 30,
      });
      expect(updateUsersState).toHaveBeenCalledWith('add', mockUser);
    });
  });

//   it('calls updateUser service when form is submitted in edit mode', async () => {
//     (updateUser as jest.Mock).mockResolvedValue(mockUser);
//     const updateUsersState = jest.fn();
//     renderUserDialog({ dialogAction: 'edit', selectedUser: mockUser, updateUsersState });

//     fireEvent.change(screen.getByLabelText('نام خانوادگی'), { target: { value: 'Smith' } });
//     fireEvent.click(screen.getByText('تایید'));

//     await waitFor(() => {
//       expect(updateUser).toHaveBeenCalledWith(mockUser.id, {
//         ...mockUser,
//         lastName: 'Smith',
//       });
//       expect(updateUsersState).toHaveBeenCalledWith('edit', { ...mockUser, lastName: 'Smith' });
//     });
//   });

  it('calls deleteUser service when form is submitted in delete mode', async () => {
    (deleteUser as jest.Mock).mockResolvedValue({});
    const updateUsersState = jest.fn();
    renderUserDialog({ dialogAction: 'delete', selectedUser: mockUser, updateUsersState });

    fireEvent.click(screen.getByText('حذف'));

    await waitFor(() => {
      expect(deleteUser).toHaveBeenCalledWith(mockUser.id);
      expect(updateUsersState).toHaveBeenCalledWith('delete', mockUser);
    });
  });
});
