import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getWeather } from "../api";
import { clearPosition, setPosition } from "./positionReducer";
import { RootState } from "./rootReducer";

const initialState = {
  isLoading: true,
  error: "",
  weather: {
    dayWeather: {} as { [key: string]: WeatherData },
    temps: [] as Array<number>,
  },
  city: "",
};

export const fetchWeatherByPosition = createAsyncThunk(
  "weatherWidget/fetchWeather",
  async (position: Position) => {
    const response = await getWeather(position);
    return response.data;
  }
);

export const formatWeatherData = (
  acc: { dayWeather: { [key: string]: WeatherData }; temps: Array<number> },
  listItem: WeatherData
) => {
  acc = { ...acc, temps: [...acc.temps, listItem.main.temp] };
  if (
    listItem.dt_txt.match(/09:00:00/g) ||
    listItem.dt_txt.match(/15:00:00/g) ||
    listItem.dt_txt.match(/21:00:00/g)
  ) {
    acc = {
      ...acc,
      dayWeather: {
        ...acc.dayWeather,
        [listItem.dt_txt.replace(/\s/g, "_")]: listItem,
      },
    };
  }
  return acc;
};

/**
 * createSlice is creating reducer and action creators for us.
 */
const weatherWidgetSlice = createSlice({
  name: "weatherWidget",
  initialState,
  reducers: {
    showLoader: (state) => {
      state.isLoading = true;
    },
    hideLoader: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWeatherByPosition.fulfilled, (state, action) => {
      return {
        ...state,
        city: action.payload.city.name,
        isLoading: false,
        error: "",
        weather: action.payload.list.reduce(formatWeatherData, {
          dayWeather: {},
          temps: [] as Array<number>,
        }),
      };
    });
    builder.addCase(fetchWeatherByPosition.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchWeatherByPosition.rejected, (state) => {
      return {
        ...state,
        isLoading: false,
        error: "Failed fetching data for given position.",
      };
    });
    builder.addCase(setPosition, (state) => {
      state.isLoading = false;
    });
    builder.addCase(clearPosition, (state) => {
      state.isLoading = false;
      state.error =
        "Cannot check the current user location. Did you turn off geolocation in browser?";
    });
  },
});

export const { hideLoader, showLoader } = weatherWidgetSlice.actions;

export default weatherWidgetSlice.reducer;
export const getIsLoading = (state: RootState) => state.weatherWidget.isLoading;
export const getWeatherData = (state: RootState) =>
  state.weatherWidget.weather.dayWeather;
export const getTemperatures = (state: RootState) =>
  state.weatherWidget.weather.temps;
export const getCityName = (state: RootState) => state.weatherWidget.city;
export const getWeatherError = (state: RootState) => state.weatherWidget.error;
