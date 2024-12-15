import { Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
// import { useLocation } from "react-router-dom";
import { convertTimeTo12HourFormat, setGenderValue } from "../../SelectValues";
import Image from "next/image";

export const PrintOTDischarge = () => {
  // const location = useLocation();
  const printRef = useRef();
  const [OTDischargeDetails, SetOTDischargeDetails] = useState({});
  const [AdmDate, setAdmDate] = useState();
  const [AdmTime, setAdmTime] = useState();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  console.log(OTDischargeDetails);
  const PId = new URLSearchParams(location.search).get("PId");

  const getOTDischargeDetails = async (input) => {
    try {
      const response = await axios.post(
        "http://192.168.1.32:5000/fetchOtDischargeDetails",
        {
          PId: input,
        }
      );
      SetOTDischargeDetails(response.data.otDischarge[0]);
      setAdmDate(new Date(response.data.otDischarge[0].AdmDate).toISOString().split("T")[0])
      setAdmTime(convertTimeTo12HourFormat(new Date(response.data.otDischarge[0].AdmTime).toISOString().split("T")[1]));
      setDate(new Date(response.data.otDischarge[0].Date).toISOString().split("T")[0]);
      setTime(convertTimeTo12HourFormat(new Date(response.data.otDischarge[0].Time).toISOString().split("T")[1]));
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    getOTDischargeDetails(PId);
  }, []);
  return OTDischargeDetails != {}?(
    <>
      <Grid container>
        <Grid container display="none">
          <Grid xs={2} item display="flex" justifyContent="start">
          <Image src="/images/logo.jpg" width={250} height={100}/>
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
            <Typography fontWeight="bold">Final Bill/ Receipt</Typography>
          </Grid>
          <Grid xs={2} item display="flex" justifyContent="end">
            
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
              <Grid xs={3} item>
                <Typography fontWeight="bold" fontSize={12}>
                  Patient Name
                </Typography>
              </Grid>
              <Grid xs={9} item>
                <Typography fontSize={12}>: Mr. {OTDischargeDetails.PatientName}</Typography>
              </Grid>
            </Grid>

            <Grid item container display="flex">
              <Grid xs={3} item>
                <Typography fontWeight="bold" fontSize={12}>
                  IPD NO
                </Typography>
              </Grid>
              <Grid xs={9} item>
                <Typography fontSize={12}>: {OTDischargeDetails.IPDNO}</Typography>
              </Grid>
            </Grid>

            <Grid item container display="flex">
              <Grid xs={3} item>
                <Typography fontWeight="bold" fontSize={12}>
                  Consultant
                </Typography>
              </Grid>
              <Grid xs={9} item>
                <Typography fontSize={12}>
                  : DR. ARUP KUMAR NATH & UROLOGY TEAM
                </Typography>
              </Grid>
            </Grid>

            <Grid item container display="flex">
              <Grid xs={3} item>
                <Typography fontWeight="bold" fontSize={12}>
                  UHID
                </Typography>
              </Grid>
              <Grid xs={9} item>
                <Typography fontSize={12}>: {OTDischargeDetails.HRNo}</Typography>
              </Grid>
            </Grid>

            <Grid item container display="flex">
              <Grid xs={3} item>
                <Typography fontWeight="bold" fontSize={12}>
                  Address
                </Typography>
              </Grid>
              <Grid xs={9} item>
                <Typography fontSize={12}>
                  : {OTDischargeDetails.Address}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid xs={5} container>

            <Grid item container display="flex">
              <Grid xs={6} item>
                <Typography fontWeight="bold" fontSize={12}>
                  Age/Gender
                </Typography>
              </Grid>
              <Grid xs={6} item>
                <Typography fontSize={12}>
                  : {OTDischargeDetails.Year}Y {OTDischargeDetails.Month}M {OTDischargeDetails.Days}D
                </Typography>
              </Grid>
            </Grid>

            <Grid item container display="flex">
              <Grid xs={6} item>
                <Typography fontWeight="bold" fontSize={12}>
                  Gender
                </Typography>
              </Grid>
              <Grid xs={6} item>
                <Typography fontSize={12}>: {setGenderValue(OTDischargeDetails.Gender).label}</Typography>
              </Grid>
            </Grid>

            <Grid item container display="flex">
              <Grid xs={6} item>
                <Typography fontWeight="bold" fontSize={12}>
                  Bed No.
                </Typography>
              </Grid>
              <Grid xs={6} item>
                <Typography fontSize={12}>
                  : {OTDischargeDetails.BedNo}
                </Typography>
              </Grid>
            </Grid>

            <Grid item container display="flex">
              <Grid xs={6} item>
                <Typography fontWeight="bold" fontSize={12}>
                  Admit Date & Time
                </Typography>
              </Grid>
              <Grid xs={6} item>
                <Typography fontSize={12}>
                  : {AdmDate} {AdmTime}
                </Typography>
              </Grid>
            </Grid>

            <Grid item container display="flex">
              <Grid xs={6} item>
                <Typography fontWeight="bold" fontSize={12}>
                  Discharge Date & Time
                </Typography>
              </Grid>
              <Grid xs={6} item>
                <Typography fontSize={12}>: {date} {time}</Typography>
              </Grid>
            </Grid>

            <Grid item container display="flex">
              <Grid xs={6} item>
                <Typography fontWeight="bold" fontSize={12}>
                Contact No
                </Typography>
              </Grid>
              <Grid xs={6} item>
                <Typography fontSize={12}>: +91 {OTDischargeDetails.PhoneNo}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <div style={{display:"flex", width:"100vw", flexDirection:"column"}}
        ref={printRef}
        dangerouslySetInnerHTML={{ __html: OTDischargeDetails.Format }}
      />
    </>
  ):(<></>);
};
