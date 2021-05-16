import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { mapDayliForecast } from '../../types/forecast';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?${
        req.query['city']
          ? `q=${req.query['city']}`
          : `lat=${req.query['lat']}&lon=${req.query['long']}`
      }&units=metric&appid=${process.env.API_KEY}`
    );

    if (response.status === 200) {
      const list = mapDayliForecast(response.data);

      res.status(200).json({
        ...response.data,
        list,
        timestamp: Date.now(),
      });
    } else {
      res.status(response.status).send(response.statusText);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
