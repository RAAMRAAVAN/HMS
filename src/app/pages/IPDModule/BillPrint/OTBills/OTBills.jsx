import { Box, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { AssistantSurgeon } from "./AssistantSurgeon";
import { AnesthesiaCharge } from "./AnesthesiaCharge";
import { OTServiceCharge } from "./OTServiceCharge";
import { useDispatch, useSelector } from "react-redux";
import { selectItemDiscountAnesthesia, selectItemDiscountAssistant, setItemDiscountOT } from "@/src/lib/features/otDiscount/otDiscountSlice";
// import { SET_TOTAL_OTBILL } from "../../../../redux/ipdBill/ipdBillTypes";
// import { setItemDiscountOT } from "";
// import { formatDateTime } from "../SelectValues";

export const OTBills = (props) => {
  const dispatch = useDispatch();
  let { IPDID, setBillAmountOTBill, setDiscountOTBill , setTotalOTBill} = props;
  // console.log("OT IPDNO", IPDID);
  const [OTBills, setOTBils] = useState([]);
  // let ItemDiscountAssistant=0
  let ItemDiscountAssistant = useSelector(selectItemDiscountAssistant);
  // let ItemDiscountAnesthesia=0;
  let ItemDiscountAnesthesia = useSelector(selectItemDiscountAnesthesia);
  const getOTBills = async (data) => {
    try {
      const response = await axios.post("http://192.168.1.32:5000/fetchOTBills", {
        IPDID: data,
      });
      console.log("OT BIlls", response.data.OTBills);
      setOTBils(response.data.OTBills);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (IPDID != undefined) getOTBills(props.IPDID);
  }, [IPDID]);

  useEffect(() => {

    setTotalOTBill(Number(
      ItemDiscountAssistant.reduce(
        (acc, currentValue) => acc + currentValue,
        0
      )
    ) +
      Number(
        ItemDiscountAnesthesia.reduce(
          (acc, currentValue) => acc + currentValue,
          0
        )
      ) +
      OTBills.reduce(
        (acc, otbill) =>
          acc +
          (Number(otbill.BalanceAmount) + (Number(otbill.SurDrDiscountPer) / 100) *
            Number(otbill.SurDrCharge) +
            Number(otbill.DiscountRs)),
        0
      ))
    setDiscountOTBill(
      Number(
        ItemDiscountAssistant.reduce(
          (acc, currentValue) => acc + currentValue,
          0
        )
      ) +
        Number(
          ItemDiscountAnesthesia.reduce(
            (acc, currentValue) => acc + currentValue,
            0
          )
        ) +
        OTBills.reduce(
          (acc, otbill) =>
            acc +
            ((Number(otbill.SurDrDiscountPer) / 100) *
              Number(otbill.SurDrCharge) +
              Number(otbill.DiscountRs)),
          0
        )
    );

    setBillAmountOTBill(OTBills.reduce((acc, otbill)=>acc + Number(otbill.BalanceAmount), 0))
  }, [ItemDiscountAssistant, ItemDiscountAnesthesia]);

  return OTBills.length === 0 ? null : (
    <>
      {OTBills.map((otbill, index) => {
        let ItemDiscountTemp = 0;
        return (
          <Box>
            <Typography
              fontWeight="bold"
              marginY={1}
              fontSize={14}
              display="flex"
              width="100vw"
            >
              OT Charges [{otbill.OTName}]
            </Typography>
            {otbill.SurgeonDoctorID != "" ? (
              <Grid container justifyContent="space-between">
                <Grid xs={6} item>
                  <Typography fontSize={12}>Primary Surgeon Charge</Typography>
                </Grid>
                <Grid xs={1} item>
                  <Typography fontSize={12}>{otbill.SurDrCharge}</Typography>
                </Grid>
                <Grid xs={1} item>
                  <Typography fontSize={12}>1</Typography>
                </Grid>
                <Grid xs={1} item>
                  <Typography fontSize={12}>{otbill.SurDrCharge}</Typography>
                </Grid>
                <Grid xs={1} item display="flex" justifyContent="end">
                  <Typography fontSize={12}>
                    {(otbill.SurDrDiscountPer / 100) * otbill.SurDrCharge}
                  </Typography>
                </Grid>
                <Grid xs={2} item display="flex" justifyContent="end">
                  <Typography fontSize={12}>{otbill.SurDrAmount}</Typography>
                </Grid>
              </Grid>
            ) : (
              <></>
            )}
            <AssistantSurgeon
              OTID={otbill.OTID}
              // ItemDiscountAssistant={ItemDiscountAssistant}
              index={index}
              // setItemDiscountAssistant={setItemDiscountAssistant}
            />
            
            <AnesthesiaCharge
              OTID={otbill.OTID}
              // setItemDiscountAnesthesia={setItemDiscountAnesthesia}
              index={index}
            />
            <OTServiceCharge
              OTID={otbill.OTID}
              setItemDiscountOT={setItemDiscountOT}
            />
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
                  <Typography fontSize={12}>Total For OT Charge:</Typography>
                </Grid>
                <Grid xs={1} item>
                  {/* <Typography fontSize={12}>Total For Consultant Fees:</Typography> */}
                </Grid>
              </Grid>
              <Grid xs={1} item>
                <Typography fontSize={12}>
                  {(otbill.SurDrDiscountPer / 100) * otbill.SurDrCharge +
                    otbill.BalanceAmount +
                    Number(ItemDiscountAssistant[index]) +
                    Number(ItemDiscountAnesthesia[index]) +
                    Number(otbill.DiscountRs.toFixed(2))}
                </Typography>
              </Grid>
              <Grid xs={2} item display="flex" justifyContent="center">
                <Typography fontSize={10}>
                  [
                  {ItemDiscountAssistant[index] +
                    ItemDiscountAnesthesia[index] +
                    (otbill.SurDrDiscountPer / 100) * otbill.SurDrCharge}
                  + {otbill.DiscountRs.toFixed(2)}]
                  {(otbill.SurDrDiscountPer / 100) * otbill.SurDrCharge +
                    Number(ItemDiscountAssistant[index]) +
                    Number(ItemDiscountAnesthesia[index]) +
                    Number(otbill.DiscountRs.toFixed(2))}
                </Typography>
              </Grid>
              <Grid xs={1} item display="flex" justifyContent="end">
                <Typography fontSize={12}>
                  {otbill.BalanceAmount}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        );
      })}
    </>
  );
};
