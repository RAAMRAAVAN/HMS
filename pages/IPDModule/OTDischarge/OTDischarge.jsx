import { Box, Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { formatDateTime } from "../SelectValues";
import { useNavigate } from "react-router-dom";

export const OTDischarge = (props) => {
  let { IPDNo } = props;
  const [otDischargeList, setOTDischargeList] = useState([]);
  const navigate = useNavigate();
  const handlePrintClick = (PId) => {
    const url = `/OT-Discharge-Print?PId=${PId}`;
    window.open(url, "_blank"); // Opens in a new tab
  };
      
  const fetchOtDischarge = async (input) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/fetchOtDischarge",
        {
          IPDNo: input,
        }
      );
      setOTDischargeList(response.data.otDischarge);
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    if (IPDNo != undefined) fetchOtDischarge(props.IPDNo);
  }, [IPDNo]);
  return (
    <>
      <Box>
        <Typography variant="h6">OT Discharge List</Typography>
        <Grid container>
          <Grid
            xs={1}
            border="1px black solid"
            padding={1}
            item
            alignItems="center"
            display="flex"
          >
            <Typography fontWeight="bold">S.No.</Typography>
          </Grid>
          <Grid
            xs={1}
            border="1px black solid"
            padding={1}
            item
            alignItems="center"
            display="flex"
          >
            <Typography fontWeight="bold">Discharge No</Typography>
          </Grid>
          <Grid
            xs={1}
            border="1px black solid"
            padding={1}
            item
            alignItems="center"
            display="flex"
          >
            <Typography fontWeight="bold">HRNO</Typography>
          </Grid>
          <Grid
            xs={2}
            border="1px black solid"
            padding={1}
            item
            alignItems="center"
            display="flex"
          >
            <Typography fontWeight="bold">Patient Name</Typography>
          </Grid>

          <Grid
            xs={1}
            border="1px black solid"
            padding={1}
            item
            alignItems="center"
            display="flex"
          >
            <Typography fontWeight="bold">Admit Date</Typography>
          </Grid>

          <Grid
            xs={1}
            border="1px black solid"
            padding={1}
            item
            alignItems="center"
            display="flex"
          >
            <Typography fontWeight="bold">Discharge Date</Typography>
          </Grid>

          <Grid
            xs={1}
            border="1px black solid"
            padding={1}
            item
            alignItems="center"
            display="flex"
          >
            <Typography fontWeight="bold">Bed No</Typography>
          </Grid>

          <Grid
            xs={2}
            border="1px black solid"
            padding={1}
            item
            alignItems="center"
            display="flex"
          >
            {" "}
            <Typography fontWeight="bold">Format Type</Typography>
          </Grid>

          <Grid
            xs={2}
            border="1px black solid"
            padding={1}
            item
            alignItems="center"
            display="flex"
          >
            <Typography fontWeight="bold">Action</Typography>
          </Grid>
        </Grid>
        {otDischargeList.map((discharge, index) => {
          return (
            <Grid container>
              <Grid
                xs={1}
                border="1px black solid"
                padding={1}
                item
                alignItems="center"
                display="flex"
              >
                <Typography fontWeight="bold">{discharge.AID}</Typography>
              </Grid>
              <Grid
                xs={1}
                border="1px black solid"
                padding={1}
                item
                alignItems="center"
                display="flex"
              >
                <Typography fontWeight="bold">{discharge.DischargeNo}</Typography>
              </Grid>
              <Grid
                xs={1}
                border="1px black solid"
                padding={1}
                item
                alignItems="center"
                display="flex"
              >
                <Typography fontWeight="bold">{discharge.HRNo}</Typography>
              </Grid>
              <Grid
                xs={2}
                border="1px black solid"
                padding={1}
                item
                alignItems="center"
                display="flex"
              >
                <Typography fontWeight="bold">{discharge.PatientName}</Typography>
              </Grid>

              <Grid
                xs={1}
                border="1px black solid"
                padding={1}
                item
                alignItems="center"
                display="flex"
              >
                <Typography fontWeight="bold">{formatDateTime(discharge.AdmDate).Date}</Typography>
              </Grid>

              <Grid
                xs={1}
                border="1px black solid"
                padding={1}
                item
                alignItems="center"
                display="flex"
              >
                <Typography fontWeight="bold">{formatDateTime(discharge.Date).Date}</Typography>
              </Grid>

              <Grid
                xs={1}
                border="1px black solid"
                padding={1}
                item
                alignItems="center"
                display="flex"
              >
                <Typography fontWeight="bold">{discharge.BedNo}</Typography>
              </Grid>

              <Grid
                xs={2}
                border="1px black solid"
                padding={1}
                item
                alignItems="center"
                display="flex"
              >
                {" "}
                <Typography fontWeight="bold">Format Type</Typography>
              </Grid>

              <Grid
                xs={2}
                border="1px black solid"
                padding={1}
                item
                alignItems="center"
                display="flex"
              >
                <Button onClick={()=>handlePrintClick(discharge.PId)}>Print</Button>
              </Grid>
            </Grid>
          );
        })}
      </Box>
    </>
  );
};
