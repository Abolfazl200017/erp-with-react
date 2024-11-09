import { Paper } from "@mui/material";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import * as React from "react";

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CustomTableContainer = ({ list, columnHeaders }: { list: any[], columnHeaders:GridColDef[] }) => {
  const [paginationModel, setPaginationModel] = React.useState<GridPaginationModel>({
    page: 0,
    pageSize: 5,
  });

  const getTableHeight = () => paginationModel.pageSize <= list.length && paginationModel.page+1 >= list.length / paginationModel.pageSize ? (paginationModel.pageSize *52 )+ 111 : 200
  
  const getTableMinHeight = () => {
    console.log((Math.min( paginationModel.pageSize, list.length) * 52) + 111)
    return (Math.min( paginationModel.pageSize, list.length) * 52) + 111
  }

  return (
    <Paper sx={{ maxHeight: 800, width: 1, minHeight: getTableMinHeight(), height: getTableHeight() }}>
      <DataGrid
        rows={list}
        columns={columnHeaders}
        pagination
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 20]}
        localeText={persianLocaleText}
        hideFooterSelectedRowCount
      />
    </Paper>
  )
};
