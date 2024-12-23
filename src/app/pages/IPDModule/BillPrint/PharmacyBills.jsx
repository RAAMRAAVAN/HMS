import { Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { formatDateTime } from "../SelectValues";

export const PharmacyBills = (props) => {
  let { IPAID, setTotalPharmacyBill, setBillAmountPharmacyBill } = props;
  const [pharmacyBills, setPharmacyBills] = useState([]);
  const [grossAmount, setGrossAmount] = useState(0);
  let temp1=0;
  const getPharmacyBills = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/fetchPharmacyBills",
        { IPDID: data }
      );
      setPharmacyBills(response.data.pharmacyBills);
      setGrossAmount(response.data.GrossAmount[0].GrossAmount);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (IPAID != undefined) getPharmacyBills(props.IPAID);
  }, [IPAID]);
  return pharmacyBills.length === 0? (null):(
    <>
      <Typography fontWeight="bold" marginY={1} fontSize={14}>
        PHARMCY BILL
      </Typography>
      {pharmacyBills.map((pharmacyBill, index) => {
        if (index != 0) temp1 =pharmacyBills[index - 1].InvoiceNo;
        // totalNetAmount = totalNetAmount + pharmacyBill.GrossAmount;
        return (
          <>
            {temp1 !== pharmacyBill.InvoiceNo ? (
              <Grid container justifyContent="space-between">
                <Grid xs={5} item>
                  <Typography fontSize={12} fontWeight="bold">[{pharmacyBill.InvoiceNo}] </Typography>
                </Grid>
              </Grid>
            ) : null}

            <Grid container justifyContent="space-between">
              <Grid xs={5} item>
                <Typography fontSize={12}>{pharmacyBill.ItemName}</Typography>
              </Grid>
              <Grid xs={1} item>
                <Typography fontSize={12}>{pharmacyBill.Rate}</Typography>
              </Grid>
              <Grid xs={1} item>
                <Typography fontSize={12}>{pharmacyBill.Qty}</Typography>
              </Grid>
              <Grid xs={1} item>
                <Typography fontSize={12}>{pharmacyBill.TotAmt}</Typography>
              </Grid>
              <Grid xs={1} item>
                <Typography fontSize={12}>{pharmacyBill.Disc}</Typography>
              </Grid>
              <Grid xs={2} item display="flex" justifyContent="end">
                <Typography fontSize={12}>{pharmacyBill.TotAmt}</Typography>
              </Grid>
            </Grid>
          </>
        );
      })}
      <Grid container display="flex" marginTop={1} justifyContent="end">
        <Grid xs={8} paddingTop={1} item borderTop="2px black solid" display="flex" justifyContent="space-between">
        </Grid>
      </Grid> 
      <Grid container display="flex" marginBottom={1} >
          <Grid xs={7} item display="flex" justifyContent="end" >
            <Typography fontSize={12} >Total For Pharmacy Bills:</Typography>
          </Grid>
          <Grid xs={1} item >
            <Typography fontSize={12}></Typography>
          </Grid>
          <Grid xs={2} item >
            {/* <Typography>{bedservice.DiscAmount}</Typography> */}
          </Grid>
          <Grid xs={2} item display="flex" justifyContent="end" >
            <Typography fontSize={12}>{setTotalPharmacyBill(grossAmount)} {setBillAmountPharmacyBill(grossAmount)} {grossAmount}</Typography>
          </Grid>
      </Grid>
    </>
  );
};
