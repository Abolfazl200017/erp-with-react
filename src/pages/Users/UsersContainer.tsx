// UsersContainer.tsx
import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { TableSkeleton } from 'components/Skeleton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { getAllUsers } from '../../services/usersService';
import UsersView from './UsersView';

export type UserData = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: 'male' | 'female';
  age: number;
};

export const UsersContainer = () => {
  const [users, setUsers] = useState<UserData[] | 'loading'>('loading');
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogAction, setDialogAction] = useState<'add' | 'edit' | 'delete' | null>(null);
  // const enqueueSnackbar = useSnackbar();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await getAllUsers();
    setUsers(data);
  };

  const updateUsersState = (type: 'add' | 'delete' | 'edit', value: UserData) => {
    switch (type) {
      case 'add':
        setUsers(users === 'loading' ? [{ ...value }] : [...users, { ...{ ...value, id: users.findIndex((user) => user.id === value.id ) > -1 ? users.length + 1 : value.id } }]);
        break;
      case 'edit':
        if (users !== 'loading') setUsers(users.map((user) => (user.id === value.id ? value : user)));
        break;
      case 'delete':
        if (users !== 'loading') setUsers(users.filter((user) => user.id != value.id));
    }
  };

  const handleOpenDialog = (user: UserData | null, action: 'add' | 'edit' | 'delete') => {
    setSelectedUser(user);
    setDialogAction(action);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  const columnHeaders: GridColDef[] = [
    { field: 'index', headerName: 'ردیف' },
    { field: 'firstName', headerName: 'نام' },
    { field: 'lastName', headerName: 'نام خانوادگی' },
    { field: 'email', headerName: 'ایمیل', minWidth: 250 },
    { field: 'gender', headerName: 'جنسیت' },
    { field: 'age', headerName: 'سن' },
    {
      field: 'actions',
      headerName: 'عملیات',
      width: 100,
      type: 'actions',
      renderCell: (params) => (
        <Box gap={1} sx={{ height: 1, display: 'flex', alignItems: 'center' }}>
          <Button
            variant="text"
            color="primary"
            sx={{ borderRadius: '50%', minWidth: 0, width: 30, height: 30, padding: 0 }}
            onClick={() =>
              handleOpenDialog({ ...params.row, gender: params.row === 'آقا' ? 'male' : 'female' }, 'edit')
            }
          >
            <EditIcon />
          </Button>
          <Button
            variant="text"
            color="error"
            sx={{ borderRadius: '50%', minWidth: 0, width: 30, height: 30, padding: 0 }}
            onClick={() => handleOpenDialog(params.row, 'delete')}
          >
            <DeleteIcon />
          </Button>
        </Box>
      ),
      sortable: false,
      filterable: false,
    },
  ];

  if (users === 'loading') return <TableSkeleton />;

  return (
    <UsersView users={users} selectedUser={selectedUser} updateUsersState={updateUsersState} handleOpenDialog={handleOpenDialog} handleCloseDialog={handleCloseDialog} openDialog={openDialog} dialogAction={dialogAction} columnHeaders={columnHeaders} />
  );
};
