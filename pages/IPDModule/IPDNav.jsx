import { Box, Tab } from "@mui/material"
import { DatePicker, TabContext, TabList, TabPanel } from "@mui/lab";
import { useState } from "react";
import { Favorite } from "@mui/icons-material";
import { IPDAdmission } from "./IPDAdmission";
import { IPDBill } from "./IPDBill";
import { OTDischarge } from "./OTDischarge/OTDischarge";
import { MoneyReceipt } from "./MoneyReceipt/MoneyReceipt";
import { DoctorVisit } from "./DoctorVisit/DoctorVisit";
import { OtherServices } from "./OtherServices/OtherServices";
import { useSelector } from "react-redux";
import { OTBilling } from "./OTBilling/OTBilling";


export const IPDNav = () => {
    const IPDNo=useSelector(state=>state.ipdPatientReducer.IPDNo)
    // const {IPDNo} = props;
    const [value, setvalue] = useState("1");
    const handleChange = (event, newValue) => {
        setvalue(newValue);
    };
    return IPDNo!=null?(<>
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
                            <Tab label="IPD BILL" value="2" />
                            {/* <Tab label="Other Services List" value="4" /> */}
                            <Tab label="Discharge Summary" value="3" />
                            <Tab label="OT Billing" value="4" />
                            <Tab label="Doctor Visit" value="5" />
                            <Tab label="Medical Service" value="6" />
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
                        <IPDAdmission IPDNo={IPDNo}/>
                    </TabPanel>
                    <TabPanel value="2" sx={{ padding: "0", margin: "0" }}>
                        <IPDBill IPDNo={IPDNo}/>
                    </TabPanel>
                    <TabPanel value="3">
                        <OTDischarge IPDNo={IPDNo}/>
                    </TabPanel>
                    <TabPanel value="4"><OTBilling/></TabPanel>
                    <TabPanel value="5">
                        <DoctorVisit IPDNo={IPDNo}/>
                    </TabPanel>
                    <TabPanel value="6">
                        <OtherServices IPDNo={IPDNo}/>
                    </TabPanel>
                    <TabPanel value="7"><MoneyReceipt IPDNo={IPDNo}/></TabPanel>
                    <TabPanel value="8">Panel Two</TabPanel>
                    <TabPanel value="9">asd</TabPanel>
                </TabContext>
            </Box>
        </Box>
    </>):<></>;
}