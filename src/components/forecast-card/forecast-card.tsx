import { format } from 'date-fns';
import { Forecast } from '../../types/forecast';

interface Props {
  forecast: Forecast;
}
export function ForecastCard({ forecast }: Props) {
  const today = forecast.list[0];
  const [, ...nextDays] = forecast.list;

  const formattedTimestamp = format(
    new Date(forecast.timestamp),
    'yyyy-MM-dd HH:mm:ss'
  );

  return (
    <section>
      <div className="bg-white shadow rounded p-4 space-y-4 md:space-y-8">
        <div className="flex justify-between w-full md:px-5">
          <div>
            <div className="text-8xl mr-5 relative whitespace-nowrap">
              <p>
                <span className="tabular-nums">
                  {Math.round(today.main.temp)}
                </span>
                <sup className="text-2xl absolute top-2">
                  <sup>o</sup> C
                </sup>
              </p>
            </div>
          </div>

          <div className="hidden sm:block">
            <img
              src={`https://openweathermap.org/img/wn/${today.weather[0].icon}@2x.png`}
              alt={today.weather[0].description}
              width="100"
              height="100"
            />
          </div>

          <div className="flex items-end self-center flex-col mr-3">
            <div>
              <p className="text-2xl font-semibold">{forecast.city.name}</p>
            </div>
            <div>
              <p className="text-xl text-gray-500">
                {format(new Date(today.dt_txt), 'EEEE')}
              </p>
            </div>
            <div>
              <p className="text-xl text-gray-500">{today.weather[0].main}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col px-2 md:flex-row md:justify-between md:px-0">
          {nextDays.map((day, index) => (
            <div
              key={index}
              className="flex justify-between items-center md:flex-col "
            >
              <div className="flex items-center w-2/6 md:w-auto">
                <div className="md:hidden">
                  <p className="text-2xl">
                    {format(new Date(day.dt_txt), 'EEEE')}
                  </p>
                </div>
                <div className="hidden md:block">
                  <p className="text-2xl">
                    {format(new Date(day.dt_txt), 'EE')}
                  </p>
                </div>
              </div>
              <div>
                <img
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                  alt={day.weather[0].description}
                  width="100"
                  height="100"
                />
              </div>
              <div className="flex items-center">
                <p className="tabular-nums whitespace-nowrap text-2xl">
                  {Math.round(day.main.temp)} <sup>o</sup>
                </p>
              </div>
            </div>
          ))}
        </div>
        <aside>
          <div>
            <p className="text-md text-right mr-1">
              Data fetched at{' '}
              <time dateTime={formattedTimestamp}>{formattedTimestamp}</time>
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
