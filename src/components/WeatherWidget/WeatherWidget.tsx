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
  isLoading: boolean;
  data: FormattedWeather;
  day: string;
};

export const WeatherWidget = ({ isLoading, data, day }: Props) => {
  const morningWeather = (WD as unknown as FormattedWeather).data[
    `${day}_09:00:00`
  ].main;
  const dayWeather = (WD as unknown as FormattedWeather).data[`${day}_15:00:00`]
    .main;
  const nightWeather = (WD as unknown as FormattedWeather).data[
    `${day}_21:00:00`
  ].main;
  return (
    <WeatherWidgetContainer>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div>{day}</div>
          <div>City: {(WD as unknown as FormattedWeather).city}</div>
          <div>
            morning:
            {morningWeather.temp}
          </div>
          <div>day: {dayWeather.temp}</div>
          <div>
            night:
            {nightWeather.temp}
          </div>
          <div>
            humidity (avg):{" "}
            {Math.round(
              (morningWeather.humidity +
                dayWeather.humidity +
                nightWeather.humidity) /
                3
            )}
          </div>
          <div>
            min value:{" "}
            {Math.min(
              morningWeather.temp_min,
              dayWeather.temp_min,
              nightWeather.temp_min
            )}
          </div>
          <div>
            max value:{" "}
            {Math.max(
              morningWeather.temp_max,
              dayWeather.temp_max,
              nightWeather.temp_max
            )}
          </div>
          <div>mean value: don't know what that mean</div>
          <div>mode value: don't know what that mean</div>
        </>
      )}
    </WeatherWidgetContainer>
  );
};
