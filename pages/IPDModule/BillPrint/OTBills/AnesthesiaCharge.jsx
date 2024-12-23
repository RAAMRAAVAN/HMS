import { Box, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setItemDiscountAnesthesia } from "../../../../redux";
// import { formatDateTime } from "../SelectValues";

export const AnesthesiaCharge = (props) => {
  let { OTID, index} = props;
  const dispatch = useDispatch();
  console.log("OT IPDNO", OTID);
  const [AnesthesiaCharge, setAnesthesiaCharge] = useState([]);
  let totalNetAmount = 0;
  let temp1 = 0;
  const fetchAnesthesiaCharge = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/fetchAnesthesiaCharge", {
        OTID: data,
      });
      console.log("OT BIlls", response.data.AnesthesiaCharge);
      setAnesthesiaCharge(response.data.AnesthesiaCharge);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (OTID != undefined) fetchAnesthesiaCharge(props.OTID);
  }, [OTID]);

  useEffect(() => {
    let totalDiscount = 0;
  
    AnesthesiaCharge.forEach((Anesthesia) => {
        // console.log("AssistantSurgeon.OtherSurgDiscount=", AssistantSurgeon.OtherSurgDiscount)
      if (Anesthesia.AnethesiaDiscount > 0) {
        totalDiscount += (Anesthesia.AnethesiaDiscount/100*Anesthesia.AnethesiaRate)
      }
    });
    dispatch(setItemDiscountAnesthesia(totalDiscount, index))
    // setItemDiscountAnesthesia((prevValue) => {
    //   const newValue = [...prevValue];
    //   newValue[index] = totalDiscount;
    //   return(newValue);
    // });
    console.log("AnethesiaRate", totalDiscount)
  }, [AnesthesiaCharge]); // This useEffect runs whenever OTBills changes

  return AnesthesiaCharge.length === 0 ? null : (
    <>
      {AnesthesiaCharge.map((Anesthesia, index) => {
        return (
          <Box >
            {Anesthesia.SurgeonDoctorID != ''?<Grid container justifyContent="space-between">
              <Grid xs={6} item>
                <Typography fontSize={12}>Anesthesia Charge {AnesthesiaCharge.length > 1? `[${index +1}]` : <></>}</Typography>
              </Grid>
              <Grid xs={1} item>
                <Typography fontSize={12}>{Anesthesia.AnethesiaRate}</Typography>
              </Grid>
              <Grid xs={1} item>
                <Typography fontSize={12}>1</Typography>
              </Grid>
              <Grid xs={1} item>
                <Typography fontSize={12}>{Anesthesia.AnethesiaRate}</Typography>
              </Grid>
              <Grid xs={1} item display="flex" justifyContent="end">
                <Typography fontSize={12}>{(Anesthesia.AnethesiaDiscount/100*Anesthesia.AnethesiaRate)}</Typography>
              </Grid>
              <Grid xs={2} item display="flex" justifyContent="end">
                <Typography fontSize={12}>{Anesthesia.AnethesiaAmount}</Typography>
              </Grid>
            </Grid>:<></>}
            
          </Box>
        );
      })}
    </>
  );
};
