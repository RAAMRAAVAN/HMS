import { FETCH_IPDPATIENT_FAILURE,FETCH_IPDPATIENT_REQUEST,FETCH_IPDPATIENT_SUCCESS,FETCH_IPDNO} from "./ipdPatientTypes";
import axios from "axios";
const fetchipdPatinetRequest=()=>{
    // console.log("inside fetchuserrequest");
    return{
        type: FETCH_IPDPATIENT_REQUEST
    }
}

const fetchipdPatinetSuccess=users=>{
    return{
        type: FETCH_IPDPATIENT_SUCCESS,
        payload: users
    }
}


const fetchipdPatinetFailure=error=>{
    return{
        type: FETCH_IPDPATIENT_FAILURE,
        payload: error
    }
}
export const fetchipdPatinet=(fromDate, toDate)=>{
    return (dispatch)=>{
        dispatch(fetchipdPatinetRequest);
        axios.post('http://192.168.1.32:5000/filterIPDPatient')
        .then(response=>{
            const ipdPatinet=response.data
            dispatch(fetchipdPatinetSuccess(ipdPatinet))
            // dispatch(filteripdPatinetBills(ipdPatinet))
        })
        .catch(error=>{
            const errorMsg=error.message
            dispatch(fetchipdPatinetFailure(errorMsg))
        })
    }
} 

export const setIPDNO=(value)=>{
    return{
        type: FETCH_IPDNO,
        payload: value
    }
} 