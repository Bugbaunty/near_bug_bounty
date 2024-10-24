import { configureStore } from "@reduxjs/toolkit";
import profile from "./slice/ProfileSlice";
import bounties from "./slice/BountiesSlice";

export const store = configureStore({
  reducer: {
    profile,
    bounties,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
