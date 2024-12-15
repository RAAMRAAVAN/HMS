import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { formatDateTime } from "../SelectValues";
import { useDispatch, useSelector } from "react-redux";
import { selectIPDNo } from "@/src/lib/features/IPDPatient/IpdPatientSlice";
import { AddOTDischarge } from "./AddOTDischarge"
import { EditNote, Print, ViewAgenda } from "@mui/icons-material";

export const OTDischarge = () => {
  const dispatch = useDispatch();
  const IPDNo = useSelector(selectIPDNo)
  const [otDischargeList, setOTDischargeList] = useState([]);
  // const navigate = useNavigate();
  const handlePrintClick = (PId) => {
    const url = `/pages/IPDModule/OTDischarge/OTDischargePrint?PId=${PId}`;
    window.open(url, "_blank"); // Opens in a new tab
  };
  const [open, setOpen] = useState(false);

  const fetchOtDischarge = async (input) => {
    try {
      const response = await axios.post(
        "http://192.168.1.32:5000/fetchOtDischarge",
        {
          IPAID: input,
        }
      );
      setOTDischargeList(response.data.otDischarge);
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    if (IPDNo != undefined) fetchOtDischarge(IPDNo);
  }, [IPDNo]);
  return IPDNo != undefined?(
    <>
      <Box display="flex" width="90vw" flexDirection="column">
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
            <Typography fontWeight="bold" fontSize={12}>S.No.</Typography>
          </Grid>
          <Grid
            xs={1}
            border="1px black solid"
            padding={1}
            item
            alignItems="center"
            display="flex"
          >
            <Typography fontWeight="bold" fontSize={12}>Discharge No</Typography>
          </Grid>
          <Grid
            xs={1}
            border="1px black solid"
            padding={1}
            item
            alignItems="center"
            display="flex"
          >
            <Typography fontWeight="bold" fontSize={12}>HRNO</Typography>
          </Grid>
          <Grid
            xs={2}
            border="1px black solid"
            padding={1}
            item
            alignItems="center"
            display="flex"
          >
            <Typography fontWeight="bold" fontSize={12}>Patient Name</Typography>
          </Grid>

          <Grid
            xs={1}
            border="1px black solid"
            padding={1}
            item
            alignItems="center"
            display="flex"
          >
            <Typography fontWeight="bold" fontSize={12}>Admit Date</Typography>
          </Grid>

          <Grid
            xs={1}
            border="1px black solid"
            padding={1}
            item
            alignItems="center"
            display="flex"
          >
            <Typography fontWeight="bold" fontSize={12}>Discharge Date</Typography>
          </Grid>

          <Grid
            xs={1}
            border="1px black solid"
            padding={1}
            item
            alignItems="center"
            display="flex"
          >
            <Typography fontWeight="bold" fontSize={12}>Bed No</Typography>
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
            <Typography fontWeight="bold" fontSize={12}>Format Type</Typography>
          </Grid>

          <Grid
            xs={2}
            border="1px black solid"
            padding={1}
            item
            alignItems="center"
            display="flex"
          >
            <Typography fontWeight="bold" fontSize={12}>Action</Typography>
          </Grid>
        </Grid>
        {/* {console.log("Discharge List", otDischargeList)} */}
        {otDischargeList.map((discharge, index) => {
          return (
            <Grid container>
              <AddOTDischarge setOpen={setOpen} open={open} IPDID={IPDNo} AID={discharge.AID} PId={discharge.PId} selectedFormat= {{DischargeFormatId:discharge.DischargeFormatId, DischargeFormatName:discharge.DischargeFormatName, Format:discharge.Format}}/>
              <Grid
                xs={1}
                border="1px black solid"
                padding={1}
                item
                alignItems="center"
                display="flex"
              >
                <Typography fontSize={12}>{discharge.AID}</Typography>
              </Grid>
              <Grid
                xs={1}
                border="1px black solid"
                // padding={1}
                item
                alignItems="center"
                display="flex"
              >
                <Typography fontSize={12}>{discharge.DischargeNo}</Typography>
              </Grid>
              <Grid
                xs={1}
                border="1px black solid"
                // padding={1}
                item
                alignItems="center"
                display="flex"
              >
                <Typography fontSize={12}>{discharge.HRNo}</Typography>
              </Grid>
              <Grid
                xs={2}
                border="1px black solid"
                // padding={1}
                item
                alignItems="center"
                display="flex"
              >
                <Typography fontSize={12}>{discharge.PatientName}</Typography>
              </Grid>

              <Grid
                xs={1}
                border="1px black solid"
                // padding={1}
                item
                alignItems="center"
                display="flex"
              >
                <Typography fontSize={12}>{formatDateTime(discharge.AdmDate).Date}</Typography>
              </Grid>

              <Grid
                xs={1}
                border="1px black solid"
                // padding={1}
                item
                alignItems="center"
                display="flex"
              >
                <Typography fontSize={12}>{formatDateTime(discharge.Date).Date}</Typography>
              </Grid>

              <Grid
                xs={1}
                border="1px black solid"
                // padding={1}
                item
                alignItems="center"
                display="flex"
              >
                <Typography fontSize={12}>{discharge.BedNo}</Typography>
              </Grid>

              <Grid
                xs={2}
                border="1px black solid"
                // padding={1}
                item
                alignItems="center"
                display="flex"
              >
                {" "}
                <Typography fontSize={12}>{discharge.DischargeFormatName}</Typography>
              </Grid>
              <Grid
                xs={2}
                border="1px black solid"
                paddingX={1}
                item
                alignItems="center"
                display="flex"
                justifyContent="space-between"
              >

                <IconButton
                  aria-label="delete"
                  size="small"
                  style={{ padding: "0", margin: "0" }}
                  onClick={() => handlePrintClick(discharge.PId)}
                >
                  <Print
                    size="small"
                    style={{
                      padding: "0",
                      margin: "0",
                      display: "flex",
                      height: "20px",
                    }}
                  />
                </IconButton>

                <IconButton
                  aria-label="delete"
                  size="small"
                  style={{ padding: "0", margin: "0" }}
                  onClick={() => setOpen(true)}
                >
                  <EditNote
                    size="small"
                    style={{
                      padding: "0",
                      margin: "0",
                      display: "flex",
                      height: "20px",
                    }}
                  />
                </IconButton>
              </Grid>


              {/* <IconButton
                  aria-label="delete"
                  size="small"
                  style={{ padding: "0", margin: "0" }}
                  onClick={() => handlePrintClick(receipt.ReceiptID)}
                >
                  <Print
                    size="small"
                    style={{
                      padding: "0",
                      margin: "0",
                      display: "flex",
                      height: "20px",
                    }}
                  />
                </IconButton> */}
            </Grid>
          );
        })}
      </Box>
    </>
  ):<></>;
};
