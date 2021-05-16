import { Forecast, List } from './forecast';

export function mapDayliForecast(dto: Forecast): List[] {
  const dayliForecast: List[] = Object.values(
    dto.list.reduce((acc, current) => {
      const day = new Date(current.dt_txt).getDate();

      if (acc[day] && acc[day].main.temp > current.main.temp) {
        return acc;
      }

      acc[day] = current;
      return acc;
    }, {})
  );

  return dayliForecast;
}
