// Import necessary dependencies
import type { PayloadAction } from "@reduxjs/toolkit";
// import { getUser } from "./userAPI"; // Adjust the import path as necessary
import { createAppSlice } from "../../createAppSlice"; // Adjust the import path as necessary

// Define the state interface for UserSlice
export interface IpdPatientSliceState {
  IPDNo: number;  // If userDetails is an object, define it as such
  selectedPatient: { IPAID: null | string };
  fetch: boolean
}

// Define the initial state
const initialState: IpdPatientSliceState = {
  IPDNo: 0,
  selectedPatient: {IPAID: null},
  fetch: false
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
        state.IPDNo = action.payload.IPAID;
      },
    ),
    updateFetch: create.reducer(
      (state) => {
        // state.IPDNo = action.payload;
        state.fetch = false;
      },
    ),
  })
});

// Action creators are generated for each case reducer function.
export const { assignIPDNo, assignselectedPatient, updateFetch} =
ipdPatientSlice.actions;

// Define selectors for accessing state
export const selectIPDNo = (state: { ipdPatientSlice: IpdPatientSliceState }) => state.ipdPatientSlice.IPDNo;
export const selectselectedPatient = (state: { ipdPatientSlice: IpdPatientSliceState }) => state.ipdPatientSlice.selectedPatient;
export const selectfetch = (state: { ipdPatientSlice: IpdPatientSliceState }) => state.ipdPatientSlice.fetch;