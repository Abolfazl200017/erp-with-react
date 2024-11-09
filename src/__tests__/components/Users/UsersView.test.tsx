import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UsersView from '../../../pages/Users/UsersView';
import AppProviders from '../../../contexts/AppProvider';
import { BrowserRouter } from 'react-router-dom';

const mockUsers = [
  { id: 1, username: 'user1', firstName: 'John', lastName: 'Doe', email: 'john@example.com', gender: 'male', age: 30 },
  {
    id: 2,
    username: 'user2',
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@example.com',
    gender: 'female',
    age: 28,
  },
];

const columnHeaders = [
  { field: 'index', headerName: 'ردیف' },
  { field: 'firstName', headerName: 'نام' },
  { field: 'lastName', headerName: 'نام خانوادگی' },
  { field: 'email', headerName: 'ایمیل', minWidth: 250 },
  { field: 'gender', headerName: 'جنسیت' },
  { field: 'age', headerName: 'سن' },
];

describe('UsersView', () => {
  const props = {
    users: mockUsers,
    selectedUser: null,
    updateUsersState: jest.fn(),
    handleOpenDialog: jest.fn(),
    handleCloseDialog: jest.fn(),
    openDialog: false,
    dialogAction: null,
    columnHeaders,
  };

  it('renders users correctly', () => {
    render(
      <BrowserRouter>
        <AppProviders>
          <UsersView {...props} />
        </AppProviders>
      </BrowserRouter>,
    );
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Jane')).toBeInTheDocument();
  });

  it('opens dialog on add button click', () => {
    render(
      <BrowserRouter>
        <AppProviders>
          <UsersView {...props} />
        </AppProviders>
      </BrowserRouter>,
    );
    fireEvent.click(screen.getByText('افزودن کاربر'));
    expect(props.handleOpenDialog).toHaveBeenCalledWith(null, 'add');
  });
});
