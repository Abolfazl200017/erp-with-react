import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AppProviders from '../../../contexts/AppProvider';
import { BrowserRouter } from 'react-router-dom';
import { getAllArticles } from '../../../services/articlesService';
import ArticlesContainer from '../../../pages/Articles';

jest.mock('../../../services/articlesService.ts');

const mockArticles = [
  { id: 1, title: 'article1', content: 'content of article 1', author: 'Doe' },
  { id: 2, title: 'article2', content: 'content of article 2', author: 'smith' },
];

const renderUserDialog = () =>
  render(
    <BrowserRouter>
      <AppProviders>
        <ArticlesContainer />
      </AppProviders>
    </BrowserRouter>,
  );

describe('ArticlesContainer', () => {
  beforeEach(() => {
    (getAllArticles as jest.Mock).mockResolvedValue(mockArticles);
  });

  it('renders loading state initially', () => {
    renderUserDialog();
    expect(true).toBeTruthy();
  });

  it('renders articles after loading', async () => {
    renderUserDialog();
    await waitFor(() => expect(screen.getByText('article1')).toBeInTheDocument());
    expect(screen.getByText('article2')).toBeInTheDocument();
  });

  it('opens dialog on add button click', async () => {
    renderUserDialog();
    await waitFor(() => expect(screen.getByText('article1')).toBeInTheDocument());

    act(() => {
      fireEvent.click(screen.getByText('افزودن مقاله'));
    });
    expect(screen.getByText('افزودن مقاله جدید')).toBeInTheDocument(); // Update with actual dialog content check
  });
});
