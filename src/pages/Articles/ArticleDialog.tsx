import * as React from 'react';
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { addArticle, updateArticle, deleteArticle } from '../../services/articlesService';
import { Article } from './ArticlesContainer';

export type ArticleForm = {
  title: string;
  content: string;
  author: string;
};

interface ArticleDialogProps {
  open: boolean;
  onClose: () => void;
  updateArticlesState: (type: 'add' | 'delete' | 'edit', value: Article) => void;
  dialogAction: 'add' | 'edit' | 'delete' | null;
  selectedArticle?: Article | null;
}

const validationSchema = Yup.object({
  title: Yup.string().required('عنوان الزامی است'),
  content: Yup.string().required('محتوا الزامی است'),
  author: Yup.string().required('نویسنده الزامی است'),
});

const ArticleDialog: React.FC<ArticleDialogProps> = ({
  open,
  onClose,
  updateArticlesState,
  dialogAction,
  selectedArticle,
}) => {
  const [loading, setLoading] = React.useState(false);

  const initialValues: ArticleForm = selectedArticle || {
    title: '',
    content: '',
    author: '',
  };

  const handleSubmit = async (values: Article) => {
    if (loading) return;
    else setLoading(true);
    try {
      if (dialogAction === 'add') {
        const response = await addArticle(values);
        updateArticlesState('add', response);
      } else if (dialogAction === 'edit') {
        const response = await updateArticle(values.id, values);
        updateArticlesState('edit', response);
      } else if (dialogAction === 'delete') {
        await deleteArticle(selectedArticle!.id);
        updateArticlesState('delete', selectedArticle!);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {dialogAction === 'add' ? 'افزودن مقاله جدید' : dialogAction === 'edit' ? 'ویرایش مقاله' : 'حذف مقاله'}
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
      <DialogContent>
        {dialogAction === 'delete' ? (
          <>
            <Box>آیا از حذف مقاله {selectedArticle?.title} مطمئن هستید؟</Box>
            <DialogActions>
              <Button onClick={onClose} sx={{ color: 'white' }}>
                لغو
              </Button>
              <Button onClick={() => handleSubmit(null)} color="error">
                تایید
              </Button>
            </DialogActions>
          </>
        ) : (
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ errors }) => (
              <Form>
                <Field
                  as={TextField}
                  name="title"
                  label="عنوان"
                  fullWidth
                  margin="normal"
                  error={Boolean(errors.title)}
                  helperText={errors.title}
                />
                <Field
                  as={TextField}
                  name="content"
                  label="محتوا"
                  fullWidth
                  margin="normal"
                  multiline
                  rows={4}
                  error={Boolean(errors.content)}
                  helperText={errors.content}
                />
                <Field
                  as={TextField}
                  name="author"
                  label="نویسنده"
                  fullWidth
                  margin="normal"
                  error={Boolean(errors.author)}
                  helperText={errors.author}
                />

                <DialogActions>
                  <Button onClick={onClose} color="secondary">
                    لغو
                  </Button>
                  <Button type="submit" color="primary">
                    تایید
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ArticleDialog;
