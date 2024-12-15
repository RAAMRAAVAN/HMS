// Import necessary dependencies
import type { PayloadAction } from "@reduxjs/toolkit";
// import { getUser } from "./userAPI"; // Adjust the import path as necessary
import { createAppSlice } from "../../createAppSlice"; // Adjust the import path as necessary

// Define the state interface for UserSlice
export interface IpdCaseEntrySliceState {
  Entries: {}[];
  DiscountP: number;
}

// Define the initial state
const initialState: IpdCaseEntrySliceState = {
  Entries: [],
  DiscountP: 0,
};

// Create the user slice
export const ipdCaseEntrySlice = createAppSlice({
  name: "ipdCaseEntrySlice",
  initialState,

  reducers: (create) => ({
    // Use the `PayloadAction` type t+o declare the contents of `action.payload`
    updateCaseEntries: create.reducer(
      (state, action: PayloadAction<{Entry: {}; index: number}>) => {
        const {Entry, index} = action.payload
        let TempEntry = [...state.Entries];
        TempEntry[index] = action.payload
        state.Entries = TempEntry;
      },
    ),
    setCaseEntry: create.reducer(
      (state, action: PayloadAction<{Entry: {};}>) => {
        const {Entry} = action.payload
        state.Entries = [...state.Entries, Entry];
      },
    ),
    deleteCaseEntry: create.reducer(
      (state, action: PayloadAction<{index: number;}>) => {
        const {index} = action.payload;
        console.log("Temp=", index)
        const TempEntry = [...state.Entries];
        TempEntry.splice(index, 1)
        console.log("TempEntry=",TempEntry)
        state.Entries =  TempEntry;
      },
    ),
    updateDiscount: create.reducer((state, action: PayloadAction<{Discount: number; index: number}>)=>{
      // let TempEntry = [...state.Entries];
      const { Discount, index } = action.payload;
      state.Entries[index].Discount = Discount;
    }
    ),
    updateAmount: create.reducer((state, action: PayloadAction<{Amount: number; index: number}>)=>{
      // let TempEntry = [...state.Entries];
      const { Amount, index } = action.payload;
      state.Entries[index].Amount = Amount;
      state.Entries[index].Rate = Amount;
      state.Entries[index].Discount = state.DiscountP/100*Amount;
    }
    ),
    calculateDiscount: create.reducer((state, action: PayloadAction<{DiscountP: number;}>)=>{
      let TempEntry = [...state.Entries];
      const { DiscountP } = action.payload;
      TempEntry.forEach((entry, index) => {
        entry.Discount = (entry.Amount * DiscountP) / 100;
        // entry.Amount = entry.Amount - (entry.Amount - (entry.Amount * DiscountP) / 100);
      })
      state.Entries = TempEntry;
    }
    ),
    assignDiscountP: create.reducer(
      (state, action: PayloadAction<{DiscountP: number;}>) => {
        state.DiscountP = action.payload.DiscountP;
      },
    ),
    clearCaseEntries: create.reducer((state) => {
      state.Entries = [];
    })
  })
});

// Action creators are generated for each case reducer function.
export const { updateCaseEntries, setCaseEntry, calculateDiscount,deleteCaseEntry, clearCaseEntries, assignDiscountP, updateAmount, updateDiscount} =
ipdCaseEntrySlice.actions;

// Define selectors for accessing state
export const selectCaseEntryItems = (state: { ipdCaseEntrySlice: IpdCaseEntrySliceState }) => state.ipdCaseEntrySlice.Entries;
export const selectDiscountP = (state: {DiscountP: IpdCaseEntrySliceState}) => state.ipdCaseEntrySlice.DiscountP;
// export const selectselectedPatient = (state: { ipdCaseEntrySlice: IpdCaseEntrySliceState }) => state.ipdCaseEntrySlice.selectedPatient;