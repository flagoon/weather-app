import { useCallback, useEffect } from "react";
import { WeatherWidget } from "./components/WeatherWidget";
import { DaysControl } from "./components/Control/DaysControl";
import { CitySection } from "./components/CitySection/CitySection";
import { ChakraProvider, Container, Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "./redux/store";
import {
  setPosition,
  getPosition,
  clearPosition,
} from "./redux/positionReducer";
import {
  fetchWeatherByPosition,
  getIsLoading,
  getWeatherError,
  showLoader,
} from "./redux/weatherWidgetReducer";

function App() {
  const dispatch = useAppDispatch();

  const position = useSelector(getPosition);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getWeatherError);

  const handlePosition = useCallback(
    (geoPosition: GeolocationPosition) => {
      dispatch(
        setPosition({
          lat: geoPosition.coords.latitude.toString(),
          lon: geoPosition.coords.longitude.toString(),
        })
      );
    },
    [dispatch]
  );

  const handleError = useCallback(
    (error: GeolocationPositionError) => {
      console.error(error);
      dispatch(clearPosition());
    },
    [dispatch]
  );

  useEffect(() => {
    if (!position.lon) {
      dispatch(showLoader());
      const currentGeolocation = () => {
        navigator.geolocation?.getCurrentPosition(handlePosition, handleError);
      };
      currentGeolocation();
    }
  }, [dispatch, handleError, handlePosition, position]);

  useEffect(() => {
    if (position.lon && position.lat) {
      dispatch(fetchWeatherByPosition(position));
    }
  }, [dispatch, position]);

  return (
    <ChakraProvider>
      <Container
        maxW="container.md"
        flexDirection="column"
        alignItems="center"
        h="100vh"
      >
        <Flex flexDirection="column">
          <DaysControl />
          <Flex minH={400} p={20}>
            {error ? (
              <div>{error}</div>
            ) : isLoading ? (
              <div>Loading...</div>
            ) : (
              <WeatherWidget />
            )}
          </Flex>

          <CitySection />
        </Flex>
      </Container>
    </ChakraProvider>
  );
}

export default App;
