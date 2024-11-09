import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { TableSkeleton } from 'components/Skeleton';
import ArticlesView from './ArticlesView';
import { getAllArticles } from '../../services/articlesService';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export type Article = {
  id: number;
  title: string;
  content: string;
  author: string;
};

export const ArticlesContainer = () => {
  const [articles, setArticles] = useState<Article[] | 'loading'>('loading');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogAction, setDialogAction] = useState<'add' | 'edit' | 'delete' | null>(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    const data = await getAllArticles();
    setArticles(data);
  };

  const updateArticlesState = (type: 'add' | 'delete' | 'edit', value: Article) => {
    if (articles === 'loading') return;
    handleCloseDialog()
    switch (type) {
      case 'add':
        setArticles([...articles, value]);
        break;
      case 'edit':
        setArticles(articles.map(article => article.id === value.id ? value : article));
        break;
      case 'delete':
        setArticles(articles.filter(article => article.id !== value.id));
        break;
      }
  };

  const handleOpenDialog = (article: Article | null, action: 'add' | 'edit' | 'delete') => {
    setSelectedArticle(article);
    setDialogAction(action);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedArticle(null);
  };

  const columnHeaders: GridColDef[] = [
    { field: 'title', headerName: 'عنوان', width: 150 },
    { field: 'author', headerName: 'نویسنده', width: 120 },
    {
      field: 'content',
      headerName: 'خلاصه محتوا',
      width: 200,
      renderCell: (params) => (
        <span>{params.row.content.slice(0, 50)}...</span> // Show a short preview
      ),
    },
    {
      field: 'actions',
      headerName: 'عملیات',
      width: 100,
      type: 'actions',
      renderCell: (params) => (
        <Box gap={1} sx={{ height: 1, display: 'flex', alignItems: 'center' }}>
          <Button
            variant="text"
            color="primary"
            sx={{ borderRadius: '50%', minWidth: 0, width: 30, height: 30, padding: 0 }}
            onClick={() => handleOpenDialog(params.row, 'edit')}
          >
            <EditIcon />
          </Button>
          <Button
            variant="text"
            color="error"
            sx={{ borderRadius: '50%', minWidth: 0, width: 30, height: 30, padding: 0 }}
            onClick={() => handleOpenDialog(params.row, 'delete')}
          >
            <DeleteIcon />
          </Button>
        </Box>
      ),
      sortable: false,
      filterable: false,
    },
  ];

  if (articles === 'loading') return <TableSkeleton />;

  return (
    <ArticlesView
      articles={articles}
      selectedArticle={selectedArticle}
      updateArticlesState={updateArticlesState}
      handleOpenDialog={handleOpenDialog}
      handleCloseDialog={handleCloseDialog}
      openDialog={openDialog}
      dialogAction={dialogAction}
      columnHeaders={columnHeaders}
    />
  );
};
