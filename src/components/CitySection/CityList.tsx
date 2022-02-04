import { City } from "../../types/citiesLocationApi";

export const CityList = ({ cities }: { cities: Array<City> }) => (
  <div>
    {cities.map((city) => (
      <div>{city.display_name}</div>
    ))}
  </div>
);
