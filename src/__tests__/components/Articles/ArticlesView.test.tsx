import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ArticlesView from '../../../pages/Articles/ArticlesView';
import AppProviders from '../../../contexts/AppProvider';
import { BrowserRouter } from 'react-router-dom';

const mockArticles = [{ id: 1, title: 'article1', content: 'content of article 1', author: 'Doe' }];

const columnHeaders = [
  { field: 'title', headerName: 'عنوان' },
  { field: 'author', headerName: 'نویسنده' },
  { field: 'content', headerName: 'خلاصه محتوا' },
  { field: 'actions', headerName: 'عملیات' },
];

describe('ArticlesView', () => {
  const props = {
    articles: mockArticles,
    selectedArticle: null,
    updateArticlesState: jest.fn(),
    handleOpenDialog: jest.fn(),
    handleCloseDialog: jest.fn(),
    openDialog: false,
    dialogAction: null,
    columnHeaders,
  };

  it('renders articles correctly', () => {
    render(
      <BrowserRouter>
        <AppProviders>
          <ArticlesView {...props} />
        </AppProviders>
      </BrowserRouter>,
    );
    expect(screen.getByText('article1')).toBeInTheDocument();
  });

  it('opens dialog on add button click', () => {
    render(
      <BrowserRouter>
        <AppProviders>
          <ArticlesView {...props} />
        </AppProviders>
      </BrowserRouter>,
    );
    fireEvent.click(screen.getByText('افزودن مقاله'));
    expect(props.handleOpenDialog).toHaveBeenCalledWith(null, 'add');
  });
});
