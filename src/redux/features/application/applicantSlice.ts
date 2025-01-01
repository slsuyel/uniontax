import { TPersonalInformation } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ApplicantState = {
  applicantInfo: TPersonalInformation | null;
};

const initialState: ApplicantState = {
  applicantInfo: null,
};

const applicantSlice = createSlice({
  name: 'applicant',
  initialState,
  reducers: {
    setApplicantInfo: (state, action: PayloadAction<TPersonalInformation>) => {
      state.applicantInfo = action.payload;
    },
    clearApplicantInfo: state => {
      state.applicantInfo = null;
    },
  },
});

export const { setApplicantInfo, clearApplicantInfo } = applicantSlice.actions;
export default applicantSlice.reducer;
