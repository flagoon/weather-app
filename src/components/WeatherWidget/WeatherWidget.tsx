import styled from "styled-components";
import { WeatherData } from "../../types/weatherApi";
import { WD } from "./mockData";

export const WeatherWidgetContainer = styled.section`
  position: relative;
  width: 600px;
  height: 360px;
  border-radius: 8px;
  padding: 16px;
  margin: 0 auto;

  border: 1px solid pink;
`;

export type FormattedWeather = {
  city: string;
  data: { [key: string]: WeatherData };
};

type Props = {
  data: FormattedWeather;
  day: string;
};

export const WeatherWidget = ({ data, day }: Props) => {
  const morningWeather = data.data[`${day}_09:00:00`]?.main;
  const dayWeather = data.data[`${day}_15:00:00`]?.main;
  const nightWeather = data.data[`${day}_21:00:00`]?.main;
  return (
    <WeatherWidgetContainer>
      <>
        <div>{day}</div>
        <div>City: {data.city}</div>
        <div>
          morning:
          {morningWeather?.temp || "no data"}
        </div>
        <div>day: {dayWeather?.temp || "no data"}</div>
        <div>
          night:
          {nightWeather?.temp || "no data"}
        </div>
        <div>humidity (avg): {dayWeather?.humidity || "no data"}</div>
        <div>
          min value:{" "}
          {Math.min(
            morningWeather?.temp_min,
            dayWeather?.temp_min,
            nightWeather?.temp_min
          )}
        </div>
        <div>
          max value:{" "}
          {Math.max(
            morningWeather?.temp_max,
            dayWeather?.temp_max,
            nightWeather?.temp_max
          )}
        </div>
        <div>mean value: don't know what that mean</div>
        <div>mode value: don't know what that mean</div>
      </>
    </WeatherWidgetContainer>
  );
};
