import { useEffect, useState } from "react";
import { AppContainer, CitySection } from "./App.sc";
import { CityList } from "./components/CitySection/CityList";
import { CitySearchForm } from "./components/CitySection/CitySearchForm";
import { FormattedWeather, WeatherWidget } from "./components/WeatherWidget";
import { getWeather } from "./api/weather";
import { WeatherData } from "./types/weatherApi";
import { DaysControl } from "./components/Control/DaysControl";
import format from "date-fns/format";

function App() {
  const [position, setPosition] = useState<{ lat: number; long: number }>();
  const [isLoading, setIsLoading] = useState(false);
  const [weather, setWeather] = useState<FormattedWeather>(
    {} as FormattedWeather
  );
  const [error, setError] = useState<string>();
  const [day, setDay] = useState<string>(format(Date.now(), "yyyy-MM-dd"));

  const handleDayChange = (date: string) => {
    setDay(date);
  };

  const handlePosition = (geoPosition: GeolocationPosition) => {
    setPosition({
      lat: geoPosition.coords.latitude,
      long: geoPosition.coords.longitude,
    });
    setIsLoading(false);
  };

  const handleError = (error: GeolocationPositionError) => {
    console.error(error);
    setError("Geolocation is turn off. Search city by name.");
    setIsLoading(false);
  };

  useEffect(() => {
    if (!position) {
      setIsLoading(true);
      const currentGeolocation = () => {
        navigator.geolocation?.getCurrentPosition(handlePosition, handleError);
      };
      currentGeolocation();
    }
  }, [position]);

  useEffect(() => {
    const getWeatherData = async () => {
      if (position) {
        try {
          setIsLoading(true);
          const weatherData = await getWeather(position);
          const weatherObject = weatherData.data.list.reduce(
            (acc: { [key: string]: WeatherData }, listItem: WeatherData) => {
              if (
                listItem.dt_txt.match(/09:00:00/gi) ||
                listItem.dt_txt.match(/15:00:00/gi) ||
                listItem.dt_txt.match(/21:00:00/gi)
              ) {
                acc = {
                  ...acc,
                  [listItem.dt_txt.replace(/\s/g, "_")]: listItem,
                };
              }
              return acc;
            },
            {}
          );
          setWeather({
            data: weatherObject,
            city: weatherData.data.city.name,
          });
          setIsLoading(false);
        } catch (e) {
          setIsLoading(false);
          setError("Something went wrong while fetching weather data.");
        }
      }
    };
    getWeatherData();
  }, [position]);

  console.log(day);

  return (
    <AppContainer>
      <DaysControl handleDayChange={handleDayChange} />
      {error ? (
        <div>{error}</div>
      ) : (
        <WeatherWidget isLoading={isLoading} data={weather} day={day} />
      )}

      <CitySection>
        <CitySearchForm />
        <CityList />
      </CitySection>
    </AppContainer>
  );
}

export default App;
