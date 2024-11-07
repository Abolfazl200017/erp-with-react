import React from 'react';
import { Box, Button, Paper } from '@mui/material';
import { getAllUsers } from '../../services/userServices';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { TableSkeleton } from 'components/Skeleton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export type UserData = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: 'male' | 'female';
  age: number;
};

const persianLocaleText = {
  noRowsLabel: 'بدون داده',
  columnMenuLabel: 'منوی ستون',
  columnMenuSortAsc: 'مرتب سازی صعودی',
  columnMenuSortDesc: 'مرتب سازی نزولی',
  columnMenuFilter: 'فیلتر',
  columnMenuHideColumn: 'مخفی کردن ستون',
  columnMenuShowColumns: 'نمایش ستون‌ها',
  footerRowSelected: (count) => `${count.toLocaleString()} سطر انتخاب شده`,
  footerTotalVisibleRows: (visibleCount, totalCount) =>
    `از ${totalCount.toLocaleString()}، ${visibleCount.toLocaleString()} سطر نشان داده شده`,
  MuiTablePagination: {
    labelRowsPerPage: 'تعداد ردیف در صفحه:',
    labelDisplayedRows: ({ from, to, count }) => `${from}–${to} از ${count !== -1 ? count : `بیشتر از ${to}`}`,
  },
};

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
    renderCell: (params) => (
      <Box gap={1} sx={{ height: 1, display: 'flex', alignItems: 'center' }}>
        <Button
          variant="text"
          color="primary"
          sx={{
            borderRadius: '50%',
            minWidth: 0,
            width: 30,
            height: 30,
            padding: 0,
          }}
          onClick={() => console.log(params.row, 'edit')}
        >
          <EditIcon />
        </Button>
        <Button
          variant="text"
          color="error"
          sx={{
            borderRadius: '50%',
            minWidth: 0,
            width: 30,
            height: 30,
            padding: 0,
          }}
          onClick={() => console.log(params.row, 'delete')}
        >
          <DeleteIcon />
        </Button>
      </Box>
    ),
    sortable: false,
    filterable: false,
  },
];

export const UsersListContainer = () => {
  const [users, setUsers] = React.useState<UserData[] | 'loading'>('loading');
  const [paginationModel, setPaginationModel] = React.useState<GridPaginationModel>({
    page: 0,
    pageSize: 5,
  });

  React.useEffect(() => {
    getAllUsers().then(setUsers);
  }, []);

  if (users === 'loading') return <TableSkeleton />;

  return (
    <Paper sx={{ maxHeight: 1, width: 1 }}>
      <DataGrid
        rows={users.map((user, i) => ({
          id: user.id,
          index: i + 1,
          firstname: user.firstName,
          lastname: user.lastName,
          email: user.email,
          gender: user.gender === 'male' ? 'آقا' : 'خانم',
          age: user.age,
        }))}
        columns={columnHeaders}
        pagination
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 20]}
        localeText={persianLocaleText}
        hideFooterSelectedRowCount
      />
    </Paper>
  );
};
