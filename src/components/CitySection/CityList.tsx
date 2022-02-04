import { Button, Flex } from "@chakra-ui/react";

export const CityList = ({
  cities,
  setCityPosition,
}: {
  cities: Array<City>;
  setCityPosition: (position: Position) => void;
}) => (
  <Flex direction="column">
    {cities.map(({ display_name, lon, lat }) => (
      <Button
        colorScheme="teal"
        mt={2}
        onClick={() => setCityPosition({ lon, lat })}
      >
        {display_name}
      </Button>
    ))}
  </Flex>
);
