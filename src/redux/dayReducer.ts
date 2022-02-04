import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./rootReducer";
import { format } from "date-fns";

const initialState = format(Date.now(), "yyyy-MM-dd");

const daySlice = createSlice({
  name: "day",
  initialState,
  reducers: {
    setDay: (_, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

export default daySlice.reducer;

export const { setDay } = daySlice.actions;

export const getDay = (state: RootState) => state.day;
