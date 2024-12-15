import { Box, Tab } from "@mui/material"
import { DatePicker, TabContext, TabList, TabPanel } from "@mui/lab";
import { useState } from "react";
import { Favorite } from "@mui/icons-material";
import { IPDAdmissionList } from "./IPDAdmissionList";


export const IPDListNav = () => {
    const [value, setvalue] = useState("1");
    const handleChange = (event, newValue) => {
        setvalue(newValue);
    };
    return(<>
    <Box padding={0} marginX={0} sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ display: "flex", flexDirection: "column", alignContent: "center" }}>
                <TabContext value={value} padding={0} margin={0}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider", display: "flex", justifyContent: "center", alignItems: "center" }} >
                        <TabList
                            aria-label="Tabs example"
                            onChange={handleChange}
                            textColor="secondary"
                            indicatorColor="secondary"
                            centered
                            variant='scrollable'
                            scrollButtons='auto'
                        // sx={{display:"flex",justifyContent:"center"}}
                        >
                            <Tab label="Patient Admission" value="1" icon={<Favorite />} iconPosition='start' />
                            {/* <Tab label="Admission List" value="2" /> */}
                            <Tab label="Other Services" value="3" />
                            {/* <Tab label="Other Services List" value="4" /> */}
                            <Tab label="Doctor Visit" value="5" />
                            {/* <Tab label="Doctor Visit List" value="6" /> */}
                            <Tab label="Money Receipt" value="7" />
                            {/* <Tab label="Money Receipt List" value="8" /> */}
                            <Tab label="Bed Transfer" value="9" />
                            {/* <Tab label="Bed Transfer List" value="9" /> */}
                            <Tab label="Discharge" value="9" />
                            {/* <Tab label="Discharge List" value="9" /> */}
                            <Tab label="Estimate Bill" value="9" />
                            <Tab label="Final Bill" value="9" />
                        </TabList>
                    </Box>
                    <TabPanel value="1" sx={{ padding: "0", margin: "0" }}>
                        <IPDAdmissionList/>
                    </TabPanel>
                    <TabPanel value="2" sx={{ padding: "0", margin: "0" }}>
                        {/* <PurchaseBilling/> */}
                    </TabPanel>
                    <TabPanel value="3">
                        {/* <CustomerInfo /> */}
                        {/* <Billing /> */}
                        {/* <Save /> */}
                    </TabPanel>
                    <TabPanel value="4">asd</TabPanel>
                    <TabPanel value="5">
                        {/* <PurchaseBills/> */}
                    </TabPanel>
                    <TabPanel value="6">
                        {/* <SellBills/> */}
                    </TabPanel>
                    <TabPanel value="7">asd</TabPanel>
                    <TabPanel value="8">Panel Two</TabPanel>
                    <TabPanel value="9">asd</TabPanel>
                </TabContext>
            </Box>
            {/* <Button>Sale Bill</Button>
            <Button>Purchase Bill</Button>
            <Button>Return Bill</Button> */}
        </Box>
    </>)
}