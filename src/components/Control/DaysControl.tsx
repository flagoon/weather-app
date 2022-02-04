import format from "date-fns/format";
import addDays from "date-fns/addDays";
import { Flex } from "@chakra-ui/react";

import { Day } from "./Day";

export const DaysControl = ({
  handleDayChange,
}: {
  handleDayChange: (date: string) => void;
}) => {
  const date = Date.now();
  return (
    <Flex
      justifyContent="space-around"
      maxW="container.md"
      borderRadius={4}
      mt={4}
      mb={4}
      flexWrap="wrap"
    >
      <Day
        handleDayChange={handleDayChange}
        date={format(date, "yyyy-MM-dd")}
      />
      <Day
        handleDayChange={handleDayChange}
        date={format(addDays(date, 1), "yyyy-MM-dd")}
      />
      <Day
        handleDayChange={handleDayChange}
        date={format(addDays(date, 2), "yyyy-MM-dd")}
      />
      <Day
        handleDayChange={handleDayChange}
        date={format(addDays(date, 3), "yyyy-MM-dd")}
      />
      <Day
        handleDayChange={handleDayChange}
        date={format(addDays(date, 4), "yyyy-MM-dd")}
      />
    </Flex>
  );
};
