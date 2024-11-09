import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { addArticle, deleteArticle } from '../../../services/articlesService';
import { Article } from '../../../pages/Articles/ArticlesContainer';
import ArticleDialog from '../../../pages/Articles/ArticleDialog';
import AppProviders from '../../../contexts/AppProvider';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../../../services/articlesService');
jest.mock('../../../components/Snackbar/useSnackbar', () => jest.fn(() => jest.fn()));

// const mockEnqueueSnackbar = jest.requireMock('../../../components/Snackbar/useSnackbar');

const mockArticle: Article = { id: 1, title: 'article1', content: 'content of article 1', author: 'Doe' }

const renderArticleDialog = (props = {}) =>
  render(
    <BrowserRouter>
      <AppProviders>
        <ArticleDialog
          open={true}
          onClose={jest.fn()}
          updateArticlesState={jest.fn()}
          dialogAction="add"
          selectedArticle={null}
          {...props}
        />
      </AppProviders>
    </BrowserRouter>,
  );

describe('ArticleDialog', () => {
  it('renders add article dialog correctly', () => {
    renderArticleDialog({ dialogAction: 'add' });

    expect(screen.getByText('افزودن مقاله')).toBeInTheDocument();
  });

  it('renders edit article dialog correctly', () => {
    renderArticleDialog({ dialogAction: 'edit', selectedArticle: mockArticle });

    expect(screen.getByText('ویرایش مقاله')).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockArticle.title)).toBeInTheDocument();
  });

  it('renders delete article dialog correctly', () => {
    renderArticleDialog({ dialogAction: 'delete', selectedArticle: mockArticle });

    expect(
      screen.getByText(`آیا از حذف مقاله ${mockArticle.title} مطمئن هستید؟`),
    ).toBeInTheDocument();

    expect(screen.getByText('حذف')).toBeInTheDocument();
  });

  it('calls addArticle service when form is submitted in add mode', async () => {
    (addArticle as jest.Mock).mockResolvedValue(mockArticle);
    const updateArticlesState = jest.fn();
    renderArticleDialog({ dialogAction: 'add', updateArticlesState });

    act(() => {
      fireEvent.change(screen.getByRole('textbox', {  name: /عنوان/i}), { target: { value: 'article1' } });
      fireEvent.change(screen.getByRole('textbox', {  name: /محتوا/i}), { target: { value: 'content' } });
      fireEvent.change(screen.getByRole('textbox', {  name: /نویسنده/i}), { target: { value: 'john' } });
      fireEvent.click(screen.getByRole('button', {  name: /تایید/i}));
    });

    await waitFor(() => {
      expect(addArticle).toHaveBeenCalledWith({
        title: 'article1',
        content: 'content',
        author: 'john',
      });
      expect(updateArticlesState).toHaveBeenCalledWith('add', mockArticle);
    });
  });

  it('calls deleteArticle service when form is submitted in delete mode', async () => {
    (deleteArticle as jest.Mock).mockResolvedValue({});
    const updateArticlesState = jest.fn();
    renderArticleDialog({ dialogAction: 'delete', selectedArticle: mockArticle, updateArticlesState });

    fireEvent.click(screen.getByText('حذف مقاله'));

    await waitFor(() => {
      expect(deleteArticle).toHaveBeenCalledWith(mockArticle.id);
      expect(updateArticlesState).toHaveBeenCalledWith('delete', mockArticle);
    });
  });
});
