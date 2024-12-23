import { Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { formatDateTime, getDifferenceInHours } from "../SelectValues";

export const BedCharges = (props) => {
  let { IPAID, setTotalBedRent, setBillAmountBedRent } = props;
  
  const [BedCharges, setBedCharges] = useState([])
  const [totalNetAmount, setTotalNetAmount] = useState(0);
  let TotalNet = 0;
  let TotalBed = 0;
  setTotalBedRent(TotalNet)
  // const today = new Date().toISOString().split('T')[0]; 
  const [TDate, setTDate] = useState(formatDateTime(new Date()).Date);
  const [TTime, setTTime] = useState(formatDateTime(new Date()).Time);
  console.log("today=",TDate, TTime);
  const getBedCharges = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/fetchIPDBillDetails",
        { IPAID: data }
      );
      setBedCharges(response.data.BedCharges)
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if(IPAID != undefined)
        getBedCharges(props.IPAID)
  }, [IPAID]);

  // useEffect(()=>{
  //   console.log("Bed=", TotalNet)
  //   setTotalBedRent(TotalNet)
  // },[TotalNet])
  return BedCharges.length <= 1? (null):(
    <>
      <Typography fontWeight="bold" marginY={1} fontSize={14}>Bed Charges</Typography>
      {BedCharges.map((bedservice, index) => {
        console.log("difference=", getDifferenceInHours(bedservice.BedCheckIn, bedservice.BedCheckOut? bedservice.BedCheckOut: new Date())/24)
        let qty = Math.floor(getDifferenceInHours(bedservice.BedCheckIn, bedservice.BedCheckOut? bedservice.BedCheckOut : new Date())/24)
        qty = bedservice.BedCheckOut? qty: qty+1;
        let totalBedRent = bedservice.BedRate * qty;
        TotalBed = TotalBed + totalBedRent
        let totalNetAmount = bedservice.Amount * qty;
        TotalNet = TotalNet + totalNetAmount;

        // setTotalNetAmount(totalNetAmount +  (totalNetAmount))
        return(<Grid container justifyContent="space-between" >
          <Grid xs={6} item>
            <Typography fontSize={12}>{bedservice.ServiceName} [{bedservice.WardName}]</Typography>
          </Grid>
          <Grid xs={1} item>
            <Typography fontSize={12}>{bedservice.BedRate}</Typography>
          </Grid>
          <Grid xs={1} item>
            <Typography fontSize={12}>{qty}</Typography>
          </Grid>
          <Grid xs={1} item>
            <Typography fontSize={12}>{bedservice.BedRate * qty}</Typography>
          </Grid>
          <Grid xs={1} item>
            {/* <Typography>{bedservice.DiscAmount}</Typography> */}
          </Grid>
          <Grid xs={2} item display="flex" justifyContent="end">
            <Typography fontSize={12}>{bedservice.Amount * qty}</Typography>
          </Grid>
        </Grid>)
      })}
      <Grid container display="flex" marginTop={1} justifyContent="end">
        <Grid xs={8} paddingTop={1} item borderTop="2px black solid" display="flex" justifyContent="space-between">
        </Grid>
      </Grid>  
      <Grid container display="flex" marginBottom={1} >
          <Grid xs={7} item display="flex" justifyContent="end" >
            <Typography fontSize={12} >Total For Bed Charges:</Typography>
          </Grid>
          <Grid xs={1} item >
            <Typography fontSize={12}></Typography>
          </Grid>
          <Grid xs={2} item >
            {/* <Typography>{bedservice.DiscAmount}</Typography> */}
          </Grid>
          <Grid xs={2} item display="flex" justifyContent="end" >
            <Typography fontSize={12}>{setTotalBedRent(TotalNet)}{setBillAmountBedRent(TotalNet)}{TotalNet}</Typography>
          </Grid>
      </Grid>
    </>
  );
};
