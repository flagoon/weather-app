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
  city?: string;
  isLoading: boolean;
  data: FormattedWeather;
};

export const WeatherWidget = ({ city, isLoading, data }: Props) => {
  console.log({ data });
  return (
    <WeatherWidgetContainer>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div>Weather</div>
          <div>City: {city}</div>
          <div>morning:</div>
          <div>day:</div>
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
