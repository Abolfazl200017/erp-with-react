import { Box, Typography } from '@mui/material';
import Chart from 'react-apexcharts';

function PieChartContainer() {
  const options = {
    chart: {
      id: 'user-age-pie',
    },
    labels: ['۰-۱۸', '۱۹-۲۹', '۳۰-۳۹', '۴۰-۴۹', '۵۰-۵۹', '۶۰+'],
  };

  const series = [15, 25, 40, 20, 10, 5];

  return (
    <Box sx={{ mx: 'auto', width: 3 / 4, mt: 20, mb: 10 }}>
      <Typography color="primary" variant="h4" sx={{ mb: 2 }}>
        میانگین سنی کاربران
      </Typography>
      <Chart options={options} series={series} type="pie" width="100%" />
    </Box>
  );
}

export default PieChartContainer;
