import { Box, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
import { convertTimeTo12HourFormat, setGenderValue } from "../../SelectValues";
import Image from "next/image";
import { setRelationValue } from "../../IPDAdmit/SelectListValues";

export const AdmissionForm = () => {
  // const location = useLocation();
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
          new Date(response.data[0].Time).toISOString().split("T")[1]
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
      <Grid container>
        <Grid xs={2} item display="flex" justifyContent="start">
          <Image src="/images/logo.jpg" width={250} height={100} />
        </Grid>
        <Grid
          xs={8}
          item
          display="flex"
          alignItems="center"
          flexDirection="column"
        >
          <Typography fontWeight="bold" fontSize={18}>
            Institute of Urology & Kidney Diseases (IUKD)
          </Typography>
          <Typography fontSize={12}>
            (A Unit of Mednomic Healthcare Pvt. Ltd)
          </Typography>
          <Typography fontSize={12}>
            {" "}
            Nazirakhat, Sonapur, Kamrup (M), Assam - 782402
          </Typography>
          <Typography fontSize={12}>
            Phone: +91 9864104444/ +91 8822721671
          </Typography>
          <Typography fontSize={12}>
            Email: iukd.india@gmail.com, Web: www.iukdindia.com
          </Typography>
          <Typography fontWeight="bold" marginTop={3} variant="h5">Admission Form</Typography>
        </Grid>
        <Grid xs={2} item display="flex" justifyContent="end">

        </Grid>
      </Grid>
      <Grid container padding={0} marginTop={5} >
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
                    {MRDDetails.HRNo}
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
                  {MRDDetails.DoctorName}
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
                  <Typography fontSize={12}>: C/O: {MRDDetails.RelationName}, {MRDDetails.Address}</Typography>
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
                  <Typography fontSize={12} noWrap>
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
                  IPD/23-24/{IPDNo}
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
                  {MRDDetails.Specialized}
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
              <Grid item container display="none">
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
            <Typography fontSize={12}>
              <b>Local Address:</b>  {MRDDetails.Address}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography fontSize={12}>
              <b>Local Contact No:</b>  {MRDDetails.PhoneNo}
            </Typography>
          </Grid>
        </Grid>

        <Grid container border="1px black solid">
          <Grid item xs={6} display="flex" alignItems="center" padding={1}>
            <Typography fontWeight="bold" fontSize={12}>
              Name of Attendent
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
            <Typography fontSize={12}>:{setRelationValue(MRDDetails.RelationID).label}</Typography>
          </Grid>
        </Grid>

        <Grid container border="1px black solid">
          <Grid item xs={6} display="flex" alignItems="center" padding={1}>
            <Typography fontWeight="bold" fontSize={12}>
              Informed Ward
            </Typography>
            <Typography fontSize={12}>: Done</Typography>
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
            <Typography fontSize={12}>: Done</Typography>
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

            </Typography>
            <Typography fontSize={12}> </Typography>
          </Grid>
        </Grid>
        <Grid display="flex" width="100vw" justifyContent="end" position="absolute" top="900px" >
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography fontSize={14} fontWeight="bold">(Signature)</Typography>
            <Typography fontSize={14}><b>By:</b> {MRDDetails.FirstName}</Typography>
          </Box>
        </Grid>

        <Grid display="flex" width="100vw" justifyContent="end" position="absolute" top="1000px" >
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography>Form No: iUKD/MRD/002</Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
