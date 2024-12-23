import { Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { formatDateTime } from "../SelectValues";

export const MedicalServices = (props) => {
  let { IPDNo, setTotalMedicalServices, setDiscountMedicalServices,setBillAmountMedicalServices } = props;
  const [medicalServices, setMedicalServices] = useState([]);
  let totalNetAmount=0;
  let totalAmount = 0;
  let temp1=0;
  const getMedicalServices = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/fetchOtherServices",
        { IPDNo: data }
      );
      setMedicalServices(response.data.otherServices);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (IPDNo != undefined) getMedicalServices(props.IPDNo);
  }, [IPDNo]);
  return medicalServices.length === 0? (null):(
    <>
      <Typography fontWeight="bold" marginY={1} fontSize={14}>
        MEDICAL SERVICE
      </Typography>
      {medicalServices.length >0? medicalServices.map((medicalService, index) => {
        if (index != 0) temp1 = medicalServices[index - 1].OCNO;
        totalNetAmount = totalNetAmount + medicalService.NetAmount;
        totalAmount = totalAmount + medicalService.GrossAmount;
        return (
          <>
            {temp1 !== medicalService.OCNO ? (
              <Grid container justifyContent="space-between">
                <Grid xs={5} item>
                  <Typography fontSize={12} fontWeight="bold">[{medicalService.OCNO}] </Typography>
                </Grid>
              </Grid>
            ) : null}

            <Grid container justifyContent="space-between">
              <Grid xs={6} item>
                <Typography fontSize={12}>{medicalService.ServiceName}</Typography>
              </Grid>
              <Grid xs={1} item>
                <Typography fontSize={12}>{medicalService.Rate}</Typography>
              </Grid>
              <Grid xs={1} item>
                <Typography fontSize={12}>{medicalService.Qty}</Typography>
              </Grid>
              <Grid xs={1} item>
                <Typography fontSize={12}>{medicalService.NetAmount}</Typography>
              </Grid>
              <Grid xs={1} item display="flex" justifyContent="end">
                <Typography fontSize={12}>{medicalService.Discount}</Typography>
              </Grid>
              <Grid xs={2} item display="flex" justifyContent="end">
                <Typography fontSize={12}>{medicalService.GrossAmount}</Typography>
              </Grid>
            </Grid>
          </>
        );
      }):null}
      <Grid container display="flex" marginTop={1} justifyContent="end">
        <Grid
          xs={8}
          paddingTop={1}
          item
          borderTop="2px black solid"
          display="flex"
          justifyContent="space-between"
        ></Grid>
      </Grid>

      <Grid
        container
        display="flex"
        marginbottom={1}
        justifyContent="space-between"
      >
        <Grid xs={8} container item display="flex" justifyContent="end">
          <Grid xs={4} item>
            <Typography fontSize={12}>Total For Medical Services Fees:</Typography>
          </Grid>
          <Grid xs={1} item>
            {/* <Typography fontSize={12}>Total For Consultant Fees:</Typography> */}
          </Grid>
        </Grid>
        <Grid xs={1} item>
          <Typography fontSize={12}>{setTotalMedicalServices(Number(totalNetAmount))}{totalNetAmount}</Typography>
        </Grid>
        <Grid xs={2} item display="flex" justifyContent="center">
          <Typography fontSize={12}>{setDiscountMedicalServices(totalNetAmount - totalAmount)}{totalNetAmount - totalAmount}</Typography>
          
        </Grid>
        <Grid xs={1} item display="flex" justifyContent="end">
          <Typography fontSize={12}> {setBillAmountMedicalServices(Number(totalAmount))} {totalAmount}</Typography>
        </Grid>
      </Grid>
    </>
  );
};
