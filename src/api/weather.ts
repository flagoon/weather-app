import axios from "axios";
import { Weather } from "../types/weatherApi";

export const getWeather = async ({
  lat,
  long,
}: {
  lat: number;
  long: number;
}) =>
  axios.get<Weather>(
    `https://api.openweathermap.org/data1/2.5/forecast?lat=${lat}&lon=${long}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
  );
