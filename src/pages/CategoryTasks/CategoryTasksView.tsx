import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddTaskDialog from './AddTask';
import { Box, Button, Divider, Typography } from '@mui/material';
import TaskList from './TaskList';

function CategoryTasksView({ name, todos, isDialogOpen, openDialog, closeDialog }) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <Box sx={{ width: '100%', textAlign: 'start', px: 16 }}>
      <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
        {name}
      </Typography>
      <TaskList category={name} todos={Object.entries(todos[name].todos)} /> <Divider sx={{ marginTop: 2 }} />
      <Button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{ py: 3 }}
        onClick={openDialog}
      >
        <Typography
          component="span"
          sx={{ color: isHovered ? 'text.primary' : 'secondary.main', transition: 'color 0.3s', ml: 2 }}
        >
          افزودن وظیفه
        </Typography>
        {isHovered ? <AddCircleIcon color="primary" /> : <AddIcon color="primary" />}
      </Button>
      <AddTaskDialog open={isDialogOpen} handleClose={closeDialog} categoryName={name} />
    </Box>
  );
}

export default CategoryTasksView;
