// src/redux/slices/unionSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TUnionInfo } from "@/types/global";

interface TSonod {
  id: number;
  bnname: string;
  enname: string;
  icon: string;
  sonod_fees: number;
}

interface UnionState {
  unionInfo: TUnionInfo | null;
  sonodList: TSonod[] | [];
}

const initialState: UnionState = {
  unionInfo: null,
  sonodList: [],
};

const unionSlice = createSlice({
  name: "union",
  initialState,
  reducers: {
    setUnionData: (
      state,
      action: PayloadAction<{ unionInfo: TUnionInfo; sonodList: TSonod[] }>
    ) => {
      state.unionInfo = action.payload.unionInfo;
      state.sonodList = action.payload.sonodList;
    },
    clearUnionData: (state) => {
      state.unionInfo = null;
      state.sonodList = [];
    },
  },
});

export const { setUnionData, clearUnionData } = unionSlice.actions;

export default unionSlice.reducer;
