import { useNavigate, useParams } from "react-router-dom";
import { TopNav } from "../../components/TopNav";
import { IPDNav } from "./IPDNav";
import { useLocation } from "react-router-dom";
import { Autocomplete, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { setIPDNO } from "../../redux/ipdPatinet/ipdPatientAction";
import { useDispatch, useSelector } from "react-redux";

export const IPDModule = () => {
const IPDNo=useSelector(state=>state.ipdPatientReducer.IPDNo)
const navigate = useNavigate();
const dispatch=useDispatch();
  const [patientList, setPatientList] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const getFilteredPatients = async (input) => {
    try {
      const response = await axios.post(
        "http://192.168.1.32:5000/filterIPDPatient",
        {
          like_name: input,
        }
      );
      setPatientList(response.data.filtered_patients);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log("myValue=", myValue)
  return (
    <>
      <TopNav />
      <Grid item xs={4} alignItems="center" paddingX={1}>
        <Typography fontSize="13px" fontWeight="bold">
          UHID - Patient Name:
        </Typography>
        <Autocomplete
          fullWidth
          options={patientList}
          getOptionLabel={(option) =>
            `[UHID: ${option.HRNo}] [NAME: ${option.PatientName}] [IPDNO: ${option.IPDNo}] [DOA: ${option.Date}]`
          } // Specify which property to use as the label
          value={selectedPatient}
          onChange={(event, newValue) => {
            setSelectedPatient(newValue); // Update the state variable when the value changes
            if(newValue!=null){
                console.log("update IPD NO=", newValue.IPDNo)
            dispatch(setIPDNO(newValue.IPDNo));}

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
