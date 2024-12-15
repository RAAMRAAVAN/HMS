import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";
import {  otDiscountSlice } from "./features/otDiscount/otDiscountSlice";
import { quotesApiSlice } from "./features/quotes/quotesApiSlice";
import { bedStatusSlice } from "./features/bedStatus/bedStatusSlice"; // Import your new slice
import { ipdPatientSlice } from "./features/IPDPatient/IpdPatientSlice";
import { userSlice } from "./features/userLoginDetails/userSlice";
import { textEditorSlice } from "./features/TextEditor/TextEditorSlice";
import { ipdCaseEntrySlice } from "./features/IPDCaseEntry/IpdCaseEntrySlice";

// Combine all your slices
const rootReducer = combineSlices(otDiscountSlice, quotesApiSlice, bedStatusSlice, userSlice, ipdPatientSlice, textEditorSlice, ipdCaseEntrySlice); // Add bedStatusSlice here

// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof rootReducer>;

// Create a store with the combined reducer and middleware
export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(quotesApiSlice.middleware); // Include any additional middleware needed
    },
  });
};

// Infer the return type of `makeStore`
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
