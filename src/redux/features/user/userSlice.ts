import { createSlice } from '@reduxjs/toolkit';

interface User {
  name?: string;
  email: string;
  verified?: boolean;
}

type TInitialState = {
  user: User | null;
};

const initialState: TInitialState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    removeUser: state => {
      state.user = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
