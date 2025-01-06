import { TPersonalInformation } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InformationsState {
  data: TPersonalInformation | null;
  lastApplicationSonodName: string | null;
  unionName: string | null; // Add unionName to the state
}

const initialState: InformationsState = {
  data: null,
  lastApplicationSonodName: null,
  unionName: null, // Initialize unionName
};

const informationsSlice = createSlice({
  name: "informations",
  initialState,
  reducers: {
    setInformations: (state, action: PayloadAction<TPersonalInformation>) => {
      state.data = action.payload;
    },
    setLastApplicationSonodName: (state, action: PayloadAction<string>) => {
      state.lastApplicationSonodName = action.payload;
    },
    setUnionName: (state, action: PayloadAction<string>) => {
      state.unionName = action.payload; // Add reducer for unionName
    },
    clearInformations: (state) => {
      state.data = null;
      state.lastApplicationSonodName = null;
      state.unionName = null; // Reset unionName when clearing
    },
  },
});

export const {
  setInformations,
  clearInformations,
  setLastApplicationSonodName,
  setUnionName, // Export the new action
} = informationsSlice.actions;

export default informationsSlice.reducer;
