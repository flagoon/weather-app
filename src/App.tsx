import { useEffect, useState } from "react";
import { AppContainer, CitySection } from "./App.sc";
import { CityList } from "./components/CitySection/CityList";
import { CitySearchForm } from "./components/CitySection/CitySearchForm";
import { WeatherWidget } from "./components/WeatherWidget";
import axios from "axios";

type WeatherData = { city: { name: string } };

function App() {
  const [position, setPosition] = useState<{ lat: number; long: number }>();
  const [isLoading, setIsLoading] = useState(false);
  const [weather, setWeather] = useState<WeatherData>();
  const [error, setError] = useState<string>();

  const handlePosition = (geoPosition: GeolocationPosition) => {
    setPosition({
      lat: geoPosition.coords.latitude,
      long: geoPosition.coords.longitude,
    });
  };

  useEffect(() => {
    if (!position) {
      const currentGeolocation = () => {
        navigator.geolocation?.getCurrentPosition(handlePosition);
      };
      currentGeolocation();
    }
  }, [position]);

  useEffect(() => {
    const getWeatherData = async () => {
      if (position) {
        try {
          setIsLoading(true);
          const weatherData = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${position.lat}&lon=${position.long}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
          );
          const weatherObject = weatherData.data.list.reduce(
            (acc: Record<string, unknown>, data: { dt_txt: string }) => {
              if (data.dt_txt.match(/06:00:00/gi)) {
                acc = { ...acc, [data.dt_txt.replace(/\s/g, "_")]: data };
              }
              if (data.dt_txt.match(/12:00:00/gi)) {
                acc = { ...acc, [data.dt_txt.replace(/\s/g, "_")]: data };
              }
              if (data.dt_txt.match(/18:00:00/gi)) {
                acc = { ...acc, [data.dt_txt.replace(/\s/g, "_")]: data };
              }
              return acc;
            },
            {}
          );
          setWeather(weatherObject);
          setIsLoading(false);
        } catch (e) {
          setIsLoading(false);
          setError("Something went wrong while fetching weather data.");
        }
      }
    };
    getWeatherData();
  }, [position]);

  console.log({ position, weather });

  return (
    <AppContainer>
      {error ? (
        <div>{error}</div>
      ) : (
        <WeatherWidget city={"weather?.city.name"} isLoading={isLoading} />
      )}

      <CitySection>
        <CitySearchForm />
        <CityList />
      </CitySection>
    </AppContainer>
  );
}

export default App;
