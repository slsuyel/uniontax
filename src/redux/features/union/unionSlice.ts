import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TSonod, TUnionInfo } from "@/types/global";

interface UnionState {
  unionInfo: TUnionInfo | null;
  sonodList: TSonod[] | [];
  tradeFee: string | null;
  site_settings?: any;
}

const initialState: UnionState = {
  unionInfo: null,
  sonodList: [],
  tradeFee: null,
  site_settings: [],
  
};

const unionSlice = createSlice({
  name: "union",
  initialState,
  reducers: {
    setUnionData: (
      state,
      action: PayloadAction<{ unionInfo: TUnionInfo; sonodList: TSonod[]; site_settings?: any }>
    ) => {
      state.unionInfo = action.payload.unionInfo;
      state.sonodList = action.payload.sonodList;
      state.site_settings = action.payload.site_settings;
    },
    clearUnionData: (state) => {
      state.unionInfo = null;
      state.sonodList = [];
      state.tradeFee = null;
      state.site_settings = null;
    },
    setTradeFee: (state, action: PayloadAction<string>) => {
      state.tradeFee = action.payload;
    },
    clearTradeFee: (state) => {
      state.tradeFee = null;
    },
    clearSonodList: (state) => {
      state.sonodList = [];
    },
    updatePendingCount: (
      state,
      action: PayloadAction<{ id: number; pendingCount: number }>
    ) => {
      const { id, pendingCount } = action.payload;
      const itemToUpdate = state.sonodList.find((item) => item.id === id);
      if (itemToUpdate) {
        itemToUpdate.pendingCount = pendingCount;
      }
    },
  },
});

export const {
  setUnionData,
  clearUnionData,
  setTradeFee,
  clearTradeFee,
  clearSonodList,
  updatePendingCount,
} = unionSlice.actions;

export default unionSlice.reducer;
