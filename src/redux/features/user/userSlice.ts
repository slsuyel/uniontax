import { createSlice } from "@reduxjs/toolkit";

// interface User {
//   name?: string;
//   email: string;
//   verified?: boolean;
// }
export interface User {
  email: string;
  unioun: string;
  name: string | null;
  position: string;
  dashboard_title: string;
  designation: string;
  email_verified: boolean;
  is_popup: boolean;
}

type TInitialState = {
  user: User | null;
};

const initialState: TInitialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
