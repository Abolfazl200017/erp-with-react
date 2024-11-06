import * as React from 'react';
import { Box, Button, Divider } from '@mui/material';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import ShowTaskDialog from './ShowTask';
import { useAppDispatch } from '../../redux/hooks';
import { doneTodo } from '../../redux/todos/todosSlices';

function TaskList({ category, todos }) {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const dispatch = useAppDispatch();
  const setDoneTodo = (id: string) => dispatch(doneTodo({ category, id }));

  return (
    <>
      {todos.map(([id, todo]) => {
        return (
          <Box key={id} sx={todo.isDone ? { color: 'secondary.main', '&:hover': { color: 'secondary.main' } } : {}}>
            <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                transition: 'background-color 0.3s',
                '&:hover': { backgroundColor: 'rgba(15, 23, 42, 0.3)' },
                py: 3,
                px: 1,
              }}
            >
              <Button onClick={() => setDoneTodo(id)}>
                {!todo.isDone ? <CircleOutlinedIcon /> : <CheckCircleOutlineOutlinedIcon />}
              </Button>
              <ShowTaskDialog
                open={open}
                handleOpen={handleOpen}
                handleClose={handleClose}
                title={todo.title}
                body={todo.body}
              />
            </Box>
          </Box>
        );
      })}
    </>
  );
}
export default TaskList;
