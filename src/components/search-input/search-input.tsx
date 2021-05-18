import axios from 'axios';
import { useState } from 'react';
import { Forecast } from '../../types/forecast';

interface Props {
  onForecastChange: (forecast: Forecast) => void;
}

export function SearchInput({ onForecastChange }: Props) {
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getForecast(search);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const getForecast = async (city: string = search) => {
    try {
      const response = await axios.get<Forecast>(`/api/forecast?city=${city}`);

      setError('');
      onForecastChange(response.data);
    } catch (error) {
      setError('Oops we could not find that city');
      onForecastChange(null);
    }
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      try {
        const response = await axios.get<Forecast>(
          `/api/forecast?lat=${coords.latitude}&long=${coords.longitude}`
        );

        setError('');
        setSearch(response.data.city.name);
        onForecastChange(response.data);
      } catch (error) {
        setError('Oops we could not find that location');
        setSearch('');
        onForecastChange(null);
      }
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} action="/" role="search">
        <div className="flex shadow">
          <button
            className="bg-white w-auto flex justify-end items-center rounded-tl rounded-bl focus:outline-none"
            type="button"
            onClick={getLocation}
            data-testid="locationButton"
            aria-label="search by location"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-3 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>

          <label htmlFor="city" className="hidden">
            city
          </label>
          <input
            className="bg-white w-full h-10 px-4 focus:outline-none"
            id="city"
            type="search"
            name="query"
            placeholder="City"
            value={search}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="bg-white w-auto flex justify-end items-center rounded-tr rounded-br focus:outline-none"
            data-testid="submitButton"
            aria-label="search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-3 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </form>

      {error && (
        <div className="bg-white rounded text-red-500 p-2">{error}</div>
      )}
    </>
  );
}
