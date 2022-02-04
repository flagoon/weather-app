import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./rootReducer";

const initialState: Position = {} as Position;

const positionSlice = createSlice({
  name: "position",
  initialState,
  reducers: {
    setPosition: (state, action: PayloadAction<Position>): Position => ({
      ...state,
      lon: action.payload.lon,
      lat: action.payload.lat,
    }),
    clearPosition: (state) => {
      state = {};
    },
  },
});

export default positionSlice.reducer;

export const { setPosition, clearPosition } = positionSlice.actions;

export const getPosition = (state: RootState) => state.position;
