import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types";

// Define the initial state using that type
const initialState: User | null = null;

export const ProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    addProfile: (state, { payload }: PayloadAction<User>) => {
      if (state === null) {
        return payload;
      }

      state.id_hash = payload.id_hash;
      state.dob = payload.dob;
      state.status = payload.status;
      state.bounties_wons = payload.bounties_wons;
      state.bountys_created = payload.bountys_created;
      state.username = payload.username;
      state.is_mod = payload.is_mod;
      state.secret_account_key = payload.secret_account_key;
      state.named_account_id = payload.named_account_id;
      state.smart_contract_id = payload.smart_contract_id;
      state.guild_badge = payload.guild_badge;
      state.github_link = payload.github_link;
    },
    clearProfile: () => {
      return initialState;
    },
  },
});

export const { clearProfile, addProfile } = ProfileSlice.actions;

export default ProfileSlice.reducer;
