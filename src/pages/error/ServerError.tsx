import { Box, Button } from '@mui/material';
import { serverErrorImg } from '../../assets/image';
import { useNavigate } from 'react-router-dom';

function ServerError() {
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
      }}
    >
      <Box
        component="img"
        src={serverErrorImg}
        alt="not-found"
        sx={{ width: '90%', '@media (min-width: 768px)': { width: '75%' }, maxWidth: '500px' }}
      />
      <Button onClick={backToHome}> بازگشت به خانه </Button>
    </Box>
  );
}

export default ServerError;
