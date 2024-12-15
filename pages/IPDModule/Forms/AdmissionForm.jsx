import { Box, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { convertTimeTo12HourFormat, setGenderValue } from "../SelectValues";

export const AdmissionForm = () => {
  const location = useLocation();
  const IPDNo = new URLSearchParams(location.search).get("IPDNo");
  const [MRDDetails, setMRDDetails] = useState({});
  const [AdmDate, setAdmDate] = useState();
  const [AdmTime, setAdmTime] = useState();
  const getMRDDetails = async (input) => {
    try {
      const response = await axios.post(
        "http://192.168.1.32:5000/fetchIPDPatientDetails",
        { IPDNo: input }
      );
      console.log(response.data[0]);
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
  useEffect(() => {
    getMRDDetails(IPDNo);
  }, []);
  return (
    <>
      <Grid container margin={0} padding={0} position="absolute">
        <Grid container justifyContent="center" marginY={1}>
          <Grid
            xs={8}
            item
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Typography fontWeight="bold">Admission Form</Typography>
          </Grid>
        </Grid>
        {/* Patient Details */}
        <Grid container justifyContent="space-between" border="1px black solid">
          <Grid xs={6} container flexDirection="row">
            <Grid item container display="flex">
              {/* UHID */}
              <Grid
                xs={4}
                item
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                padding={1}
                borderRight="1px black solid"
              >
                <Grid item >
                  <Typography fontWeight="bold" fontSize={12}>
                    UHID
                  </Typography>
                </Grid>
                <Grid item >
                  <Typography fontSize={12}>
                    {MRDDetails.UHId}
                  </Typography>
                </Grid>
              </Grid>
              {/* DOA */}
              <Grid
                xs={4}
                item
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                padding={1}
                borderRight="1px black solid"
              >
                <Grid item >
                  <Typography fontWeight="bold" fontSize={12}>
                    DATE OF ADMN
                  </Typography>
                </Grid>
                <Grid item >
                  <Typography fontSize={12}>
                    {AdmDate}
                  </Typography>
                </Grid>
              </Grid>
              {/* TOA */}
              <Grid
                xs={4}
                item
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                padding={1}
              >
                <Grid item >
                  <Typography fontWeight="bold" fontSize={12}>
                    TIME OF ADMN
                  </Typography>
                </Grid>
                <Grid item >
                  <Typography fontSize={12}>
                    {AdmTime}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            {/* CONSULTANT */}
            <Grid
              item
              container
              justifyContent="center"
              borderTop="1px black solid"
              // borderRight="1px black solid"
              padding={1}
            >
              <Grid xs={12} item display="flex" justifyContent="center">
                <Typography fontWeight="bold" fontSize={12} textAlign="center">
                  NAME OF THE CONSULTANT
                </Typography>
              </Grid>
              <Grid xs={12} item display="flex" justifyContent="center">
                <Typography fontSize={12} textAlign="center">
                  Dr. Arup Kumar Nath & Urology Team
                </Typography>
              </Grid>
            </Grid>
            {/* Patient Details */}
            <Grid
              container
              borderTop="1px black solid"
              padding={1}
              height="150px"
              display="flex"
              justifyItems="start"
              alignItems="center"
            >
              {/* Patient Name */}
              <Grid item container display="flex">
                <Grid xs={5} item>
                  <Typography fontWeight="bold" fontSize={12}>
                    Name of the Patient
                  </Typography>
                </Grid>
                <Grid xs={5} item>
                  <Typography fontSize={12}>
                    : {MRDDetails.PatientName}
                  </Typography>
                </Grid>
              </Grid>
              {/* AGE, SEX */}
              <Grid item container display="flex">
                <Grid xs={1} item>
                  <Typography fontWeight="bold" fontSize={12}>
                    Age
                  </Typography>
                </Grid>
                <Grid xs={4} item>
                  <Typography fontSize={12}>: {MRDDetails.Year}Yr {MRDDetails.Month}Mth {MRDDetails.Days}Days</Typography>
                </Grid>

                <Grid xs={1} item>
                  <Typography fontWeight="bold" fontSize={12}>
                    Sex
                  </Typography>
                </Grid>
                <Grid xs={4} item>
                  <Typography fontSize={12}>: {setGenderValue(MRDDetails.Gender).label}</Typography>
                </Grid>
              </Grid>
              {/* Address */}
              <Grid item container display="flex">
                <Grid xs={3} item>
                  <Typography fontWeight="bold" fontSize={12}>
                    Address
                  </Typography>
                </Grid>
                <Grid xs={9} item>
                  <Typography fontSize={12}>: {MRDDetails.Address}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            xs={6}
            container
            flexDirection="row"
            borderLeft="1px black solid"
          >
            <Grid item container display="flex">
              {/* WARD */}
              <Grid
                xs={4}
                item
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                padding={1}
                borderRight="1px black solid"
              >
                <Grid item >
                  <Typography fontWeight="bold" fontSize={12}>
                    WARD
                  </Typography>
                </Grid>
                <Grid item >
                  <Typography  fontSize={12}>
                    {MRDDetails.WardName}
                  </Typography>
                </Grid>
              </Grid>
              {/* BEDNO */}
              <Grid
                xs={4}
                item
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                padding={1}
                borderRight="1px black solid"
              >
                <Grid item >
                  <Typography fontWeight="bold" fontSize={12}>
                    ROOM/BEDNO
                  </Typography>
                </Grid>
                <Grid item >
                  <Typography fontSize={12}>
                    {MRDDetails.BedNo}
                  </Typography>
                </Grid>
              </Grid>
              {/* IPDNO */}
              <Grid
                xs={4}
                item
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                padding={1}
              >
                <Grid item >
                  <Typography fontWeight="bold" fontSize={12}>
                    IPNO
                  </Typography>
                </Grid>
                <Grid item >
                  <Typography fontSize={12}>
                    {IPDNo}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            {/* SPECIALITY */}
            <Grid
              item
              container
              justifyContent="center"
              borderTop="1px black solid"
              // borderRight="1px black solid"
              padding={1}
            >
              <Grid xs={12} item display="flex" justifyContent="center">
                <Typography fontWeight="bold" fontSize={12} textAlign="center">
                  SPECIALITY
                </Typography>
              </Grid>
              <Grid xs={12} item display="flex" justifyContent="center">
                <Typography fontSize={12} textAlign="center">
                  UROLOGIST
                </Typography>
              </Grid>
            </Grid>
            {/* Patient Details */}
            <Grid
              container
              borderTop="1px black solid"
              padding={1}
              height="150px"
            >
              {/* REFERRED BY */}
              <Grid item container display="flex">
                <Grid xs={5} item>
                  <Typography fontWeight="bold" fontSize={12}>
                    Referred By
                  </Typography>
                </Grid>
                <Grid xs={5} item>
                  <Typography fontSize={12}>: Self</Typography>
                </Grid>
              </Grid>
              {/* Mobile */}
              <Grid item container display="flex">
                <Grid xs={5} item>
                  <Typography fontWeight="bold" fontSize={12}>
                    Phone/ Mobile No
                  </Typography>
                </Grid>
                <Grid xs={5} item>
                  <Typography fontSize={12}>: +91 {MRDDetails.PhoneNo}</Typography>
                </Grid>
              </Grid>
              {/* Email Id */}
              <Grid item container display="flex">
                <Grid xs={5} item>
                  <Typography fontWeight="bold" fontSize={12}>
                    Email ID
                  </Typography>
                </Grid>
                <Grid xs={5} item>
                  <Typography fontSize={12}>: </Typography>
                </Grid>
              </Grid>
              {/* Blood Group */}
              <Grid item container display="flex">
                <Grid xs={5} item>
                  <Typography fontWeight="bold" fontSize={12}>
                    Blood Group
                  </Typography>
                </Grid>
                <Grid xs={5} item>
                  <Typography fontSize={12}>: </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* Local Address */}
        <Grid container padding={1} border="1px black solid">
          <Grid item xs={12}>
            <Typography fontWeight="bold" fontSize={12}>
              Local Address:{" "}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography fontWeight="bold" fontSize={12}>
              Local Contact No:
            </Typography>
          </Grid>
        </Grid>

        <Grid container border="1px black solid">
          <Grid item xs={6} display="flex" alignItems="center" padding={1}>
            <Typography fontWeight="bold" fontSize={12}>
              Name of Next of Kin
            </Typography>
            <Typography fontSize={12}>: {MRDDetails.RelationName}</Typography>
          </Grid>
          <Grid
            item
            xs={6}
            display="flex"
            alignItems="center"
            borderLeft="1px black solid"
            padding={1}
          >
            <Typography fontWeight="bold" fontSize={12}>
              Relationship
            </Typography>
            <Typography fontSize={12}>: Husband</Typography>
          </Grid>
        </Grid>

        <Grid container border="1px black solid">
          <Grid item xs={6} display="flex" alignItems="center" padding={1}>
            <Typography fontWeight="bold" fontSize={12}>
              Informed Ward
            </Typography>
            <Typography fontSize={12}>:</Typography>
          </Grid>
          <Grid
            item
            xs={6}
            display="flex"
            alignItems="center"
            borderLeft="1px black solid"
            padding={1}
          >
            <Typography fontWeight="bold" fontSize={12}>
              MLC
            </Typography>
            <Typography fontSize={12}>:</Typography>
          </Grid>
        </Grid>

        <Grid container border="1px black solid">
          <Grid item xs={6} display="flex" alignItems="center" padding={1}>
            <Typography fontWeight="bold" fontSize={12}>
              Informed HK
            </Typography>
            <Typography fontSize={12}>:</Typography>
          </Grid>
          <Grid
            item
            xs={6}
            display="flex"
            alignItems="center"
            borderLeft="1px black solid"
            padding={1}
          >
            <Typography fontWeight="bold" fontSize={12}>
              Mode of Payment
            </Typography>
            <Typography fontSize={12}>: </Typography>
          </Grid>
        </Grid>

        <Grid container padding={1} border="1px black solid" dis>
          <Grid item xs={3}>
            <Typography fontWeight="bold" fontSize={12}>
              INPATIENT HISTORY:
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography fontWeight="bold" fontSize={12}>
              Total IP Episodes:
            </Typography>
          </Grid>
        </Grid>

        <Grid container border="1px black solid">
          <Grid item xs={2} display="flex" alignItems="center" padding={1}>
            <Typography fontWeight="bold" fontSize={12}>
              IPNO
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            display="flex"
            alignItems="center"
            borderLeft="1px black solid"
            padding={1}
          >
            <Typography fontWeight="bold" fontSize={12}>
              Admitting Doctor
            </Typography>
          </Grid>

          <Grid
            item
            xs={1}
            display="flex"
            alignItems="center"
            borderLeft="1px black solid"
            padding={1}
          >
            <Typography fontWeight="bold" fontSize={12}>
              LOS
            </Typography>
          </Grid>

          <Grid
            item
            xs={2}
            display="flex"
            alignItems="center"
            borderLeft="1px black solid"
            padding={1}
          >
            <Typography fontWeight="bold" fontSize={12}>
              IP NO
            </Typography>
          </Grid>

          <Grid
            item
            xs={3}
            display="flex"
            alignItems="center"
            borderLeft="1px black solid"
            padding={1}
          >
            <Typography fontWeight="bold" fontSize={12}>
              Admitting Doctor
            </Typography>
          </Grid>

          <Grid
            item
            xs={1}
            display="flex"
            alignItems="center"
            borderLeft="1px black solid"
            padding={1}
          >
            <Typography fontWeight="bold" fontSize={12}>
              LOS
            </Typography>
          </Grid>
        </Grid>

        <Grid container border="1px black solid">
          <Grid item xs={2} display="flex" alignItems="center" padding={1}>
            <Typography fontSize={12}>{IPDNo}</Typography>
          </Grid>
          <Grid
            item
            xs={3}
            display="flex"
            alignItems="center"
            borderLeft="1px black solid"
            padding={1}
          >
            <Typography fontSize={12}></Typography>
          </Grid>

          <Grid
            item
            xs={1}
            display="flex"
            alignItems="center"
            borderLeft="1px black solid"
            padding={1}
          >
            <Typography fontSize={12}></Typography>
          </Grid>

          <Grid
            item
            xs={2}
            display="flex"
            alignItems="center"
            borderLeft="1px black solid"
            padding={1}
          >
            <Typography fontSize={12}>{IPDNo}</Typography>
          </Grid>

          <Grid
            item
            xs={3}
            display="flex"
            alignItems="center"
            borderLeft="1px black solid"
            padding={1}
          >
            <Typography fontSize={12}></Typography>
          </Grid>

          <Grid
            item
            xs={1}
            display="flex"
            alignItems="center"
            borderLeft="1px black solid"
            padding={1}
          >
            <Typography fontSize={12}></Typography>
          </Grid>
        </Grid>

        <Grid
          container
          padding={1}
          // border="1px black solid"
          marginTop={2}
          display="flex"
          position="relative"
        >
          <Grid item xs={12} display="flex" justifyContent="center">
            <Typography fontWeight="bold" fontSize={12}>
              Deposit Slip
            </Typography>
          </Grid>
          <Grid item xs={12} display="flex" right={20} position="relative">
            <Typography fontWeight="bold" fontSize={12}>
              {IPDNo}
            </Typography>
          </Grid>
          <Grid container>
            <Grid item xs={4} display="flex" flexDirection="row">
              <Typography fontSize={12} fontWeight="bold">
                IPNO
              </Typography>
              <Typography fontSize={12}>: {IPDNo}</Typography>
            </Grid>
            <Grid item xs={4} display="flex" flexDirection="row">
              <Typography fontSize={12} fontWeight="bold">
                Date:{" "}
              </Typography>
              <Typography fontSize={12}>: {AdmDate}</Typography>
            </Grid>
            <Grid item xs={4} display="flex" flexDirection="row">
              <Typography fontSize={12} fontWeight="bold">
                Room No
              </Typography>
              <Typography fontSize={12}>: {MRDDetails.BedNo}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} display="flex" padding={1}>
          <Typography fontSize={12} fontWeight="bold">
            Dear
          </Typography>
          <Typography fontSize={12} marginLeft={5}>
          {MRDDetails.PatientName}
            
          </Typography>
        </Grid>
        <Grid item xs={12} padding={1}>
          <Typography fontSize={12}>
            Kindly Deposit <b>Rs. 20000.00/-</b> (Twenty Thousand Only) Which
            will be adjusted against your final bill
          </Typography>
          <Typography fontSize={12} marginTop={1}>
            Thanking You,
          </Typography>
          <Typography fontSize={12}>Yours Faithfully,</Typography>
          <Typography fontSize={12} fontWeight="bold">
            IUKD Hospital
          </Typography>
        </Grid>
        <Grid container position="relative">
          <Grid
            xs={6}
            item
            container
            padding={1}
            justifyContent="start"
            display="flex"
          >
            <Grid xs={12} item>
              <Typography fontSize={12} fontWeight="bold">
                {" "}
              </Typography>
            </Grid>
            <Grid xs={12} item>
              <Typography fontSize={12} fontWeight="bold">
                {IPDNo}
              </Typography>
            </Grid>
            <Grid
              xs={12}
              item
              container
              justifyContent="spaceBetween"
              display="flex"
            >
              <Grid xs={6} item>
                <Typography fontSize={12} fontWeight="bold">
                  ATTENDENT'S PASS
                </Typography>
              </Grid>
              <Grid xs={6} item display="flex">
                <Typography fontSize={12} fontWeight="bold">
                  DOA
                </Typography>
                <Typography fontSize={12}>{AdmDate}</Typography>
              </Grid>
            </Grid>
            <Grid
              item
              container
              border="1px black solid"
              // width="100%"
              display="flex"
              flexDirection="column"
              paddingX={1}
            >
              <Grid item display="flex" alignItems="center">
                <Grid item xs={5}>
                  <Typography fontSize={12} fontWeight="bold">
                    IP No.
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  <Typography fontSize={12}>: {IPDNo}</Typography>
                </Grid>
              </Grid>

              <Grid item display="flex" alignItems="center">
                <Grid item xs={5} padding={0} margin={0}>
                  <Typography fontSize={12} fontWeight="bold">
                    Room/ Bed No.
                  </Typography>
                </Grid>
                <Grid item xs={7} padding={0} margin={0}>
                  <Typography fontSize={12}>: {MRDDetails.BedNo}</Typography>
                </Grid>
              </Grid>

              <Grid item display="flex" alignItems="center">
                <Grid item xs={5}>
                  <Typography fontSize={12} fontWeight="bold">
                    Patient's Name
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  <Typography fontSize={12}>: {MRDDetails.PatientName}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid xs={6} item container padding={1}>
            <Grid item xs={12}>
              <Typography fontSize={12} fontWeight="bold">
                {IPDNo}
              </Typography>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="space-between">
              <Typography fontSize={12} fontWeight="bold">
                Reliver Pass
              </Typography>
              <Box>
                <Typography fontSize={12}>DOA: {AdmDate}</Typography>
              </Box>
            </Grid>

            <Grid
              item
              container
              xs={12}
              display="flex"
              justifyContent="space-between"
            >
              <Grid item xs={4}>
                <Typography fontSize={12} fontWeight="bold">
                  IP NO.
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography fontSize={12}>: {IPDNo}</Typography>
              </Grid>
            </Grid>

            <Grid
              item
              container
              xs={12}
              display="flex"
              justifyContent="space-between"
            >
              <Grid item xs={4}>
                <Typography fontSize={12} fontWeight="bold">
                  Room/ Bed No.
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography fontSize={12}>: {MRDDetails.BedNo}</Typography>
              </Grid>
            </Grid>

            <Grid
              item
              container
              xs={12}
              display="flex"
              justifyContent="space-between"
            >
              <Grid item xs={4}>
                <Typography fontSize={12} fontWeight="bold">
                  Patient's Name.
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography fontSize={12}>: {MRDDetails.PatientName}</Typography>
              </Grid>
            </Grid>

            <Grid
              item
              container
              xs={12}
              display="flex"
              justifyContent="space-between"
            >
              <Grid item xs={4}>
                <Typography fontSize={12} fontWeight="bold">
                  Patient Timing's.
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography fontSize={12}>: 7 am to 9 pm</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography fontSize={12}>12 noon to 1:30 pm</Typography>
              </Grid>
            </Grid>

            <Grid
              item
              container
              xs={12}
              display="flex"
              justifyContent="space-between"
            >
              <Grid item xs={4}>
                <Typography fontSize={12} fontWeight="bold">
                  Phone No.
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography fontSize={12}>: {MRDDetails.PhoneNo}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid container sx={{ marginTop: "50px" }}>
            <Grid item xs={4} padding={1}>
              <Typography fontSize={12}>Phone No</Typography>
            </Grid>
            <Grid item xs={4} padding={1}>
              <Typography fontSize={12} justifyContent="center" display="flex">
                Signature
              </Typography>
            </Grid>
            <Grid item xs={4} padding={1} justifyContent="end" display="flex">
              <Typography fontSize={12}>Signature</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
