import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from '../../src/pages/index';
import { resp } from '../__mocks__/apiResponse';
import { Forecast, mapDayliForecast } from '../../src/types/forecast';

const list = mapDayliForecast(resp as Forecast);

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: mockPush,
    };
  },
}));

const mockPush = jest.fn();

describe('Index page', () => {
  it('renders search and no forecast when no forecast', () => {
    render(<Home forecast={undefined} />);

    expect(screen.getByRole('search')).toBeInTheDocument();
    expect(screen.queryByText('Data fetched at')).not.toBeInTheDocument();
  });
  it('displays search and forecast when available', async () => {
    render(
      <Home
        forecast={{
          ...resp,
          list,
          timestamp: Date.now(),
        }}
      />
    );

    expect(screen.getByRole('search')).toBeInTheDocument();
    expect(screen.getByText('Data fetched at')).toBeInTheDocument();
  });
  it('should push url query on change forecast', async () => {
    render(<Home forecast={undefined} />);

    const button = screen.getByTestId('submitButton');
    const searchField = screen.getByPlaceholderText('City');
    fireEvent.change(searchField, { target: { value: 'odense' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/?query=Odense', undefined, {
        shallow: true,
      });
    });
  });
});
