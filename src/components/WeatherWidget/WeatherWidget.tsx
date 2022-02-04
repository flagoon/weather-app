import styled from "styled-components";
import { WeatherData } from "../../types/weatherApi";

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
  console.log({ day });
  return (
    <WeatherWidgetContainer>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div>Weather</div>
          <div>City: {data.city}</div>
          <div>morning:</div>
          <div>day: {day}</div>
          <div>night:</div>
          <div>humidity:</div>
          <div>min value</div>
          <div>max value</div>
          <div>mean value</div>
          <div>mode value</div>
        </>
      )}
    </WeatherWidgetContainer>
  );
};
