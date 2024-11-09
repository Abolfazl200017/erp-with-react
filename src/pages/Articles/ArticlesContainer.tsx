import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { TableSkeleton } from 'components/Skeleton';
import ArticlesView from './ArticlesView';
import { getAllArticles } from '../../services/articlesService';

export type Article = {
    id: number;
    title: string;
    content: string;
    author: string;
    date: string;
}

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
    { field: 'title', headerName: 'عنوان' },
    { field: 'author', headerName: 'نویسنده' },
    { field: 'date', headerName: 'تاریخ' },
    {
      field: 'actions',
      headerName: 'عملیات',
      width: 100,
      renderCell: (params) => (
        <Box>
          <Button onClick={() => handleOpenDialog(params.row, 'edit')}>Edit</Button>
          <Button onClick={() => handleOpenDialog(params.row, 'delete')}>Delete</Button>
        </Box>
      ),
      sortable: false,
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
