import { Box, Container, Typography } from '@mui/material';
import { manager, article } from '../../assets/image';

export const HomeContainer = () => {
  return (
    <Container maxWidth="lg">
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
      <Box component="img" src={manager} sx={{ width: 1 }}></Box>
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
  );
};
