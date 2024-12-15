// Import necessary dependencies
import type { PayloadAction } from "@reduxjs/toolkit";
// import { getUser } from "./userAPI"; // Adjust the import path as necessary
import { createAppSlice } from "../../createAppSlice"; // Adjust the import path as necessary

// Define the state interface for UserSlice
export interface TextEditorSliceState {
  value: string;  // If userDetails is an object, define it as such
}

// Define the initial state
const initialState: TextEditorSliceState = {
  value: "<p></p>",
};

// Create the user slice
export const textEditorSlice = createAppSlice({
  name: "textEditorSlice",
  initialState,
  // reducers: {
  //   assignIPDNo: (state, action: PayloadAction<{ IPDNo: string;}>) => {
  //     console.log("IPDNO=", action.payload.IPDNo);
  //     state.IPDNo = action.payload.IPDNo || "";
  //   }
  // },

  reducers: (create) => ({
    // Use the `PayloadAction` type to declare the contents of `action.payload`
    assignValue: create.reducer(
      (state, action: PayloadAction<string>) => {
        state.value = action.payload;
      },
    ),
    // The function below is called a thunk and allows us to perform async logic. It
    // can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
    // will call the thunk with the `dispatch` function as the first argument. Async
    // code can then be executed and other actions can be dispatched. Thunks are
    // typically used to make async requests.
  })
});

// Action creators are generated for each case reducer function.
export const { assignValue} =
textEditorSlice.actions;

// Define selectors for accessing state
export const selectTextValue = (state: { textEditorSlice: TextEditorSliceState }) => state.textEditorSlice.value;
