import { Delete, EditNote, Print, Restore, ViewAgenda } from "@mui/icons-material";
import { Grid, IconButton, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { VisitEntry } from "./VisitEntry";
import { NewVisitEntry } from "./NewVisitEntry";

export const VisitEntries = (props) => {
  //   const { ReceiptID } = props;
  let [ReceiptID, setReceiptID] = useState(props.ReceiptDetails.ReceiptID);
  const [IPDDoctorVisitListDetails, setIPDDoctorVisitListDetails] = useState([]);
  let [ReceiptDate, setReceiptDate] = useState(new Date(props.ReceiptDetails.ReceiptDate)
  .toISOString()
  .split("T")[0])
  let [HRNo, setHRNo] = useState(props.ReceiptDetails.HRNo);
  let [PatientName, setPatientName] = useState(
    props.ReceiptDetails.PatientName
  );
  let [Remark, setRemark] = useState(props.ReceiptDetails.Remark);
  let [ActiveStatus, setActiveStatus] = useState(props.ReceiptDetails.ActiveStatus);
  let [DeleteStatus, setDeleteStatus] = useState(props.ReceiptDetails.DeleteStatus);
  let [updater, setUpdater] = useState("");


  const getVisitListDetails = async() => {
    setIPDDoctorVisitListDetails([]);
    try{
        let result = await axios.post('http://localhost:5000/getVisitListDetails', {ReceiptID: ReceiptID});
        console.log(result.data.IPDDoctorVisitListDetails)
        setIPDDoctorVisitListDetails(result.data.IPDDoctorVisitListDetails)
    }catch (err){
        alert(err);
    }
  } 

  const deleteDoctorVisitEntries = async (Act, Del) => {
    try{
      let result = await axios.post('http://localhost:5000/deleteDoctorVisitEntries', {ReceiptID: ReceiptID, ActiveStatus:Act, DeleteStatus: Del});
      
      getVisitListDetails();
    } catch (err){
      console.log(err);
    }
  }

  useEffect(()=>{
    getVisitListDetails();
  },[]);
  return (
    <span >
      <Grid container style={ActiveStatus === "Y"?{backgroundColor:"yellow"}:{backgroundColor:"red"}}>
        {/* <Grid
              xs={1}
              border="1px black solid"
              padding={1}
              item
              alignItems="center"
              display="flex"
            >
              <Typography fontWeight="bold" fontSize={10}>S.No.</Typography>
            </Grid> */}
        <Grid
          xs={1}
          border="1px black solid"
          padding={1}
          item
          alignItems="center"
          display="flex"
        >
          <Typography fontWeight="bold" fontSize={10}>
            {ReceiptID}
          </Typography>
        </Grid>
        <Grid
          xs={2}
          border="1px black solid"
        //   padding={1}
          item
          alignItems="center"
          display="flex"
        >
          <TextField fontWeight="bold" value={ReceiptDate} onChange={(e)=>{setReceiptDate(e.target.value)}} fontSize={10} type="date" size="small" padding={0} style={{margin:"0"}} fullWidth/>
        </Grid>
        <Grid
          xs={2}
          border="1px black solid"
          padding={1}
          item
          alignItems="center"
          display="flex"
        >
          <Typography fontWeight="bold" fontSize={10}>
            {/* {HRNo} */}
          </Typography>
        </Grid>
        <Grid
          xs={1}
          border="1px black solid"
          padding={1}
          item
          alignItems="center"
          display="flex"
        >
          <Typography fontWeight="bold" fontSize={10}>
            {/* {PatientName} */}
          </Typography>
        </Grid>

        <Grid
          xs={1}
          border="1px black solid"
          padding={1}
          item
          alignItems="center"
          display="flex"
        >
          <Typography fontWeight="bold" fontSize={10}></Typography>
        </Grid>

        <Grid
          xs={1}
          border="1px black solid"
          padding={1}
          item
          alignItems="center"
          display="flex"
        >
          <Typography fontWeight="bold" fontSize={10}>
            {/* Receipt Amount */}
          </Typography>
        </Grid>

        <Grid
          xs={1}
          border="1px black solid"
          padding={1}
          item
          alignItems="center"
          display="flex"
        >
          <Typography fontWeight="bold" fontSize={10}>
            
          </Typography>
        </Grid>

        <Grid
          xs={1}
          border="1px black solid"
          padding={1}
          item
          alignItems="center"
          display="flex"
        >
          <Typography fontWeight="bold" fontSize={10}>
            {/* Receipt Type */}
          </Typography>
        </Grid>

        <Grid
          xs={1}
          border="1px black solid"
          padding={1}
          item
          alignItems="center"
          display="flex"
        >
          <Typography fontWeight="bold" fontSize={10}>
            {Remark}
          </Typography>
        </Grid>

        <Grid
          xs={1}
          border="1px black solid"
          paddingX={1}
          item
          alignItems="center"
          display="flex"
          justifyContent="space-between"
        >
          <IconButton
            aria-label="delete"
            size="small"
            style={{ padding: "0", margin: "0" }}
            //   onClick={() => handleUpdateOpen(receipt.ReceiptID)}
          >
            <EditNote
              size="small"
              style={{
                padding: "0",
                margin: "0",
                display: "flex",
                height: "20px",
              }}
            />
          </IconButton>

          <IconButton
            aria-label="delete"
            size="small"
            style={{ padding: "0", margin: "0" }}
            onClick={() => {setActiveStatus("N"); setDeleteStatus("Y"); deleteDoctorVisitEntries("N", "Y");}}
          >
            <Delete
              size="small"
              style={{
                padding: "0",
                margin: "0",
                display: "flex",
                height: "20px",
              }}
            />
          </IconButton>

          <IconButton
            aria-label="delete"
            size="small"
            style={{ padding: "0", margin: "0" }}
              onClick={() => {setActiveStatus("Y"); setDeleteStatus("N"); deleteDoctorVisitEntries("Y", "N");}}
          >
            <Restore
              size="small"
              style={{
                padding: "0",
                margin: "0",
                display: "flex",
                height: "20px",
              }}
            />
          </IconButton>

          <IconButton
            aria-label="delete"
            size="small"
            style={{ padding: "0", margin: "0" }}
            //   onClick={() => handlePrintClick(receipt.ReceiptID)}
          >
            <Print
              size="small"
              style={{
                padding: "0",
                margin: "0",
                display: "flex",
                height: "20px",
              }}
            />
          </IconButton>
        </Grid>
      </Grid>
      {IPDDoctorVisitListDetails.map((entry, index) => {return(<VisitEntry AID={entry.AID} ReceiptCancel={ActiveStatus} ActiveStatus={entry.ActiveStatus} DeleteStatus={entry.DeleteStatus} Rate={entry.Rate} NoOfVisit={entry.NoOfVisit} Discount={entry.Discount} VisitDate={entry.Date} Amount={entry.Amount} User={entry.FirstName} DoctorName={entry.DoctorName}/>)})}
      <NewVisitEntry ReceiptID={ReceiptID} getVisitListDetails={getVisitListDetails}/>
    </span>
  );
};
