import React from 'react';
import axios from 'axios';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from '../../src/pages/index';
import { resp } from '../__mocks__/apiResponse';
import { Forecast, mapDayliForecast } from '../../src/types/forecast';

const list = mapDayliForecast(resp as Forecast);

jest.mock('next/dist/client/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: () => {},
    };
  },
}));

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Index page', () => {
  it('renders search and no forecast when no forecast', () => {
    render(<Home forecast={undefined} />);

    expect(screen.getByRole('search')).toBeInTheDocument();
    expect(screen.queryByText('Data fetched at')).not.toBeInTheDocument();
  });
  it('displays forecast when available', async () => {
    render(
      <Home
        forecast={{
          ...resp,
          list,
          timestamp: Date.now(),
        }}
      />
    );

    expect(screen.getByText('Data fetched at')).toBeInTheDocument();
  });
});
