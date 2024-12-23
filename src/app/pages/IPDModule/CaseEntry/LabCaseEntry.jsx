import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Grid,
  IconButton,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { styled, css } from "@mui/system";

import {
  Check,
  Delete,
  Edit,
  EditNote,
  Print,
  SaveAlt,
  ViewAgenda,
} from "@mui/icons-material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectIPDNo, selectselectedPatient } from "@/src/lib/features/IPDPatient/IpdPatientSlice";
import { useEffect, useRef, useState } from "react";
import { setMOP } from "../SelectValues";
import {CreateNewCaseEntry} from "./CreateNew/CreateNewCaseEntry"
import {EditCaseEntry} from "./EditCaseEntry/EditCaseEntry"

export const LabCaseEntry = (props) => {
  const dispatch = useDispatch();
  const IPDNo = useSelector(selectselectedPatient).IPAID;
  const hasFetchedForCaseEntry = useRef(null);
  const {patientDetails} = props;
  const [CaseEntryList, setCaseEntryList] = useState([]);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [CaseID, setCaseID] = useState(null);
  
  // console.log("CaseEntryList", CaseEntryList)
  const fetchIPDCaseEntry = async () => {
    try {
      const result = await axios.post("http://localhost:5000/fetchIPDCaseEntry", { IPAID: IPDNo });
      setCaseEntryList(result.data.IPDCaseEntry);
    } catch (err) {
      alert(err);
    }
  }

  const deleteIPDCaseEntry = async (CaseID) => {
    try{
        let result = await axios.post('http://localhost:5000/deleteIPDCaseEntry', {CaseID: CaseID});
        if(result.data.Status === true)
          alert("Entry Deleted")
        fetchIPDCaseEntry();
    }catch(err){
        alert(err);
    }
  }

  const handleUpdate = (CaseID) => {
    setOpen2(true);
    setCaseID(CaseID);
  }
  const handlePrintClick = (ReceiptID) => {
    console.log("print");
    const url = `/pages/IPDModule/CaseEntry?ReceiptID=${ReceiptID}`;
    window.open(url, "_blank"); // Opens in a new tab
  };
  
  useEffect(() => {
    if(IPDNo != null && hasFetchedForCaseEntry.current !== IPDNo){
      fetchIPDCaseEntry();
      hasFetchedForCaseEntry.current = IPDNo;
  }
  }, [IPDNo])
  return (
    <>
      <CreateNewCaseEntry open={open} setOpen={setOpen} fetchIPDCaseEntry={fetchIPDCaseEntry} patientDetails={patientDetails}/>
      <EditCaseEntry open={open2} setOpen={setOpen2} CaseID={CaseID}/>
      <Box display="flex" justifyContent="space-between" width="97vw" paddingY={1}>
        <Typography fontWeight="bold">Case Entry</Typography>
        <Button variant="contained" size="small" onClick={()=>{setOpen(!open)}} disabled={patientDetails.Discharge==="Y"?true: false}>Add</Button>
      </Box>
      <Box display="flex" width="97vw" flexDirection="column">
        <Grid container display="flex" width="100%">
          <Grid xs={1} item border="1px black solid" padding={1}>
            <Typography fontSize={12} fontWeight="bold">S.No</Typography>
          </Grid>
          <Grid xs={1} item border="1px black solid" padding={1}>
            <Typography fontSize={12} fontWeight="bold">Case No</Typography>
          </Grid>
          <Grid xs={1} item border="1px black solid" padding={1}>
            <Typography fontSize={12} fontWeight="bold">Date</Typography>
          </Grid>
          <Grid xs={1} item border="1px black solid" padding={1}>
            <Typography fontSize={12} fontWeight="bold">Time</Typography>
          </Grid>
          <Grid xs={2} item border="1px black solid" padding={1}>
            <Typography fontSize={12} fontWeight="bold">Doctor</Typography>
          </Grid>
          <Grid xs={1} item border="1px black solid" padding={1}>
            <Typography fontSize={12} fontWeight="bold">User</Typography>
          </Grid>
          <Grid xs={1} item border="1px black solid" padding={1}>
            <Typography fontSize={12} fontWeight="bold">MOD</Typography>
          </Grid>
          <Grid xs={1} item border="1px black solid" padding={1}>
            <Typography fontSize={12} fontWeight="bold">Total</Typography>
          </Grid>
          <Grid xs={1} item border="1px black solid" padding={1}>
            <Typography fontSize={12} fontWeight="bold">Discount Rs</Typography>
          </Grid>
          <Grid xs={1} item border="1px black solid" padding={1}>
            <Typography fontSize={12} fontWeight="bold">Amount</Typography>
          </Grid>
          <Grid xs={1} item border="1px black solid" padding={1}>
            <Typography fontSize={12} fontWeight="bold">Action</Typography>
          </Grid>
        </Grid>
        {CaseEntryList.map((CaseEntry, index) => {
          
          return (<>
          
          <Grid container>
            <Grid xs={1} item border="1px black solid" padding={1}>
              <Typography fontSize={12} >{index + 1}</Typography>
            </Grid>
            <Grid xs={1} item border="1px black solid" padding={1}>
              <Typography fontSize={12} >{CaseEntry.CaseNo}</Typography>
            </Grid>
            <Grid xs={1} item border="1px black solid" padding={1}>
              <Typography fontSize={12} noWrap>{new Date(CaseEntry.CaseDate).toISOString().split("T")[0]}</Typography>
            </Grid>
            <Grid xs={1} item border="1px black solid" padding={1}>
              <Typography fontSize={12} noWrap>{new Date(CaseEntry.CaseTime).toISOString().split("T")[1].split(".")[0]}</Typography>
            </Grid>
            <Grid xs={2} item border="1px black solid" padding={1}>
              <Typography fontSize={12} noWrap>{CaseEntry.DoctorName}</Typography>
            </Grid>
            <Grid xs={1} item border="1px black solid" padding={1}>
              <Typography fontSize={12} >{CaseEntry.FirstName}</Typography>
            </Grid>
            <Grid xs={1} item border="1px black solid" padding={1}>
              <Typography fontSize={12} >{setMOP(CaseEntry.MOD)}</Typography>
            </Grid>
            <Grid xs={1} item border="1px black solid" padding={1}>
              <Typography fontSize={12} >{CaseEntry.DiscountRs + CaseEntry.NetAmount}</Typography>
            </Grid>
            <Grid xs={1} item border="1px black solid" padding={1}>
              <Typography fontSize={12} >{CaseEntry.DiscountRs}</Typography>
            </Grid>
            <Grid xs={1} item border="1px black solid" padding={1}>
              <Typography fontSize={12} >{CaseEntry.NetAmount}</Typography>
            </Grid>
            <Grid
              xs={1}
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
              onClick={() => handleUpdate(CaseEntry.CaseID)}
              disabled={patientDetails.Discharge==="Y"?true: false}
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

              <IconButton
                aria-label="delete"
                size="small"
                style={{ padding: "0", margin: "0" }}
              onClick={() => deleteIPDCaseEntry(CaseEntry.CaseID)}
              disabled={patientDetails.Discharge==="Y"?true: false}
              >
                <Delete
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
              // onClick={() => handlePrintClick(receipt.ReceiptID)}
              >
                <ViewAgenda
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
              // onClick={() => handlePrintClick(receipt.ReceiptID)}
              >
                <Print
                  size="small"
                  style={{
                    padding: "0",
                    margin: "0",
                    display: "flex",
                    height: "20px",
                  }}
                  onClick={() => handlePrintClick(CaseEntry.CaseID)}
                />
              </IconButton>
            </Grid>
          </Grid></>)
        })}
      </Box>
    </>
  );
};
