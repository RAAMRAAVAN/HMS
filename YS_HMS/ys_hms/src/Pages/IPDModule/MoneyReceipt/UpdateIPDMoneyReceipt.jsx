import {
  Box,
  Button,
  Grid,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  convertTimeFormat,
  convertTimeTo12HourFormat,
  extractTimeFromISO,
} from "../SelectValues";

export const UpdateIPDMoneyReceipt = (props) => {
  const { setUpdateOpen, updateOpen, IPDNo, ReceiptID } = props;
  const handlePrintClick = (ReceiptID) => {
    const url = `/IPD-MoneyReceipt-Print?ReceiptID=${ReceiptID}`;
    window.open(url, "_blank"); // Opens in a new tab
  };
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState(new Date().toTimeString().split(" ")[0]);
  const [MRDDetails, setMRDDetails] = useState({});
  const [AdmDate, setAdmDate] = useState();
  const [AdmTime, setAdmTime] = useState();
  const [amount, setAmount] = useState(0);
  const [recAmount, setRecAmount] = useState(0);
  const handleClose = () => setUpdateOpen(false);
  const [enableBank, setEnableBank] = useState(false);
  const [paymentMethod, setpaymentMethod] = useState("C");
  const [bank, setBank] = useState("65");
  const [trnID, setTrnID] = useState("");
  const [remark, setRemark] = useState("");
  console.log(
    "date",
    date,
    "time",
    time,
    "AdmDate",
    AdmDate,
    "AdmTime",
    extractTimeFromISO(MRDDetails.Time)
  );
  console.log(AdmDate + new Date(MRDDetails.Time).toTimeString().split(" ")[0]);
  const getMRDDetails = async (input) => {
    try {
      const response = await axios.post(
        "http://192.168.1.32:5000/fetchIPDPatientDetails",
        { IPDNo: input }
      );
      console.log("money=", response.data[0]);
      setMRDDetails(response.data[0]);
      setAdmDate(new Date(response.data[0].Date).toISOString().split("T")[0]);
      setAdmTime(
        convertTimeTo12HourFormat(
          new Date(response.data[0].Time).toTimeString().split(" ")[0]
        )
      );

    } catch (error) {
      alert("DB Error");
    }
  };

  const getMoneyReceiptDetails = async() => {
    try{
      let result = await axios.post('http://192.168.1.32:5000/getMoneyReceiptDetails', {ReceiptID: ReceiptID});
      console.log("receipt Details=",result);
      setRecAmount(result.data.MoneyReceiptDetatils.RecAmount);
      setpaymentMethod(result.data.MoneyReceiptDetatils.MOD);
      setBank(result.data.MoneyReceiptDetatils.BankID);
      setTrnID(result.data.MoneyReceiptDetatils.AccountNo);
      setRemark(result.data.MoneyReceiptDetatils.Remark);
      setDate(new Date(result.data.MoneyReceiptDetatils.ReceiptDate).toISOString().split("T")[0]);
      setTime(
        new Date(result.data.MoneyReceiptDetatils.ReceiptTime).toTimeString().split(" ")[0]
      );
    }catch (err){
      alert(err)
    }
  }

  const ResetValues = () => {
    setAmount(0);
    setBank("65");
    setTrnID("");
    setRecAmount(0);
    setDate(new Date().toISOString().split("T")[0]);
    setTime(new Date().toTimeString().split(" ")[0]);
    setpaymentMethod("C");
    setRemark("");
  }

  const UpdateMoneyReceipt = async (printStatus) => {
    try {
      let response = await axios.post("http://192.168.1.32:5000/updateMoneyReceipt", {
        ReceiptID: ReceiptID,
        ReceiptDate: date,
        ReceiptTime: time,
        TotalAmount: recAmount,
        Remark: remark,
        MOD: paymentMethod,
        AccountNo: trnID,
        BankID: bank,
      });
      if(response.status === 200){
        console.log("print", response.data.ReceipdID);
        if (printStatus === true)
          handlePrintClick(response.data.ReceiptID)
        ResetValues();
        getMRDDetails(IPDNo);
        getMoneyReceiptDetails(ReceiptID);
      }
    } catch (err) {
      alert(err);
    }
  };
  useEffect(() => {
    const UpdateBankMenu = () => {
      switch (paymentMethod) {
        case "C":
          setEnableBank(false);
          break;
        default:
          setEnableBank(true);
      }
    };
    UpdateBankMenu();
  }, [paymentMethod]);
  useEffect(() => {
    if(ReceiptID !== "")
    {getMRDDetails(IPDNo);
    getMoneyReceiptDetails(ReceiptID);}
  }, [ReceiptID]);


  return (
    <Modal
      aria-labelledby="unstyled-modal-title"
      aria-describedby="unstyled-modal-description"
      open={updateOpen}
      onClose={handleClose}
      // slots={{ backdrop: StyledBackdrop }}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "80%", backgroundColor: "white" }} padding={2}>
        <Grid container>
          <Grid item>
            <Typography fontWeight="bold">Update Money Receipt</Typography>
          </Grid>
          <Grid
            container
            // border="2px black solid"
            display="flex"
            // height="30vh"
            padding={1}
            justifyContent="start"
            alignItems="flex-start"
          >
            <Grid container display="flex" width="100%">
              <Grid item>
                <Typography fontSize={12} fontWeight="bold">
                  Date:{" "}
                </Typography>
                <TextField
                  fullWidth
                  fontSize={12}
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                  size="small"
                  type="date"
                />
              </Grid>
              <Grid item marginLeft={1}>
                <Typography fontSize={12} fontWeight="bold">
                  Time:{" "}
                </Typography>
                <TextField
                  fullWidth
                  fontSize={12}
                  value={time}
                  onChange={(e) => {
                    setTime(e.target.value);
                  }}
                  size="small"
                  type="time"
                />
              </Grid>
            </Grid>
            <Grid item display="flex" width="100%" marginY={1}>
              <Grid item xs={2}>
                <Typography fontSize={12} fontWeight="bold">
                  Patient Name
                </Typography>
                <TextField
                  placeholder="Name"
                  size="small"
                  value={MRDDetails.PatientName}
                  disabled
                  fontSize={12}
                />
              </Grid>
              <Grid item xs={2} marginLeft={1}>
                <Typography fontSize={12} fontWeight="bold">
                  HRNO
                </Typography>
                <TextField
                  placeholder="HRNO"
                  size="small"
                  value={MRDDetails.HRNo}
                  disabled
                  fontSize={12}
                />
              </Grid>
              <Grid item xs={2} marginLeft={1}>
                <Typography fontSize={12} fontWeight="bold">
                  IPD NO
                </Typography>
                <TextField
                  placeholder="HRNO"
                  size="small"
                  value={IPDNo}
                  disabled
                  fontSize={12}
                />
              </Grid>
              <Grid item xs={2} marginLeft={1}>
                <Typography fontSize={12} fontWeight="bold">
                  Admit Date
                </Typography>
                <TextField
                  placeholder="HRNO"
                  size="small"
                  fontSize={12}
                  type="date"
                  value={AdmDate}
                  disabled
                />
              </Grid>
              <Grid item xs={2} marginLeft={1}>
                <Typography fontSize={12} fontWeight="bold">
                  Patient Type
                </Typography>
                <TextField
                  placeholder="HRNO"
                  size="small"
                  value={MRDDetails.CompanyID == "110" ? "Ayushman" : "General"}
                  disabled
                  fontSize={12}
                />
              </Grid>

              <Grid item xs={2} marginLeft={1}>
                <Typography fontSize={12} fontWeight="bold">
                  Bed NO
                </Typography>
                <TextField
                  placeholder="Bed No"
                  size="small"
                  value={MRDDetails.BedNo}
                  disabled
                  fontSize={12}
                />
              </Grid>
            </Grid>
            <Grid item display="flex" width="100%" marginY={1}>
              <Grid item xs={2}>
                <Typography fontSize={12} fontWeight="bold">
                  Amount
                </Typography>
                <TextField
                  placeholder="Amount"
                  size="small"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                  disabled
                  fontSize={12}
                />
              </Grid>
              <Grid item xs={2} marginLeft={1}>
                <Typography fontSize={12} fontWeight="bold">
                  Receive Amount
                </Typography>
                <TextField
                  placeholder="Receive Amount"
                  size="small"
                  fontSize={12}
                  value={recAmount}
                  onChange={(e) => {
                    setRecAmount(e.target.value);
                  }}
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
              <Button variant="contained" onClick={() => {
                  UpdateMoneyReceipt(false); handleClose();
                }} disabled={recAmount === 0?true: false}> Save</Button>
              <Button
                variant="contained"
                onClick={() => {
                  UpdateMoneyReceipt(true);  handleClose();
                }}
                style={{ marginLeft: "10px" }}
                disabled={recAmount === 0?true: false}
              >
                Save & Print
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};
