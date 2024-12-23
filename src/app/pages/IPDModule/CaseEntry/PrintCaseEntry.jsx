import { Box, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
// import { useLocation } from "react-router-dom";
import {
  convertTimeTo12HourFormat,
  convertToTimeFormat,
  extractTimeFromISO,
  numberToWords,
  setGenderValue,
  setMOP,
} from "../SelectValues";
import Image from "next/image";

export const PrintCaseEntry = () => {
  // const location = useLocation();
  const printRef = useRef();
  const [CaseEntry, setCaseEntry] = useState({});
  const [CaseEntryDetails, setCaseEntryDetails] = useState([]);
  const [AdmDate, setAdmDate] = useState();
  const [AdmTime, setAdmTime] = useState();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  // let temp = 0;
  // console.log(CaseEntryDetails);
  const ReceiptID = new URLSearchParams(location.search).get("ReceiptID");

  const fetchCaseEntry = async (input) => {
    console.log("IPD", input);
    try {
      const response = await axios.post(
        "http://localhost:5000/fetchCaseEntry",
        {
          ReceiptID: input,
        }
      );
      setCaseEntry(response.data.CaseEntry);
      setDate(new Date(response.data.CaseEntry.CaseDate).toISOString().split("T")[0]);
      setTime(convertTimeTo12HourFormat(new Date(response.data.CaseEntry.CaseTime).toISOString().split("T")[1].split(".")[0]));
    } catch (error) {
      alert(error);
    }
  };

  const fetchCaseEntryDetails = async (input) => {
    console.log("IPD", input);
    try {
      const response = await axios.post(
        "http://localhost:5000/fetchCaseEntryDetails",
        {
          CaseID: input,
        }
      );
      setCaseEntryDetails(response.data.groupedData);
      // temp=response.data.CaseEntryDetails[0].SubDepartmentID;
      console.log("details= ", response.data.groupedData);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchCaseEntry(ReceiptID);
    fetchCaseEntryDetails(ReceiptID);
  }, []);
  return CaseEntry != {} ? (
    <>
      <Grid container>
        <Grid container>
          <Grid xs={2} item display="flex" justifyContent="start">
            <Image src="/images/logo.jpg" width={230} height={90} />
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
            <Typography fontWeight="bold" marginY={1}>Case Entry Receipt</Typography>
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
                  Case No
                </Typography>
              </Grid>
              <Grid xs={8} item>
                <Typography fontSize={9}>
                  : {CaseEntry.CaseNo}
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
                  : Mr. {CaseEntry.PatientName}
                </Typography>
              </Grid>
            </Grid>

            {/* <Grid item container display="flex">
              <Grid xs={4} item>
                <Typography fontWeight="bold" fontSize={9}>
                  IPD NO
                </Typography>
              </Grid>
              <Grid xs={8} item>
                <Typography fontSize={9}>
                  : {CaseEntry.IPDNo}
                </Typography>
              </Grid>
            </Grid> */}

            <Grid item container display="flex">
              <Grid xs={4} item>
                <Typography fontWeight="bold" fontSize={9}>
                  Consultant
                </Typography>
              </Grid>
              <Grid xs={8} item>
                <Typography fontSize={9}>
                  : DR. ARUP KUMAR NATH
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
                  : {CaseEntry.HRNo}
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
                  : {CaseEntry.Address}
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
                  : {CaseEntry.Years}Y{" "}
                  {CaseEntry.Months}M {CaseEntry.Days}D
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
                  : {setGenderValue(CaseEntry.Gender).label}
                </Typography>
              </Grid>
            </Grid>

            {/* <Grid item container display="flex">
              <Grid xs={6} item>
                <Typography fontWeight="bold" fontSize={9}>
                  Bed No.
                </Typography>
              </Grid>
              <Grid xs={6} item>
                <Typography fontSize={9}>
                  : {CaseEntry.BedNo}
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
            </Grid> */}

            <Grid item container display="flex">
              <Grid xs={6} item>
                <Typography fontWeight="bold" fontSize={9}>
                  Contact No
                </Typography>
              </Grid>
              <Grid xs={6} item>
                <Typography fontSize={9}>
                  : +91 {CaseEntry.MobileNo}
                </Typography>
              </Grid>
            </Grid>

            <Grid item container display="flex">
              <Grid xs={6} item>
                <Typography fontWeight="bold" fontSize={9}>
                  Patient Type
                </Typography>
              </Grid>
              <Grid xs={6} item>
                <Typography fontSize={9}>
                  : IPD
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          // padding={2}
          marginTop={1}
          justifyContent="space-between"
          borderBottom="1px black solid"
        >
          {/* <Grid xs={1} item>
            <Typography fontSize={11} fontWeight="bold">
              Sr.No.
            </Typography>
          </Grid> */}
          <Grid xs={9} item>
            <Typography fontSize={11} fontWeight="bold">
              Description
            </Typography>
          </Grid>
          <Grid xs={1} item>
            <Typography fontSize={11} fontWeight="bold" textAlign="center">
              Rate
            </Typography>
          </Grid>
          <Grid xs={1} item>
            <Typography fontSize={11} fontWeight="bold" textAlign="center">
              Disc
            </Typography>
          </Grid>
          <Grid xs={1} item>
            <Typography fontSize={11} fontWeight="bold" textAlign="center">
              Amount
            </Typography>
          </Grid>
        </Grid>

        {Object.entries(CaseEntryDetails).map(([key, value]) => {
          return (<>
            <Box display="flex" width="100vw" ><Typography fontSize={10} fontWeight='bold'>[{key}]</Typography></Box>
            {value.entries.map((entry, index) => {
              return (<><Grid xs={1} item>
                <Typography fontSize={11} >
                  {/* {index+1} */}
                </Typography>
              </Grid>
                <Grid xs={8} item>
                  <Typography fontSize={11} >
                    {entry.ServiceName}
                  </Typography>
                </Grid>
                <Grid xs={1} item>
                  <Typography fontSize={11} textAlign="center">
                    {entry.Rate}
                  </Typography>
                </Grid>
                <Grid xs={1} item>
                  <Typography fontSize={11} textAlign="center">
                    {entry.DiscountAmount}
                  </Typography>
                </Grid>
                <Grid xs={1} item>
                  <Typography fontSize={11} textAlign="center">
                    {entry.Amount}
                  </Typography>
                </Grid></>)
            })}
            <Grid container display='flex' width='100vw' >
              <Grid item xs={8}>

              </Grid>
              <Grid item xs={1} borderTop='1px black solid'>
                <Typography fontSize={11} >Total</Typography>
              </Grid>

              <Grid item xs={3} container borderTop='1px black solid' display='flex'>
                <Grid item xs={4}>
                  <Typography fontSize={11}  textAlign='center'>{value.Total_Rate}</Typography>
                </Grid>

                <Grid item xs={4}>
                  <Typography fontSize={11}  textAlign='center'>{value.Total_DiscountAmount}</Typography>
                </Grid>

                <Grid item xs={4}>
                  <Typography fontSize={11} fontWeight='bold' textAlign='center'>{value.Total_Amount}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </>)
        })}
        <Grid container justifyContent="space-between" marginTop={3}>
          <Grid xs={2} item>
            {/* <Typography fontSize={9} >{date}</Typography> */}
          </Grid>
          <Grid xs={6} item>
            {/* <Typography fontSize={9} >{CaseEntry.ReceiptNo}</Typography> */}
          </Grid>

          <Grid xs={4} item>
            <Box border='1px black solid' display='flex' width='100%' padding={1} justifyContent='space-between'>
              <Typography fontSize={11} fontWeight="bold">
                Grand Total:
              </Typography>
              <Typography fontSize={11} fontWeight="bold">
                {CaseEntry.NetAmount} -/
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid container padding={2} marginTop={5}>
          <Grid item xs={8} display="flex">
            <Typography fontSize={9} fontWeight="bold">
              
            </Typography>
            {/* <Typography fontSize={9}>: {numberToWords(CaseEntry.RecAmount)} Only</Typography> */}
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
                {CaseEntry.FirstName}
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
