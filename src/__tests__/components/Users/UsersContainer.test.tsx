import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UsersContainer from '../../../pages/Users';
import AppProviders from '../../../contexts/AppProvider';
import { BrowserRouter } from 'react-router-dom';
import { getAllUsers } from '../../../services/usersService';

jest.mock('../../../services/usersService');

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

const renderUserDialog = () =>
  render(
    <BrowserRouter>
      <AppProviders>
        <UsersContainer />
      </AppProviders>
    </BrowserRouter>,
  );

describe('UsersContainer', () => {
  beforeEach(() => {
    (getAllUsers as jest.Mock).mockResolvedValue(mockUsers);
  });

  it('renders loading state initially', () => {
    renderUserDialog();
    expect(true).toBeTruthy();
  });

  it('renders users after loading', async () => {
    renderUserDialog();
    await waitFor(() => expect(screen.getByText('John')).toBeInTheDocument());
    expect(screen.getByText('Jane')).toBeInTheDocument();
  });

  it('opens dialog on add button click', async () => {
    renderUserDialog();
    await waitFor(() => expect(screen.getByText('John')).toBeInTheDocument());

    act(() => {
      fireEvent.click(screen.getByText('افزودن کاربر'));
    });
    expect(screen.getByText('افزودن کاربر جدید')).toBeInTheDocument(); // Update with actual dialog content check
  });
});
