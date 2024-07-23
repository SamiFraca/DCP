import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./features/languageSlice";
import { saveLanguageState, loadLanguageState } from "@/utils/localStorage";
const preloadedState = loadLanguageState();
const store = configureStore({
  reducer: {
    language: languageReducer,
  },
  preloadedState: {
    language: preloadedState,
  },
});
store.subscribe(() => {
  saveLanguageState(store.getState().language);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
