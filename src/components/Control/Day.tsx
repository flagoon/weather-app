import { Button } from "@chakra-ui/react";

export const Day = ({
  date,
  handleDayChange,
}: {
  date: string;
  handleDayChange: (date: string) => void;
}) => {
  return (
    <Button m="15" onClick={() => handleDayChange(date)}>
      {date}
    </Button>
  );
};
