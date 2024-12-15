// Import necessary dependencies
import type { PayloadAction } from "@reduxjs/toolkit";
// import { getUser } from "./userAPI"; // Adjust the import path as necessary
import { createAppSlice } from "../../createAppSlice"; // Adjust the import path as necessary

// Define the state interface for UserSlice
export interface IpdPatientSliceState {
  IPDNo: number;  // If userDetails is an object, define it as such
  selectedPatient: {};
}

// Define the initial state
const initialState: IpdPatientSliceState = {
  IPDNo: null,
  selectedPatient: null
};

// Create the user slice
export const ipdPatientSlice = createAppSlice({
  name: "ipdPatientSlice",
  initialState,
  // reducers: {
  //   assignIPDNo: (state, action: PayloadAction<{ IPDNo: string;}>) => {
  //     console.log("IPDNO=", action.payload.IPDNo);
  //     state.IPDNo = action.payload.IPDNo || "";
  //   }
  // },

  reducers: (create) => ({
    // Use the `PayloadAction` type to declare the contents of `action.payload`
    assignIPDNo: create.reducer(
      (state, action: PayloadAction<number>) => {
        state.IPDNo = action.payload;
      },
    ),
    assignselectedPatient: create.reducer(
      (state, action: PayloadAction<{}>) => {
        state.selectedPatient = action.payload;
      },
    ),
  })
});

// Action creators are generated for each case reducer function.
export const { assignIPDNo, assignselectedPatient} =
ipdPatientSlice.actions;

// Define selectors for accessing state
export const selectIPDNo = (state: { ipdPatientSlice: IpdPatientSliceState }) => state.ipdPatientSlice.IPDNo;
export const selectselectedPatient = (state: { ipdPatientSlice: IpdPatientSliceState }) => state.ipdPatientSlice.selectedPatient;