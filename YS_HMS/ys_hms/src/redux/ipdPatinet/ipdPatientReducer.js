import { FETCH_IPDPATIENT_FAILURE,FETCH_IPDPATIENT_REQUEST,FETCH_IPDPATIENT_SUCCESS, FETCH_IPDNO} from "./ipdPatientTypes";

const initialState={
    loading:false,
    ipdPatientDetails:[],
    IPDNo: "",
    IPDID: "",
    error:""
}
const ipdPatientReducer=(state=initialState,action)=>{
    switch(action.type)
    {
        case FETCH_IPDPATIENT_REQUEST:
            return{
                ...state,
                loading:true
            }
        case FETCH_IPDPATIENT_SUCCESS:
            return{
                loading:false,
                ipdPatientDetails:[...action.payload.filtered_patients],
                // wardDetails: [...action.payload.WardMaster],
                error:""
            }    
   
        case FETCH_IPDPATIENT_FAILURE:
            return{
                loading:false,
                error: action.payload,
                CaseEntryBills:[]
            } 
        case FETCH_IPDNO:
            return{
                IPDNo: action.payload
            }   
        default: return(state);       
    }
}
export default ipdPatientReducer;