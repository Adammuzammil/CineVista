import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./features/themeSlice";
import globalLoadingSlice from "./features/globalLoading";
import appStateSlice from "./features/appStateSlice";

const store = configureStore({
  reducer: {
    theme: themeSlice,
    globalLoading: globalLoadingSlice,
    appState: appStateSlice,
  },
});

export default store;
