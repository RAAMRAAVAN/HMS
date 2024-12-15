import { Box, Grid, Typography } from "@mui/material";
import { DropdownMenu } from "../../components/DropDownMenu";
import { LeftDrawer } from "../../components/LefstDrawer";
import { TopNav } from "../../components/TopNav";
import { Fullscreen, Minimize, VerifiedUser } from "@mui/icons-material";
// import Grid from "@mui/material/Unstable_Grid/Grid";
import { TodayCollection } from "./TodayCollection";
import { useEffect, useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchbedStatus } from "../../redux";

export const HomePage = () => {
  // const navigate = useNavigate();
  // const dispatch=useDispatch();  
  // const bedStatus=useSelector(state=>state.bedStatus)
  // console.log("redux bed status=", bedStatus.bedDetails)
//   useEffect(()=>{
//     dispatch(fetchbedStatus());
// },[])
  return (
    <>
      <TopNav />
      <Typography variant="h6" paddingX={1} fontWeight="bold" color="darkblue">
        Dashboard
      </Typography>
      <Box
        display="flex"
        border="1px black solid"
        borderRadius="5px"
        flexDirection="column"
        padding="5px"
        margin={1}
      >
        <Box
          display="flex"
          border="2px black solid"
          borderRadius="5px"
          flexDirection="column"
          padding="0px"
          margin={1}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            backgroundColor="#ecc71d"
            alignItems="center"
            // border="1px black solid"
            borderRadius="3px 3px 0% 0% "
          >
            <Typography color="white" paddingX={1} fontWeight="bold">
              Bed Status
            </Typography>
            <Box paddingX={1}>
              <Fullscreen />
              <Minimize />
            </Box>
          </Box>
          <Grid container>
            <Grid
              item
              sm={3}
              boxSizing="border-box"
              fontWeight="bold"
              padding={1}
              
            >
              <Box
                // border="1px black solid"
                borderRadius="5px"
                
                display="flex"
                width="100%"
                height="80px"
                boxSizing="border-box"
                style={{background:"linear-gradient(to right, #FFA500, #FFD580)", cursor:"pointer"}}
                onClick={()=>{navigate('/bedstatus')}}
              >
                <Box display="flex" justifyContent="space-between" width="100%" paddingX={3}>
                  <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                    <Typography color="white" fontWeight="bold">No of Patient</Typography>
                    <Typography color="white" fontWeight="bold">{bedStatus.bedDetails.filter(patient => patient.BedStatus === 'B').length}</Typography>
                  </Box>
                  <Box display="flex" justifyContent="center" alignItems="center"><VerifiedUser sx={{ color: '#FFA500', display:"flex" }} /></Box>
                </Box>
                
              </Box>
            </Grid>

            <Grid
              item
              sm={3}
              boxSizing="border-box"
              fontWeight="bold"
              padding={1}
            >
              <Box
                // border="1px black solid"
                borderRadius="5px"
                onClick={()=>{navigate('/bedstatus')}}
                display="flex"
                width="100%"
                height="80px"
                boxSizing="border-box"
                style={{background:"linear-gradient(to right, #008000, #90EE90)", cursor:"pointer"}}
              >
                <Box display="flex" justifyContent="space-between" width="100%" paddingX={3}>
                  <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                    <Typography color="white" fontWeight="bold">Total Bed's</Typography>
                    <Typography color="white" fontWeight="bold">{bedStatus.bedDetails.length}</Typography>
                  </Box>
                  <Box display="flex" justifyContent="center" alignItems="center"><VerifiedUser sx={{ color: '#008000', display:"flex" }} /></Box>
                </Box>
                
              </Box>
            </Grid>

            <Grid
              item
              sm={3}
              boxSizing="border-box"
              fontWeight="bold"
              padding={1}
            >
              <Box
                // border="1px black solid"
                borderRadius="5px"
                onClick={()=>{navigate('/bedstatus')}}
                display="flex"
                width="100%"
                height="80px"
                boxSizing="border-box"
                style={{background:"linear-gradient(to right, #FF0000, #FF7F7F)", cursor:"pointer"}}
              >
                <Box display="flex" justifyContent="space-between" width="100%" paddingX={3}>
                  <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                    <Typography color="white" fontWeight="bold">Occupied Bed's</Typography>
                    <Typography color="white" fontWeight="bold">{bedStatus.bedDetails.filter(patient => patient.BedStatus === 'B').length}</Typography>
                  </Box>
                  <Box display="flex" justifyContent="center" alignItems="center"><VerifiedUser sx={{ color: '#FF0000', display:"flex" }} /></Box>
                </Box>
                
              </Box>
            </Grid>

            <Grid
              item
              sm={3}
              boxSizing="border-box"
              fontWeight="bold"
              padding={1}
            >
              <Box
                // border="1px black solid"
                borderRadius="5px"
                onClick={()=>{navigate('/bedstatus')}}
                display="flex"
                width="100%"
                height="80px"
                boxSizing="border-box"
                style={{background:"linear-gradient(to right, #6a11cb, #2575fc)", cursor:"pointer"}}
              >
                <Box display="flex" justifyContent="space-between" width="100%" paddingX={3}>
                  <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                    <Typography color="white" fontWeight="bold">Vacant Bed's</Typography>
                    <Typography color="white" fontWeight="bold">{bedStatus.bedDetails.filter(patient => patient.BedStatus === 'O').length}</Typography>
                  </Box>
                  <Box display="flex" justifyContent="center" alignItems="center"><VerifiedUser sx={{ color: '#6a11cb', display:"flex" }} /></Box>
                </Box>
                
              </Box>
            </Grid>
          </Grid>
        </Box>
        <TodayCollection />
      </Box>
    </>
  );
};
