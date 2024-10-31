import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { BountyAccount } from "../types";

// Define the initial state using that type
const initialState: BountyAccount[] = [];

export const JoinedBountySlice = createSlice({
  name: "joinedBounty",
  initialState,
  reducers: {
    addJoinedBounty: (state, { payload }: PayloadAction<BountyAccount>) => {
      state.push(payload);
    },
    clearJoinedBounties: () => {
      return initialState;
    },
  },
});

export const { addJoinedBounty, clearJoinedBounties } =
  JoinedBountySlice.actions;

export default JoinedBountySlice.reducer;
