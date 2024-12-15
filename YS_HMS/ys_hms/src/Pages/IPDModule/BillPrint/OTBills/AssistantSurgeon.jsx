import { Box, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setItemDiscountAssistant } from "../../../../redux";
// import { formatDateTime } from "../SelectValues";

export const AssistantSurgeon = (props) => {
  let { OTID, index } = props;
  const dispatch = useDispatch();
  console.log("OT IPDNO", OTID);
  const [AssistantSurgeons, setAssistantSurgeons] = useState([]);
  let totalNetAmount = 0;
  let temp1 = 0;
  const fetchAssistantSurgeonCharge = async (data) => {
    try {
      const response = await axios.post("http://192.168.1.32:5000/fetchAssistantSurgeonCharge", {
        OTID: data,
      });
      console.log("OT BIlls", response.data.AssistantSurgeons);
      setAssistantSurgeons(response.data.AssistantSurgeons);
      // setItemDiscountAssistant(0);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (OTID != undefined) fetchAssistantSurgeonCharge(props.OTID);
  }, [OTID]);

  useEffect(() => {
    let totalDiscount = 0;
  
    AssistantSurgeons.forEach((AssistantSurgeon) => {
        // console.log("AssistantSurgeon.OtherSurgDiscount=", AssistantSurgeon.OtherSurgDiscount)
      if (AssistantSurgeon.OtherSurgDiscount > 0) {
        totalDiscount += AssistantSurgeon.OtherSurgDiscount/100*AssistantSurgeon.OtherSurgRate
      }
    });
    dispatch(setItemDiscountAssistant(totalDiscount, index));
    console.log("AssistantSurgeons", totalDiscount)
  }, [AssistantSurgeons]); // This useEffect runs whenever OTBills changes
  
  return AssistantSurgeons.length === 0 ? null : (
    <>
      {AssistantSurgeons.map((AssistantSurgeon, index) => {
        return (
          <Box >
            {AssistantSurgeon.SurgeonDoctorID != ''?<Grid container justifyContent="space-between">
              <Grid xs={6} item>
                <Typography fontSize={12}>Assistant Surgeon Charge {AssistantSurgeons.length > 1? `[${index +1}]` : <></>}</Typography>
              </Grid>
              <Grid xs={1} item>
                <Typography fontSize={12}>{AssistantSurgeon.OtherSurgRate}</Typography>
              </Grid>
              <Grid xs={1} item>
                <Typography fontSize={12}>1</Typography>
              </Grid>
              <Grid xs={1} item>
                <Typography fontSize={12}>{AssistantSurgeon.OtherSurgRate}</Typography>
              </Grid>
              <Grid xs={1} item display="flex" justifyContent="end">
                <Typography fontSize={12}>{(AssistantSurgeon.OtherSurgDiscount/100*AssistantSurgeon.OtherSurgRate)}</Typography>
              </Grid>
              <Grid xs={2} item display="flex" justifyContent="end">
                <Typography fontSize={12}>{AssistantSurgeon.OtherSurgAmount}</Typography>
              </Grid>
            </Grid>:<></>}
          </Box>
        );
      })}
    </>
  );
};
