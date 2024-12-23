import { Grid, Typography } from "@mui/material";
import { AnesthesiaDoctorDetails } from "./AnesthesiaDoctorDetails";
import { useEffect, useState } from "react";
import axios from "axios";
import { SurgeonDoctorDetails } from "./SurgeonDoctorDetails";

export const OTBilling = () => {
    const [DoctorList, setDoctorList] = useState([]);
    const fetchDoctorList = async() => {
        try{
            let result = axios.get("http://localhost:5000/getDoctorList");
            setDoctorList((await result).data.DoctorList)
        }catch(err){
            alert(err);
        }
    } 

  useEffect(()=>{
    fetchDoctorList();
  },[])

    return(<>
    <Grid container >
        <Grid item xs={6}>
            <AnesthesiaDoctorDetails DoctorList={DoctorList}/>
        </Grid>
        <Grid item xs={6}>
            <SurgeonDoctorDetails DoctorList={DoctorList}/>
        </Grid>
    </Grid>
    </>);
}