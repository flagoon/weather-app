import { Container, Heading } from "@chakra-ui/react";

export type FormattedWeather = {
  city: string;
  data: { [key: string]: WeatherData };
};

type Props = {
  data: FormattedWeather;
  day: string;
};

export const WeatherWidget = ({ data, day }: Props) => {
  /**
   * When we fetch weather data for 5 days in the middle of the day/night, data from morning/midday
   * is not available. With more time I would change the app, to fetch for first day from different endpoint
   * and for the rest days, current endpoint. For now this values will be as 'no data'
   */
  const morningWeather = data.data[`${day}_09:00:00`]?.main;
  const dayWeather = data.data[`${day}_15:00:00`]?.main;
  const nightWeather = data.data[`${day}_21:00:00`]?.main;

  return (
    <Container maxW="container.md">
      <Heading>
        {data.city}: {day}
      </Heading>
      <div>
        morning:
        {morningWeather?.temp || "no data"}
      </div>
      <div>day: {dayWeather?.temp || "no data"}</div>
      <div>
        night:
        {nightWeather?.temp || "no data"}
      </div>
      <div>humidity: {dayWeather?.humidity || "no data"}</div>
      <div>
        min value:{" "}
        {Math.min(
          isNaN(morningWeather?.temp_min) ? Infinity : morningWeather?.temp_min,
          isNaN(dayWeather?.temp_min) ? Infinity : dayWeather?.temp_min,
          isNaN(nightWeather?.temp_min) ? Infinity : nightWeather?.temp_min
        )}
      </div>
      <div>
        max value:{" "}
        {Math.max(
          isNaN(morningWeather?.temp_max)
            ? -Infinity
            : morningWeather?.temp_max,
          isNaN(dayWeather?.temp_max) ? -Infinity : dayWeather?.temp_max,
          isNaN(nightWeather?.temp_max) ? -Infinity : nightWeather?.temp_max
        )}
      </div>
      <div>mean value: don't know what that mean</div>
      <div>mode value: don't know what that mean</div>
    </Container>
  );
};
