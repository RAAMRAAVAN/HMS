import {
  Autocomplete,
  Box,
  Button,
  Grid,
  MenuItem,
  Modal,
  Select,
  Slider,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  convertTimeFormat,
  convertTimeTo12HourFormat,
  extractTimeFromISO,
} from "../SelectValues";

import { TextEditor } from "../../../Const/TextEditor"
import { useDispatch } from "react-redux";
import { assignValue } from "@/src/lib/features/TextEditor/TextEditorSlice";

export const AddOTDischarge = (props) => {
  const dispatch = useDispatch();
  const { setOpen, open, IPDID, AID, PId } = props;
  const handlePrintClick = () => {
    const url = `/pages/IPDModule/OTDischarge/OTDischargePrint?PId=${PId}`;
    window.open(url, "_blank"); // Opens in a new tab
  };
  const [html, setHtml] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState(new Date().toTimeString().slice(0, 8));
  // useState(new Date().toTimeString().slice(0, 5)));
  console.log("DisTimme=", new Date().toLocaleString());
  const [MRDDetails, setMRDDetails] = useState({});
  const [selectedFormat, setSelectedFormat] = useState(props.selectedFormat);
  const [otDischargeFormatList, setOtDischargeFormatList] = useState([]);
  const [value, setValue] = useState(props.selectedFormat.Format[1]);
  const [AdmDate, setAdmDate] = useState();
  const [AdmTime, setAdmTime] = useState();

  const handleClose = () => setOpen(false);

  const [remark, setRemark] = useState("");

  const getMRDDetails = async (input) => {
    try {
      const response = await axios.post(
        "http://192.168.1.32:5000/fetchIPDPatientDetails",
        { IPDNo: input }
      );
      console.log("money=", response.data[0]);
      setMRDDetails(response.data[0]);
      setAdmDate(new Date(response.data[0].Date).toISOString().split("T")[0]);
      setAdmTime(
        convertTimeTo12HourFormat(
          new Date(response.data[0].Time).toTimeString().split(" ")[0]
        )
      );

    } catch (error) {
      alert("DB Error");
    }
  };
  const getOTDischargeFormats = async () => {
    try {
      let result = await axios.get("http://192.168.1.32:5000/getOTDischargeFormats");
      setOtDischargeFormatList(result.data.OTDischargeFormats)
    } catch (err) {
      alert("DB Error");
    }
  }

  const updateOTDischargeDate = async (printStatus) => {
    try {
      let status = await axios.post("http://192.168.1.32:5000/updateOTDischargeDate", { Date: date, Time: time, AID: AID });
      alert("Date Updated");
      if (printStatus === true)
        handlePrintClick();
    } catch (err) {
      alert(err);
    }
  }

  useEffect(() => {
    if (open) {
      getMRDDetails(IPDID);
      getOTDischargeFormats();
      dispatch(assignValue(props.selectedFormat.Format[1]))
    }
  }, [open]);

  return MRDDetails != {} ? (
    <Modal
      aria-labelledby="unstyled-modal-title"
      aria-describedby="unstyled-modal-description"
      open={open}
      onClose={handleClose}
      // slots={{ backdrop: StyledBackdrop }}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{
        width: "80%",
        maxHeight: "100vh", // Set max height for modal content
        overflowY: "auto",  // Enable scrolling when content exceeds 90vh
        backgroundColor: "white",
        padding: 2
      }} padding={2}>
        <Grid container>
          <Grid item>
            <Typography fontWeight="bold">OT Discharge</Typography>
          </Grid>
          <Grid
            container
            // border="2px black solid"
            display="flex"
            // height="30vh"
            padding={1}
            justifyContent="start"
            alignItems="flex-start"
          >
            <Grid container display="flex" width="100%">
              <Grid item>
                <Typography fontSize={12} fontWeight="bold">
                  Date:{" "}
                </Typography>
                <TextField
                  fullWidth
                  fontSize={12}
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                  size="small"
                  type="date"
                />
              </Grid>
              <Grid item marginLeft={1}>
                <Typography fontSize={12} fontWeight="bold">
                  Time:{" "}
                </Typography>
                <TextField
                  fullWidth
                  fontSize={12}
                  value={time}
                  onChange={(e) => {
                    setTime(e.target.value);
                  }}
                  size="small"
                  type="time"
                />
              </Grid>
              <Grid item marginLeft={1}>
                <Typography fontSize={12} fontWeight="bold">
                  AID:{" "}
                </Typography>
                <TextField
                  fullWidth
                  fontSize={12}
                  value={AID}
                  size="small"
                  disabled
                />
              </Grid>
            </Grid>
            <Grid item display="flex" width="100%" marginY={1}>
              <Grid item xs={2}>
                <Typography fontSize={12} fontWeight="bold">
                  Patient Name
                </Typography>
                <TextField
                  placeholder="Name"
                  size="small"
                  value={MRDDetails.PatientName}
                  disabled
                  fontSize={12}
                />
              </Grid>
              <Grid item xs={2} marginLeft={1}>
                <Typography fontSize={12} fontWeight="bold">
                  HRNO
                </Typography>
                <TextField
                  placeholder="HRNO"
                  size="small"
                  value={MRDDetails.HRNo}
                  disabled
                  fontSize={12}
                />
              </Grid>
              <Grid item xs={2} marginLeft={1}>
                <Typography fontSize={12} fontWeight="bold">
                  IPD NO
                </Typography>
                <TextField
                  placeholder="HRNO"
                  size="small"
                  value={IPDID}
                  disabled
                  fontSize={12}
                />
              </Grid>
              <Grid item xs={2} marginLeft={1}>
                <Typography fontSize={12} fontWeight="bold">
                  Admit Date
                </Typography>
                <TextField
                  placeholder="HRNO"
                  size="small"
                  fontSize={12}
                  type="date"
                  value={AdmDate}
                  disabled
                />
              </Grid>
              <Grid item xs={2} marginLeft={1}>
                <Typography fontSize={12} fontWeight="bold">
                  Patient Type
                </Typography>
                <TextField
                  placeholder="HRNO"
                  size="small"
                  value={MRDDetails.CompanyID == "110" ? "Ayushman" : "General"}
                  disabled
                  fontSize={12}
                />
              </Grid>

              <Grid item xs={2} marginLeft={1}>
                <Typography fontSize={12} fontWeight="bold">
                  Bed NO
                </Typography>
                <TextField
                  placeholder="Bed No"
                  size="small"
                  value={MRDDetails.BedNo}
                  disabled
                  fontSize={12}
                />
              </Grid>
            </Grid>
            <Grid item display="flex" width="100%" marginX={1}>
              <Grid item xs={4}>
                <Typography fontSize={12} fontWeight="bold">
                  Format
                </Typography>
                <Autocomplete
                  fullWidth
                  options={otDischargeFormatList}
                  getOptionLabel={(option) =>
                    `${option.DischargeFormatName}`
                  } // Specify which property to use as the label
                  value={selectedFormat}
                  onChange={(event, newValue) => {
                    setSelectedFormat(newValue); // Update the state variable when the value changes
                    if (newValue != null) {
                      console.log("update IPD NO=", newValue.IPAID)
                      console.log("New=", newValue.Format)
                      // setValue(newValue.Format);
                      dispatch(assignValue(newValue.Format))
                    }

                  }}
                  // onInputChange={(event, newInputValue) => {
                  //   console.log("New=", newInputValue)
                  //   setValue(newInputValue); // Call the function while typing
                  // }}
                  renderInput={(params) => <TextField {...params} />}
                  sx={{ width: "100%" }}
                  size="small"
                />
              </Grid>
              <Grid item xs={4}>
                <Typography fontSize={12} fontWeight="bold">
                  Code
                </Typography>
                <Switch
                  checked={html}
                  onChange={(event) => {
                    setHtml(event.target.checked);
                  }}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </Grid>
            </Grid>
            <Grid container display="flex" width="100%">
              {/* <Typography fontSize={12} fontWeight="bold">
                Remark:{" "}
              </Typography> */}
              <TextEditor value={value} html={html} />
            </Grid>
            <Grid container marginTop={5}>
              <Button variant="contained" onClick={() => {
                handleClose(); updateOTDischargeDate(false);
              }}
              // disabled={MRDDetails.Discharge === "Y" ? true : false}
              > Save</Button>
              <Button
                variant="contained"
                onClick={() => {
                  handleClose(); updateOTDischargeDate(true);
                }}
                style={{ marginLeft: "10px" }}
              // disabled={MRDDetails.Discharge === "Y" ? true : false}
              >
                Save & Print
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  ) : <></>;
};
