// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface InformationsState {
//   data: any; // Replace 'any' with the actual type of your informations data
// }

// const initialState: InformationsState = {
//   data: null,
// };

// const informationsSlice = createSlice({
//   name: "informations",
//   initialState,
//   reducers: {
//     setInformations: (state, action: PayloadAction<any>) => {
//       state.data = action.payload;
//     },
//     setLastApplicationSonodName: (state, action: PayloadAction<any>) => {
//       state.data = action.payload;
//     },
//     clearInformations: (state) => {
//       state.data = null;
//     },
//   },
// });

// export const {
//   setInformations,
//   clearInformations,
//   setLastApplicationSonodName,
// } = informationsSlice.actions;

// export default informationsSlice.reducer;
import { TPersonalInformation } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InformationsState {
  data: TPersonalInformation | null;
  lastApplicationSonodName: string | null;
}

const initialState: InformationsState = {
  data: null,
  lastApplicationSonodName: null,
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
    clearInformations: (state) => {
      state.data = null;
      state.lastApplicationSonodName = null;
    },
  },
});

export const {
  setInformations,
  clearInformations,
  setLastApplicationSonodName,
} = informationsSlice.actions;

export default informationsSlice.reducer;
