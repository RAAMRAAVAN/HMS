import { FETCH_BED_STATUS_FAILURE,FETCH_BED_STATUS_REQUEST,FETCH_BED_STATUS_SUCCESS,APPLY_CASE_FILTER } from "./bedStatusTypes";

const initialState={
    loading:false,
    bedDetails:[],
    wardDetails:[],
    error:""
}
const bedStatusReducer=(state=initialState,action)=>{
    switch(action.type)
    {
        case FETCH_BED_STATUS_REQUEST:
            return{
                ...state,
                loading:true
            }
        case FETCH_BED_STATUS_SUCCESS:
            return{
                loading:false,
                bedDetails:[...action.payload.BedMaster],
                wardDetails: [...action.payload.WardMaster],
                error:""
            }    
   
        case FETCH_BED_STATUS_FAILURE:
            return{
                loading:false,
                error: action.payload,
                CaseEntryBills:[]
            } 
        // case APPLY_CASE_FILTER:
        //     return{
        //         ...state,
        //         filteredCaseEntryBills:[...action.payload.caseEntries],
        //         filteredDueCollectBills: [...action.payload.caseEntries],
        //     }    
        default: return(state);       
    }
}
export default bedStatusReducer;