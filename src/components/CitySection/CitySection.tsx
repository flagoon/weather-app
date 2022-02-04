import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import { CityList } from "./CityList";
import { CitySearchForm } from "./CitySearchForm";

export const CitySection = () => {
  const [cities, setCities] = useState<Array<City>>([]);

  const handleCitiesChange = (citiesList: City[]) => {
    setCities(citiesList);
  };

  return (
    <Flex direction="column">
      <CitySearchForm handleCitiesChange={handleCitiesChange} />
      <CityList cities={cities} />
    </Flex>
  );
};
