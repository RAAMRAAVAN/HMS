// import { useNavigate, useParams } from "react-router-dom";
// import { TopNav } from "../../components/TopNav";
import { assignIPDNo, assignselectedPatient, selectselectedPatient } from "@/src/lib/features/IPDPatient/IpdPatientSlice";
import { IPDNav } from "./IPDNav";
// import { useLocation } from "react-router-dom";
import { Autocomplete, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
// import { setIPDNO } from "../../redux/ipdPatinet/ipdPatientAction";
import { useDispatch, useSelector } from "react-redux";

export const IPDModule = () => {
// const IPDNo=useSelector(state=>state.ipdPatientReducer.IPDNo)
// const navigate = useNavigate();
const dispatch=useDispatch();
const hasFetchedSelectedPatient = useRef(false);
  const [patientList, setPatientList] = useState([]);
  const fetchedselectedPatient = useSelector(selectselectedPatient);
  const [selectedPatient, setSelectedPatient] = useState(null);
  console.log("selectedPatient=", selectedPatient);
  const getFilteredPatients = async (input) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/filterIPDPatientAuto",
        {
          like_name: input,
        }
      );
      setPatientList(response.data.filtered_patients);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    if(fetchedselectedPatient != null && !hasFetchedSelectedPatient.current){
      console.log("fetchedselectedPatient",fetchedselectedPatient)
      setSelectedPatient(fetchedselectedPatient);
      console.log("Count=123")
      hasFetchedSelectedPatient.current = true;
    }
  },[])

  // console.log("myValue=", myValue)
  return (
    <>
      {/* <TopNav /> */}
      <Grid item xs={4} alignItems="center" padding={1} display="flex" width="100%" flexDirection="column
      ">
        <Autocomplete
          fullWidth
          options={patientList}
          getOptionLabel={(option) =>
            `[UHID: ${option.HRNo}] [NAME: ${option.PatientName}] [IPDNO: ${option.IPAID}] [DOA: ${new Date(option.Date).toISOString().split("T")[0]}]`
          } // Specify which property to use as the label
          value={selectedPatient}
          onChange={(event, newValue) => {
            setSelectedPatient(newValue); // Update the state variable when the value changes
            if(newValue!=null){
                console.log("update IPD NO=", newValue.IPAID)
            dispatch(assignselectedPatient(newValue));}

          }}
          onInputChange={(event, newInputValue) => {
            getFilteredPatients(newInputValue); // Call the function while typing
          }}
          renderInput={(params) => <TextField {...params} />}
          sx={{ width: "100%" }}
          size="small"
        />
      </Grid>
      <IPDNav/>
    </>
  );
};
