import { Box, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  convertTimeTo12HourFormat,
  convertToTimeFormat,
  extractTimeFromISO,
  numberToWords,
  setGenderValue,
  setMOP,
} from "../SelectValues";

export const PrintIPDMoneyReceipt = () => {
  const location = useLocation();
  const printRef = useRef();
  const [IPDMoneyReceiptDetails, setIPDMoneyReceiptDetails] = useState({});
  const [AdmDate, setAdmDate] = useState();
  const [AdmTime, setAdmTime] = useState();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  console.log(IPDMoneyReceiptDetails);
  const ReceiptID = new URLSearchParams(location.search).get("ReceiptID");

  const fetchIPDBillDetails = async (input) => {
    console.log("IPD", input);
    try {
      const response = await axios.post(
        "http://192.168.1.32:5000/fetchIPDMoneyReceiptDetails",
        {
          ReceiptID: input,
        }
      );
      setIPDMoneyReceiptDetails(response.data.IPDMoneyReceipt);
      // SetOTDischargeDetails(response.data.otDischarge[0]);
      setAdmDate(
        new Date(response.data.IPDMoneyReceipt.AdmDate)
          .toISOString()
          .split("T")[0]
      );
      setAdmTime(
        convertTimeTo12HourFormat(
          new Date(response.data.IPDMoneyReceipt.AdmTime)
            .toISOString()
            .split("T")[1]
            .split(".")[0]
        )
      );
      setDate(
        new Date(response.data.IPDMoneyReceipt.ReceiptDate)
          .toISOString()
          .split("T")[0]
      );
      setTime(
        convertTimeTo12HourFormat(
          new Date(response.data.IPDMoneyReceipt.ReceiptTime)
            .toISOString()
            .split("T")[1]
            .split(".")[0]
        )
      );
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    fetchIPDBillDetails(ReceiptID);
  }, []);
  return IPDMoneyReceiptDetails != {} ? (
    <>
      <Grid container>
        <Grid container>
          <Grid xs={2} item display="flex" justifyContent="start">
            <img
              src="./images/logo.jpg"
              style={{ display: "flex", height: "90px" }}
            />
          </Grid>
          <Grid
            xs={8}
            item
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Typography fontWeight="bold" fontSize={14}>
              Institute of Urology & Kidney Diseases (IUKD)
            </Typography>
            <Typography fontSize={9}>
              (A Unit of Mednomic Healthcare Pvt. Ltd)
            </Typography>
            <Typography fontSize={9}>
              {" "}
              Nazirakhat, Sonapur, Kamrup (M), Assam - 782402
            </Typography>
            <Typography fontSize={9}>
              Phone: +91 9864104444/ +91 8822721671
            </Typography>
            <Typography fontSize={9}>
              Email: iukd.india@gmail.com, Web: www.iukdindia.com
            </Typography>
            <Typography fontWeight="bold" marginY={1}>Payment Receipt</Typography>
          </Grid>
          <Grid xs={2} item display="flex" justifyContent="end">
            {/* QR */}
          </Grid>
        </Grid>
        <Grid
          container
          border="1px black solid"
          padding={1}
          justifyContent="space-between"
        >
          <Grid xs={6} container>
            <Grid item container display="flex">
              <Grid xs={4} item>
                <Typography fontWeight="bold" fontSize={9}>
                  Receipt No
                </Typography>
              </Grid>
              <Grid xs={8} item>
                <Typography fontSize={9}>
                  : Mr. {IPDMoneyReceiptDetails.ReceiptNo}
                </Typography>
              </Grid>
            </Grid>

            <Grid item container display="flex">
              <Grid xs={4} item>
                <Typography fontWeight="bold" fontSize={9}>
                  Patient Name
                </Typography>
              </Grid>
              <Grid xs={8} item>
                <Typography fontSize={9}>
                  : Mr. {IPDMoneyReceiptDetails.PatientName}
                </Typography>
              </Grid>
            </Grid>

            <Grid item container display="flex">
              <Grid xs={4} item>
                <Typography fontWeight="bold" fontSize={9}>
                  IPD NO
                </Typography>
              </Grid>
              <Grid xs={8} item>
                <Typography fontSize={9}>
                  : {IPDMoneyReceiptDetails.IPDNo}
                </Typography>
              </Grid>
            </Grid>

            <Grid item container display="flex">
              <Grid xs={4} item>
                <Typography fontWeight="bold" fontSize={9}>
                  Consultant
                </Typography>
              </Grid>
              <Grid xs={8} item>
                <Typography fontSize={9}>
                  : DR. ARUP KUMAR NATH & UROLOGY TEAM
                </Typography>
              </Grid>
            </Grid>

            <Grid item container display="flex">
              <Grid xs={4} item>
                <Typography fontWeight="bold" fontSize={9}>
                  UHID
                </Typography>
              </Grid>
              <Grid xs={8} item>
                <Typography fontSize={9}>
                  : {IPDMoneyReceiptDetails.HRNo}
                </Typography>
              </Grid>
            </Grid>

            <Grid item container display="flex">
              <Grid xs={4} item>
                <Typography fontWeight="bold" fontSize={9}>
                  Address
                </Typography>
              </Grid>
              <Grid xs={8} item>
                <Typography fontSize={9}>
                  : {IPDMoneyReceiptDetails.Address}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid xs={5} container>
            <Grid item container display="flex">
              <Grid xs={6} item>
                <Typography fontWeight="bold" fontSize={9}>
                  Receipt Date & Time
                </Typography>
              </Grid>
              <Grid xs={6} item>
                <Typography fontSize={9}>
                  : {date} {time}
                </Typography>
              </Grid>
            </Grid>

            <Grid item container display="flex">
              <Grid xs={6} item>
                <Typography fontWeight="bold" fontSize={9}>
                  Age
                </Typography>
              </Grid>
              <Grid xs={6} item>
                <Typography fontSize={9}>
                  : {IPDMoneyReceiptDetails.Year}Y{" "}
                  {IPDMoneyReceiptDetails.Month}M {IPDMoneyReceiptDetails.Days}D
                </Typography>
              </Grid>
            </Grid>

            <Grid item container display="flex">
              <Grid xs={6} item>
                <Typography fontWeight="bold" fontSize={9}>
                  Gender
                </Typography>
              </Grid>
              <Grid xs={6} item>
                <Typography fontSize={9}>
                  : {setGenderValue(IPDMoneyReceiptDetails.Gender).label}
                </Typography>
              </Grid>
            </Grid>

            <Grid item container display="flex">
              <Grid xs={6} item>
                <Typography fontWeight="bold" fontSize={9}>
                  Bed No.
                </Typography>
              </Grid>
              <Grid xs={6} item>
                <Typography fontSize={9}>
                  : {IPDMoneyReceiptDetails.BedNo}
                </Typography>
              </Grid>
            </Grid>

            <Grid item container display="flex">
              <Grid xs={6} item>
                <Typography fontWeight="bold" fontSize={9}>
                  Admit Date & Time
                </Typography>
              </Grid>
              <Grid xs={6} item>
                <Typography fontSize={9}>
                  : {AdmDate} {AdmTime}
                </Typography>
              </Grid>
            </Grid>

            <Grid item container display="flex">
              <Grid xs={6} item>
                <Typography fontWeight="bold" fontSize={9}>
                  Contact No
                </Typography>
              </Grid>
              <Grid xs={6} item>
                <Typography fontSize={9}>
                  : +91 {IPDMoneyReceiptDetails.PhoneNo}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          padding={2}
          justifyContent="space-between"
          borderBottom="1px black solid"
        >
          <Grid xs={2} item>
            <Typography fontSize={9} fontWeight="bold">
              Pay Date
            </Typography>
          </Grid>
          <Grid xs={2} item>
            <Typography fontSize={9} fontWeight="bold">
              Receipt No
            </Typography>
          </Grid>
          <Grid xs={1} item>
            <Typography fontSize={9} fontWeight="bold">
              Mode
            </Typography>
          </Grid>
          <Grid xs={1} item>
            <Typography fontSize={9} fontWeight="bold">
              Ref No
            </Typography>
          </Grid>
          <Grid xs={1} item>
            <Typography fontSize={9} fontWeight="bold">
              Amount
            </Typography>
          </Grid>
        </Grid>

        <Grid container padding={2} justifyContent="space-between">
          <Grid xs={2} item>
            <Typography fontSize={9}>{date}</Typography>
          </Grid>
          <Grid xs={2} item>
            <Typography fontSize={9}>
              {IPDMoneyReceiptDetails.ReceiptNo}
            </Typography>
          </Grid>
          <Grid xs={1} item>
            <Typography fontSize={9}>
              {setMOP(IPDMoneyReceiptDetails.MOD)}
            </Typography>
          </Grid>
          <Grid xs={1} item>
            <Typography fontSize={9}>
              {IPDMoneyReceiptDetails.AccountNo}
            </Typography>
          </Grid>
          <Grid xs={1} item>
            <Typography fontSize={9}>
              {IPDMoneyReceiptDetails.RecAmount}
            </Typography>
          </Grid>
        </Grid>
        <Box display="flex" width="100vw" justifyContent="end">
          <Box display="flex" borderTop="1px black solid" width="40vw"></Box>
        </Box>

        <Grid container padding={2} justifyContent="space-between">
          <Grid xs={2} item>
            {/* <Typography fontSize={9} >{date}</Typography> */}
          </Grid>
          <Grid xs={2} item>
            {/* <Typography fontSize={9} >{IPDMoneyReceiptDetails.ReceiptNo}</Typography> */}
          </Grid>
          <Grid xs={1} item>
            {/* <Typography fontSize={9} >{setMOP(IPDMoneyReceiptDetails.MOD)}</Typography> */}
          </Grid>
          <Grid xs={2} item>
            <Typography fontSize={9} fontWeight="bold">
              Total Payments:
            </Typography>
          </Grid>
          <Grid xs={1} item>
            <Typography fontSize={9}>
              {IPDMoneyReceiptDetails.RecAmount}
            </Typography>
          </Grid>
        </Grid>
        <Grid container padding={2} marginTop={5}>
          <Grid item xs={8} display="flex">
            <Typography fontSize={9} fontWeight="bold">
              Received with thanks:
            </Typography>
            {/* <Typography fontSize={9}>: {numberToWords(IPDMoneyReceiptDetails.RecAmount)} Only</Typography> */}
            {/* <Typography fontSize={9}>: {numberToWords(134008)} Only</Typography> */}
          </Grid>
          <Grid item container xs={4} justifyContent="end">
            <Grid item xs={12} display="flex" justifyContent="end">
              <Typography fontSize={9} fontWeight="bold">
                (Signature)
              </Typography>
            </Grid>
            <Grid item display="flex">
              <Typography fontSize={9} fontWeight="bold">
                By:
              </Typography>
              <Typography fontSize={9}>
                {IPDMoneyReceiptDetails.FirstName}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* <div
        ref={printRef}
        dangerouslySetInnerHTML={{ __html: OTDischargeDetails.Format }}
      /> */}
    </>
  ) : (
    <></>
  );
};
