import { Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { setBankName, setMOP } from "../SelectValues";

export const MoneyReceipt = (props) => {
  const { IPDNo, setRecAmount, RecAmount} = props;
//   console.log()
  const [MoneyReceiptList, setMoneyReceiptList] = useState([]);
  const fetchIPDMoneyReceipts = async (input) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/fetchIPDMoneyReceipts",
        {
          IPDNo: input,
        }
      );
      setMoneyReceiptList(response.data.IPDMoneyReceiptList);
    //   console.log("MOD Data=", response.data.IPDMoneyReceiptList)
      setRecAmount(response.data.IPDMoneyReceiptList.reduce((acc, Receipt) =>{
        // console.log("RecAmount=",RecAmount);
        return(acc + Receipt.RecAmount)},0))
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    fetchIPDMoneyReceipts(IPDNo);
  }, []);
  return (
    <>
      <Grid container>
        <Grid item xs={2} border="1px black solid" paddingX={1}>
          <Typography fontSize={10} fontWeight="bold">
            R.Date
          </Typography>
        </Grid>
        <Grid item xs={2} border="1px black solid" paddingX={1}>
          <Typography fontSize={10} fontWeight="bold">
            Receipt No.
          </Typography>
        </Grid>
        <Grid item xs={2} border="1px black solid" paddingX={1}>
          <Typography fontSize={10} fontWeight="bold">
            Pay Mode.
          </Typography>
        </Grid>
        <Grid item xs={2} border="1px black solid" paddingX={1}>
          <Typography fontSize={10} fontWeight="bold">
            Pay Amount.
          </Typography>
        </Grid>
        <Grid item xs={1} border="1px black solid" paddingX={1}>
          <Typography fontSize={10} fontWeight="bold">
            Bank.
          </Typography>
        </Grid>
        <Grid item xs={1} border="1px black solid" paddingX={1}>
          <Typography fontSize={10} fontWeight="bold">
            TRNO.
          </Typography>
        </Grid>
        <Grid item xs={1} border="1px black solid" paddingX={1}>
          <Typography fontSize={10} fontWeight="bold">
            R.Type
          </Typography>
        </Grid>
      </Grid>
      {MoneyReceiptList.map((receipt, index) => {
        return (
          <Grid container>
            <Grid item xs={2} border="1px black solid" paddingX={1}>
              <Typography fontSize={10} >
                {receipt.ReceiptDate.split("T")[0]}
              </Typography>
            </Grid>
            <Grid item xs={2} border="1px black solid" paddingX={1}>
              <Typography fontSize={10} >
                {receipt.ReceiptID}
              </Typography>
            </Grid>
            <Grid item xs={2} border="1px black solid" paddingX={1}>
              <Typography fontSize={10} >
                {setMOP(receipt.MOD)}
              </Typography>
            </Grid>
            <Grid item xs={2} border="1px black solid" paddingX={1}>
              <Typography fontSize={10} >
                {receipt.RecAmount}
              </Typography>
            </Grid>
            <Grid item xs={1} border="1px black solid" paddingX={1}>
              <Typography fontSize={10} >
                {setBankName(receipt.BankID)}
              </Typography>
            </Grid>
            <Grid item xs={1} border="1px black solid" paddingX={1}>
              <Typography fontSize={10} >
                {receipt.AccountNo}
              </Typography>
            </Grid>
            <Grid item xs={1} border="1px black solid" paddingX={1}>
              <Typography fontSize={10} >
                {receipt.ReceiptType}
              </Typography>
            </Grid>
          </Grid>
        );
      })}
    </>
  );
};
