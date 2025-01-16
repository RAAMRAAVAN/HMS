import { Box, Tab } from "@mui/material"
import { DatePicker, TabContext, TabList, TabPanel } from "@mui/lab";
import { useEffect, useRef, useState } from "react";
import { Favorite } from "@mui/icons-material";

export const PharmacyNav = () => {
    const [value, setvalue] = useState("1");
    const handleChange = (event, newValue) => {
        setvalue(newValue);
    };
    
    return (<>
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
                            <Tab label="Sales" value="1" icon={<Favorite />} iconPosition='start' />

                            <Tab label="Sales List" value="2" />
                            <Tab label="Godawn Transfer" value="3" />
                            <Tab label="Purchase" value="4" />

                            <Tab label="Purchase List" value="5" />
                            <Tab label="Current Stock" value="6" />
                            <Tab label="Item List" value="7" />
                            
                            <Tab label="IPD BILL" value="8" />
                        </TabList>
                    </Box>
                    <TabPanel value="1" sx={{ padding: "0", margin: "0" }}>
                        {/* <IPDAdmission /> */}
                    </TabPanel>
                    <TabPanel value="2" sx={{ padding: "0", margin: "0" }}>
                        {/* <LabCaseEntry /> */}
                    </TabPanel>
                    <TabPanel value="8" sx={{ padding: "0", margin: "0" }}>
                        {/* <IPDBill /> */}
                    </TabPanel>
                    <TabPanel value="3">
                        {/* <OTDischarge /> */}
                    </TabPanel>
                    <TabPanel value="4">
                        {/* <OTBilling /> */}
                    </TabPanel>
                    <TabPanel value="5">
                        {/* <DoctorVisit /> */}
                    </TabPanel>
                    <TabPanel value="6">
                        {/* <OtherServices /> */}
                    </TabPanel>
                    <TabPanel value="7">
                        {/* <MoneyReceipt  /> */}
                    </TabPanel>
                    <TabPanel value="10">Panel Two</TabPanel>
                    <TabPanel value="9">asd</TabPanel>
                </TabContext>
            </Box>
        </Box>
    </>)
}