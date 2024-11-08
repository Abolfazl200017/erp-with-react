// UsersListContainer.tsx
import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { getAllUsers } from '../../services/usersServices';
import { GridColDef } from '@mui/x-data-grid';
import { TableSkeleton } from 'components/Skeleton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { UserData } from '../../redux/users/usersSlice';
import CustomTableContainer from 'components/CustomTable';
// import useSnackbar from '../../components/Snackbar/useSnackbar';
import UserDialog from './UserDialog';

export const UsersListContainer = () => {
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

  const handleOpenDialog = (user: UserData | null, action: 'add' | 'edit' | 'delete') => {
    setSelectedUser(user);
    setDialogAction(action);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
    setDialogAction(null);
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
            onClick={() => handleOpenDialog({ ...params.row, gender: params.row === 'آقا' ? 'male' : 'female'}, 'edit')}
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
    <Box>
      <Box sx={{ width: 1, display: 'flex', mb: 1 }}>
        <Button variant="outlined" color="primary" onClick={() => handleOpenDialog(null, 'add')}>
          افزودن کاربر
        </Button>
      </Box>
      <CustomTableContainer
        list={users.map((user, i) => ({
          id: user.id,
          index: i + 1,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          gender: user.gender === 'male' ? 'آقا' : 'خانم',
          age: user.age,
        }))}
        columnHeaders={columnHeaders}
      />
      <UserDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onUserModified={fetchUsers}
        dialogAction={dialogAction}
        selectedUser={selectedUser}
      />
    </Box>
  );
};
