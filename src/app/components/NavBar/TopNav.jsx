'use client';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  InputBase,
  Menu,
  MenuItem,
  Avatar,
  Switch,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";

// import { Link, useNavigate } from "react-router-dom";
import { Fullscreen, NotificationAdd } from "@mui/icons-material";
import { DropdownMenu } from "./DropDownMenu";
import { LeftDrawer } from "./LeftDrawer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBedStatusAsync } from "@/src/lib/features/bedStatus/bedStatusSlice";
import { useRouter } from "next/navigation";
import { selectUserDetails } from "@/src/lib/features/userLoginDetails/userSlice";
import { assignIPDNo, assignselectedPatient } from "@/src/lib/features/IPDPatient/IpdPatientSlice";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
export const TopNav = (props) => {
  const {setLogin} = props
  const dispatch = useDispatch();
  // const UserID=useSelector(selectuserID);
  const UserDetails = useSelector(selectUserDetails);
  const router = useRouter();
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));
  // const navigate = useNavigate()
  useEffect(()=>{
    // dispatch(getBedStatusAsync())
    // Retrieve the value from sessionStorage when the component mounts
    // const storedValue = getFromSessionStorage('userName');
    // if (storedValue) {
    //   console.log("session values",storedValue);
    //   setLogin(true);
    // }
  },[])

  return (
    <>
      <AppBar position="static" sx={{padding:"none", margin:"none", backgroundColor:"darkblue"}} className='hide-in-print'>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", padding:"none", margin:"none" }}>
          <Box display="flex" width="20%" alignItems="center">
            <Typography
              variant="h6"
              component="div"
              sx={{
                display: "flex",
                // width: "150px",
                // border: "1px black solid",
                fontWeight:"bold",
                fontSize:"14px",
                cursor:"pointer"
              }}
              onClick={()=>{dispatch(assignIPDNo(null));dispatch(assignselectedPatient(null));router.push('/');}}
            >
              Institute Of Urology And Kidney Diseases
            </Typography>
            {/* <Switch  defaultChecked color="secondary" /> */}
            <LeftDrawer style={{position:"absolute", top:"100px"}}/>
          </Box>
          <Box
            display="flex"
            width="80%"
            // border="1px black solid"
            justifyContent="space-between"
          >
            <Box
              display="flex"
              alignItems="center"
              width="20%"
              justifyContent="space-between"
            >
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
              <Fullscreen />
            </Box>
            <Box display="flex" width="80%" justifyContent="end" alignItems="center" >
              <NotificationAdd />
              <Button color="inherit"  to="/contact" style={{marginLeft:"10px"}}>
                License: 365 Days Left
              </Button> 
              <Avatar alt="User Name" src="/images/favicon.gif" style={{marginLeft:"10px"}}/>
              <DropdownMenu style={{marginLeft:"10px"}} setLogin={setLogin}/>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};
