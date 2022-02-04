import { Button, Flex, Input } from "@chakra-ui/react";
import { useState } from "react";
import { getCityLocation } from "../../api";

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
    try {
      const cities = await getCityLocation(city);
      handleCitiesChange(cities.data);
    } catch (e) {
      console.log((e as Error).message);
      handleCitiesChange([]);
    }
    setCity("");
  };

  return (
    <Flex mt={4} mb={4}>
      <Input
        placeholder="Enter city name"
        onChange={handleChange}
        value={city}
      />
      <Button w={100} onClick={handleOnClick}>
        Go!
      </Button>
    </Flex>
  );
};
