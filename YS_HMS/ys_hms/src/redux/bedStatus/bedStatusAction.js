import { FETCH_BED_STATUS_FAILURE,FETCH_BED_STATUS_REQUEST,FETCH_BED_STATUS_SUCCESS,APPLY_BED_STATUS_FILTER} from "./bedStatusTypes";
import axios from "axios";
const fetchbedStatusRequest=()=>{
    // console.log("inside fetchuserrequest");
    return{
        type: FETCH_BED_STATUS_REQUEST
    }
}

const fetchbedStatusSuccess=users=>{
    return{
        type: FETCH_BED_STATUS_SUCCESS,
        payload: users
    }
}


const fetchbedStatusFailure=error=>{
    return{
        type: FETCH_BED_STATUS_FAILURE,
        payload: error
    }
}
export const fetchbedStatus=(fromDate, toDate)=>{
    return (dispatch)=>{
        dispatch(fetchbedStatusRequest);
        axios.post('http://192.168.1.32:5000/getWardCollection')
        .then(response=>{
            const bedStatus=response.data
            dispatch(fetchbedStatusSuccess(bedStatus))
            // dispatch(filterbedStatusBills(bedStatus))
        })
        .catch(error=>{
            const errorMsg=error.message
            dispatch(fetchbedStatusFailure(errorMsg))
        })
    }
} 

// export const filterbedStatus=(value)=>{
//     return{
//         type: APPLY_BED_STATUS_FILTER,
//         payload: value
//     }
// } 