import { useState, useEffect } from 'react';
import { Box, Button, Container, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Chart from 'react-apexcharts';
import { WEBSITE_TITLE } from 'config/CONSTANT';
import { manager, article, banner } from '../../assets/image';

export const HomeContainer = () => {
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowNav(window.scrollY > 100); // Show navbar after scrolling 100px
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const pieOptions = {
    chart: {
      id: 'user-age-pie',
    },
    labels: ['۰-۱۸', '۱۹-۲۹', '۳۰-۳۹', '۴۰-۴۹', '۵۰-۵۹', '۶۰+'],
  };
  
  const pieSeries = [15, 25, 40, 20, 10, 5]; 
  

  return (
    <Box sx={{ backgroundColor: '#0f1214' }}>
      <Box
        sx={{
          width: 1,
          position: 'fixed',
          top: 0,
          right: 0,
          zIndex: 10,
          backgroundColor: '#0f1214d1',
          backdropFilter: 'blur(10px)',
          transition: 'opacity 0.5s ease',
          opacity: showNav ? 1 : 0, // Fade effect based on scroll
          pointerEvents: showNav ? 'auto' : 'none', // Prevent interactions when hidden
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

      <Box sx={{ width: 1, backgroundColor: '#11171d' }}>
        <Box
          sx={{
            width: 1,
            maxWidth: 1536,
            mx: 'auto',
            aspectRatio: { md: 16 / 9},
            display: 'flex',
            flexDirection: { sm: 'column-reverse', md: 'row'},
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ textAlign: 'left', pl: { md: 5 }, mb: { sm: 5, md: 0} }}>
            <Typography
              sx={{ display: 'flex', alignItems: 'center', fontSize: { sm: '1.5rem', md: '1.5rem', lg: '2.5rem' } }}
            >
              به
              <Typography
                component="span"
                sx={{ fontWeight: 'bold', mx: 2, fontSize: { sm: '2.5rem', md: '2.5rem', lg: '3.5rem' } }}
                color="primary"
              >
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
          <Box component="img" src={banner} sx={{ height: 1 }} />
        </Box>
      </Box>

      {/* <Box sx={{ mt: 1, pt: 1, borderTop: 1, borderColor: 'grey' }} /> */}
      <Container maxWidth="lg">
        <Box
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: 1, aspectRatio: 16 / 9 }}
        >
          <Box component="img" src={manager} sx={{ width: 3 / 5 }} />
          <Typography
            sx={{ display: 'flex', alignItems: 'center', fontSize: { sm: '1rem', md: '1.5rem', lg: '2.5rem' } }}
          >
            از ابزار تحلیل استفاده کنید
          </Typography>
        </Box>
        <Box sx={{ px: 3 }}>
          <Typography color="primary" variant="h4" sx={{ mb: 2 }}>
            آمار بازید مقالات
          </Typography>
          <Chart options={options} series={series} type="bar" width="100%" />
          <Box component="img" src={article} sx={{ width: 1 }} />
        </Box>
        <Box sx={{ display: 'flex', width: 1, px: { xs: 2, sm: 4, md: 6 }, pt: 20 }}>
          <Typography
            variant="h5"
            className="gradient"
            sx={{
              borderRadius: 7,
              width: 'auto',
              p: 2,
              fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
            }}
          >
            {`کاربران خود را بهتر بشناسید`}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', width: 1, px: { xs: 2, sm: 4, md: 6 }, pt: 3 }}>
          <Typography
            variant="h5"
            className="gradient"
            sx={{
              borderRadius: 7,
              width: 'auto',
              p: 2,
              mt: 3,
              fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
            }}
          >
            در جداول اطلاعات مورد نیاز خود را بیابید
          </Typography>
        </Box>
        <Box sx={{ mx: 'auto', width: 3/4, mt: 20, mb:10 }}>
          <Typography color="primary" variant="h4" sx={{ mb: 2 }}>
            میانگین سنی کاربران
          </Typography>
          <Chart options={pieOptions} series={pieSeries} type='pie' width="100%" />
        </Box>
      </Container>
    </Box>
  );
};
