import styled from "styled-components";

const DayS = styled.li`
  background: lightGray;
  border: 1px solid black;
  width: 90px;
  padding: 4px;
  text-align: center;
  list-style-type: none;
  border-radius: 4px;

  &:hover {
    font-weight: 600;
    cursor: pointer;
  }
`;

export const Day = ({
  date,
  handleDayChange,
}: {
  date: string;
  handleDayChange: (date: string) => void;
}) => {
  return <DayS onClick={() => handleDayChange(date)}>{date}</DayS>;
};
