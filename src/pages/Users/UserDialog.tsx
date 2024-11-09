// UserDialog.tsx
import * as React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Box,
  CircularProgress,
} from '@mui/material';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { addUser, updateUser, deleteUser } from '../../services/usersServices';
import useSnackbar from '../../components/Snackbar/useSnackbar';
import { UserData } from './UsersContainer';

export type UserForm = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: 'male' | 'female';
  age: number;
};

interface UserDialogProps {
  open: boolean;
  onClose: () => void;
  updateUsersState: (type: 'add' | 'delete' | 'edit', value: UserData) => void; // Callback to refresh the user list
  dialogAction: 'add' | 'edit' | 'delete' | null;
  selectedUser?: UserData | null;
}

const validationSchema = Yup.object({
  username: Yup.string().required('نام کاربری الزامی است'),
  firstName: Yup.string().required('نام الزامی است'),
  lastName: Yup.string().required('نام خانوادگی الزامی است'),
  email: Yup.string().email('ایمیل معتبر نیست').required('ایمیل الزامی است'),
  gender: Yup.mixed<'male' | 'female'>().oneOf(['male', 'female']).required('جنسیت الزامی است'),
  age: Yup.number().min(0, 'سن باید مثبت باشد').required('سن الزامی است'),
});

const UserDialog: React.FC<UserDialogProps> = ({ open, onClose, updateUsersState, dialogAction, selectedUser }) => {
  const [loading, setLoading] = React.useState(false);
  const enqueueSnackbar = useSnackbar();

  const mapUserDataToUserForm = (user: UserData): UserForm => ({
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    gender: user.gender,
    age: user.age,
  });

  const initialValues: UserForm = selectedUser
    ? mapUserDataToUserForm(selectedUser)
    : {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        gender: 'male',
        age: 0,
      };

  const handleSubmit = async (values: UserForm | null) => {
    if (loading) return;
    else setLoading(true);
    try {
      if (dialogAction === 'add') {
        const response = await addUser(values);
        enqueueSnackbar('کاربر جدید با موفقیت اضافه شد', { variant: 'success' });
        updateUsersState(dialogAction, response as UserData);
      } else if (dialogAction === 'edit' && selectedUser) {
        const response = await updateUser(selectedUser.id, values);
        enqueueSnackbar('کاربر با موفقیت ویرایش شد', { variant: 'success' });
        updateUsersState(dialogAction, response as UserData);
      } else if (dialogAction === 'delete' && selectedUser) {
        await deleteUser(selectedUser.id);
        enqueueSnackbar('کاربر با موفقیت حذف شد', { variant: 'success' });
        updateUsersState(dialogAction, selectedUser);
      }
      setLoading(false);
      onClose();
    } catch {
      setLoading(false);
      enqueueSnackbar('خطا در عملیات. لطفا دوباره تلاش کنید', { variant: 'error' });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {dialogAction === 'add' ? 'افزودن کاربر جدید' : dialogAction === 'edit' ? 'ویرایش کاربر' : 'حذف کاربر'}
      </DialogTitle>
      {loading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1300,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress color="inherit" />
        </Box>
      )}
      {dialogAction === 'delete' ? (
        <DialogContent>
          <p>آیا مطمئن هستید که می‌خواهید کاربر {selectedUser?.firstName} را حذف کنید؟</p>
          <DialogActions>
            <Button onClick={onClose} sx={{ color: 'white' }}>
              لغو
            </Button>
            <Button type="submit" color="error" onClick={() => handleSubmit(null)}>
              حذف
            </Button>
          </DialogActions>
        </DialogContent>
      ) : (
        <DialogContent>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ touched, errors, handleChange, isSubmitting }) => (
              <Form>
                <Field
                  name="username"
                  as={TextField}
                  label="نام کاربری"
                  fullWidth
                  margin="normal"
                  error={touched.username && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                  onChange={handleChange}
                />
                <Field
                  name="firstName"
                  as={TextField}
                  label="نام"
                  fullWidth
                  margin="normal"
                  error={touched.firstName && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                  onChange={handleChange}
                />
                <Field
                  name="lastName"
                  as={TextField}
                  label="نام خانوادگی"
                  fullWidth
                  margin="normal"
                  error={touched.lastName && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  onChange={handleChange}
                />
                <Field
                  name="email"
                  as={TextField}
                  label="ایمیل"
                  fullWidth
                  margin="normal"
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  onChange={handleChange}
                />
                <Field
                  name="gender"
                  as={TextField}
                  label="جنسیت"
                  select
                  fullWidth
                  margin="normal"
                  error={touched.gender && Boolean(errors.gender)}
                  helperText={touched.gender && errors.gender}
                  onChange={handleChange}
                >
                  <MenuItem value="male">آقا</MenuItem>
                  <MenuItem value="female">خانم</MenuItem>
                </Field>
                <Field
                  name="age"
                  as={TextField}
                  label="سن"
                  type="number"
                  fullWidth
                  margin="normal"
                  error={touched.age && Boolean(errors.age)}
                  helperText={touched.age && errors.age}
                  onChange={handleChange}
                />
                <DialogActions>
                  <Button onClick={onClose} color="secondary">
                    لغو
                  </Button>
                  <Button type="submit" color="primary" disabled={isSubmitting}>
                    {dialogAction === 'add' ? 'افزودن' : 'تایید'}
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default UserDialog;
