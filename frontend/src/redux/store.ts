import { configureStore } from "@reduxjs/toolkit";
import profile from "./slice/ProfileSlice";
import bounties from "./slice/BountiesSlice";
import joinedBounty from "./slice/JoinedBountiesSlice";
import createdBounty from "./slice/CreatedBountySlice";

export const store = configureStore({
  reducer: {
    profile,
    bounties,
    joinedBounty,
    createdBounty,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
