import { Box, Button, Container, Typography } from '@mui/material';

import { manager, banner } from '../../assets/image';
import BarChartContainer from './BarChartContainer';
import PieChartContainer from './PieChartContainer';
import HomeHeader from './HomeHeader';

export const HomeContainer = () => {
  
  return (
    <Box sx={{ backgroundColor: '#0f1214' }}>
      <HomeHeader />
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
        <BarChartContainer />
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
        <PieChartContainer />
      </Container>
    </Box>
  );
};
