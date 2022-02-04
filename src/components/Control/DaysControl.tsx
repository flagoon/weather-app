import styled from "styled-components";
import format from "date-fns/format";
import addDays from "date-fns/addDays";
import { Day } from "./Day";

const DaysContainer = styled.ul`
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  padding: 8px;
  background: gray;
  font-size: 0.8rem;
  border-radius: 4px;
`;

export const DaysControl = ({
  handleDayChange,
}: {
  handleDayChange: (date: string) => void;
}) => {
  const date = Date.now();
  return (
    <DaysContainer>
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
    </DaysContainer>
  );
};
