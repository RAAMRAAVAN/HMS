import { Box, Tab } from "@mui/material"
import { DatePicker, TabContext, TabList, TabPanel } from "@mui/lab";
import { useEffect, useState } from "react";
import { Favorite } from "@mui/icons-material";
import { IPDAdmission } from "./IPDAdmission";
import { IPDBill } from "./IPDBill";
import {LabCaseEntry} from "./CaseEntry/LabCaseEntry";
import { OTDischarge } from "./OTDischarge/OTDischarge";
import { MoneyReceipt } from "./MoneyReceipt/MoneyReceipt";
import { DoctorVisit } from "./DoctorVisit/DoctorVisit";
import { OtherServices } from "./OtherServices/OtherServices";
import { useSelector } from "react-redux";
import { OTBilling } from "./OTBilling/OTBilling";
import { selectIPDNo, selectselectedPatient } from "@/src/lib/features/IPDPatient/IpdPatientSlice";
import axios from "axios";
import {getPermissions} from "../../Const/Permissions"
import { selectUserDetails } from "@/src/lib/features/userLoginDetails/userSlice";
import {IPDAdmit} from "./IPDAdmit/IPDAdmit"


export const IPDNav = () => {
    const IPDNo = useSelector(selectIPDNo);
    
    const UserDetails = useSelector(selectUserDetails);
    const [Permissions, setPermissions] = useState({ DoctorVisit: false, OtherService: false, IPDMoneyReceipt: false })
    console.log("UserID", UserDetails);
    // const {IPDNo} = props;
    const [value, setvalue] = useState("1");
    const handleChange = (event, newValue) => {
        setvalue(newValue);
    };

    const getDoctorVisitPermissions = async () => {
        try{
            let value = await getPermissions(UserDetails.UId, 435)
            value === "True"?setPermissions(prevPermissions => ({
                ...prevPermissions,
                DoctorVisit: true,
            })):null;
        }catch(err){
            alert(err)
        }
    }

    const getOtherServicePermissions = async () => {
        try{
            let value = await getPermissions(UserDetails.UId, 426)
            value === "True"?setPermissions(prevPermissions => ({
                ...prevPermissions,
                OtherService: true,
            })):null;
        }catch(err){
            alert(err)
        }
    }
    //438
    const getIPDMoneyReceiptPermissions = async () => {
        try{
            let value = await getPermissions(UserDetails.UId, 438)
            value === "True"?setPermissions(prevPermissions => ({
                ...prevPermissions,
                IPDMoneyReceipt: true,
            })):null;
        }catch(err){
            alert(err)
        }
    }
    useEffect(() => {
        if(UserDetails != {})
        {   console.log("User Details=", UserDetails);
            getDoctorVisitPermissions();
            getOtherServicePermissions();
            getIPDMoneyReceiptPermissions();
        }
    }, [])
    return IPDNo != null ? (<>
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

                            {Permissions.DoctorVisit?<Tab label="Case Entry" value="2" />:null}
                            {Permissions.DoctorVisit?<Tab label="Doctor Visit" value="5" />:null}
                            
                            {Permissions.OtherService?<Tab label="Medical Service" value="6" />:null}
                            {Permissions.IPDMoneyReceipt?<Tab label="Money Receipt" value="7" />:null}
                            <Tab label="OT Billing" value="4" />
                            <Tab label="Discharge Summary" value="3" />
                            <Tab label="IPD BILL" value="8" />
                        </TabList>
                    </Box>
                    <TabPanel value="1" sx={{ padding: "0", margin: "0" }}>
                        <IPDAdmission />
                    </TabPanel>
                    <TabPanel value="2" sx={{ padding: "0", margin: "0" }}>
                        <LabCaseEntry/>
                    </TabPanel>
                    <TabPanel value="8" sx={{ padding: "0", margin: "0" }}>
                        <IPDBill />
                    </TabPanel>
                    <TabPanel value="3">
                        <OTDischarge />
                    </TabPanel>
                    <TabPanel value="4"><OTBilling /></TabPanel>
                    <TabPanel value="5">
                        <DoctorVisit />
                    </TabPanel>
                    <TabPanel value="6">
                        <OtherServices />
                    </TabPanel>
                    <TabPanel value="7"><MoneyReceipt /></TabPanel>
                    <TabPanel value="10">Panel Two</TabPanel>
                    <TabPanel value="9">asd</TabPanel>
                </TabContext>
            </Box>
        </Box>
    </>) : <><IPDAdmit/></>;
}