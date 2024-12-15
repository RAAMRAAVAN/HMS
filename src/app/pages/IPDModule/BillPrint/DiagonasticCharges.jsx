import { Box, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { formatDateTime } from "../SelectValues";

export const DiagonasticCharges = (props) => {
  let { IPDID, setTotalDiagonasticCharge, setDiscountDiagonasticCharge, setBillAmountDiagonasticCharge} = props;
  const [diagonasticCharges, setDiagonasticCharges] = useState([]);
  console.log("DiagonasticCharges=", diagonasticCharges);
  const [balanceAmount, setBalanceAmount] = useState(0);
  const [finalDiscount, setFinalDiscount] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  let temp1 = 0;
  let discCalc = 0;
  const getDiagonasticCharges = async (data) => {
    try {
      const response = await axios.post(
        "http://192.168.1.32:5000/fetchDiagonasticCharges",
        { IPDID: data }
      );
      setDiagonasticCharges(response.data.DiagonasticCharges);
      setBalanceAmount(response.data.GrossAmount[0].BalanceAmount);
      setFinalDiscount(response.data.GrossAmount[0].FinalDiscount);
      setGrandTotal(response.data.GrossAmount[0].GrandTotal);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (IPDID != undefined) getDiagonasticCharges(props.IPDID);
  }, [IPDID]);
  console.log("diagonasticChargesL=", diagonasticCharges.length);
  return diagonasticCharges.length === 0?(null):(
    <>
      <Typography fontWeight="bold" marginY={1} fontSize={14}>
        DIAGONASTIC CHARGE
      </Typography>
      {diagonasticCharges.map((diagonasticCharge, index) => {
        // totalNetAmount = totalNetAmount + pharmacyBill.GrossAmount;
        temp1 = 0;
        return (
          <>
            <Grid container justifyContent="space-between">
              <Grid xs={5} item>
                <Typography fontWeight="bold" marginY={1} fontSize={13}>
                  {diagonasticCharge.SubDepartmentName}
                </Typography>
              </Grid>
            </Grid>

            {diagonasticCharge.services.map((SubDept, index) => {
              if (index != 0)
                temp1 = diagonasticCharge.services[index - 1].CaseNo;
              discCalc += SubDept.DiscountAmount;
              return (
                <>
                  {temp1 !== SubDept.CaseNo ? (
                    <Grid container justifyContent="space-between">
                      <Grid xs={5} item>
                        <Typography fontSize={12} fontWeight="bold">
                          [{SubDept.CaseNo}]{" "}
                        </Typography>
                      </Grid>
                    </Grid>
                  ) : null}
                  <Grid container justifyContent="space-between">
                    <Grid xs={6} item>
                      <Typography fontSize={12}>
                        {SubDept.ServiceName}
                      </Typography>
                    </Grid>
                    <Grid xs={1} item>
                      <Typography fontSize={12}>{SubDept.Rate}</Typography>
                    </Grid>
                    <Grid xs={1} item>
                      <Typography fontSize={12}>{SubDept.Qty}</Typography>
                    </Grid>
                    <Grid xs={1} item>
                      <Typography fontSize={12}>{SubDept.Rate}</Typography>
                    </Grid>
                    <Grid xs={1} item display="flex" justifyContent="end">
                      <Typography fontSize={12}>
                        {SubDept.DiscountAmount}
                      </Typography>
                    </Grid>
                    <Grid xs={2} item display="flex" justifyContent="end">
                      <Typography fontSize={12}>{SubDept.Amount}</Typography>
                    </Grid>
                  </Grid>
                </>
              );
            })}
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
            <Typography fontSize={12}>Total For Diagonastic Fees:</Typography>
          </Grid>
          <Grid xs={1} item>
            {/* <Typography fontSize={12}>Total For Consultant Fees:</Typography> */}
          </Grid>
        </Grid>
        <Grid xs={1} item>
          <Typography fontSize={12}>{setTotalDiagonasticCharge(grandTotal)}{grandTotal}</Typography>
        </Grid>
        <Grid xs={2} item display="flex" justifyContent="center">
          {discCalc === grandTotal - balanceAmount?<Typography fontSize={12}>{discCalc}</Typography>:<Typography fontSize={12}>[{discCalc} + {(grandTotal - balanceAmount-discCalc).toFixed(2)}] {(grandTotal - balanceAmount).toFixed(2)}{setDiscountDiagonasticCharge(grandTotal - balanceAmount)}</Typography>}
          
        </Grid>
        <Grid xs={1} item display="flex" justifyContent="end">
          <Typography fontSize={12}>{setBillAmountDiagonasticCharge(balanceAmount)}{balanceAmount}</Typography>
        </Grid>
      </Grid>
    </>
  );
};
