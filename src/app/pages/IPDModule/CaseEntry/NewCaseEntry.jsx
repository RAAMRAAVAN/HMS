import { Delete, EditNote, Print, Restore } from "@mui/icons-material";
import { Autocomplete, Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export const NewCaseEntry = (props) => {
    let [OSID, setOSID] = useState(props.OSID);
    console.log("OSID2=", props.OSID)
    const getServiceEntriesDetails = props.getServiceEntriesDetails;
    // let [VisitDate, setVisitDate] = useState(new Date().toISOString().split("T")[0]);
    let [ServiceList, setServiceList] = useState([]);
    let [Service, setService] = useState({DrId: 0, DoctorName: '', VisitCharge: 0});
    // console.log("Doctor=", Doctor)
    let [Rate, setRate] = useState(0);
    let [Qty, setQty] = useState(0);
    let [Discount, setDiscount] = useState(0);
    let [NetAmount, setNetAmount] = useState(Rate * Qty);
    let [Amount, setAmount] = useState((Rate * Qty) - Discount);

    const getServiceList = async() => {
        try{
            let result = await axios.get("http://localhost:5000/getServiceList");
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
      setService({DrId: 0, DoctorName: '', VisitCharge: 0});
    }
    const AddService = async () => {
      console.log(props.OSID,Service.SID, Qty, Rate, Amount, Discount, '1');
      try{
        let result = await axios.post('http://localhost:5000/AddService', {OSID: props.OSID,SID: Service.SID, Qty: Qty, Rate: Rate, Amount: Amount, Discount: Discount, NetAmount: NetAmount,UserID: '1'});
        console.log("result=", result)
        ResetValues();
        getServiceEntriesDetails();
        
      }catch(err){
        alert(err);
      }
      return(0)
    } 

    useEffect(()=>{
        getServiceList();
    }, [])


    useEffect(()=>{
        setAmount((Rate * Qty) - Discount);
        setNetAmount(Rate*Qty);
        // UpdateVisitDetails();
      },[Rate, Discount, Qty]);
    return(<>
    <Grid container>
        <Grid
          xs={1}
          border="1px black solid"
          padding={1}
          item
          alignItems="center"
          display="flex"
        >
          <Typography fontWeight="bold" fontSize={10}>
            {OSID}
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
          {/* <TextField value={VisitDate} onChange={(e)=>{setVisitDate(e.target.value)}} fontWeight="bold" fontSize={10} type="date" size="small" padding={0} style={{margin:"0"}} fullWidth/> */}
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
          <Button fullWidth variant="contained" onClick={()=>{AddService()}}>Submit</Button>
        </Grid>
      </Grid>
    </>)
}