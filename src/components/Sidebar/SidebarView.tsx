import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Drawer from '@mui/material/Drawer';
import { DRAWER_WIDTH } from 'config/CONSTANT';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'
import GroupIcon from '@mui/icons-material/Group';
import ArticleIcon from '@mui/icons-material/Article';
import FolderIcon from '@mui/icons-material/Folder';

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function SidebarView({ theme, open, handleDrawerClose }) {
  return (
    <Drawer
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': { width: `${DRAWER_WIDTH}px`, boxSizing: 'border-box' },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
        <Box component="span" sx={{ mx: 3, fontWeight: 'fontWeightSemiBold' }}>

        </Box>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <RouterLink to="/users" onClick={handleDrawerClose}>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText sx={{ textDecoration: 'none', color: 'white', }}>
                کاربران
              </ListItemText>
            </ListItemButton>
          </ListItem>
        </RouterLink>
        <RouterLink to="/articles" onClick={handleDrawerClose}>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <ArticleIcon />
              </ListItemIcon>
              <ListItemText sx={{ textDecoration: 'none', color: 'white', }}>
                مقالات
              </ListItemText>
            </ListItemButton>
          </ListItem>
        </RouterLink>
        <RouterLink to="/files" onClick={handleDrawerClose}>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
              <ListItemText sx={{ textDecoration: 'none', color: 'white', }}>
                مرکز فایل
              </ListItemText>
            </ListItemButton>
          </ListItem>
        </RouterLink>
      </List>
    </Drawer>
  );
}

export default SidebarView;
