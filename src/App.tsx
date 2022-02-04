import { useEffect, useState } from "react";
import { FormattedWeather, WeatherWidget } from "./components/WeatherWidget";
import { getWeather } from "./api";
import { DaysControl } from "./components/Control/DaysControl";
import format from "date-fns/format";
import { CitySection } from "./components/CitySection/CitySection";
import { ChakraProvider, Container, Flex } from "@chakra-ui/react";

function App() {
  const [position, setPosition] = useState<Position>();
  const [isLoading, setIsLoading] = useState(true);
  const [weather, setWeather] = useState<FormattedWeather>(
    {} as FormattedWeather
  );
  const [error, setError] = useState<string>();
  const [day, setDay] = useState<string>(format(Date.now(), "yyyy-MM-dd"));

  const setCityPosition = (position: Position) => {
    setPosition(position);
  };

  const handleDayChange = (date: string) => {
    setDay(date);
  };

  const handlePosition = (geoPosition: GeolocationPosition) => {
    setPosition({
      lat: geoPosition.coords.latitude.toString(),
      lon: geoPosition.coords.longitude.toString(),
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

  return (
    <ChakraProvider>
      <Container
        maxW="container.md"
        flexDirection="column"
        alignItems="center"
        h="100vh"
      >
        <Flex flexDirection="column">
          <DaysControl handleDayChange={handleDayChange} />
          {/* {error ? (
        <div>{error}</div>
      ) : ( */}
          {!isLoading && <WeatherWidget data={weather} day={day} />}
          {/* )} */}

          <CitySection setCityPosition={setCityPosition} />
        </Flex>
      </Container>
    </ChakraProvider>
  );
}

export default App;
