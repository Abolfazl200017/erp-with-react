// ArticlesView.tsx
import CustomTableContainer from 'components/CustomTable';
import ArticleDialog from './ArticleDialog';
import { Box, Button } from '@mui/material';
import { Article } from './ArticlesContainer';
import { GridColDef } from '@mui/x-data-grid';

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

function ArticlesView({
  articles,
  selectedArticle,
  updateArticlesState,
  handleOpenDialog,
  handleCloseDialog,
  openDialog,
  dialogAction,
  columnHeaders,
}: ArticlesViewProps) {
  return (
    <Box>
      <Box sx={{ width: 1, display: 'flex', mb: 1 }}>
        <Button variant="outlined" onClick={() => handleOpenDialog(null, 'add')}>
          افزودن مقاله
        </Button>
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
}

export default ArticlesView;
