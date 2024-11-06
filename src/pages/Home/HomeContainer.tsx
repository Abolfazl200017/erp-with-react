import { Box } from '@mui/material';
import { todoListHome } from '../../assets/image';

export const HomeContainer = () => {
  return (
    <Box
      sx={{ marginY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box sx={{ width: '75%' }}>
        <Box component="img" src={todoListHome} alt="todo-list" sx={{ width: '100%' }} />
      </Box>
    </Box>
  );
};
