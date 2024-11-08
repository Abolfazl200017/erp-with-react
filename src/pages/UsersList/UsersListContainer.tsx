import React, { useState, useEffect } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { getAllUsers, deleteUser, updateUser } from '../../services/usersServices';
import { GridColDef } from '@mui/x-data-grid';
import { TableSkeleton } from 'components/Skeleton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { UserData } from '../../redux/users/usersSlice';
import CustomTableContainer from 'components/CustomTable';

export const UsersListContainer = () => {
  const [users, setUsers] = useState<UserData[] | 'loading'>('loading');
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogAction, setDialogAction] = useState<'edit' | 'delete' | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await getAllUsers();
    setUsers(data);
  };

  const handleOpenDialog = (user: UserData, action: 'edit' | 'delete') => {
    setSelectedUser(user);
    setDialogAction(action);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
    setDialogAction(null);
  };

  const handleConfirmAction = async () => {
    if (dialogAction === 'delete' && selectedUser) {
      await deleteUser(selectedUser.id); // Assume deleteUser is an API service function
      if (users !== 'loading') setUsers(users.filter((user) => user.id !== selectedUser.id));
    } else if (dialogAction === 'edit' && selectedUser) {
      await updateUser(selectedUser.id, selectedUser); // Call API with updated data
      await fetchUsers(); // Refresh the list after update
    }
    handleCloseDialog();
  };

  if (users === 'loading') return <TableSkeleton />;

  const columnHeaders: GridColDef[] = [
    { field: 'index', headerName: 'ردیف' },
    { field: 'firstname', headerName: 'نام' },
    { field: 'lastname', headerName: 'نام خانوادگی' },
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
            onClick={() => handleOpenDialog(params.row, 'edit')}
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

  return (
    <>
      <CustomTableContainer
        list={users.map((user, i) => ({
          id: user.id,
          index: i + 1,
          firstname: user.firstName,
          lastname: user.lastName,
          email: user.email,
          gender: user.gender === 'male' ? 'آقا' : 'خانم',
          age: user.age,
        }))}
        columnHeaders={columnHeaders}
      />
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{dialogAction === 'delete' ? 'تایید حذف' : 'ویرایش کاربر'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {dialogAction === 'delete'
              ? `آیا مطمئن هستید که می‌خواهید کاربر ${selectedUser?.firstName} را حذف کنید؟`
              : `آیا می‌خواهید اطلاعات کاربر ${selectedUser?.firstName} را ویرایش کنید؟`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            لغو
          </Button>
          <Button onClick={handleConfirmAction} color="primary" autoFocus>
            {dialogAction === 'delete' ? 'حذف' : 'تایید'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
