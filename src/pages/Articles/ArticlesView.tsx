import React from 'react';
import { Box, Button } from '@mui/material';
import CustomTableContainer from 'components/CustomTable';
import ArticleDialog from './ArticleDialog';
import { Article } from './ArticlesContainer';
import { GridColDef } from '@mui/x-data-grid';
import ExcelDownloadButton from 'components/ExcelDownloadButton';

interface ArticlesViewProps {
  articles: Article[];
  selectedArticle: Article | null;
  updateArticlesState: (type: 'add' | 'delete' | 'edit', value: Article) => void;
  handleOpenDialog: (article: Article | null, action: 'add' | 'edit' | 'delete') => void;
  handleCloseDialog: () => void;
  openDialog: boolean;
  dialogAction: 'add' | 'edit' | 'delete' | null;
  columnHeaders: GridColDef[];
}

const ArticlesView: React.FC<ArticlesViewProps> = ({
  articles,
  selectedArticle,
  updateArticlesState,
  handleOpenDialog,
  handleCloseDialog,
  openDialog,
  dialogAction,
  columnHeaders,
}) => {
  return (
    <Box>
      <Box sx={{ width: 1, display: 'flex', alignItems: 'center', mb: 1 }}>
        <Button variant="outlined" onClick={() => handleOpenDialog(null, 'add')} sx={{ mr: 1}}>
          افزودن مقاله
        </Button>
        <ExcelDownloadButton data={articles} fileName='articles-list' />
      </Box>
      <CustomTableContainer list={articles} columnHeaders={columnHeaders} />
      <ArticleDialog
        open={openDialog}
        onClose={handleCloseDialog}
        updateArticlesState={updateArticlesState}
        dialogAction={dialogAction}
        selectedArticle={selectedArticle}
      />
    </Box>
  );
};

export default ArticlesView;
