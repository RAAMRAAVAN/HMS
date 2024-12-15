import { Box, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
import { convertTimeTo12HourFormat, setGenderValue } from "../../SelectValues";
import Image from "next/image";

export const MRDForm = () => {
  // const location = useLocation();
  const IPDNo = new URLSearchParams(location.search).get("IPDNo");
  const [MRDDetails, setMRDDetails] = useState({});
  const [AdmDate, setAdmDate] = useState();
  const [AdmTime, setAdmTime] = useState();
  const getMRDDetails = async(input) => {
    try{
      const response = await axios.post("http://192.168.1.32:5000/fetchIPDPatientDetails", {IPDNo: input})
      console.log(response.data[0])
      setMRDDetails(response.data[0])
      setAdmDate(new Date(response.data[0].Date).toISOString().split("T")[0])
      setAdmTime(convertTimeTo12HourFormat(new Date(response.data[0].Time).toISOString().split("T")[1]));
    } catch (error) {
      alert("DB Error")
    }
  }
  useEffect(() => {
    getMRDDetails(IPDNo);
  }, []);
  return (
    <>
      <Grid container>
        <Grid container>
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
            <Typography fontWeight="bold">MRD Form</Typography>
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
                  UHID
                </Typography>
              </Grid>
              <Grid xs={9} item>
                <Typography fontSize={12}>: {MRDDetails.HRNo}</Typography>
              </Grid>
            </Grid>

            <Grid item container display="flex">
              <Grid xs={3} item>
                <Typography fontWeight="bold" fontSize={12}>
                  IPD NO
                </Typography>
              </Grid>
              <Grid xs={9} item>
                <Typography fontSize={12}>: {MRDDetails.IPDNo}</Typography>
              </Grid>
            </Grid>

            <Grid item container display="flex">
              <Grid xs={3} item>
                <Typography fontWeight="bold" fontSize={12}>
                  Patient Name
                </Typography>
              </Grid>
              <Grid xs={9} item>
                <Typography fontSize={12}>
                  : {MRDDetails.PatientName}
                </Typography>
              </Grid>
            </Grid>

            <Grid item container display="flex">
              <Grid xs={3} item>
                <Typography fontWeight="bold" fontSize={12}>
                  Ref. Doctor
                </Typography>
              </Grid>
              <Grid xs={9} item>
                <Typography fontSize={12}>: DR. ARUP KUMAR NATH & UROLOGY TEAM</Typography>
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
                  : {MRDDetails.Address}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid xs={5} container>
            <Grid item container display="flex">
              <Grid xs={6} item>
                <Typography fontWeight="bold" fontSize={12}>
                  Bed No/ Ward
                </Typography>
              </Grid>
              <Grid xs={6} item>
                <Typography fontSize={12}>
                  : {MRDDetails.BedNo}, {MRDDetails.WardName}
                </Typography>
              </Grid>
            </Grid>

            <Grid item container display="flex">
              <Grid xs={6} item>
                <Typography fontWeight="bold" fontSize={12}>
                  Admit Date/ Time
                </Typography>
              </Grid>
              <Grid xs={6} item>
                <Typography fontSize={12}>: {AdmDate} {AdmTime}</Typography>
              </Grid>
            </Grid>

            <Grid item container display="flex">
              <Grid xs={6} item>
                <Typography fontWeight="bold" fontSize={12}>
                  Age
                </Typography>
              </Grid>
              <Grid xs={6} item>
                <Typography fontSize={12}>
                : {MRDDetails.Year}Y {MRDDetails.Month}M {MRDDetails.Days}D
                </Typography>
              </Grid>
            </Grid>

            <Grid item container display="flex">
              <Grid xs={6} item>
                <Typography fontWeight="bold" fontSize={12}>
                  Sex
                </Typography>
              </Grid>
              <Grid xs={6} item>
                <Typography fontSize={12}>
                 : {setGenderValue(MRDDetails.Gender).label}
                </Typography>
              </Grid>
            </Grid>

            <Grid item container display="flex">
              <Grid xs={6} item>
                <Typography fontWeight="bold" fontSize={12}>
                  Mobile No
                </Typography>
              </Grid>
              <Grid xs={6} item>
                <Typography fontSize={12}>: {MRDDetails.PhoneNo}</Typography>
              </Grid>
            </Grid>

            <Grid item container display="flex">
              <Grid xs={6} item>
                <Typography fontWeight="bold" fontSize={12}>
                  Company Name
                </Typography>
              </Grid>
              <Grid xs={6} item>
                <Typography fontSize={12}>: {MRDDetails.CompanyID == "110" ? "Ayushman" : "General"}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box marginY={1} width="100%">
          <Typography fontSize="10px">
            If there is any change in the address (both permanent &
            communication) or contact number from the previous admission / as
            given in the registration form, kindly mention below:
          </Typography>
          <br />
          <Box display="flex" width="100%" border="1px black dotted"></Box>
          <Box display="flex" width="100%" marginY={1} justifyContent="center">
            <Box
              display="flex"
              width="48%"
              border="1px black solid"
              padding={1}
              flexDirection="column"
            >
              <Box marginY={1}>
                <Typography fontWeight="bold" fontSize="12px">
                  (Bed allotments are made according to vacancy)
                </Typography>
              </Box>

              <Box marginY={1}>
                <Typography fontWeight="bold" fontSize="12px">
                  (Drugs and medications used in the hospital should be of the
                  hospital source only)
                </Typography>
              </Box>

              <Box marginY={1}>
                <Typography fontWeight="bold" fontSize="12px">
                  (All sorts of substance abuse including tobacco and pan
                  strictly prohibited in the hospital vicinity)
                </Typography>
              </Box>

              <Box marginY={1}>
                <Typography fontWeight="bold" fontSize="12px">
                  (Hospital and staff shall not be responsible for safety and
                  loss of individual properties)
                </Typography>
              </Box>

              <Box marginY={1}>
                <Typography fontWeight="bold" fontSize="12px">
                  (Cabin patients are billed at the respective cabin rates for
                  the period of their stay in the particular cabin)
                </Typography>
              </Box>

              <Box marginY={1}>
                <Typography fontWeight="bold" fontSize="12px">
                  (Visiting patients not allowed outside visiting hours){" "}
                </Typography>
              </Box>

              <Box marginY={1}>
                <Typography fontWeight="bold" fontSize="12px">
                  (Cheques not accepted for payment)
                </Typography>
              </Box>
            </Box>
            <Box
              display="flex"
              width="47%"
              borderTop="1px black solid"
              borderRight="1px black solid"
              borderBottom="1px black solid"
            //   borderLeft="0px"
              flexDirection="column"
              padding={1}
            >
              <Box>
                <Typography fontWeight="bold" fontSize="12px">
                  Provisional diagnosis :
                </Typography>
              </Box>

              <Box marginY={3}>
                <Typography fontWeight="bold" fontSize="12px">
                  Final diagnosis :
                </Typography>
              </Box>

              <Box marginY={4}>
                <Typography fontWeight="bold" fontSize="12px">
                  ICD code :
                </Typography>
              </Box>

              <Box marginY={2}>
                <Typography fontWeight="bold" fontSize="12px">
                  Date of discharge :
                </Typography>
              </Box>

              <Box marginY={3}>
                <Typography fontWeight="bold" fontSize="12px">
                  Consultant Name:
                </Typography>
              </Box>
            </Box>
          </Box>
          <Typography fontSize="10px" marginY={1}>
            I hereby knowingly express my consent for admission of “{MRDDetails.PatientName}” to
            Institute of Urology and Kidney Diseases (IUKD) and agree to allow
            doctor nurses and other staff employed by the hospital or
            consultants to attend to complete diagnostic and therapeutic
            procedures as deemed necessary according to my health conditions.
          </Typography>
          <Typography fontSize="10px" marginY={1}>
            I agree to pay fully for all the expenses incurred on behalf of the
            above-named person for services rendered by the Hospital and the
            consultant doctors, nurses and other staff caring for me/Patient
            during my/his/her treatment. I understand that I am financially
            responsible for all the balances that are not covered by my/his/her
            health insurance plan.{" "}
          </Typography>
          <Typography fontSize="10px" fontWeight="bold" marginY={1}>
            Hereby I declare that the above information provided by me is true
            to the best of my knowledge, and also, I have fully read and
            understood the Hospital’s rules and regulations.{" "}
          </Typography>
          <Box display="flex" width="100%" marginY={1} justifyContent="center">
            <Box display="flex" width="49%" flexDirection="column">
              <Box borderTop="0.5px black solid" borderLeft="0.5px black solid" display="flex" width="100%">
                <Typography fontSize="12px">
                  Signature of the patient:
                </Typography>
              </Box>
              <Box borderTop="1px black solid" borderLeft="0.5px black solid" display="flex" width="100%">
                <Typography fontSize="12px">Name (capital letters):</Typography>
              </Box>

              <Box borderTop="1px black solid" borderLeft="0.5px black solid" display="flex" width="100%">
                <Typography fontSize="12px">Relationship:</Typography>
              </Box>

              <Box borderTop="1px black solid" borderLeft="0.5px black solid" display="flex" width="100%">
                <Typography fontSize="12px">Address :</Typography>
              </Box>

              <Box borderTop="1px black solid" borderLeft="0.5px black solid" display="flex" width="100%">
                <Typography fontSize="12px">Contact :</Typography>
              </Box>
              <Box borderTop="1px black solid" borderLeft="0.5px black solid" borderBottom="0.5px black solid" display="flex" width="100%">
                <Typography fontSize="12px">Date & time :</Typography>
              </Box>
            </Box>

            <Box display="flex" width="49%" flexDirection="column">
              <Box borderTop="0.5px black solid" borderLeft="0.5px black solid" borderRight="1px black solid" display="flex" width="100%">
                <Typography fontSize="12px">
                  Signature of the patient:
                </Typography>
              </Box>
              <Box borderTop="1px black solid" borderLeft="0.5px black solid" borderRight="1px black solid" display="flex" width="100%">
                <Typography fontSize="12px">Name (capital letters):</Typography>
              </Box>

              <Box borderTop="1px black solid" borderLeft="0.5px black solid" borderRight="1px black solid" display="flex" width="100%">
                <Typography fontSize="12px">Relationship:</Typography>
              </Box>

              <Box borderTop="1px black solid" borderLeft="0.5px black solid" borderRight="1px black solid" display="flex" width="100%">
                <Typography fontSize="12px">Address :</Typography>
              </Box>

              <Box borderTop="1px black solid" borderLeft="0.5px black solid" borderRight="1px black solid" display="flex" width="100%">
                <Typography fontSize="12px">Contact :</Typography>
              </Box>
              <Box borderTop="1px black solid" borderLeft="0.5px black solid"  borderRight="1px black solid" borderBottom="0.5px black solid" display="flex" width="100%">
                <Typography fontSize="12px">Date & time :</Typography>
              </Box>
            </Box>
          </Box>
          <br/>
          <br/>
          <br/>
          <Grid display="flex" width="100vw" justifyContent="end" position="absolute" top="980px" >
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography fontSize={14} fontWeight="bold">(Signature)</Typography>
            <Typography fontSize={14}><b>By:</b> {MRDDetails.FirstName}</Typography>
          </Box>
        </Grid>
        </Box>
      </Grid>
    </>
  );
};
