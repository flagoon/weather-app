import { useState } from "react";
import { CityList } from "./CityList";
import { CitySearchForm } from "./CitySearchForm";

export const CitySection = ({
  setCityPosition,
}: {
  setCityPosition: (position: Position) => void;
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
