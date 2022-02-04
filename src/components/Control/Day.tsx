import { Button } from "@chakra-ui/react";
import { getDay, setDay } from "../../redux/dayReducer";
import { useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";

export const Day = ({ date }: { date: string }) => {
  const dispatch = useAppDispatch();
  const day = useSelector(getDay);
  return (
    <Button
      my={2}
      onClick={() => {
        dispatch(setDay(date));
      }}
      variant="outline"
      colorScheme="teal"
      isDisabled={day === date}
    >
      {date}
    </Button>
  );
};
