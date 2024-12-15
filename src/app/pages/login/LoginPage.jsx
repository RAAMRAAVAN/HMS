'use client';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useRouter } from 'next/router';


export const LoginPage = () => {
  // const router = useRouter();
  const [finencialYear, setFinencialYear] = useState(1);

  const handleFinencialYearChange = (event) => {
    setFinencialYear(event.target.value);
  };

  const [rememberMe, setRememberMe] = useState(false);

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };
  return (
    <>
      <Box
        style={{
          display: "flex",
          width: "100vw",
          height: "100vh",
          backgroundImage: "url('/images/teamiukd.jpg')",
          backgroundSize: "auto 100%", // Set height of the image to match the container height
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {/* <Typography color="white" variant="h5">INSTITUTE OF UROLOGY AND KIDNEY DISEASES</Typography> */}
        <Box
          style={{
            border: "1px black solid",
            display: "flex",
            width: "40%",
            height: "40%",
            flexDirection: "column",
            padding: "5%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            // opacity:"0.5"
          }}
        >
          <Typography
            textAlign="center"
            color="white"
            variant="h5"
            // border="1px black solid"
            marginbottom="5px"
          >
            Sign In
          </Typography>
          
          <select style={{display:"flex", padding:"10px", height:"50px", backgroundColor:"transparent", color:"white", border:"1px white solid"}}>
            <option style={{color:"white", borderRadius:"0", textAlign:"center"}}>2023-2024</option>
          </select>
          <TextField
            label="Username"
            marginbottom="5px"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white", // Border color when the input is not focused
                },
                "&:hover fieldset": {
                  borderColor: "white", // Border color when the input is hovered
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white", // Border color when the input is focused
                },
              },
              marginbottom: "5px", // Margin at the bottom of the TextField
            }}
            margin="normal" // Use "normal" to apply margin
            InputProps={{
              style: {
                color: "white",
              },
            }}
            InputLabelProps={{
              style: {
                color: "white",
              },
            }}
          />
          <TextField
            label="Password"
            type="password"
            marginbottom="5px"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white", // Border color when the input is not focused
                },
                "&:hover fieldset": {
                  borderColor: "white", // Border color when the input is hovered
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white", // Border color when the input is focused
                },
              },
              marginbottom: "5px", // Margin at the bottom of the TextField
            }}
            margin="normal" // Use "normal" to apply margin
            InputProps={{
              style: {
                color: "white",
              },
            }}
            InputLabelProps={{
              style: {
                color: "white",
              },
            }}
          />

          <Box display="flex" justifyContent="space-between" marginbottom="5px">
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={handleRememberMeChange}
                    style={{ color: "white" }}
                  />
                }
                label="Remember Me"
                style={{ color: "white" }}
              />
            </FormGroup>
            <Typography color="white">Forgot Password?</Typography>
          </Box>
          {/* <Button variant="contained" onClick={()=>{router.push('/sample');}}>Login</Button> */}
        </Box>
      </Box>
    </>
  );
};
