'use client';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';  // Import Next.js router

export const LoginPage = () => {
  const [mounted, setMounted] = useState(false);  // Track component mount
  const [finencialYear, setFinencialYear] = useState(1);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();  // Initialize the router

  useEffect(() => {
    // This ensures the component is mounted and window is available
    setMounted(true);
  }, []);

  const handleFinencialYearChange = (event) => {
    setFinencialYear(event.target.value);
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  const handleLogin = () => {
    if (mounted) {  // Check if component is mounted before using router
      router.push("/abc");
    }
  };

  // If the component is not mounted yet, return null (to prevent SSR issues)
  if (!mounted) {
    return null;
  }

  return (
    <>
      <Box
        style={{
          display: "flex",
          width: "100vw",
          height: "100vh",
          backgroundImage: "url('/images/teamiukd.jpg')",
          backgroundSize: "auto 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          style={{
            border: "1px black solid",
            display: "flex",
            width: "40%",
            height: "40%",
            flexDirection: "column",
            padding: "5%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <Typography
            textAlign="center"
            color="white"
            variant="h5"
            marginBottom="5px"
          >
            Sign In
          </Typography>

          <select
            style={{
              display: "flex",
              padding: "10px",
              height: "50px",
              backgroundColor: "transparent",
              color: "white",
              border: "1px white solid",
            }}
          >
            <option style={{ color: "white", textAlign: "center" }}>
              2023-2024
            </option>
          </select>

          <TextField
            label="Username"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },
              marginBottom: "5px",
            }}
            InputProps={{
              style: { color: "white" },
            }}
            InputLabelProps={{
              style: { color: "white" },
            }}
          />

          <TextField
            label="Password"
            type="password"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },
              marginBottom: "5px",
            }}
            InputProps={{
              style: { color: "white" },
            }}
            InputLabelProps={{
              style: { color: "white" },
            }}
          />

          <Box display="flex" justifyContent="space-between" marginBottom="5px">
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

          <Button variant="contained" onClick={handleLogin}>
            Login
          </Button>
        </Box>
      </Box>
    </>
  );
};
