// import { selectCaseEntryItems } from "@/src/lib/features/IPDCaseEntry/IpdCaseEntrySlice";
import { deleteCaseEntry, selectCaseEntryItems, updateAmount, updateCaseEntries, updateDiscount } from "@/src/lib/features/IPDCaseEntry/IpdCaseEntrySlice";
import { Delete } from "@mui/icons-material";
import { Autocomplete, Box, Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import axios from "axios";
import { useEffect, useRef,useState } from "react"
import { useDispatch, useSelector } from "react-redux";

export const AddedItems = (props) => {
    const dispatch = useDispatch();
    const Entries = useSelector(selectCaseEntryItems);
    const {Entry, index, key} = props;
    console.log("Entry=", Entry);
    
    const [ServiceList, setServiceList] = useState([]);
    const [Service, setService] = useState(Entry.Service);
    const [Rate, setRate] = useState(Entry.Rate);
    const [Discount, setDiscount] = useState(Entry.Discount);
    const [Tax, setTax] = useState(Entry.Tax);
    const [Amount, setAmount] = useState(Entry.Amount);
    const [update, setUpdate] = useState(true);

    const getServiceList = async (value) => {
        try {
            let response = await axios.post("http://192.168.1.32:5000/filterServiceMaster", { like_name: value })
            setServiceList(response.data.filtered_Service_list);
        } catch (err) {
            alert(err);
        }
    };
    const handleUpdate = () => {
        // let TempEntry = Entries;
        // TempEntry[index] = {SLNO: index+1, ServiceName: Service.ServiceName, Rate: Amount, Discount: Discount, Tax: Tax, Amount: Amount};
        // dispatch(updateCaseEntries({Entry: {SLNO: index+1, ServiceName: Service, Rate: Amount, Discount: Discount, Tax: Tax, Amount: Amount},index: index}));
    }

    const handleDelete = () => {
        // let TempEntry = [...Entries];  // Create a copy of the Entries array
        // TempEntry.splice(index, 1);    // Remove the item at the specified index
        // setEntries(TempEntry);         // Update the state with the modified array
        dispatch(deleteCaseEntry({index: index}))
    };

    
    useEffect(() => {
        getServiceList("");
    }, []);

    useEffect(()=>{
        handleUpdate()
    }, [Amount])

    useEffect(()=>{
        setRate((Number(Amount)*100)/(Number(Tax) + 100))
    },[Amount])

    useEffect(()=>{
        setUpdate(false);
    },[Entries]);
    return (<>
        <Grid container key={index}>

            <Grid item xs={1} border="1px black solid" >
                <TextField
                    size="small"
                    fontSize="11"
                    sx={{
                        width: "100%",
                        '& .MuiInputBase-root': {
                            fontSize: "14px",
                            padding: "0px",  // Adjust padding for custom height
                        },
                    }}
                    value={index+1}
                />
            </Grid>

            <Grid item xs={3} border="1px black solid" >
                {/* <Autocomplete
                    fullWidth
                    options={ServiceList}
                    // ref={autocompleteRef} // Attach ref to Autocomplete
                    renderOption={(props, option) => (
                        <li {...props}>
                            <Box display="flex" justifyContent="space-between" width="150%">
                                <Typography style={{ fontSize: "14px" }}>
                                    {option.ServiceName}
                                </Typography>
                                <Typography style={{ fontSize: "14px" }}>
                                    Rate={option.Rate}
                                </Typography>
                            </Box>
                        </li>
                    )}
                    getOptionLabel={(option) => `${option.ServiceName}`} // Specify which property to use as the label
                    value={Service}
                    onChange={(event, newValue) => {
                        setService(newValue); // Update the state variable when the value changes
                        setRate((newValue.Rate*100)/(newValue.GSTPre + 100));
                        setDiscount(0);
                        setTax(newValue.GSTPre);
                        setAmount(newValue.Rate);
                    }}
                    onInputChange={(event, newInputValue) => {
                        getServiceList(newInputValue); // Call the function while typing
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            inputRef={autocompleteInputRef} // Attach ref to TextField
                            sx={{ input: { fontSize: 14, padding: "0", margin: "0" } }} // Adjust input text font size
                        />
                    )}
                    sx={{ display: "flex", width: "100%", fontSize: "14px" }}
                    size="small"
                disabled
                /> */}
                <TextField
                    size="small"
                    fontSize="11"
                    sx={{
                        width: "100%",
                        '& .MuiInputBase-root': {
                            fontSize: "14px",
                            padding: "0px",  // Adjust padding for custom height
                            borderRadius:"0"
                        },
                    }}
                    // disabled
                    value={Service.ServiceName}
                    // onChange={(e)=>{setRate(e.target.value)}}
                />
            </Grid>

            <Grid item xs={1} border="1px black solid" >
                <TextField
                    size="small"
                    fontSize="11"
                    sx={{
                        width: "100%",
                        '& .MuiInputBase-root': {
                            fontSize: "14px",
                            padding: "0px",  // Adjust padding for custom height
                            borderRadius:"0"
                        },
                    }}
                    // disabled
                    value={Number(Entry.Rate).toFixed(0)}
                    // onChange={(e)=>{setRate(e.target.value)}}
                />
            </Grid>

            

            <Grid item xs={1} border="1px black solid" >
                <TextField
                    size="small"
                    fontSize="11"
                    sx={{
                        width: "100%",
                        '& .MuiInputBase-root': {
                            fontSize: "14px",
                            padding: "0px",  // Adjust padding for custom height
                            borderRadius:"0"
                        },
                    }}
                    value={Tax}
                    // disabled
                    // onChange={(e)=>{setTax(e.target.value)}}
                />
            </Grid>

            <Grid item xs={1} border="1px black solid" >
                <TextField
                    size="small"
                    fontSize="11"
                    sx={{
                        width: "100%",
                        '& .MuiInputBase-root': {
                            fontSize: "14px",
                            padding: "0px",  // Adjust padding for custom height
                            borderRadius:"0"
                        },
                    }}
                    value={Number(Entry.Amount)}
                    onChange={(e)=>{dispatch(updateAmount({Amount: e.target.value, index: index}))}}
                    // disabled
                />
            </Grid>
            <Grid item xs={1} border="1px black solid" >
                <TextField
                    size="small"
                    fontSize="11"
                    sx={{
                        width: "100%",
                        '& .MuiInputBase-root': {
                            fontSize: "14px",
                            padding: "0px",  // Adjust padding for custom height
                            borderRadius:"0"
                        },
                    }}
                    value={Entry.Discount}
                    // disabled
                    onChange={(e)=>{dispatch(updateDiscount({Discount: e.target.value, index: index}))}}
                />
            </Grid>

            <Grid item xs={1} border="1px black solid" >
                <TextField
                    size="small"
                    fontSize="11"
                    sx={{
                        width: "100%",
                        '& .MuiInputBase-root': {
                            fontSize: "14px",
                            padding: "0px",  // Adjust padding for custom height
                            borderRadius:"0"
                        },
                    }}
                    // disabled
                    value={Entry.Amount - Entry.Discount}
                    // onChange={(e)=>{setDiscount(e.target.value)}}
                />
            </Grid>

            <Grid item xs={1} border="1px black solid" display="flex" justifyContent="center">
                <IconButton
                  aria-label="delete"
                  size="small"
                  style={{ padding: "0", margin: "0" }}
                  onClick={() => handleDelete()}
                >
                  <Delete
                    size="small"
                    style={{
                      padding: "0",
                      margin: "0",
                      display: "flex",
                      height: "20px",
                    }}
                    color="error"
                  />
                </IconButton>
            </Grid>
        </Grid>
    </>)
}