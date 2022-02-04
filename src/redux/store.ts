import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import rootReducer from "./rootReducer";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

// @ts-ignore
if (process.env.NODE_ENV === "development" && module.hot) {
  // @ts-ignore
  module.hot.accept("./rootReducer", () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const newRootReducer = require("./rootReducer").default;
    store.replaceReducer(newRootReducer);
  });
}

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
