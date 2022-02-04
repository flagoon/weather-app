import axios from "axios";
import { Weather } from "../types/weatherApi";

export const getWeather = async ({ lat, lon }: { lat: string; lon: string }) =>
  axios.get<Weather>(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
  );
