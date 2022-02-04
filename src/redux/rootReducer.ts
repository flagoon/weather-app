import { combineReducers } from "@reduxjs/toolkit";
import positionReducer from "./positionReducer";
import weatherWidgetReducer from "./weatherWidgetReducer";
import dayReducer from "./dayReducer";

const rootReducer = combineReducers({
  position: positionReducer,
  weatherWidget: weatherWidgetReducer,
  day: dayReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
