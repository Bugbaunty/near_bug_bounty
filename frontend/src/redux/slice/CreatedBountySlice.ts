import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { BountyAccount } from "../types";

// Define the initial state using that type
const initialState: BountyAccount[] = [];

export const CreatedBountySlice = createSlice({
  name: "createdBounty",
  initialState,
  reducers: {
    addCreatedBounty: (state, { payload }: PayloadAction<BountyAccount>) => {
      state.push(payload);
    },
    clearCreatedBounties: () => {
      return initialState;
    },
  },
});

export const { addCreatedBounty, clearCreatedBounties } =
  CreatedBountySlice.actions;

export default CreatedBountySlice.reducer;
