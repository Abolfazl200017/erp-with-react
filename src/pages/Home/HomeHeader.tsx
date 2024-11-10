import * as React from "react";
import { Link as RouterLink } from 'react-router-dom';
import { WEBSITE_TITLE } from 'config/CONSTANT';
import { Box, Link, Typography } from "@mui/material";

function HomeHeader () {
    const [showNav, setShowNav] = React.useState(false);

    React.useEffect(() => {
      const handleScroll = () => {
        setShowNav(window.scrollY > 100); // Show navbar after scrolling 100px
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
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
            to="/users"
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
    )
}

export default HomeHeader