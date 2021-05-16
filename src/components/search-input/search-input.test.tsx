import React from 'react';
import axios from 'axios';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { SearchInput } from './search-input';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
jest;

describe('SearchInput', () => {
  it('calls api on submit', async () => {
    render(<SearchInput onForecastChange={() => {}} />);

    const searchField = screen.getByPlaceholderText('City');
    const button = screen.getByTestId('submitButton');
    fireEvent.change(searchField, { target: { value: 'odense' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith('/api/forecast?city=odense');
    });
  });
  it('sets error when unknown city', async () => {
    render(<SearchInput onForecastChange={() => {}} />);

    mockedAxios.get.mockRejectedValue(() =>
      Promise.reject(new Error('not found'))
    );

    const searchField = screen.getByPlaceholderText('City');
    const button = screen.getByTestId('submitButton');
    fireEvent.change(searchField, { target: { value: 'odense' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(
        screen.getByText('Oops we could not find that city')
      ).toBeInTheDocument();
    });
  });
});
