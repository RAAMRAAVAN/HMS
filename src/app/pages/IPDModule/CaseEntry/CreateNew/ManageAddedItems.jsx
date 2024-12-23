import { useDispatch, useSelector } from "react-redux"
import { assignDiscountP, calculateDiscount, clearCaseEntries, selectCaseEntryItems } from "@/src/lib/features/IPDCaseEntry/IpdCaseEntrySlice";
import { AddedItems } from "./AddedItems"
import { Button, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
export const ManageAddedItems = (props) => {
  const dispatch = useDispatch();
  const {IPDID, date, time, UserID, UserName, handleClose, fetchIPDCaseEntry} = props;
  const Entries = useSelector(selectCaseEntryItems);
  const [TotalRate, setTotalRate] = useState(0);
  const [TotalGST, setTotalGST] = useState(0);
  const [TotalAmount, setTotalAmount] = useState(0);
  const [TotalDiscount, setTotalDiscount] = useState(0);
  const [DiscountP, setDiscountP] = useState(0);
  const [recAmount, setRecAmount] = useState(0);
  const [enableBank, setEnableBank] = useState(false);
  const [paymentMethod, setpaymentMethod] = useState("CR");
  const [bank, setBank] = useState("65");
  const [trnID, setTrnID] = useState("");
  const [remark, setRemark] = useState("");
  console.log("Manage Entries=", Entries);

  const handlePrintClick = (ReceiptID) => {
    console.log("print");
    const url = `/pages/IPDModule/CaseEntry?ReceiptID=${ReceiptID}`;
    window.open(url, "_blank"); // Opens in a new tab
  };

  const CalculateCharges = () => {
    setTotalRate(Entries.reduce((acc, Entry)=>{return(acc+ Number(Entry.Rate))}, 0));
    setTotalGST(0);
    setTotalAmount(Entries.reduce((acc, Entry)=>{return(acc+ Number(Entry.Amount))}, 0));
    setTotalDiscount(Entries.reduce((acc, Entry)=>{return(acc+ Number(Entry.Discount))}, 0))
    setRecAmount(Entries.reduce((acc, Entry)=>{return(acc+ (Number(Entry.Amount) - Number(Entry.Discount)))}, 0))
  }
  useEffect(() => {
    const UpdateBankMenu = () => {
      switch (paymentMethod) {
        case "C":
          setEnableBank(false);
          break;
        case "CR":
          setEnableBank(false);
          break;
        case "B":
          setEnableBank(false);
          break;
        default:
          setEnableBank(true);
      }
    };
    UpdateBankMenu();
  }, [paymentMethod]);

  useEffect(()=>{
    CalculateCharges();
  },[Entries])

  useEffect(()=>{
    if(DiscountP >= 0)
      dispatch(assignDiscountP({DiscountP: Number(DiscountP)}));
      dispatch(calculateDiscount({DiscountP: DiscountP}));
  }, [DiscountP]);

  const CreateCaseEntry = async(printFlag) => {
    try{
      let result = await axios.post("http://localhost:5000/createCaseEntry", {IPDID: IPDID, Rate: TotalRate, Discount: TotalDiscount, Amount: TotalAmount, NetAmount: TotalAmount - TotalDiscount, RecAmount: (paymentMethod === "CR")? 0: recAmount, date: date, time: time, UserID: UserID, UserName: UserName, Entries: Entries, paymentMethod: paymentMethod, bank: bank, trnID: trnID, Remark: remark});
      console.log("result=", result.data.result);
      if(result.data.result >= 1 ){
        dispatch(clearCaseEntries());
        handleClose();
        fetchIPDCaseEntry();
        if(printFlag === 1)
          handlePrintClick(result.data.CaseID)
        // alert("Created");
      }
    }catch(err){
      alert(err);
    }
  }
  return (<><Grid item display="flex" width="100%" marginY={1}>
    <Grid item xs={2}>
      <Typography fontSize={12} fontWeight="bold">
        Total Rate
      </Typography>
      <TextField
        placeholder="Amount"
        size="small"
        value={TotalRate}
        onChange={(e) => {
          // setAmount(e.target.value);
        }}
        // disabled
        fontSize={12}
      />
    </Grid>

    <Grid item xs={2}>
      <Typography fontSize={12} fontWeight="bold">
        Total GST
      </Typography>
      <TextField
        placeholder="Amount"
        size="small"
        value={TotalGST}
        onChange={(e) => {
          // setAmount(e.target.value);
        }}
        // disabled
        fontSize={12}
      />
    </Grid>

    <Grid item xs={2}>
      <Typography fontSize={12} fontWeight="bold">
        Total Amount
      </Typography>
      <TextField
        placeholder="Amount"
        size="small"
        value={TotalAmount}
        onChange={(e) => {
          // setAmount(e.target.value);
        }}
        // disabled
        fontSize={12}
      />
    </Grid>

    <Grid item xs={2}>
      <Typography fontSize={12} fontWeight="bold">
        Discount %
      </Typography>
      <TextField
        placeholder="Amount"
        size="small"
        value={DiscountP}
        onChange={(e) => {
          setDiscountP(e.target.value);
        }}
        // disabled
        fontSize={12}
      />
    </Grid>

    <Grid item xs={2}>
      <Typography fontSize={12} fontWeight="bold">
        Total Discount
      </Typography>
      <TextField
        placeholder="Amount"
        size="small"
        value={TotalDiscount}
        onChange={(e) => {
          // setAmount(e.target.value);
        }}
        // disabled
        fontSize={12}
      />
    </Grid>

    <Grid item xs={2}>
      <Typography fontSize={12} fontWeight="bold">
        Grand Total
      </Typography>
      <TextField
        placeholder="Amount"
        size="small"
        value={Number(TotalAmount) - Number(TotalDiscount)}
        onChange={(e) => {
          // setAmount(e.target.value);
        }}
        // disabled
        fontSize={12}
      />
    </Grid>
</Grid>
<Grid item display="flex" width="100%" marginY={1}>
    <Grid item xs={2} >
      <Typography fontSize={12} fontWeight="bold">
        Receive Amount
      </Typography>
      <TextField
        placeholder="Receive Amount"
        size="small"
        fontSize={12}
        value={paymentMethod === "CR"? 0: recAmount}
        onChange={(e) => {
          setRecAmount(e.target.value);
        }}
        disabled={paymentMethod === "CR"? true: false}
      />
    </Grid>
    <Grid item xs={2} marginLeft={1}>
      <Typography fontSize={12} fontWeight="bold">
        MOD
      </Typography>
      <Select
        style={{ display: "flex", width: "100%" }}
        value={paymentMethod}
        label="Payment Method"
        onChange={(event) => {
          setpaymentMethod(event.target.value);
        }}
        size="small"
      >
        <MenuItem value="C">Cash</MenuItem>
        <MenuItem value="CA">Card</MenuItem>
        <MenuItem value="CH">UPI</MenuItem>
        <MenuItem value="NB">Net Banking</MenuItem>
        <MenuItem value="B">BTC</MenuItem>
        <MenuItem value="CR">Credit</MenuItem>
      </Select>
    </Grid>
    <Grid item xs={2} marginLeft={1}>
      <Typography fontSize={12} fontWeight="bold">
        Bank Name
      </Typography>
      <Select
        style={{ display: "flex", width: "100%" }}
        value={bank}
        label="Payment Method"
        onChange={(event) => {
          setBank(event.target.value);
        }}
        size="small"
        disabled={!enableBank}
      >
        <MenuItem value="65">ICICI Bank</MenuItem>
        <MenuItem value="63">HDFC Bank</MenuItem>
      </Select>
    </Grid>
    <Grid item xs={2} marginLeft={1}>
      <Typography fontSize={12} fontWeight="bold">
        Trans No
      </Typography>
      <TextField
        placeholder="0000"
        size="small"
        value={trnID}
        onChange={(e) => {
          setTrnID(e.target.value);
        }}
        disabled={!enableBank}
        fontSize={12}
      />
    </Grid>
  </Grid>
    <Grid container display="flex" width="100%">
      <Typography fontSize={12} fontWeight="bold">
        Remark:{" "}
      </Typography>
      <TextField
        fullWidth
        fontSize={12}
        value={remark}
        onChange={(e) => {
          setRemark(e.target.value);
        }}
        size="small"
      />
    </Grid>
    <Grid container marginTop={5}>
      <Button variant="contained" 
      onClick={() => {
        CreateCaseEntry(0); handleClose();
      }} 
      disabled={Entries.length === 0 ? true : false}
      > Save</Button>
      <Button
        variant="contained"
        onClick={() => {
          CreateCaseEntry(1); handleClose();
        }} 
        style={{ marginLeft: "10px" }}
        disabled={Entries.length === 0 ? true : false}
      >
        Save & Print
      </Button>
    </Grid></>)
}