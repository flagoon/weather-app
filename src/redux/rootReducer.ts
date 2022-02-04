import { combineReducers } from "@reduxjs/toolkit";
import positionReducer from "./positionReducer";
import weatherWidgetReducer from "./weatherWidgetReducer";

const rootReducer = combineReducers({
  position: positionReducer,
  weatherWidget: weatherWidgetReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
