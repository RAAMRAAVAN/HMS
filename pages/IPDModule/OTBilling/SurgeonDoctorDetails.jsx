import {
  Autocomplete,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export const SurgeonDoctorDetails = (props) => {
  const { DoctorList } = props;
  const [Doctor, setDoctor] = useState(null);
  const [Rate, setRate] = useState(0);
  const [Discount, setDiscount] = useState(0);
  const [Amount, setAmount] = useState(Rate - (Discount / 100) * Rate);

  useEffect(() => {
    setAmount(Rate - (Discount / 100) * Rate);
  }, [Rate, Discount]);
  return (
    <Grid container width="90%">
      <Grid item xs={12} padding={1} backgroundColor="blue" borderRadius={1}>
        <Typography fontWeight="bold" fontSize={12} color="white">
          Primary Surgeon Details
        </Typography>
      </Grid>
      <Grid container item justifyContent="space-between" margin={1}>
        <Grid item xs={4}>
          <Typography fontSize={11}>Surgeon Doctor Name</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography fontSize={11}>
            Rate
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography fontSize={11}>
            Discount%
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography fontSize={11}>
            Amount
          </Typography>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>

      <Grid container item justifyContent="space-between">
        <Grid item xs={4} >
          <Autocomplete
            fullWidth
            options={DoctorList}
            renderOption={(props, option) => (
              <li {...props}>
                <Typography style={{ fontSize: "10px" }}>
                  {option.DoctorName}
                </Typography>
              </li>
            )}
            getOptionLabel={(option) => `${option.DoctorName}`} // Specify which property to use as the label
            value={Doctor}
            onChange={(event, newValue) => {
              setDoctor(newValue); // Update the state variable when the value changes
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{ input: { fontSize: 11, height:"13px", padding:"0", margin:"0" } }} // Adjust input text font size
              />
            )}
            sx={{display:"flex", width: "90%", fontSize: "10px"}}
            size="small"
            // disabled
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            size="small"
            fontSize="11"
            sx={{
                width: "90%", 
                '& .MuiInputBase-root': { 
                  fontSize: "10px",
                  padding: "0px",  // Adjust padding for custom height
                },
              }}
            value={Rate}
            onChange={(e) => {
              setRate(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            size="small"
            fontSize="11"
            sx={{
                width: "90%", 
                '& .MuiInputBase-root': { 
                  fontSize: "10px",
                  padding: "0px",  // Adjust padding for custom height
                },
              }}
            value={Discount}
            onChange={(e) => {
              setDiscount(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            size="small"
            fontSize="11"
            sx={{
                width: "90%", 
                '& .MuiInputBase-root': { 
                  fontSize: "10px",
                  padding: "0px",  // Adjust padding for custom height
                },
              }}
            disabled
            value={Amount}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            size="small"
            sx={{
                width: "90%", 
                '& .MuiInputBase-root': { 
                  fontSize: "10px",
                  padding: "0px",  // Adjust padding for custom height
                },
              }}
            variant="contained"
            color="success"
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
