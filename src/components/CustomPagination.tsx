import TablePagination from '@mui/material/TablePagination';
import { styled } from '@mui/system';

const CustomTablePagination = styled(TablePagination)`
  & .MuiTablePagination-toolbar {
    display: flex;
    // flex-direction: column;
    // align-items: flex-start;
    gap: 10px;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .MuiTablePagination-selectLabel {
    margin: 0;
  }

  & .MuiTablePagination-displayedRows {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .MuiTablePagination-spacer {
    display: none;
  }

  & .MuiTablePagination-actions {
    display: flex;
    gap: 0.25rem;
  }
`;

const CustomPagination = (props) => {
  return (
    <CustomTablePagination
      {...props}
      labelRowsPerPage="تعداد ردیف‌ها در صفحه:"
      labelDisplayedRows={({ from, to, count }) =>
        `${from} - ${to} از ${count === -1 ? 'بیش از' : count} ردیف`
      }
      slotProps={{
        actions: {
          nextIconButtonText: "صفحه بعدی",
          backIconButtonText: "صفحه قبلی"
        }
      }}
    />
  );
};

export default CustomPagination;
