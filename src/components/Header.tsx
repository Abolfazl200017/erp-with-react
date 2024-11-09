import { DRAWER_WIDTH, WEBSITE_TITLE } from 'config/CONSTANT';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import { Box, IconButton, styled, Typography } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { Link as RouterLink } from 'react-router-dom';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        marginLeft: `${DRAWER_WIDTH}px`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

function Header({ handleDrawerOpen, open }) {
  return (
    <AppBar position="fixed" open={open}>
      <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <RouterLink to="/">
            <Box sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'white' }}>
              <Box sx={{ height: '4rem', py: 2, mr: 1 }}>
                <Box component="img" src="/images/logo.webp" sx={{ height: '100%', aspectRatio: '1 / 1' }} />
              </Box>
              <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold' }}>
                {WEBSITE_TITLE}
              </Typography>
            </Box>
          </RouterLink>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}> </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
