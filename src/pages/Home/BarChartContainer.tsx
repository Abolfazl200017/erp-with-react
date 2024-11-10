import { Box, Typography } from '@mui/material';
import { article } from '../../assets/image';
import Chart from 'react-apexcharts';

function BarChartContainer() {
  const options = {
    chart: {
      id: 'basic-bar',
    },
    xaxis: {
      categories: [
        'فروردین',
        'اردیبهشت',
        'خرداد',
        'تیر',
        'مرداد',
        'شهریور',
        'مهر',
        'آبان',
        'آذر',
        'دی',
        'بهمن',
        'اسفند',
      ], // Jalali months
    },
  };

  const series = [
    {
      name: 'Articles View',
      data: [20, 30, 45, 50, 55, 60, 70, 65, 80, 85, 75, 90],
    },
  ];

  return (
    <Box sx={{ px: 3 }}>
      <Typography color="primary" variant="h4" sx={{ mb: 2 }}>
        آمار بازید مقالات
      </Typography>
      <Chart options={options} series={series} type="bar" width="100%" />
      <Box component="img" src={article} sx={{ width: 1 }} />
    </Box>
  );
}

export default BarChartContainer;
