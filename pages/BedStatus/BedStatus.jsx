import { Box, Grid, Typography } from "@mui/material";
import { TopNav } from "../../components/TopNav";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchbedStatus, setIPDNO } from "../../redux";
// import { useNavigate } from "react-router-dom";

export const BedStatus = () => {
  const dispatch=useDispatch(); 
  // const navigate = useNavigate();
  const bedDetails=useSelector(state=>state.bedStatus.bedDetails)
  const wardDetails=useSelector(state=>state.bedStatus.wardDetails)
  const [admissionDetails, setAdmissionDetails] = useState([]);

  const fetchAdmissionDetails = async () => {
    try {
      const response = await axios.post(
        "http://192.168.1.32:5000/getIPDAdmissionDetails"
      );
      // console.log("total",response.data.find(item => item.MOD === null).TotalRate);
      if (response != []) {
        console.log(response);
        setAdmissionDetails(response.data.IPDAdmission); // Update state with the fetched data
        console.log("admissionDetails=", response.data.IPDAdmission);
      }
    } catch (error) {
      console.log(error); // Handle error
    } finally {
      console.log(false); // Set loading to false after request completes
    }
  };
  useEffect(() => {
    console.log("bedDetails=", bedDetails)
    if(bedDetails.length === 0)
    { console.log("fetch");
      dispatch(fetchbedStatus());
      fetchAdmissionDetails();
    }
    
  }, []);

  const findByHrno = (hrno) => {
    return admissionDetails.find((entry) => entry.HRNo === hrno);
  };
  return (
    <>
      <TopNav />
      <Box display="flex" padding={1} flexDirection="column">
        <Typography
          variant="h6"
          paddingX={1}
          fontWeight="bold"
          color="darkblue"
        >
          Bed Status
        </Typography>
        {wardDetails.map((ward, index) => {
          return (
            <Box key={index} display="flex" border="1px black solid">
              <Box
                padding={1}
                display="flex"
                width="100%"
                flexDirection="column"
              >
                <Typography fontWeight="bold">{ward.WardName}</Typography>
                <Grid container flexDirection="row" width="100%">
                  {bedDetails.map((bed, index) => {
                    if (ward.WardID === bed.WardID) {
                      if (bed.BedStatus === 'O')
                        return (
                          <Grid
                            lg={2}
                            item
                            display="flex"
                            width="100%"
                            height="130px"
                            padding={1}
                            // onClick={()=>{navigate('/IPDList')}}
                          >
                            <Box
                              display="flex"
                              width="100%"
                              justifyContent="center"
                              alignItems="center"
                              style={{
                                background:
                                  "linear-gradient(to right, #008000, #90EE90)",
                                cursor: "pointer",
                                borderRadius: "5px",
                              }}
                            >
                              <Typography>{bed.BedNo}</Typography>
                              
                              {/* <Typography>{bed.IPDHRNo === 0? null:patientDetails.PatientName}</Typography> */}
                            </Box>
                          </Grid>
                        );
                      else
                        { 
                          // let PatientDetails = admissionDetails.find(patient => patient.HRNo == bed.IPDHRNo)
                          // if(PatientDetails != null)
                          return (
                          <Grid
                            lg={2}
                            item
                            display="flex"
                            width="100%"
                            height="130px"
                            padding={1}
                            // onClick={()=>{dispatch(setIPDNO(bed.IPDNo));navigate(`/IPDModule`)}}
                          >
                            <Box
                              display="flex"
                              width="100%"
                              justifyContent="center"
                              alignItems="center"
                              style={bed.Discharge !== 'Y'?{
                                background:
                                  "linear-gradient(to right, #FFA500, #FFD580)",
                                cursor: "pointer",
                                borderRadius: "5px",
                              }:{background:
                                "pink",
                              cursor: "pointer",
                              borderRadius: "5px",}}
                              flexDirection="column"
                              color="white"
                              
                            >
                              <Typography fontWeight="bold" color="black">{bed.BedNo}{bed.CompanyID === 110?" (Ayushman)":null}</Typography>
                              <Typography fontWeight="bold">
                                {bed.IPDHRNo === 0 ? null : bed.IPDHRNo}
                                / {bed.IPDHRNo === 0 ? null : new Date(bed.Date).toISOString().split("T")[0]}
                              </Typography>
                              <Typography fontWeight="bold">{bed.IPDHRNo === 0 ? null : bed.PatientName}</Typography>
                              {/* <Typography fontWeight="bold">Date: {bed.IPDHRNo === 0 ? null : bed.Date}</Typography> */}
                            </Box>
                          </Grid>
                        );}
                    }
                  })}
                </Grid>
              </Box>
            </Box>
          );
        })}
      </Box>
    </>
  );
};
