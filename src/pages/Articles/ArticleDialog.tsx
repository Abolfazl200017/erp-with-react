import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { addArticle, updateArticle, deleteArticle } from '../../services/articlesService';
import { Article } from './ArticlesContainer';

export type ArticleForm = {
    title: string;
    content: string;
    author: string;
    date: string;
}

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
  date: Yup.string().required('تاریخ الزامی است'),
});

const ArticleDialog: React.FC<ArticleDialogProps> = ({
  open,
  onClose,
  updateArticlesState,
  dialogAction,
  selectedArticle,
}) => {
  const initialValues: Article = selectedArticle || {
    id: 0,
    title: '',
    content: '',
    author: '',
    date: '',
  };

  const handleSubmit = async (values: Article) => {
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
      onClose();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {dialogAction === 'add' ? 'افزودن مقاله جدید' : dialogAction === 'edit' ? 'ویرایش مقاله' : 'حذف مقاله'}
      </DialogTitle>
      <DialogContent>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ errors }) => (
            <Form>
              <Field as={TextField} name="title" label="عنوان" fullWidth margin="normal" error={Boolean(errors.title)} helperText={errors.title} />
              <Field as={TextField} name="content" label="محتوا" fullWidth margin="normal" multiline rows={4} error={Boolean(errors.content)} helperText={errors.content} />
              <Field as={TextField} name="author" label="نویسنده" fullWidth margin="normal" error={Boolean(errors.author)} helperText={errors.author} />
              <Field as={TextField} name="date" label="تاریخ" fullWidth margin="normal" error={Boolean(errors.date)} helperText={errors.date} />
              <DialogActions>
                <Button onClick={onClose} color="secondary">لغو</Button>
                <Button type="submit" color="primary">تایید</Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default ArticleDialog;
