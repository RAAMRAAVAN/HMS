// Import necessary dependencies
import type { PayloadAction } from "@reduxjs/toolkit";
import { getUser } from "./userAPI"; // Adjust the import path as necessary
import { createAppSlice } from "../../createAppSlice"; // Adjust the import path as necessary

// Define the state interface for UserSlice
export interface UserSliceState {
  value: number;
  status: "idle" | "loading" | "failed";
  loading: boolean;
  userDetails: Record<string, any>;  // If userDetails is an object, define it as such
  userID: number | null;
  FirstName: string;
  error: string;
}

// Define the initial state
const initialState: UserSliceState = {
  value: 0,
  status: "idle",
  loading: false,
  userDetails: {},  // Set to an empty object if it's not an array
  userID: null,
  FirstName: "",
  error: "",
};

// Create the user slice
export const userSlice = createAppSlice({
  name: "userSlice",
  initialState,
  reducers: {
    loading: (state) => {
      state.status = "loading";
      state.loading = true;
    },
    fulfilled: (state, action: PayloadAction<{ userDetails: {}; userID: number; FirstName: string }>) => {
      state.status = "idle";
      state.loading = false;
      console.log("WORKING");
      state.userDetails = action.payload.userDetails || {};  // Ensure it's an object
      state.userID = action.payload.userID || null;  // Corrected key to userID
      state.FirstName = action.payload.FirstName || "";
    },
    failed: (state, action: PayloadAction<string>) => {
      state.status = "failed";
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Define the async thunk
export const getUserDetailsAsync = (userLoginID: string, Password: string) => async (dispatch: any) => {
  dispatch(userSlice.actions.loading());

  try {
    const response = await getUser(userLoginID, Password);
    console.log("User Data=", response.data.userDetails[0]);

    // Ensure response.data matches your API structure and adjust payload if needed
    dispatch(userSlice.actions.fulfilled({
      userDetails: response.data.userDetails[0], 
      userID: response.data.userDetails[0].UId, 
      FirstName: response.data.userDetails[0].FirstName 
    }));
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "Failed to fetch user details";
    alert("Invalid Credentials");
    dispatch(userSlice.actions.failed(errorMessage));
  }
};

// Export action creators
export const { actions } = userSlice;

// Define selectors for accessing state
export const selectUserDetails = (state: { userSlice: UserSliceState }) => state.userSlice.userDetails;
export const selectuserID = (state: { userSlice: UserSliceState }) => state.userSlice.userID;
export const selectStatus = (state: { userSlice: UserSliceState }) => state.userSlice.status;
export const selectError = (state: { userSlice: UserSliceState }) => state.userSlice.error;
