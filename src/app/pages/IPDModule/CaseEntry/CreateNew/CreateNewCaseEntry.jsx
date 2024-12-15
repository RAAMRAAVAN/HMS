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
} from "../../SelectValues";
import { useDispatch, useSelector } from "react-redux";
import { selectUserDetails } from "@/src/lib/features/userLoginDetails/userSlice";
import { selectIPDNo } from "@/src/lib/features/IPDPatient/IpdPatientSlice";
import { AddItems } from "./AddItems"
import { ManageAddedItems } from "./ManageAddedItems"
import { selectCaseEntryItems, clearCaseEntries, } from "@/src/lib/features/IPDCaseEntry/IpdCaseEntrySlice";
import { AddedItems } from "./AddedItems";
// import { selectCaseEntryItems } from "@/src/lib/features/IPDCaseEntry/IpdCaseEntrySlice";

export const CreateNewCaseEntry = (props) => {
  const dispatch = useDispatch();
  const Entries = useSelector(selectCaseEntryItems)
  const { setOpen, open, fetchIPDCaseEntry } = props;
  const handlePrintClick = (ReceiptID) => {
    const url = `/pages/IPDModule/MoneyReceipt?ReceiptID=${ReceiptID}`;
    window.open(url, "_blank"); // Opens in a new tab
  };
  const UserDetails = useSelector(selectUserDetails);
  const IPDID = useSelector(selectIPDNo)
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState(new Date().toTimeString().slice(0, 5));
  const [MRDDetails, setMRDDetails] = useState({});
  const [AdmDate, setAdmDate] = useState();
  const [AdmTime, setAdmTime] = useState();
  const [amount, setAmount] = useState(0);
  const [recAmount, setRecAmount] = useState(0);
  const handleClose = () => { setOpen(false); dispatch(clearCaseEntries()); }
  const [enableBank, setEnableBank] = useState(false);
  const [paymentMethod, setpaymentMethod] = useState("CR");
  const [bank, setBank] = useState("65");
  const [trnID, setTrnID] = useState("");
  const [remark, setRemark] = useState("");
  // const [Entries, setEntries] = useState([]);

  // console.log(
  //   "date",
  //   date,
  //   "time",
  //   time,
  //   "AdmDate",
  //   AdmDate,
  //   "AdmTime",
  //   extractTimeFromISO(MRDDetails.Time)
  // );
  // console.log(AdmDate + new Date(MRDDetails.Time).toTimeString().split(" ")[0]);
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
          new Date(response.data[0].Time).toISOString().split("T")[1]
        )
      );

    } catch (error) {
      alert("DB Error");
    }
  };

  const ResetValues = () => {
    setAmount(0);
    setBank("65");
    setTrnID("");
    setRecAmount(0);
    setDate(new Date().toISOString().split("T")[0]);
    setTime(new Date().toTimeString().slice(0, 5));
    setpaymentMethod("C");
    setRemark("");
  }

  const SaveMoneyReceipt = async (printStatus) => {
    try {
      let response = await axios.post("http://192.168.1.32:5000/addMoneyReceipt", {
        ReceiptDate: date,
        ReceiptTime: time,
        AdmitDate: AdmDate,
        HRNo: MRDDetails.HRNo,
        WardID: MRDDetails.WardID,
        BedID: MRDDetails.BedID,
        PatientName: MRDDetails.PatientName,
        IPDNo: IPDID,
        Address: MRDDetails.Address,
        TotalAmount: recAmount,
        Remark: remark,
        MOD: paymentMethod,
        UserID: UserDetails.UId,
        AccountNo: trnID,
        IPDID: MRDDetails.PrintIPDNo,
        BankID: bank,
      });
      if (response.status === 200) {
        console.log("print", response.data.ReceipdID);
        if (printStatus === true)
          handlePrintClick(response.data.ReceipdID);
        ResetValues();
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
        case "CR":
          setEnableBank(false);
          break;
        default:
          setEnableBank(true);
      }
    };
    UpdateBankMenu();
  }, [paymentMethod]);
  useEffect(() => {
    getMRDDetails(IPDID);
  }, [IPDID]);

  return MRDDetails != {} ? (
    <Modal
      aria-labelledby="unstyled-modal-title"
      aria-describedby="unstyled-modal-description"
      open={open}
      onClose={handleClose}
      // slots={{ backdrop: StyledBackdrop }}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "95%", backgroundColor: "white", height: "95%", maxHeight: "100vh", overflowY: "auto", }} padding={2}>
        <Grid container>
          <Grid item>
            <Typography fontWeight="bold">Case Entry</Typography>
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
            <Grid container display="flex" width="100%" justifyContent="space-between">
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
              <Grid item xs={2} marginLeft={1}>
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
              <Grid item xs={1} marginLeft={1}>
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
                  value={MRDDetails.IPDNo}
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
                  fullWidth
                />
              </Grid>
              <Grid item xs={1} marginLeft={1}>
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
            </Grid>
            <Grid item display="flex" width="100%" marginY={1}>
              <Grid item xs={1} marginRight={1}>
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
              <Grid item xs={3}>
                <Typography fontSize={12} fontWeight="bold">
                  Doctor Name
                </Typography>
                <TextField
                  // placeholder="HRNO"
                  size="small"
                  // value={MRDDetails.CompanyID == "110" ? "Ayushman" : "General"}
                  // disabled
                  fontSize={12}
                />
              </Grid>
            </Grid>
            <Grid container>

              <Grid item xs={1} border="1px black solid" padding={1}>
                <Typography fontSize={14} fontWeight="bold">SLNO</Typography>
              </Grid>

              <Grid item xs={3} border="1px black solid" padding={1}>
                <Typography fontSize={14} fontWeight="bold">Service Name</Typography>
              </Grid>

              <Grid item xs={1} border="1px black solid" padding={1}>
                <Typography fontSize={14} fontWeight="bold">Rate</Typography>
              </Grid>



              <Grid item xs={1} border="1px black solid" padding={1}>
                <Typography fontSize={14} fontWeight="bold">Tax %</Typography>
              </Grid>

              <Grid item xs={1} border="1px black solid" padding={1}>
                <Typography fontSize={14} fontWeight="bold">Amount</Typography>
              </Grid>

              <Grid item xs={1} border="1px black solid" padding={1}>
                <Typography fontSize={14} fontWeight="bold">Discount</Typography>
              </Grid>

              <Grid item xs={1} border="1px black solid" padding={1}>
                <Typography fontSize={14} fontWeight="bold">NetAmount</Typography>
              </Grid>

              <Grid item xs={1} border="1px black solid" padding={1}>
                <Typography fontSize={14} fontWeight="bold">Action</Typography>
              </Grid>
            </Grid>
            {/* Items */}

            {Entries.map((Entry, index) => {
              return (<AddedItems key={Entry.SLNO} Entry={Entry} index={index} />)
            })}
            <AddItems slno={Entries.length} />
            <ManageAddedItems handleClose={handleClose} fetchIPDCaseEntry={fetchIPDCaseEntry} IPDID={IPDID} date={date} time={time} UserID={UserDetails.UId} UserName={UserDetails.FirstName} />
          </Grid>
        </Grid>
      </Box>
    </Modal>
  ) : <></>;
};
