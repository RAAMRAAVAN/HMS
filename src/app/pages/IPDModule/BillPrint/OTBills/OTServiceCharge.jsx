import { Box, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
// import { formatDateTime } from "../SelectValues";

export const OTServiceCharge = (props) => {
  let { OTID, setItemDiscountOT } = props;
  console.log("OT IPDNO", OTID);
  const [OTServiceCharge, setOTServiceCharge] = useState([]);
  const fetchOTServiceCharge = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/fetchOTServiceCharge", {
        OTID: data,
      });
      console.log("OT BIlls", response.data.OTServiceCharge);
      setOTServiceCharge(response.data.OTServiceCharge);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (OTID != undefined) fetchOTServiceCharge(props.OTID);
  }, [OTID]);

  useEffect(() => {
    let totalDiscount = 0;
  
    OTServiceCharge.forEach((OTService) => {
        // console.log("AssistantSurgeon.OtherSurgDiscount=", AssistantSurgeon.OtherSurgDiscount)
      if (OTService.AnethesiaDiscount > 0) {
        totalDiscount += (Anesthesia.AnethesiaDiscount/100*Anesthesia.AnethesiaRate)
      }
    });
    setItemDiscountOT({OTDiscountAmount: totalDiscount});
    console.log("AnethesiaRate", totalDiscount)
  }, [OTServiceCharge]); // This useEffect runs whenever OTBills changes

  return OTServiceCharge.length === 0 ? null : (
    <>
        <Typography fontWeight="bold" marginY={1} fontSize={12} display="flex" width="100vw">
              OT Service Charges 
            </Typography>
      {OTServiceCharge.map((OTService, index) => {
        return (
          <Box >
            {OTService.SurgeonDoctorID != ''?<Grid container justifyContent="space-between">
              <Grid xs={6} item>
                <Typography fontSize={12}>{OTService.ServiceName}</Typography>
              </Grid>
              <Grid xs={1} item>
                <Typography fontSize={12}>{OTService.OTRate}</Typography>
              </Grid>
              <Grid xs={1} item>
                <Typography fontSize={12}>1</Typography>
              </Grid>
              <Grid xs={1} item>
                <Typography fontSize={12}>{OTService.OTRate}</Typography>
              </Grid>
              <Grid xs={1} item display="flex" justifyContent="end">
                <Typography fontSize={12}>0</Typography>
              </Grid>
              <Grid xs={2} item display="flex" justifyContent="end">
                <Typography fontSize={12}>{OTService.OTAmount}</Typography>
              </Grid>
            </Grid>:<></>}
            
          </Box>
        );
      })}
    </>
  );
};
