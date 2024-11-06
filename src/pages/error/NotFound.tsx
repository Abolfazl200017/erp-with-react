import { useNavigate } from 'react-router-dom';
import { notFoundImg } from '../../assets/image';
import { Box, Button } from '@mui/material';

function NotFound() {
  const navigate = useNavigate();
  const backToHome = () => navigate('/');

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: { xs: '90%', sm: '75%', md: '500px' },
      }}
    >
      <Box component="img" src={notFoundImg} alt="not-found" sx={{ width: '100%', maxWidth: '500px' }} />
      <Button onClick={backToHome}> بازگشت به خانه </Button>
    </Box>
  );
}

export default NotFound;
