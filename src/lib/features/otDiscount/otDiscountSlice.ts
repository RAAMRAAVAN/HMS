import type { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../../createAppSlice";
import { AppThunk } from "../../store";

export interface OtDiscountSliceState {
  ItemDiscountAssistant: number[];
  ItemDiscountAnesthesia: number[];
  ItemDiscountOT: number;
}

const initialState: OtDiscountSliceState = {
  ItemDiscountAssistant: [],
  ItemDiscountAnesthesia: [],
  ItemDiscountOT: 0
};

// Define the slice
export const otDiscountSlice = createAppSlice({
  name: "otDiscount",
  initialState,
  reducers: {
    // Use the `PayloadAction` type to declare the contents of `action.payload`
    setItemDiscountAssistant: (state, action: PayloadAction<{ AssistantDiscountAmount: number; index: number }>) => {
      const { AssistantDiscountAmount, index } = action.payload;
      let newValue = [...state.ItemDiscountAssistant];
      console.log("action.payload.AssistantDiscountAmount=", action.payload);
      newValue[index] = AssistantDiscountAmount;
      state.ItemDiscountAssistant = newValue;
    },

    setItemDiscountAnesthesia: (state, action: PayloadAction<{ AnesthesiaDiscountAmount: number; index: number }>) => {
      const { AnesthesiaDiscountAmount, index } = action.payload;
      let newValue = [...state.ItemDiscountAnesthesia];
      console.log("action.payload.AnesthesiaDiscountAmount=", action.payload);
      newValue[index] = AnesthesiaDiscountAmount;
      state.ItemDiscountAnesthesia = newValue;
    },

    setItemDiscountOT: (state, action: PayloadAction<{ OTDiscountAmount: number; index: number }>) => {
      const { OTDiscountAmount} = action.payload;
      state.ItemDiscountOT = OTDiscountAmount;
    }
  }
});

// Action creators are generated for each case reducer function.
export const { setItemDiscountAssistant, setItemDiscountAnesthesia, setItemDiscountOT } = otDiscountSlice.actions;

// Define selectors for accessing state
export const selectItemDiscountAssistant = (state: { otDiscount: OtDiscountSliceState }) => state.otDiscount.ItemDiscountAssistant;
export const selectItemDiscountAnesthesia = (state: { otDiscount: OtDiscountSliceState }) => state.otDiscount.ItemDiscountAnesthesia;
export const selectItemDiscountOT = (state: { otDiscount: OtDiscountSliceState }) => state.otDiscount.ItemDiscountOT;