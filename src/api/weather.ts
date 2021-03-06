import axios from "axios";

export const getWeather = async ({ lat, lon }: Position) =>
  axios.get<Weather>(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
  );
