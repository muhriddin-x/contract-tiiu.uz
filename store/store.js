import { configureStore } from "@reduxjs/toolkit";
import getDatas from "./counterSlice";
import { rootApi } from "./api/rootApi";

export const store = configureStore({
  reducer: {
    data: getDatas,
    [rootApi.reducerPath]: rootApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rootApi.middleware),
});
