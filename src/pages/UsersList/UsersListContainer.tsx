import React from 'react';
import { Box, Paper, Skeleton, useTheme } from '@mui/material';
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
];

export const UsersListContainer = () => {
  const [users, setUsers] = React.useState<UserData[] | 'loading'>('loading');
  const [paginationModel, setPaginationModel] = React.useState<GridPaginationModel>({
    page: 0,
    pageSize: 5,
  });
  const theme = useTheme();

  React.useEffect(() => {
    getAllUsers().then(setUsers);
  }, []);

  if (users === 'loading')
    return (
      <Box sx={{ width: 1, border: 1, borderColor: theme.palette.grey[600], borderRadius: 1 }}>
        <Box sx={{ backgroundColor: theme.palette.background.default, width: 1, height: 52, p: 1 }}>
          <Skeleton sx={{ width: 1, height: 1 }} />
        </Box>
        {Array.from({ length: 5 }, (_, i) => i + 1).map((key) => (
          <Box
            key={key}
            sx={{
              width: 1,
              height: 52,
              backgroundColor: theme.palette.darkCardBG.main,
              p: 1,
              borderTop: 1,
              borderColor: theme.palette.grey[600],
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Skeleton sx={{ width: 1 / 5, height: 1 }} />
            <Skeleton sx={{ width: 1 / 5, height: 1 }} />
            <Skeleton sx={{ width: 2 / 5, height: 1 }} />
          </Box>
        ))}
      </Box>
    );

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
