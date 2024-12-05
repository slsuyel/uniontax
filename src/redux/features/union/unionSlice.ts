// src/redux/slices/unionSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TUnionInfo } from "@/types/global";

interface UnionState {
  unionData: TUnionInfo | null;
}

const initialState: UnionState = {
  unionData: null,
};

const unionSlice = createSlice({
  name: "union",
  initialState,
  reducers: {
    setUnionData: (state, action: PayloadAction<TUnionInfo>) => {
      state.unionData = action.payload;
    },
    clearUnionData: (state) => {
      state.unionData = null;
    },
  },
});

export const { setUnionData, clearUnionData } = unionSlice.actions;

export default unionSlice.reducer;
