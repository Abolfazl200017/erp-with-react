import { Box, Typography } from '@mui/material';
import * as React from 'react';
import ReactApexChart from 'react-apexcharts';

interface UsersAgeProps {}

export const UsersAge: React.FC<UsersAgeProps> = () => {
  const userAgeOptions = {
    chart: {
      toolbar: {
        show: false, // Hide the toolbar
      },
      type: 'bar',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 1000,
      },
    },
    series: [
      {
        name: 'User Age',
        data: [2, 25, 30, 36, 35, 18, 12, 7, 5],
      },
    ],
    xaxis: {
      categories: ['۰-۱۰', '۱۰-۲۰', '۲۰-۳۰', '۳۰-۴۰', '۴۰-۵۰', '۵۰-۶۰', '۶۰-۷۰', '۷۰-۸۰', '۸۰+'],
    },
  };

  return (
    <Box>
      <Typography variant="h3">سن کاربران</Typography>
      <ReactApexChart options={userAgeOptions} series={userAgeOptions.series} type="bar" height={350} />
    </Box>
  );
};
