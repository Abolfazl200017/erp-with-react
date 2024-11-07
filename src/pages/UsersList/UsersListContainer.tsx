import React from 'react';
import { Paper } from '@mui/material';
import { getAllUsers } from '../../services/userServices';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';

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
  footerRowSelected: count => `${count.toLocaleString()} سطر انتخاب شده`,
  footerTotalVisibleRows: (visibleCount, totalCount) =>
    `از ${totalCount.toLocaleString()}، ${visibleCount.toLocaleString()} سطر نشان داده شده`,
  MuiTablePagination: {
    labelRowsPerPage: 'تعداد ردیف در صفحه:',
    labelDisplayedRows: ({ from, to, count }) =>
      `${from}–${to} از ${count !== -1 ? count : `بیشتر از ${to}`}`,
  },
};

const columnHeaders: GridColDef[] = [
  { field: 'index', headerName: 'ردیف' },
  { field: 'firstname', headerName: 'نام' },
  { field: 'lastname', headerName: 'نام خانوادگی' },
  { field: 'email', headerName: 'ایمیل', minWidth: 250 },
  { field: 'gender', headerName: 'جنسیت' },
  { field: 'age', headerName: 'سن' },
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

  if (users === 'loading') return <div>loading please wait</div>;

  return (
    <Paper sx={{ maxHeight: 1, width: '100%' }}>
      <DataGrid
        rows={users.map((user, i) => ({
          id: user.id,
          index: i + 1,
          firstname: user.firstName,
          lastname: user.lastName,
          email: user.email,
          gender: user.gender,
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
