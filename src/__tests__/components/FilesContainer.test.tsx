import React from 'react';
import { act, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FilesContainer from '../../pages/Files';
import userEvent from "@testing-library/user-event";

const mockImages = [
  { id: 'img1', file: new File(['(⌐□_□)'], 'cool.png', { type: 'image/png' }) },
  { id: 'img2', file: new File(['(^_^)'], 'smile.png', { type: 'image/png' }) },
];

describe('FilesContainer', () => {
  beforeEach(() => {
    // Mock localStorage
    Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockImages));
    Storage.prototype.setItem = jest.fn();
    Storage.prototype.removeItem = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('adds images on drop', async () => {
    const { getByTestId } = render(<FilesContainer />);
    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    const input = getByTestId("dropzone") as HTMLInputElement;

    if (input) {
        act(() => {
            userEvent.upload(input, file);
        })
    }
    
    expect(localStorage.setItem).toHaveBeenCalled();
  });
});
