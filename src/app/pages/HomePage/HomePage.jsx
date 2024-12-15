'use client';
import { Box, Grid, Typography } from "@mui/material";
// import { DropdownMenu } from "../../components/DropDownMenu";
// import { LeftDrawer } from "../../components/LefstDrawer";
import { TopNav } from "../../components/NavBar/TopNav";
import { Fullscreen, Minimize, VerifiedUser } from "@mui/icons-material";
import { getBedStatusAsync, selectBedDetails, selectStatus } from "@/src/lib/features/bedStatus/bedStatusSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
// import Grid from "@mui/material/Unstable_Grid/Grid";
import { TodayCollection } from "./TodayCollection";
import { useRouter } from 'next/navigation';
import { getUserDetailsAsync } from "@/src/lib/features/userLoginDetails/userSlice";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchbedStatus } from "../../redux";

export const HomePage = () => {
  const router = useRouter();
  const dispatch=useDispatch();  
  const bedStatus=useSelector(selectBedDetails)
  // const UserID=useSelector(selectuserID);
  // const bedStatus = [];
  console.log("count", bedStatus);
  useSelector(state=>state.bedStatus)
  console.log("redux bed status=", bedStatus.bedDetails)
  useEffect(()=>{
    // dispatch(getBedStatusAsync());
},[])

  // Get value from sessionStorage
  const getFromSessionStorage = (key) => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(key);
    }
    return null;
  };

  // const dispatch = useDispatch();
  // Get value from sessionStorage
  // const getFromSessionStorage = (key) => {
  //     if (typeof window !== 'undefined') {
  //         return sessionStorage.getItem(key);
  //     }
  //     return null;
  // };
  useEffect(() => {
      // Retrieve the value from sessionStorage when the component mounts
      const storedValue = getFromSessionStorage('userName');
      if (storedValue) {
          console.log("session values", storedValue);
          // setUserName(storedValue.userName);
          // dispatch(getUserDetailsAsync(storedValue, ""));
          // dispatch(getBedStatusAsync())
          // setLogin(true);
          // setLoading("Found_User");
      }
  }, []);

  return bedStatus.length > 0?(
    <>
      {/* <TopNav/> */}
      <Typography variant="h6" paddingX={1} fontWeight="bold" color="darkblue" >
        Dashboard
      </Typography>
      <Box
        display="flex"
        border="1px black solid"
        borderRadius="5px"
        flexDirection="column"
        padding="5px"
        margin={1}
        width="100vw"
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
                onClick={()=>{router.push('/pages/BedStatus')}}
              >
                <Box display="flex" justifyContent="space-between" width="100%" paddingX={3}>
                  <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                    <Typography color="white" fontWeight="bold">No of Patient</Typography>
                    <Typography color="white" fontWeight="bold">{bedStatus.filter(patient => patient.BedStatus === 'B').length}</Typography>
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
                onClick={()=>{router.push('/pages/BedStatus')}}
                display="flex"
                width="100%"
                height="80px"
                boxSizing="border-box"
                style={{background:"linear-gradient(to right, #008000, #90EE90)", cursor:"pointer"}}
                
              >
                <Box display="flex" justifyContent="space-between" width="100%" paddingX={3}>
                  <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                    <Typography color="white" fontWeight="bold">Total Bed's</Typography>
                    <Typography color="white" fontWeight="bold">{bedStatus.length}</Typography>
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
                onClick={()=>{router.push('/pages/BedStatus')}}
                display="flex"
                width="100%"
                height="80px"
                boxSizing="border-box"
                style={{background:"linear-gradient(to right, #FF0000, #FF7F7F)", cursor:"pointer"}}
              >
                <Box display="flex" justifyContent="space-between" width="100%" paddingX={3}>
                  <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                    <Typography color="white" fontWeight="bold">Occupied Bed's</Typography>
                    <Typography color="white" fontWeight="bold">{bedStatus.filter(patient => patient.BedStatus === 'B').length}</Typography>
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
                onClick={()=>{router.push('/pages/BedStatus')}}
                display="flex"
                width="100%"
                height="80px"
                boxSizing="border-box"
                style={{background:"linear-gradient(to right, #6a11cb, #2575fc)", cursor:"pointer"}}
              >
                <Box display="flex" justifyContent="space-between" width="100%" paddingX={3}>
                  <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                    <Typography color="white" fontWeight="bold">Vacant Bed's</Typography>
                    <Typography color="white" fontWeight="bold">{bedStatus.filter(patient => patient.BedStatus === 'O').length}</Typography>
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
  ):<></>;
};
