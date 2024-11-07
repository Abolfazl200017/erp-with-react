import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import { getAllUsers } from '../../services/userServices';
import CustomPagination from 'components/CustomPagination';
import { styled } from '@mui/system';

export type UserData = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: 'male' | 'female';
  age: number;
};

const columnHeaders = ['ردیف', 'نام', 'نام خانوادگی', 'ایمیل', 'جنسیت', 'سن'];

export const UsersListContainer = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [users, setUsers] = React.useState<UserData[] | 'loading'>('loading');

  React.useEffect(() => {
    getAllUsers().then(setUsers);
  }, []);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (users === 'loading') return <div>loading please wait</div>;

  return (
    <Root sx={{ maxWidth: 1000, width: 1, mx: 'auto' }}>
      <TableContainer component={Paper} sx={{ maxWidth: 1, overflowX: 'auto'}}>
        <Table aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              {columnHeaders.map((col) => (
                <TableCell key={col}>
                  {col}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0 ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : users).map((user: UserData, index:number) => (
              <TableRow key={user.id}>
                <TableCell>{page*rowsPerPage + index + 1 }</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.gender === 'male' ? 'آقا' : 'خانم'}</TableCell>
                <TableCell>{user.age}</TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 37 * emptyRows }}>
                <TableCell colSpan={columnHeaders.length} aria-hidden />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <CustomPagination
                rowsPerPageOptions={[5, 10, 25, { label: 'همه', value: -1 }]}
                colSpan={columnHeaders.length}
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                  select: { 'aria-label': 'rows per page' }
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Root>
  );
};

const Root = styled('div')(
  ({ theme }) => `
  table {
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid ${theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200]};
    text-align: left;
    padding: 8px;
  }

  th {
    background-color: ${theme.palette.mode === 'dark' ? theme.palette.grey[900] : '#fff'};
  }
  `,
);
