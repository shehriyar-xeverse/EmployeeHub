import { configureStore } from "@reduxjs/toolkit";
import { adminApi } from "./admin";
import { employeeApi } from "./employeeApi";

export const store = configureStore({
  reducer: {
    [adminApi.reducerPath]: adminApi.reducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(adminApi.middleware, employeeApi.middleware),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;