import axios from "axios";

export const getCityLocation = async (city: string) =>
  axios.get<Array<City>>(
    `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_GEOCODING_API}&q=${city}&format=json`
  );
