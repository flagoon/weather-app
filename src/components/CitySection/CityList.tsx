import { Button, Flex } from "@chakra-ui/react";
import { setPosition } from "../../redux/positionReducer";
import { useAppDispatch } from "../../redux/store";

export const CityList = ({ cities }: { cities: Array<City> }) => {
  const dispatch = useAppDispatch();
  return (
    <Flex direction="column">
      {cities.map(({ display_name, lon, lat }) => (
        <Button
          key={`${lon}+${lat}`}
          colorScheme="teal"
          mt={2}
          onClick={() => {
            dispatch(setPosition({ lon, lat }));
          }}
        >
          {display_name}
        </Button>
      ))}
    </Flex>
  );
};
