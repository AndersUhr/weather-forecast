import axios from 'axios';
import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/dist/client/router';
import { Forecast, mapDayliForecast } from '../types/forecast';
import { ForecastCard, Layout, SearchInput } from '../components';

interface Props {
  forecast: Forecast;
}

export default function Home(props: Props) {
  const router = useRouter();
  const [forecast, setForecast] = useState<Forecast>(props.forecast);

  useEffect(() => {
    if (!!forecast) {
      router.push(`/?query=${forecast?.city?.name}`, undefined, {
        shallow: true,
      });
    }
  }, [forecast]);

  const handleForecastChange = (forecast: Forecast) => {
    setForecast(forecast);
  };

  return (
    <Layout>
      <SearchInput onForecastChange={handleForecastChange} />
      {forecast && <ForecastCard forecast={forecast} />}
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const initialCity = query['query'] ?? 'copenhagen';

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${initialCity}&units=metric&appid=${process.env.API_KEY}`
    );

    const list = mapDayliForecast(response.data);

    return {
      props: {
        forecast: {
          ...response.data,
          list,
          timestamp: Date.now(),
        },
      },
    };
  } catch {
    return { props: {} };
  }
};
