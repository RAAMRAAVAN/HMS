import {SET_ITEM_DISCOUNT_ASSISTANT, SET_ITEM_DISCOUNT_ANESTHESIA, SET_ITEM_DISCOUNT_OT} from "./ipdBillTypes";
import axios from "axios";

export const setItemDiscountAssistant=(value, index)=>{
    console.log("action val=", value)
    return{
        type: SET_ITEM_DISCOUNT_ASSISTANT,
        payload: value,
        index: index
    }
} 

export const setItemDiscountAnesthesia=(value, index)=>{
    console.log("action val=", value)
    return{
        type: SET_ITEM_DISCOUNT_ANESTHESIA,
        payload: value,
        index: index
    }
} 

export const setItemDiscountOT=(value, index)=>{
    return{
        type: SET_ITEM_DISCOUNT_OT,
        payload: value,
        index: index
    }
} 