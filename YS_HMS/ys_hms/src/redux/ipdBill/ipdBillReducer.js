import { SET_ITEM_DISCOUNT_ASSISTANT, SET_ITEM_DISCOUNT_ANESTHESIA, SET_ITEM_DISCOUNT_OT} from "./ipdBillTypes";
const initialState={
    ItemDiscountAssistant: [],
    ItemDiscountAnesthesia: [],
    ItemDiscountOT: []
}
const ipdBillReducer=(state=initialState,action)=>{
    switch(action.type)
    {
        case SET_ITEM_DISCOUNT_ASSISTANT:
            let index = action.index;
            let newValue = [...state.ItemDiscountAssistant];
            newValue[index] = action.payload;
            return{
                ...state,
                ItemDiscountAssistant: newValue
            }  
        case SET_ITEM_DISCOUNT_ANESTHESIA:
            let index2 = action.index;
            let newValue2 = [...state.ItemDiscountAnesthesia];
            newValue2[index2] = action.payload;
            return{
                ...state,
                ItemDiscountAnesthesia: newValue2
            }  
        case SET_ITEM_DISCOUNT_OT:
            let index3 = action.index;
            let newValue3 = [...state.ItemDiscountOT];
            newValue3[index3] = action.payload 
            return{
                ...state,
                ItemDiscountOT: newValue3
            }
        default: return(state);       
    }
}
export default ipdBillReducer;