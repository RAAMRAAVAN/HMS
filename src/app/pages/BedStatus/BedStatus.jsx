import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { TopNav } from "../../components/NavBar/TopNav";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getBedStatusAsync, selectBedDetails, selectWardDetails } from "@/src/lib/features/bedStatus/bedStatusSlice";
import { assignIPDNo, assignselectedPatient, selectIPDNo, setIPDNo } from "@/src/lib/features/IPDPatient/IpdPatientSlice";
import { useRouter } from "next/navigation";

export const BedStatus = (props) => {
  const {setLoading} = props
  const dispatch = useDispatch();
  const router = useRouter();
  const bedDetails = useSelector(selectBedDetails)
  const wardDetails = useSelector(selectWardDetails)

  // const [loading, setLoading] = useState(false);

  const handleBedClick = async(bed) => {
    setLoading("loading")
    dispatch(assignIPDNo(bed.IPAID));
    dispatch(assignselectedPatient({IPAID: bed.IPAID, HRNo: bed.IPDHRNo, PatientName: bed.PatientName, Date: bed.Date}));
    router.push('/pages/IPDModule');
    // setLoading(false)
  };

  return (
    <>
      {/* <TopNav/> */}
      <Box display="flex" padding={1} flexDirection="column" width="100vw">
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
                      else {
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
                            onClick={() => { handleBedClick(bed) }}
                          >
                            <Box
                              display="flex"
                              width="100%"
                              justifyContent="center"
                              alignItems="center"
                              style={bed.Discharge !== 'Y' ? {
                                background:
                                  "linear-gradient(to right, #FFA500, #FFD580)",
                                cursor: "pointer",
                                borderRadius: "5px",
                              } : {
                                background:
                                  "pink",
                                cursor: "pointer",
                                borderRadius: "5px",
                              }}
                              flexDirection="column"
                              color="white"

                            >
                              <Typography fontWeight="bold" color="black">{bed.BedNo}{bed.CompanyID === 110 ? " (Ayushman)" : null}</Typography>
                              {/* {loading ? (
                                <CircularProgress size={24} color="inherit" />
                              ) : (
                                <> */}
                                  <Typography fontWeight="bold">
                                    {bed.IPDHRNo === 0 ? null : bed.IPDHRNo} / {bed.IPDHRNo === 0 ? null : new Date(bed.Date).toISOString().split("T")[0]}
                                  </Typography>
                                  <Typography fontWeight="bold">{bed.IPDHRNo === 0 ? null : bed.PatientName}</Typography>
                                {/* </>
                              )} */}
                            </Box>
                          </Grid>
                        );
                      }
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
