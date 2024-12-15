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
import clsx from "clsx";
import { styled, css } from "@mui/system";

import axios from "axios";
import { useEffect, useState } from "react";
import { formatDateTime, setMOP, SubmissionAlert } from "../SelectValues";
// import { useNavigate } from "react-router-dom";
import {
  Check,
  Delete,
  Edit,
  EditNote,
  Print,
  SaveAlt,
  ViewAgenda,
} from "@mui/icons-material";
// import { UpdateIPDMoneyReceipt } from "./UpdateIPDMoneyReceipt";
import { VisitEntries, VisitEntry } from "./VisitEntries";
import { CreateIPDDoctorVisit } from "./CreateIPDDoctorVisit";
import { useDispatch, useSelector } from "react-redux";
import { selectIPDNo } from "@/src/lib/features/IPDPatient/IpdPatientSlice";

export const DoctorVisit = () => {
  const dispatch = useDispatch();
  const IPDNo = useSelector(selectIPDNo)
  const [IPDDoctorVisitList, setIPDDoctorVisitList] = useState([]);
  const [submissionSuccessfulAlert, setsubmissionSuccessfulAlert] =
    useState(false);
  // const navigate = useNavigate();
  const [receiptID, setReceiptID] = useState("");
  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  // const handleUpdateOpen = (ReceiptID) => {
  //   setReceiptID(ReceiptID);
  //   setUpdateOpen(true);
  // };
  console.log("Receipt", receiptID);
  

  // const handlePrintClick = (ReceiptID) => {
  //   const url = `/IPD-MoneyReceipt-Print?ReceiptID=${ReceiptID}`;
  //   window.open(url, "_blank"); // Opens in a new tab
  // };

  const fetchIPDDoctorVisitList = async (input) => {
    setIPDDoctorVisitList([])
    try {
      const response = await axios.post(
        "http://192.168.1.32:5000/fetchIPDDoctorVisitList",
        {
          IPDID: input,
        }
      );
      if(response.data.IPDDoctorVisitList.length === 0){
        handleOpen();
      }
      setIPDDoctorVisitList(response.data.IPDDoctorVisitList);
      console.log("visits=", response.data.IPDDoctorVisitList.length);
    } catch (error) {
      alert(error);
    }
  };

  const deleteIPDMoneyReceipt = async (ReceiptID) => {
    try {
      const response = await axios.post(
        "http://192.168.1.32:5000/deleteIPDMoneyReceipt",
        { ReceiptID: ReceiptID }
      );
      if (response.data.Status === true) {
        setsubmissionSuccessfulAlert(true);
        // Hide the alert after 5 seconds
        setTimeout(() => {
          setsubmissionSuccessfulAlert(false);
        }, 5000); // 5000ms = 5 seconds
        //   fetchIPDMoneyReceipts(props.IPDNo);
      }
    } catch (err) {
      alert(err);
    }
  };
  useEffect(() => {
    if (IPDNo != undefined) fetchIPDDoctorVisitList(IPDNo);
  }, [IPDNo]);
  return setIPDDoctorVisitList.length > 0?(
    <>
      {/* <AddIPDMoneyReceipt setOpen={setOpen} open={open} IPDNo={IPDNo} /> */}
      <Box display="flex" width="95vw" flexDirection="column">
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6">
            Doctor Visit List{" "}
            {submissionSuccessfulAlert === true ? (
              <Alert
                variant="filled"
                severity="success"
                style={{
                  display: "flex",
                  paddingTop: "0px",
                  paddingBottom: "0px",
                  paddingX: "10px",
                  height: "40px",
                  width: "50vw",
                  position: "absolute",
                  top: "150px",
                  left: "250px",
                }}
              >
                Money Receipt Deleted Successfully !
              </Alert>
            ) : (
              <></>
            )}
          </Typography>
          {/* <Grid
            display="flex"
            // border="1px black solid"
            alignItems="center"
            width="70vw"
            justifyContent="space-between"
          >
            <Grid item xs={2} display="flex">
              <Typography fontSize={10} fontWeight="bold">
                HRNO:{" "}
              </Typography>
              {/* <Typography fontSize={10}>{IPDDoctorVisitList[0].HRNo}</Typography> 
            </Grid>

            <Grid item xs={2} display="flex">
              <Typography fontSize={10} fontWeight="bold">
                IPD NO:{" "}
              </Typography>
              {/* <Typography fontSize={10}>{IPDDoctorVisitList[0].IPDNo}</Typography> 
            </Grid>

            <Grid item xs={2} display="flex">
              <Typography fontSize={10} fontWeight="bold">
                Patinet Name:{" "}
              </Typography>
              {/* <Typography fontSize={10}>{IPDDoctorVisitList[0].PatientName}</Typography>
            </Grid>

            <Grid item xs={2} display="flex">
              <Typography fontSize={10} fontWeight="bold">
                Admit Date:{" "}
              </Typography>
              {/* <Typography fontSize={10}>{IPDDoctorVisitList[0].IPDNo}</Typography>
            </Grid>

            

            <Grid item xs={2} display="flex">
              <Typography fontSize={10} fontWeight="bold">
                Bed NO:{" "}
              </Typography>
              {/* <Typography fontSize={10}>{IPDDoctorVisitList[0].IPDNo}</Typography>
            </Grid>
          </Grid> */}
          {/* <Button onClick={handleOpen} variant="outlined">
            Add
          </Button> */}
        </Box>

        <Grid container>
          <Grid
            xs={1}
            border="1px black solid"
            padding={1}
            item
            alignItems="center"
            display="flex"
          >
            <Typography fontWeight="bold" fontSize={14}>
              Receipt No
            </Typography>
          </Grid>
          <Grid
            xs={2}
            border="1px black solid"
            padding={1}
            item
            alignItems="center"
            display="flex"
          >
            <Typography fontWeight="bold" fontSize={14}>
              Entry/ Visit Date
            </Typography>
          </Grid>
          <Grid
            xs={2}
            border="1px black solid"
            padding={1}
            item
            alignItems="center"
            display="flex"
          >
            <Typography fontWeight="bold" fontSize={14}>
              Doctor's Name
            </Typography>
          </Grid>
          <Grid
            xs={1}
            border="1px black solid"
            padding={1}
            item
            alignItems="center"
            display="flex"
          >
            <Typography fontWeight="bold" fontSize={14}>
              Visits
            </Typography>
          </Grid>

          <Grid
            xs={1}
            border="1px black solid"
            padding={1}
            item
            alignItems="center"
            display="flex"
          >
            <Typography fontWeight="bold" fontSize={14}>
              Rate
            </Typography>
          </Grid>

          <Grid
            xs={1}
            border="1px black solid"
            padding={1}
            item
            alignItems="center"
            display="flex"
          >
            <Typography fontWeight="bold" fontSize={14}>
              Discount %
            </Typography>
          </Grid>

          <Grid
            xs={1}
            border="1px black solid"
            padding={1}
            item
            alignItems="center"
            display="flex"
          >
            <Typography fontWeight="bold" fontSize={14}>
              Amount
            </Typography>
          </Grid>

          <Grid
            xs={1}
            border="1px black solid"
            padding={1}
            item
            alignItems="center"
            display="flex"
          >
            <Typography fontWeight="bold" fontSize={14}>
              User
            </Typography>
          </Grid>

          <Grid
              xs={1}
              border="1px black solid"
              padding={1}
              item
              alignItems="center"
              display="flex"
            >
              <Typography fontWeight="bold" fontSize={14}>
                Remark
              </Typography>
            </Grid>

          

          <Grid
            xs={1}
            border="1px black solid"
            padding={1}
            item
            alignItems="center"
            display="flex"
          >
            <Typography fontWeight="bold" fontSize={14}>
              Action
            </Typography>
          </Grid>
        </Grid>
        {open?<CreateIPDDoctorVisit style={{display:"none"}} open={open} setOpen={setOpen} IPDNo={IPDNo} fetchIPDDoctorVisitList={fetchIPDDoctorVisitList}/>: null}
        {IPDDoctorVisitList.map((list, index) => {
          return <VisitEntries ReceiptDetails={list} />;
        })}
      </Box>
    </>
  ):<></>;
};
