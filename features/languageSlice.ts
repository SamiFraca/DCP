import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OptionProps } from '@/components/header/lang-switcher';
const initialState: OptionProps = {
    code: 'en',
    country: 'English',
    flag: require('@/assets/img/uk_flag.png'),
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<OptionProps>) {
      state.code = action.payload.code;
      state.country = action.payload.country;
      state.flag = action.payload.flag;
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;