import { useState } from "react";
import { CityList } from "./CityList";
import { CitySearchForm } from "./CitySearchForm";
import { City } from "../../types/citiesLocationApi";

export const CitySection = ({
  setCityPosition,
}: {
  setCityPosition: (position: { lon: string; lat: string }) => void;
}) => {
  const [cities, setCities] = useState<Array<City>>([]);

  const handleCitiesChange = (citiesList: City[]) => {
    setCities(citiesList);
  };

  return (
    <>
      <CitySearchForm handleCitiesChange={handleCitiesChange} />
      <CityList cities={cities} setCityPosition={setCityPosition} />
    </>
  );
};
