import { Box, Button, Container, Link, Typography } from '@mui/material';
import { manager, article, banner } from '../../assets/image';
import Chart from 'react-apexcharts';
import { Link as RouterLink } from 'react-router-dom';
import { WEBSITE_TITLE } from 'config/CONSTANT';

export const HomeContainer = () => {
  const options = {
    chart: {
      id: 'basic-bar',
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
    },
  };
  const series = [
    {
      name: 'series-1',
      data: [30, 40, 45, 50, 49, 60, 70, 91],
    },
  ];

  return (
    <Box sx={{ backgroundColor: '#0f1214' }}>
      <Box
        sx={{
          width: 1,
          position: 'fixed',
          top: 0,
          right: 0,
          backgroundColor: '#0f1214d1',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Box sx={{ width: 1, maxWidth: 1536, px: 16, mx: 'auto', display: 'flex', alignItems: 'center' }}>
          <Link
            to="/"
            component={RouterLink}
            underline="none"
            sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'white', mr: 3 }}
          >
            <Box sx={{ height: '4rem', py: 2, mr: 1 }}>
              <Box component="img" src="/images/logo.webp" sx={{ height: '100%', aspectRatio: '1 / 1' }} />
            </Box>
            <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold' }}>
              {WEBSITE_TITLE}
            </Typography>
          </Link>
          <Link
            component={RouterLink}
            to="/user"
            underline="none"
            sx={{ color: 'white', mx: 1, px: 1, py: 2, fontSize: '1.1rem' }}
          >
            کاربران
          </Link>
          <Link
            component={RouterLink}
            to="/articles"
            underline="none"
            sx={{ color: 'white', mx: 1, px: 1, py: 2, fontSize: '1.1rem' }}
          >
            مقالات
          </Link>
          <Link
            component={RouterLink}
            to="/files"
            underline="none"
            sx={{ color: 'white', mx: 1, px: 1, py: 2, fontSize: '1.1rem' }}
          >
            مرکز فایل
          </Link>
        </Box>
      </Box>
      <Box sx={{ width: 1 }}>
        <Box
          sx={{
            width: 1,
            maxWidth: 1536,
            mx: 'auto',
            aspectRatio: 16 / 9,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ textAlign: 'left', pl: 5 }}>
            <Typography
              sx={{
                display: 'flex',
                alignItems: 'center',
                fontSize: {
                  sm: '1rem',
                  md: '1.5rem',
                  lg: '2.5rem',
                },
              }}
            >
              به
              <br />
              <Typography sx={{ fontWeight: 'bold', mx: 2, fontSize: {
                  sm: '1.5rem',
                  md: '2.5rem',
                  lg: '3.5rem',
                }, }} color="primary">
                مدیرم
              </Typography>
              خوش آمدید
            </Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>
              مدیریت افراد ، مقالات و تحلیل همه در اینجا !
            </Typography>
            <Button variant="contained" sx={{ mt: 2, fontWeight: 'bold' }}>
              برو به مقالات
            </Button>
          </Box>
          <Box component="img" src={banner} sx={{ height: 1 }}></Box>
        </Box>
      </Box>
      <Box sx={{ mt: 1, pt: 1, borderTop: 1, borderColor: 'grey' }}></Box>
      <Container maxWidth="lg">
        <Box
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: 1, aspectRatio: 16 / 9 }}
        >
          <Box component="img" src={manager} sx={{ height: 1 }}></Box>
          <Typography variant="h3" sx={{ fontSize: '1.5rem' }}>
            به مدیرم خوش آمدید
            <br />
            چه خبر
          </Typography>
        </Box>
        <Chart options={options} series={series} type="bar" width="500" />
        <Box
          sx={{
            display: 'flex',
            width: 1,
            px: { xs: 2, sm: 4, md: 6 },
            pt: 3,
          }}
        >
          <Typography
            variant="h5"
            className="gradient"
            sx={{
              borderRadius: 7,
              width: 'auto',
              p: 2,
              fontSize: { xs: '1rem', sm: '1.5rem', md: '2rem' },
            }}
          >
            {`به مدیرم خوش آمدید :)`}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            // justifyContent: 'flex-end',
            width: 1,
            px: { xs: 2, sm: 4, md: 6 },
            pt: 3,
          }}
        >
          <Typography
            variant="h5"
            className="gradient"
            sx={{
              borderRadius: 7,
              width: 'auto',
              p: 2,
              mt: 3,
              fontSize: { xs: '1rem', sm: '1.5rem', md: '2rem' },
            }}
          >
            کمی به آمار مقالات نگاهی بیندازیم
          </Typography>
        </Box>
        <Box component="img" src={article} sx={{ width: 1 }}></Box>
      </Container>
    </Box>
  );
};
