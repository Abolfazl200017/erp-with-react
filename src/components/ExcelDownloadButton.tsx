import { Button } from '@mui/material';
import * as XLSX from 'xlsx';

const ExcelDownloadButton = ({ data, fileName = 'data', label='دانلود به صورت اکسل' }) => {
  const handleDownload = () => {
    // Convert the data into a worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);
    
    // Create a workbook with the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Generate a binary Excel file and trigger download
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  return (
    <Button variant="outlined" color="primary" onClick={handleDownload}>
      {label}
    </Button>
  );
};

export default ExcelDownloadButton;
