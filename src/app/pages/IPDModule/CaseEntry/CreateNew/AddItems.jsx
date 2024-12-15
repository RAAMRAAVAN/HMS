import { selectDiscountP, setCaseEntry } from "@/src/lib/features/IPDCaseEntry/IpdCaseEntrySlice";
import { Autocomplete, Box, Button, Grid, TextField, Typography } from "@mui/material"
import axios from "axios";
import { useEffect, useRef,useState } from "react"
import { useDispatch, useSelector } from "react-redux";

export const AddItems = (props) => {
    const dispatch = useDispatch();
    const {slno} = props;
    const [ServiceList, setServiceList] = useState([]);
    const [Service, setService] = useState(null);
    const autocompleteInputRef = useRef(null);
    const [Rate, setRate] = useState(0);
    const [Discount, setDiscount] = useState(0);
    const DiscountP = useSelector(selectDiscountP);
    const [Tax, setTax] = useState(0);
    const [Amount, setAmount] = useState(0);

    const getServiceList = async (value) => {
        try {
            let response = await axios.post("http://192.168.1.32:5000/filterServiceMaster", { like_name: value })
            setServiceList(response.data.filtered_Service_list);
        } catch (err) {
            alert(err);
        }
    };

    const handleAdd = () => {
        dispatch(setCaseEntry({Entry: {SLNO: slno+1, Service: Service, Rate: Rate, Discount: DiscountP === 0?Discount:((DiscountP/100*Amount)), Tax: Tax, Amount: Amount}}));
        // setEntries([...Entries, {SLNO: 1, Service: Service, Rate: Rate, Discount: Discount, Tax: Tax, Amount: Amount}]);

        Reset();
        // Focus the Autocomplete input field
        if (autocompleteInputRef.current) {
            autocompleteInputRef.current.focus();
        }
    }

    const Reset = () => {
        // console.log("Entries", Entries);
        setService(null);
        setRate(0);
        setDiscount(0);
        // setGTotal(0);
        setTax(0);
        setAmount(0);
    }

    useEffect(() => {
        getServiceList("");
    }, []);

    useEffect(()=>{
        setRate((Number(Amount)*100)/(Number(Tax) + 100))
    },[Amount, Tax])
    
    return (<>
        <Grid container>

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
                    value={slno+1}
                />
            </Grid>

            <Grid item xs={3} border="1px black solid" >
                <Autocomplete
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
                        setRate((newValue.Rate*100)/(Number(newValue.GSTPre) + 100));
                        setDiscount(0);
                        setTax(newValue.GSTPre);
                        setAmount(newValue.Rate);
                        // setGTotal(newValue.Rate - Discount)
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
                    value={Rate.toFixed(0)}
                    disabled
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
                    disabled
                    value={Tax}
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
                    value={Number(Amount).toFixed(0)}
                    onChange={(e)=>{setAmount(e.target.value)}}
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
                    value={DiscountP === 0?Discount:((DiscountP/100*Amount))}
                    disabled={DiscountP === 0? false:true}
                    onChange={(e)=>{setDiscount(e.target.value)}}
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
                    value={DiscountP === 0?(Amount - Discount):(Amount - (DiscountP/100*Amount))}
                    disabled
                    // onChange={(e)=>{setGTotal(e.target.value)}}
                />
            </Grid>

            <Grid item xs={1} border="1px black solid" >
                <Button
                    size="small"
                    sx={{
                        width: "100%",
                        '& .MuiInputBase-root': {
                            fontSize: "10px",
                            padding: "0px",  // Adjust padding for custom height
                        },
                        borderRadius: "0",
                        height: "100%"
                    }}
                    variant="contained"
                    color="success"
                    disabled={Rate>= 0 && Amount>=0?false:true}
                    onClick={()=>{handleAdd()}}
                >
                    Add
                </Button>
            </Grid>
        </Grid>
    </>)
}