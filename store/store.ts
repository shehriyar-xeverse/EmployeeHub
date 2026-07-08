import { configureStore } from "@reduxjs/toolkit";
import { adminApi } from "./admin";
import { employeeApi } from "./employeeApi";
import { employeeProfileApi } from "./employeeProfile";
import { notificationApi } from "./notifications";

export const store = configureStore({
  reducer: {
    [adminApi.reducerPath]: adminApi.reducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
    [employeeProfileApi.reducerPath]: employeeProfileApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(adminApi.middleware, employeeApi.middleware,employeeProfileApi.middleware,notificationApi.middleware),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;