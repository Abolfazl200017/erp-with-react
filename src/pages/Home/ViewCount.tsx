import { Box, Typography } from '@mui/material';
import * as React from 'react';
import ReactApexChart from 'react-apexcharts';

interface ViewCountProps {}

export const ViewCount: React.FC<ViewCountProps> = () => {
  const viewCountOptions = {
    chart: {
      toolbar: {
        show: false, // Hide the toolbar
      },
      type: 'line',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 1000,
      },
    },
    series: [
      {
        name: 'View Count',
        data: [120, 150, 170, 200, 180, 220, 250, 280, 300],
      },
    ],
    xaxis: {
      categories: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر'],
    },
  };


  return (
    <Box>
      <Typography variant='h3'>
        تعداد بازدید
      </Typography>
      <ReactApexChart options={viewCountOptions} series={viewCountOptions.series} type="line" height={350} />
    </Box>
  );
};
