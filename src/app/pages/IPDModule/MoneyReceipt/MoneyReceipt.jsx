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
import { AddIPDMoneyReceipt } from "./AddIPDMoneyReceipt";
import { UpdateIPDMoneyReceipt } from "./UpdateIPDMoneyReceipt";
import { useDispatch, useSelector } from "react-redux";
import { selectIPDNo, selectselectedPatient } from "@/src/lib/features/IPDPatient/IpdPatientSlice";

export const MoneyReceipt = (props) => {
  const dispatch = useDispatch();
  const {patientDetails} = props;
  const IPDNo = useSelector(selectselectedPatient).IPAID
  const [moneyReceiptList, setMoneyReceiptList] = useState([]);
  const [submissionSuccessfulAlert, setsubmissionSuccessfulAlert] =
    useState(false);
  // const navigate = useNavigate();
  const [receiptID, setReceiptID] = useState("");
  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleUpdateOpen = (ReceiptID) => {setReceiptID(ReceiptID); setUpdateOpen(true); }
  console.log("Receipt", receiptID)
  
  const handlePrintClick = (ReceiptID) => {
    const url = `/pages/IPDModule/MoneyReceipt?ReceiptID=${ReceiptID}`;
    window.open(url, "_blank"); // Opens in a new tab
  };

  const fetchIPDMoneyReceipts = async (input) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/fetchIPDMoneyReceipts",
        {
          IPDID: input,
        }
      );
      setMoneyReceiptList(response.data.IPDMoneyReceiptList);
    } catch (error) {
      alert(error);
    }
  };

  const deleteIPDMoneyReceipt = async (ReceiptID) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/deleteIPDMoneyReceipt",
        { ReceiptID: ReceiptID }
      );
      if (response.data.Status === true) {
        setsubmissionSuccessfulAlert(true);
        // Hide the alert after 5 seconds
        setTimeout(() => {
          setsubmissionSuccessfulAlert(false);
        }, 5000); // 5000ms = 5 seconds
        fetchIPDMoneyReceipts(IPDNo);
      }
    } catch (err) {
      alert(err);
    }
  };
  useEffect(() => {
    if (IPDNo != undefined || IPDNo != "") fetchIPDMoneyReceipts(IPDNo);
  }, [IPDNo, open, updateOpen]);
  return (
    <>
      <AddIPDMoneyReceipt setOpen={setOpen} open={open} IPDID={IPDNo} patientDetails={patientDetails}/>
      <UpdateIPDMoneyReceipt setUpdateOpen={setUpdateOpen} updateOpen={updateOpen} IPDNo={IPDNo} ReceiptID={receiptID} patientDetails={patientDetails}/>
      <Box display="flex" width="90vw" flexDirection="column">
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6">
            Money Receipt List{" "}
            {/* {submissionSuccessfulAlert === true ? (
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
            )} */}
          </Typography>

          <Button onClick={handleOpen} variant="outlined" disabled={patientDetails.Discharge==="Y"?true: false}>Add</Button>
        </Box>

        <Grid container>
          {/* <Grid
            xs={1}
            border="1px black solid"
            padding={1}
            item
            alignItems="center"
            display="flex"
          >
            <Typography fontWeight="bold" fontSize={10}>S.No.</Typography>
          </Grid> */}
          <Grid
            xs={1}
            border="1px black solid"
            padding={1}
            item
            alignItems="center"
            display="flex"
          >
            <Typography fontWeight="bold" fontSize={12}>
              Receipt No
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
            <Typography fontWeight="bold" fontSize={12}>
              HRNO
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
            <Typography fontWeight="bold" fontSize={12}>
              Date
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
            <Typography fontWeight="bold" fontSize={12}>
              Patient Name
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
            <Typography fontWeight="bold" fontSize={12}>
              MOD
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
            <Typography fontWeight="bold" fontSize={12}>
              Receipt Amount
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
            <Typography fontWeight="bold" fontSize={12}>
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
            <Typography fontWeight="bold" fontSize={12}>
              Receipt Type
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
            <Typography fontWeight="bold" fontSize={12}>
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
            <Typography fontWeight="bold" fontSize={12}>
              Action
            </Typography>
          </Grid>
        </Grid>
        {moneyReceiptList.map((receipt, index) => {
          return (
            <Grid
              container
              style={
                receipt.ReceiptCancel === "N"
                  ? { backgroundColor: "transparent" }
                  : {
                      background: "linear-gradient(to right, #FF0000, #FF7F7F)",
                    }
              }
            >
              <Grid
                xs={1}
                border="1px black solid"
                padding={1}
                item
                alignItems="center"
                display="flex"
              >
                <Typography fontSize={12}>{receipt.ReceiptID}</Typography>
              </Grid>
              <Grid
                xs={1}
                border="1px black solid"
                padding={1}
                item
                alignItems="center"
                display="flex"
              >
                <Typography fontSize={12}>{receipt.HRNo}</Typography>
              </Grid>
              <Grid
                xs={1}
                border="1px black solid"
                padding={1}
                item
                alignItems="center"
                display="flex"
              >
                <Typography fontSize={12}>
                  {formatDateTime(receipt.ReceiptDate).Date}
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
                <Typography fontSize={12} flexWrap="wrap">
                  {receipt.PatientName}
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
                <Typography fontSize={12}>{setMOP(receipt.MOD)}</Typography>
              </Grid>

              <Grid
                xs={1}
                border="1px black solid"
                padding={1}
                item
                alignItems="center"
                display="flex"
              >
                <Typography fontSize={12}>{receipt.RecAmount}</Typography>
              </Grid>

              <Grid
                xs={1}
                border="1px black solid"
                padding={1}
                item
                alignItems="center"
                display="flex"
              >
                <Typography fontSize={12}>{receipt.FirstName}</Typography>
              </Grid>

              <Grid
                xs={1}
                border="1px black solid"
                padding={1}
                item
                alignItems="center"
                display="flex"
              >
                <Typography fontSize={12}>{receipt.ReceiptType}</Typography>
              </Grid>

              <Grid
                xs={2}
                border="1px black solid"
                padding={1}
                item
                alignItems="center"
                display="flex"
              >
                <Typography fontSize={12}>{receipt.Remark}</Typography>
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
                  onClick={() => handleUpdateOpen(receipt.ReceiptID)}
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
                  onClick={() => deleteIPDMoneyReceipt(receipt.ReceiptID)}
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
                  onClick={() => handlePrintClick(receipt.ReceiptID)}
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
                </IconButton>
              </Grid>
            </Grid>
          );
        })}
      </Box>
    </>
  );
};
