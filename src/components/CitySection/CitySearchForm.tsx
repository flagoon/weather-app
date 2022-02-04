import { useState } from "react";
import styled from "styled-components";
import { getCityLocation } from "../../api/cityLocation";
import { City } from "../../types/citiesLocationApi";

export const CitySearchContainer = styled.div`
  border: 1px solid blue;
`;

export const CitySearchForm = ({
  handleCitiesChange,
}: {
  handleCitiesChange: (cities: Array<City>) => void;
}) => {
  const [city, setCity] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleOnClick = async () => {
    console.log("handleOnClick", city);
    try {
      const cities = await getCityLocation(city);
      handleCitiesChange(cities.data);
    } catch (e) {
      console.log((e as Error).message);
      handleCitiesChange([]);
    }
  };

  return (
    <CitySearchContainer>
      <input onChange={handleChange} value={city} />
      <button onClick={handleOnClick}>Go!</button>
    </CitySearchContainer>
  );
};
