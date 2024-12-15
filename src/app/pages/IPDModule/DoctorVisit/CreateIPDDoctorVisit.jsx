import { Autocomplete, Button, Grid, TextField, Typography } from "@mui/material"
import axios from "axios";
import { useEffect, useState } from "react";


export const CreateIPDDoctorVisit = (props) => {
    let {open, setOpen, IPDNo, fetchIPDDoctorVisitList}=props;
    console.log("CreateIPDDoctorVisit=", open, IPDNo)
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [time, setTime] = useState(new Date().toTimeString().slice(0, 5));
    // const [Doctor, setDoctor] = useState();
    let [VisitDate, setVisitDate] = useState(new Date().toISOString().split("T")[0]);
    let [DoctorList, setDoctorList] = useState([]);
    let [Doctor, setDoctor] = useState({DrId: 0, DoctorName: '', VisitCharge: 0});
    console.log("Doctor=", Doctor)
    let [Rate, setRate] = useState(0);
    let [NoOfVisit, setNoOfVisit] = useState(0);
    let [Discount, setDiscount] = useState(0);
    let [Amount, setAmount] = useState((Rate * NoOfVisit) - (Discount/100 * (Rate * NoOfVisit)));


    const CreateIPDDoctorVisitList = async() => {
        setOpen(false);
        try{
            let result = await axios.post('http://192.168.1.32:5000/CreateDoctorVisit', {
                ReceiptDate: date,
                ReceiptTime: time,
                IPDID: IPDNo,
                DrId: Doctor.DrId, 
                Date: VisitDate, 
                NoOfVisit: NoOfVisit, 
                Rate: Rate, 
                Discount: Discount, 
                Amount: Amount
            });
            console.log(result);
            fetchIPDDoctorVisitList(IPDNo);
            ResetValues();
        }catch(err){
            alert(err);
        }

    }
    const getDoctorList = async() => {
      try{
          let result = await axios.get("http://192.168.1.32:5000/getDoctorList");
          console.log(result.data.DoctorList);
          setDoctorList(result.data.DoctorList)
      }catch(err){
          alert(err);
      }
  }
    const ResetValues = () => {
      setRate(0);
      setAmount(0);
      setDiscount(0);
      setVisitDate(new Date().toISOString().split("T")[0]);
      setNoOfVisit(0);
      setDoctor({DrId: 0, DoctorName: '', VisitCharge: 0});
    }
    useEffect(()=>{
      getDoctorList();
  }, [])
    useEffect(()=>{
      setAmount((Rate * NoOfVisit) - (Discount/100 * (Rate * NoOfVisit)));
      // UpdateVisitDetails();
    },[Rate, Discount, NoOfVisit]);
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
        <TextField value={VisitDate} onChange={(e)=>{setVisitDate(e.target.value)}} fontWeight="bold" fontSize={10} type="date" size="small" padding={0} style={{margin:"0"}} fullWidth/>
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
            options={DoctorList}
            getOptionLabel={(option) => option?.DoctorName || ""}
            value={Doctor}
            onChange={(event, newValue) => {
              setDoctor(newValue); // Update the state variable when the value changes
              setRate(newValue?.VisitCharge || 0);
              setNoOfVisit(newValue ? 1 : 0); // Reset visits if no doctor selected
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
        <TextField size='small' value={NoOfVisit} onChange={(e)=>{setNoOfVisit(e.target.value)}}/>
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
        <Button fullWidth variant="contained" onClick={()=>{CreateIPDDoctorVisitList()}}>Submit</Button>
      </Grid>
    </Grid></>)
}