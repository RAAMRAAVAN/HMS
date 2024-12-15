// Import necessary dependencies
import type { PayloadAction } from "@reduxjs/toolkit";
import { bedStatus } from "./bedStatusAPI"; // Adjust the import path as necessary
import { createAppSlice } from "../../createAppSlice"; // Adjust the import path as necessary

// Define the structure of BedMaster and WardMaster
interface BedMaster {
  id: number;
  name: string;
  // Add other properties as necessary
}

interface WardMaster {
  id: number;
  name: string;
  // Add other properties as necessary
}

// Define the state interface for BedStatus
export interface BedStatusSliceState {
  value: number;
  status: "idle" | "loading" | "failed";
  loading: boolean;
  bedDetails: BedMaster[];  // Use specific type instead of any[]
  wardDetails: WardMaster[];  // Use specific type instead of any[]
  error: string;
}

// Define the initial state
const initialState: BedStatusSliceState = {
  value: 0,
  status: "idle",
  loading: false,
  bedDetails: [],
  wardDetails: [],
  error: ""
};

// Create the bed status slice
export const bedStatusSlice = createAppSlice({
  name: "BedStatus",
  initialState,
  reducers: {
    loading: (state) => {
      state.status = "loading";
      state.loading = true;
    },
    fulfilled: (state, action: PayloadAction<{ BedMaster: BedMaster[]; WardMaster: WardMaster[] }>) => {
      state.status = "idle";
      state.loading = false;
      state.bedDetails = action.payload.BedMaster || [];
      state.wardDetails = action.payload.WardMaster || [];
    },
    failed: (state, action: PayloadAction<string>) => {
      state.status = "failed";
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Define the async thunk
export const getBedStatusAsync = (amount: number) => async (dispatch: any) => {
  dispatch(bedStatusSlice.actions.loading());

  try {
    const response = await bedStatus(amount);
    dispatch(bedStatusSlice.actions.fulfilled(response.data)); // Ensure response.data matches your API structure
  } catch (error: any) {
    // Extract error message from the caught error
    const errorMessage = error.response?.data?.message || "Failed to fetch bed status";
    dispatch(bedStatusSlice.actions.failed(errorMessage));
  }
};

// Export action creators
export const { actions } = bedStatusSlice;

// Define selectors for accessing state
export const selectBedDetails = (state: { BedStatus: BedStatusSliceState }) => state.BedStatus.bedDetails;
export const selectWardDetails = (state: { BedStatus: BedStatusSliceState }) => state.BedStatus.wardDetails;
export const selectStatus = (state: { BedStatus: BedStatusSliceState }) => state.BedStatus.status;
export const selectError = (state: { BedStatus: BedStatusSliceState }) => state.BedStatus.error;
