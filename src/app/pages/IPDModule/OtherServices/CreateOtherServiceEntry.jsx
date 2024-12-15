import { Autocomplete, Button, Grid, TextField, Typography } from "@mui/material"
import axios from "axios";
import { useEffect, useState } from "react";


export const CreateOtherServiceEntry = (props) => {
    let {open, setOpen, IPDID, fetchIPDOtherServiceList}=props;
    console.log("CreateIPDDoctorVisit=", open, IPDID)
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [time, setTime] = useState(new Date().toTimeString().slice(0, 5));
    let [ServiceList, setServiceList] = useState([]);
    let [Service, setService] = useState({SID: 0, ServiceName: "", Rate: 0, SubDepartmentID: 0});
    // console.log("Doctor=", Doctor)
    let [Rate, setRate] = useState(0);
    let [Qty, setQty] = useState(0);
    let [Discount, setDiscount] = useState(0);
    let [NetAmount, setNetAmount] = useState(Rate * Qty);
    let [Amount, setAmount] = useState((Rate * Qty) - Discount);


    const CreateOtherService = async() => {
        setOpen(false);
        try{
            let result = await axios.post('http://192.168.1.32:5000/CreateOtherService', {
                ReceiptDate: date,
                ReceiptTime: time,
                IPDID: IPDID,
                SID: Service.SID, 
                // Date: VisitDate, 
                Qty: Qty, 
                Rate: Rate, 
                Discount: Discount, 
                Amount: Amount,
                NetAmount: NetAmount
            });
            console.log("Added result");
            fetchIPDOtherServiceList(IPDID);
            ResetValues();
        }catch(err){
            alert(err);
        }

    }
    const getServiceList = async() => {
      try{
          let result = await axios.get("http://192.168.1.32:5000/getServiceList");
          console.log(result.data.ServiceList);
          setServiceList(result.data.ServiceList)
      }catch(err){
          alert(err);
      }
  }

  const ResetValues = () => {
    setRate(0);
    setAmount(0);
    setDiscount(0);
    setNetAmount(0);
    // setVisitDate(new Date().toISOString().split("T")[0]);
    setQty(0);
    setService({SID: 0, ServiceName: "", Rate: 0, SubDepartmentID: 0});
  }
  useEffect(()=>{
    getServiceList();
}, [])

useEffect(()=>{
  setAmount((Rate * Qty) - Discount);
  setNetAmount(Rate * Qty)
  // UpdateVisitDetails();
},[Rate, Discount, Qty]);

    return(<><Grid container sx={{backgroundColor:"orange"}}>
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
        <TextField value={date} onChange={(e)=>{setDate(e.target.value)}} fontWeight="bold" fontSize={10} type="date" size="small" padding={0} style={{margin:"0"}} fullWidth/>
      </Grid>
      <Grid
        xs={2}
        border="1px black solid"
        // padding={1}
        item
        alignItems="center"
        display="flex"
      >
        <Autocomplete
            fullWidth
            options={ServiceList}
            getOptionLabel={(option) => option?.ServiceName || ""}
            value={Service}
            onChange={(event, newValue) => {
              setService(newValue); // Update the state variable when the value changes
              setRate(newValue?.Rate || 0);
              setQty(newValue ? 1 : 0); // Reset visits if no doctor selected
            }}
            onInputChange={(event, newInputValue) => {
              console.log("change=", event);
               // Call the function while typing
            }}
            renderInput={(params) => <TextField {...params} />}
            sx={{ width: "100%" }}
            size="small"
          />
      </Grid>
      <Grid
        xs={1}
        border="1px black solid"
      //   padding={1}
        item
        alignItems="center"
        display="flex"
      >
        <TextField size='small' value={Qty} onChange={(e)=>{setQty(e.target.value)}}/>
      </Grid>

      <Grid
        xs={1}
        border="1px black solid"
      //   padding={1}
        item
        alignItems="center"
        display="flex"
      >
        <TextField size='small' value={Rate} onChange={(e)=>{setRate(e.target.value)}}/>
      </Grid>

      <Grid
        xs={1}
        border="1px black solid"
      //   padding={1}
        item
        alignItems="center"
        display="flex"
      >
         <TextField size='small' value={Discount} onChange={(e)=>{setDiscount(e.target.value)}}/>
      </Grid>

      <Grid
        xs={1}
        border="1px black solid"
      //   padding={1}
        item
        alignItems="center"
        display="flex"
      >
         <TextField size='small' value={Amount} onChange={(e)=>{setAmount(e.target.value)}}/>
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
          {/* {Remark} */}
        </Typography>
      </Grid>

      <Grid
        xs={1}
        border="1px black solid"
      //   paddingX={1}
        item
        alignItems="center"
        display="flex"
        justifyContent="space-between"
      >
        <Button fullWidth variant="contained" onClick={()=>{CreateOtherService()}}>Submit</Button>
      </Grid>
    </Grid></>)
}