import CustomTableContainer from 'components/CustomTable';
import UserDialog from './UserDialog';
import { Box, Button } from '@mui/material';
import ExcelDownloadButton from '../../components/ExcelDownloadButton';

function UsersView({
  users,
  selectedUser,
  updateUsersState,
  handleOpenDialog,
  handleCloseDialog,
  openDialog,
  dialogAction,
  columnHeaders,
}) {
  return (
    <Box>
      <Box sx={{ width: 1, display: 'flex', alignItems: 'center', mb: 1 }}>
        <Button variant="outlined" color="primary" onClick={() => handleOpenDialog(null, 'add')} sx={{ mr: 1}}>
          افزودن کاربر
        </Button>
        <ExcelDownloadButton data={users} fileName='users-list' />
      </Box>
      <CustomTableContainer
        list={users.map((user, i) => ({
          ...user,
          index: i + 1,
          gender: user.gender === 'male' ? 'آقا' : 'خانم',
        }))}
        columnHeaders={columnHeaders}
      />
      <UserDialog
        open={openDialog}
        onClose={handleCloseDialog}
        updateUsersState={updateUsersState}
        dialogAction={dialogAction}
        selectedUser={selectedUser}
      />
    </Box>
  );
}

export default UsersView;
