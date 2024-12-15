import { Delete, EditNote, Print, Restore, SystemUpdateAlt, Upgrade, ViewAgenda } from "@mui/icons-material"
import { Grid, IconButton, TextField, Typography } from "@mui/material"
import axios from "axios";
import { useEffect, useState } from "react"

export const VisitEntry = (props) => {
  let [AID, setAID] = useState(props.AID);
  let [Rate, setRate] = useState(props.Rate);
  let [NoOfVisit, setNoOfVisit] = useState(props.NoOfVisit);
  let [Discount, setDiscount] = useState(props.Discount);
  let [VisitDate, setVisitDate] = useState(new Date(props.VisitDate)
  .toISOString()
  .split("T")[0]);
  let [Amount, setAmount] = useState((Rate * NoOfVisit) - (Discount/100 * (Rate * NoOfVisit)));
  let [User, setUser] = useState(props.User);
  let [DoctorName, setDoctorName] = useState(props.DoctorName);
  let [ActiveStatus, setActiveStatus] = useState(props.ActiveStatus);
  let [DeleteStatus, setDeleteStatus] = useState(props.DeleteStatus);
  const [ReceiptCancel, setReceiptCancel] = useState(props.ReceiptCancel)

  console.log("ActiveStatus, DeleteStatus",AID,ActiveStatus, DeleteStatus, ReceiptCancel)

  const UpdateVisitDetails = async(A, D) => {
    // alert("UPdate",{AID: AID,ActiveStatus: ActiveStatus, DeleteStatus: DeleteStatus, Date: VisitDate, NoOfVisit: NoOfVisit, Discount: Discount, Amount: Amount, Rate: Rate, User: "1"})
    try{
      let result = await axios.post('http://192.168.1.32:5000/UpdateVisitDetails', {AID: AID,ActiveStatus: A, DeleteStatus: D, Date: VisitDate, NoOfVisit: NoOfVisit, Discount: Discount, Amount: Amount, Rate: Rate, User: "1"})
      alert("Entry Updatted");
    } catch (err) {
      console.log(err);
    } 
  }

  useEffect(()=>{
    setAmount((Rate * NoOfVisit) - (Discount/100 * (Rate * NoOfVisit)));
    // UpdateVisitDetails();
  },[Rate, Discount, VisitDate, NoOfVisit, Amount, User, ActiveStatus, DeleteStatus]);
    return(<> 
    <Grid container backgroundColor={ActiveStatus === "N"?"#f7bed3":"white"}>
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
            {/* {ReceiptID} */}
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
          <TextField fontWeight="bold" value={VisitDate} onChange={(e)=>{setVisitDate(e.target.value)}} fontSize={10} type="date" size="small" padding={0} style={{margin:"0"}} fullWidth/>
        </Grid>
        <Grid
          xs={2}
          border="1px black solid"
          padding={1}
          item
          alignItems="center"
          display="flex"
        >
          <Typography fontWeight="bold" fontSize={12}>
            {DoctorName}
          </Typography>
        </Grid>
        <Grid
          xs={1}
          border="1px black solid"
          // padding={1}
          item
          alignItems="center"
          display="flex"
        >
          <TextField value={NoOfVisit} onChange={(e)=>{setNoOfVisit(e.target.value)}} size="small"/>
        </Grid>

        <Grid
          xs={1}
          border="1px black solid"
          // padding={1}
          item
          alignItems="center"
          display="flex"
        >
          {/* <Typography fontWeight="bold" fontSize={10}>{Rate}</Typography> */}
          <TextField value={Rate} onChange={(e)=>{setRate(e.target.value)}} fontSize={10} size="small"/>
        </Grid>

        <Grid
          xs={1}
          border="1px black solid"
          // padding={1}
          item
          alignItems="center"
          display="flex"
        >
          <TextField value={Discount} onChange={(e)=>{setDiscount(e.target.value)}} size="small"/>
        </Grid>

        <Grid
          xs={1}
          border="1px black solid"
          // padding={1}
          item
          alignItems="center"
          display="flex"
        >
          <TextField value={Amount} size="small"/>
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
            {User}
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
            {/* {Remark} */}
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
            style={{ padding: "0", margin: "0", display:"none" }}
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
            onClick={()=>{setActiveStatus("N");setDeleteStatus("Y");UpdateVisitDetails("N", "Y")}}
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
            style={{ padding: "0", margin: "0"}}
            onClick={()=>{setActiveStatus("Y");setDeleteStatus("N");UpdateVisitDetails("Y", "N")}}
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
            style={{ padding: "0", margin: "0"}}
              
          >
            <SystemUpdateAlt
              size="small"
              style={{
                padding: "0",
                margin: "0",
                display: "flex",
                height: "20px",
              }}
              onClick={()=>UpdateVisitDetails(ActiveStatus, DeleteStatus)}
            />
          </IconButton>
        </Grid>
      </Grid>
    </>)
}