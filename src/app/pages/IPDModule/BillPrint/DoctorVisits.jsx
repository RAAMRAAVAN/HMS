import { Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { formatDateTime } from "../SelectValues";

export const DoctorVisit = (props) => {
  let { IPAID, setTotalConsultantFees, setDiscountConsultantFees,  setBillAmountConsultantFees} = props;
  const [doctorVisits, setDoctorVisits] = useState([]);
  const [TotalNetAmount2, setTotalNetAmount] = useState(0);
  const [TotalDiscount, setTotalDiscount] = useState(0);
  const [TotalAmount, setTotalAmount] = useState(0);
  let temp1=0;
  const getDoctorVisits = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/fetchDoctorVisits",
        { IPAID: data }
      );
      setDoctorVisits(response.data.doctorVisits);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (IPAID != undefined) getDoctorVisits(props.IPAID);
  }, [IPAID]);

  useEffect(()=>{
    setTotalNetAmount(doctorVisits.reduce((acc, visit)=>{return(acc+ visit.Amount)}, 0));
    setTotalDiscount(doctorVisits.reduce((acc, visit)=>{return(acc+ (visit.Discount/100*(visit.Rate * visit.NoOfVisit)))}, 0));
    setTotalAmount(doctorVisits.reduce((acc, visit)=>{return(acc+ (visit.Rate * visit.NoOfVisit))}, 0));
  },[doctorVisits])
  return doctorVisits.length === 0? (null):(
    <>
      <Typography fontWeight="bold" marginY={1} fontSize={14}>
        CONSULTANT FEES
      </Typography>
      {doctorVisits.map((doctorVisit, index) => {
        if (index != 0) temp1 = doctorVisits[index - 1].ReceiptNo;
        return (
          <>
            {temp1 !== doctorVisit.ReceiptNo ? (
              <Grid container justifyContent="space-between">
                <Grid xs={5} item>
                  <Typography fontSize={12} fontWeight="bold">[{doctorVisit.ReceiptNo}]  {formatDateTime(doctorVisit.ReceiptDate).Date}</Typography>
                </Grid>
              </Grid>
            ) : null}

            <Grid container justifyContent="space-between">
              <Grid xs={6} item>
                <Typography fontSize={12}>{doctorVisit.DoctorName}</Typography>
              </Grid>
              <Grid xs={1} item>
                <Typography fontSize={12}>{doctorVisit.Rate}</Typography>
              </Grid>
              <Grid xs={1} item>
                <Typography fontSize={12}>{doctorVisit.NoOfVisit}</Typography>
              </Grid>
              <Grid xs={1} item>
                <Typography fontSize={12}>{doctorVisit.Rate * doctorVisit.NoOfVisit}</Typography>
              </Grid>
              <Grid xs={1} item>
                <Typography fontSize={12} display="flex" justifyContent="end">{doctorVisit.Discount/100*(doctorVisit.Rate * doctorVisit.NoOfVisit)}</Typography>
              </Grid>
              <Grid xs={2} item display="flex" justifyContent="end">
                <Typography fontSize={12}>{doctorVisit.Amount}</Typography>
              </Grid>
            </Grid>
          </>
        );
      })}

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
        marginBottom={1}
        justifyContent="space-between"
      >
        <Grid xs={8} container item display="flex" justifyContent="end">
          <Grid xs={4} item>
            <Typography fontSize={12}>Total For Consultant Fees:</Typography>
          </Grid>
          <Grid xs={1} item>
            {/* <Typography fontSize={12}>Total For Consultant Fees:</Typography> */}
          </Grid>
        </Grid>
        <Grid xs={1} item>
          <Typography fontSize={12}>{setTotalConsultantFees(Number(TotalAmount))}{TotalAmount}</Typography>
        </Grid>
        <Grid xs={2} item display="flex" justifyContent="center">
          <Typography fontSize={12}>{setDiscountConsultantFees(TotalDiscount)}{TotalDiscount}</Typography>
          
        </Grid>
        <Grid xs={1} item display="flex" justifyContent="end">
          <Typography fontSize={12}> {setBillAmountConsultantFees(Number(TotalNetAmount2))} {TotalNetAmount2}</Typography>
        </Grid>
      </Grid>
    </>
  );
};
