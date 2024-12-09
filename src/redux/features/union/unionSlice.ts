// src/redux/slices/unionSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TUnionInfo } from "@/types/global";

interface TSonod {
  id: number;
  bnname: string;
  enname: string;
  icon: string;
  sonod_fees: number;
  pendingCount?: number;
}

interface UnionState {
  unionInfo: TUnionInfo | null;
  sonodList: TSonod[] | [];
  tradeFee: string | null;
}

const initialState: UnionState = {
  unionInfo: null,
  sonodList: [],
  tradeFee: null,
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
      state.tradeFee = null;
    },
    setTradeFee: (state, action: PayloadAction<string>) => {
      state.tradeFee = action.payload;
    },
    clearTradeFee: (state) => {
      state.tradeFee = null;
    },
  },
});

export const { setUnionData, clearUnionData, setTradeFee, clearTradeFee } =
  unionSlice.actions;

export default unionSlice.reducer;
