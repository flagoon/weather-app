import { Container, Heading } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import {
  getCityName,
  getTemperatures,
  getWeatherData,
} from "../../redux/weatherWidgetReducer";

const getMode = (val: Array<number>) => {
  const l = val.length;
  if (l % 2 === 0) {
    return (val[l / 2 - 1] + val[l / 2]) / 2;
  }
  return val[(l - 1) / 2];
};

export const WeatherWidget = () => {
  const city = useSelector(getCityName);
  let temps = useSelector(getTemperatures);
  const weatherData = useSelector(getWeatherData);
  const sortedTemps = temps.slice().sort();

  const minTemp = sortedTemps[0];
  const maxTemp = sortedTemps[sortedTemps.length - 1];
  const mean = (
    sortedTemps.reduce((acc, val) => acc + val) / sortedTemps.length
  ).toFixed(2);
  const mode = getMode(sortedTemps);
  /**
   * When we fetch weather data for 5 days in the middle of the day/night, data from morning/midday
   * is not available. With more time I would change the app, to fetch for first day from different endpoint
   * and for the rest days, current endpoint. For now this values will be as 'no data'
   */
  const morningWeather = weatherData[`2022-02-05_09:00:00`]?.main;
  const dayWeather = weatherData[`2022-02-05_15:00:00`]?.main;
  const nightWeather = weatherData[`2022-02-05_21:00:00`]?.main;

  return (
    <Container maxW="container.md">
      <Heading>{city}</Heading>
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
      <div>Min Temp: {minTemp}</div>
      <div>Max Temp: {maxTemp}</div>
      <div>Mean Temp: {mean}</div>
      <div>Mode Temp: {mode}</div>
    </Container>
  );
};
