import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { BountyAccount } from "../types";

// Define the initial state using that type
const initialState: BountyAccount[] = [];

export const BountiesSlice = createSlice({
  name: "bounties",
  initialState,
  reducers: {
    addBounty: (state, { payload }: PayloadAction<BountyAccount>) => {
      state.push(payload);
    },
    clearBounties: () => {
      return initialState;
    },
  },
});

export const { clearBounties, addBounty } = BountiesSlice.actions;

export default BountiesSlice.reducer;
