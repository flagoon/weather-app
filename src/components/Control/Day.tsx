import { Button } from "@chakra-ui/react";

export const Day = ({
  date,
  handleDayChange,
}: {
  date: string;
  handleDayChange: (date: string) => void;
}) => {
  return (
    <Button
      my={2}
      onClick={() => handleDayChange(date)}
      variant="outline"
      colorScheme="teal"
    >
      {date}
    </Button>
  );
};
