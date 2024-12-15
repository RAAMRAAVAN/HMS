const { request } = require('express');
const sql = require('mssql/msnodesqlv8');

const replaceDigits = (b) => {
    let a = "IMR-0000000000";
    // Split 'a' to isolate the prefix and the numeric part
    let prefix = a.split('-')[0] + '-';
    let aNumeric = a.split('-')[1].split(''); // '000000000' as an array

    // Convert 'b' to a string and reverse it to start replacing from the ones place
    let bStr = b.toString().split('').reverse();

    // Iterate over each digit of 'b' and replace the corresponding value in 'aNumeric'
    for (let i = 0; i < bStr.length; i++) {
        aNumeric[aNumeric.length - 1 - i] = bStr[i]; // Replace from rightmost position
    }

    // Join the numeric part back and add the prefix
    return prefix + aNumeric.join('');
}

const replaceDigits3 = (b) => {
    let a = '10000000';
    // Convert 'a' to an array of characters
    let aArr = a.split(''); // '10000000' as an array

    // Convert 'b' to a string and reverse it to start replacing from the ones place
    let bStr = b.toString().split('').reverse();

    // Iterate over each digit of 'b' and replace the corresponding value in 'aArr'
    for (let i = 0; i < bStr.length; i++) {
        aArr[aArr.length - 1 - i] = bStr[i]; // Replace from rightmost position
    }

    // Join the modified array back into a string
    return aArr.join('');
}

const replaceDigits2 = (b) => {
    let a = 'CE00000000';
    // Convert 'a' to an array of characters
    let aArr = a.split(''); // '10000000' as an array

    // Convert 'b' to a string and reverse it to start replacing from the ones place -- 1355 -- 5531
    let bStr = b.toString().split('').reverse();

    // Iterate over each digit of 'b' and replace the corresponding value in 'aArr'
    for (let i = 0; i < bStr.length; i++) {
        aArr[aArr.length - 1 - i] = bStr[i]; // Replace from rightmost position
    }

    // Join the modified array back into a string
    return aArr.join('');
}

exports.filterServiceMaster = async (req, res) => {
    const like_name = req.body.like_name;
    // console.log(req.body.like_name)
    const request = new sql.Request();
    const query1 = `select SMD.Rate,SM.AID, SM.SID, SM.ServiceName, SM.ReportingName, SM.SubDepartmentID, SM.ReportFormatID, TAX.GSTPre,SM.SampleCollection, SM.SampleID from M_ServiceMaster AS SM
                    JOIN
                    M_ServiceMasterDetails AS SMD
                    ON SM.SID = SMD.SID
                    JOIN
                    V#GSTAccountPre AS TAX
                    ON TAX.AccountLedgerID = SM.TaxAccountID
                    where SM.ServiceName LIKE '%${like_name}%' AND SM.ActiveStatus='Y' AND SMD.Rate > 0`
    try {
        const filtered_Service_list = await request.query(query1);
        // console.log(filtered_patient_list)
        const combinedResults = {
            filtered_Service_list: filtered_Service_list.recordset
        }
        res.json(combinedResults)
    } catch (err) {
        res.status(500).json({ error: "Database Error" })
    }
}

exports.createCaseEntry = async (req, res) => {
    const { IPDID, Rate, Discount, Amount, NetAmount, RecAmount, date, time, UserID, UserName, Entries, paymentMethod, bank, trnID, Remark } = req.body;
    // console.log(req.body);
    const SINOquery = `select COUNT(*) AS SINO from Trn_CaseEntry where CaseDate='${date} 00:00:00.000'`
    const FetchPatientDetailsQuery = `select * from M_IPDAdmission where IPAID='${IPDID}'`;
    const FetchLastCaseEntryQuery = `select TOP 1 * from Trn_CaseEntry ORDER BY CaseID DESC`;
    const LastMoneyReceiptQuery = `select TOP 1 * from Trn_IPDMoneyReceipt ORDER BY ReceiptID DESC `
    const request = new sql.Request();
    try {
        const PatientDetails = await request.query(FetchPatientDetailsQuery);
        console.log("1")
        const FetchLastCaseEntry = await request.query(FetchLastCaseEntryQuery);
        const SINO = await request.query(SINOquery);
        console.log("SINO", SINO.recordset[0].SINO);
        const CreateCaseEntryQuery = `INSERT INTO Trn_CaseEntry (BranchID, HospitalID, PatientType, HRNo, CaseID, CaseNo, CaseDate, CaseTime, OPDIPDNo, LabSINo, DeliveryDate, DeliveryTime, PatientName, Gender, Age, Years, Months, Days, DOB, Address, TreatmentUpToDate, Package, MobileNo, CompanyID, DepartmentID, DoctorID, RefDoctorID, SampleCenterID, Total, ServiceCharegePer, ServiceCharegeRs, CancelServiceRs, DiscountPer, DiscountRs, Amount, OldDueAmount, GrandTotal, NetAmount, ReceiptAmount, BalanceAmount, MOD, BankID, ChequeDate, RoomNo, Remark, CheckInUser, CaseStatus, CaseCancel, CaseCancelDate, CaseCancelUserID, EntryType, FYearID, ActiveStatus, DeleteStatus, UserID, RTS, IPAddress, ModifyUserID, ModifyDate, IsUpload, IsUploadRTS, IPDID, DaySrNo, Disc)
VALUES(1, 1000001, 'I', ${PatientDetails.recordset[0].HRNo}, '${FetchLastCaseEntry.recordset[0].CaseID + 1}', '${replaceDigits2(FetchLastCaseEntry.recordset[0].CaseID + 1)}', '${date} 00:00:00.000', '1900-01-01 ${time}:00.000', '${PatientDetails.recordset[0].IPDNo}', '${SINO.recordset[0].SINO+1}', '${date} 00:00:00.000', '1900-01-01 ${time}:00.000', '${PatientDetails.recordset[0].PatientName}', '${PatientDetails.recordset[0].Gender}', '0', '${PatientDetails.recordset[0].Year}', '0', '0', '1900-01-01 00:00:00.000', '${PatientDetails.recordset[0].Address}', '1900-01-01 00:00:00.000', 0, '${PatientDetails.recordset[0].PhoneNo}', ${PatientDetails.recordset[0].CompanyID}, 0, 1, 1, 0, ${Rate}, 0.00, 0.00, 0.00, 0.00, ${Discount}, ${NetAmount}, 0.00, ${NetAmount}, ${NetAmount}, 0.00, ${NetAmount}, 'CR', 0, '1900-01-01 00:00:00.000', 'VIP-2', ' ', '${UserName}', 'P', 'N', '1900-01-01 00:00:00.000', 0, 'N', 1, 'Y', 'N', ${UserID}, '${date} ${time}:33.173', '08-BF-B8-74-07-C1', 0, '1900-01-01 00:00:00.000', 'Y', '${date} ${time}:33.173', ${IPDID}, 32, 0.00)`
        const Insert = await request.query(CreateCaseEntryQuery);
        for (const Entry of Entries) {
            const CreateCaseEntryDetailQuery = `INSERT INTO Trn_CaseEntryDetails (BranchID, HospitalID, CaseID, EntryID, TestID, Rate, GSTPre, Amount, DelDate, DelTime, Delivery_Days, ActiveStatus, DeleteStatus, UserID, RTS, IPAddress, ModifyUserID, ModifyDate, IsUpload, IsUploadRTS, FYearID, TestCancel, TestCancelDate, TestCancelUserID, IsPrinting, IsStatus, ReportDate, Delivered, DoneByDoctor, DPID, GSTAmount, Discountper, DiscountAmount)
                                                VALUES (1, 1000001, ${FetchLastCaseEntry.recordset[0].CaseID + 1}, 'N', ${Entry.Service.SID}, ${Entry.Rate}, 0, ${Entry.Amount - Entry.Discount}, '${date} 00:00:00.000', '1900-01-01 ${time}:00.000', 0, 'Y', 'N', ${UserID}, '${date} ${time}:00.000', '0,0,0,0', 0, NULL, 'Y', '${date} ${time}:00.000', 1, 'N', NULL, 0, 'Y', 'N', NULL, NULL, NULL, 0, 0.00, 0.00, ${Entry.Discount})`
            const CreateCaseEntryDetail = await request.query(CreateCaseEntryDetailQuery);
            switch (Entry.Service.ReportFormatID) {
                case ('N'): const fetcPropQuery = `select * from
                                            M_ServiceMaster
                                            where SID=${Entry.Service.SID} AND ActiveStatus='Y'`;
                    const fetchProp = await request.query(fetcPropQuery);
                    const GeneralTestReportingQuery = `INSERT INTO Trn_GeneralTestReporting (HospitalID, ReportType, CaseID, TestID, TestName, TestPropertiesID, TestPropertiesName, Value, UOM, Method, SpecialRemarks, ManualTest, ManualTestRepeat, MachineTest, MachineTestRepeat, TestFromOutSide, TestFromOutSideName, IsCollection, CollectionDate, CollectionTime, IsAnalysis, AnalysisDate, AnalysisTime, FYearID, ActiveStatus, DeleteStatus, UserID, RTS, IPAddress, ModifyUserID, ModifyDate, IsUpload, IsUploadRTS, OrderBy, ReportingDate)
                            VALUES(1000001,'Fixed', ${FetchLastCaseEntry.recordset[0].CaseID + 1}, ${Entry.Service.SID}, '${Entry.Service.ServiceName}', ${Entry.Service.SID}, '${Entry.Service.ServiceName}', '${fetchProp.recordset[0].Value}', '${fetchProp.recordset[0].UnitofMeasurment}', '${fetchProp.recordset[0].Method}', '', 'N', 0, 'N', 0, 'N', 'None', 'N', '1900-01-01 00:00:00.000', '1900-01-01 00:00:00.000', 'N', '1900-01-01 00:00:00.000', '1900-01-01 00:00:00.000', 1, 'Y', 'N', ${UserID}, '${date} ${time}:18.097', '0,0,0,0', 0, NULL, 'Y', '${date} ${time}:18.097', 0, NULL)`
                    const GeneralTestReporting = await request.query(GeneralTestReportingQuery);
                    break;
                case ('P'): const fetchPropertiesQuery = `select DISTINCT SMP.SelectedTestID, SM.ServiceName, SM.UnitofMeasurment, SM.Value, SM.Method, SM.SampleCollection, SM.MachineName, SM.MachineCode,SMP.TestHeading,SMP.OrderBy from M_ServiceMasterProperties AS SMP
                                                            JOIN
                                                            M_ServiceMaster AS SM
                                                            ON SM.SID=SMP.SelectedTestID
                                                            where SMP.SID=${Entry.Service.SID} AND SMP.ActiveStatus='Y' ORDER BY SMP.OrderBy`;
                    const fetchProperties = await request.query(fetchPropertiesQuery);
                    for (const property of fetchProperties.recordset) {
                        const GeneralTestReportingQuery = `
                                INSERT INTO Trn_GeneralTestReporting (
                                    HospitalID, ReportType, CaseID, TestID, TestName, TestPropertiesID, 
                                    TestPropertiesName, Value, UOM, Method, SpecialRemarks, ManualTest, 
                                    ManualTestRepeat, MachineTest, MachineTestRepeat, TestFromOutSide, 
                                    TestFromOutSideName, IsCollection, CollectionDate, CollectionTime, 
                                    IsAnalysis, AnalysisDate, AnalysisTime, FYearID, ActiveStatus, 
                                    DeleteStatus, UserID, RTS, IPAddress, ModifyUserID, ModifyDate, 
                                    IsUpload, IsUploadRTS, TestHeading, OrderBy, ReportingDate
                                ) 
                                VALUES (
                                    1000001, 'Profile', 
                                    ${FetchLastCaseEntry.recordset[0].CaseID + 1}, 
                                    ${Entry.Service.SID}, 
                                    '${Entry.Service.ServiceName}', 
                                    ${property.SelectedTestID}, 
                                    '${property.ServiceName}', 
                                    '${property.Value}', 
                                    '${property.UnitofMeasurment}', 
                                    '${property.Method}', 
                                    '', 'N', 0, 'N', 0, 'N', 
                                    'None', 'N', '1900-01-01 00:00:00.000', 
                                    '1900-01-01 00:00:00.000', 'N', 
                                    '1900-01-01 00:00:00.000', 
                                    '1900-01-01 00:00:00.000', 
                                    1, 'Y', 'N', ${UserID}, 
                                    '${date} ${time}:18.097', '0,0,0,0', 
                                    0, NULL, 'Y', 
                                    '${date} ${time}:18.097', 
                                    '${property.TestHeading}', 
                                    ${property.OrderBy}, NULL)`;

                        await request.query(GeneralTestReportingQuery);
                    }
                    break;
                case ('DF'):
                    const FetchDescriptiveFormatQuery = `select ReportingName, SubDepartmentID, TaxAccountID, ReportFormatID, DescriptiveFormat from M_ServiceMaster where SID='${Entry.Service.SID}' AND ActiveStatus='Y'`
                    const FetchDescriptiveFormat = await request.query(FetchDescriptiveFormatQuery);
                    const DescriptiveFormatQuery = `INSERT INTO Trn_DescriptiveFormatReporting (HospitalID, CaseID, TestID, TestName, DescriptiveFormat, FYearID, ActiveStatus, DeleteStatus, UserID, RTS, IPAddress, ModifyUserID, ModifyDate, IsUpload, IsUploadRTS)
                                                VALUES(1000001, ${FetchLastCaseEntry.recordset[0].CaseID + 1}, '${Entry.Service.SID}', '${Entry.Service.ServiceName}', '${FetchDescriptiveFormat.recordset[0].DescriptiveFormat}', 1, 'Y', 'N', ${UserID}, '${date} ${time}:44.247', '0,0,0,0', 0, NULL, 'Y', '${date} ${time}:44.247')`
                    const DescriptiveFormat = await request.query(DescriptiveFormatQuery);
                    break;
            }
        }
        if (paymentMethod !== "CR") {
            const LastMoneyReceipt = await request.query(LastMoneyReceiptQuery);
            const status = await request.query(`INSERT INTO Trn_IPDMoneyReceipt (BranchID, HospitalID,ReceiptID, ReceiptNo, ReceiptDate, ReceiptTime, ReceiptType, AdmitDate, HRNo, WardID, BedID, Age, PatientName, IPDNo, Address, TotalAmount, DiscountAmount, NetAmount, RecAmount, DueAmount, Remark, ReceiptCancel, ReceiptCancelDate, ReceiptCancelUserID, EntryType, FYearID, ActiveStatus, DeleteStatus, UserID, RTS, IPAddress, ModifyUserID, ModifyDate, IsUpload, IsUploadRTS, MOD, BankID, AccountNo, IPDID, PrintReceiptNo, CheckTrnsDate, CompanyType, CompanyID) 
                                            VALUES('1', '1000001', '${LastMoneyReceipt.recordset[0].ReceiptID + 1}', '${replaceDigits(LastMoneyReceipt.recordset[0].ReceiptID + 1)}', '${date} 00:00:00.000', '1900-01-01 ${time}:00.000', 'RA', '${new Date(PatientDetails.recordset[0].Date).toISOString().split("T")[0]} 00:00:00.000', '${PatientDetails.recordset[0].HRNo}', '${PatientDetails.recordset[0].WardID}', '${PatientDetails.recordset[0].BedID}', '0', '${PatientDetails.recordset[0].PatientName}', '${PatientDetails.recordset[0].IPDNo}', '${PatientDetails.recordset[0].Address}', '${RecAmount}', '0.00', '${RecAmount}', '${RecAmount}', '0.00', 'LAB-${FetchLastCaseEntry.recordset[0].CaseID + 1}: ${Remark}','N', '${date} ${time}:22.470', '0', 'N', '1', 'Y', 'N', '${UserID}', '${date} ${time}:00.000', '08-BF-B8-74-07-C1', '0', '1900-01-01 00:00:00.000', 'Y', '${date} ${time}:00.000', '${paymentMethod}', '${bank}', '${trnID}', '${IPDID}', '${replaceDigits3(LastMoneyReceipt.recordset[0].ReceiptID + 1)}', '${date} 00:00:00.000', 'N', '0')
                                            `);
        }

        res.json({ result: Insert.rowsAffected[0], CaseID:  FetchLastCaseEntry.recordset[0].CaseID + 1});
    } catch (err) {
        res.status(500).json({ err: err });
    }
}

exports.fetchCaseEntry = async (req, res) => {
    // console.log("working")
    const { ReceiptID } = req.body;
    const request = new sql.Request();
    const query = `select UM.FirstName,CE.* from Trn_CaseEntry AS CE 
                    JOIN
                    M_UserMaster AS UM
                    ON CE.UserID=UM.UId where CaseID ='${ReceiptID}'`
    try {
        const CaseEntry = await request.query(query);
        res.status(200).json({ CaseEntry: CaseEntry.recordset[0] });
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

exports.fetchCaseEntryDetails = async (req, res) => {
    const { CaseID } = req.body;
    const request = new sql.Request();
    const query = `select SM.SubDepartmentID, SDM.SubDepartmentName, SM.ServiceName,CED.AID, CED.CaseID, CED.Rate, CED.Amount, CED.ActiveStatus, CED.DeleteStatus, CED.UserID, CED.TestCancel, CED.Discountper, CED.DiscountAmount from Trn_CaseEntryDetails AS CED
                    JOIN
                    M_ServiceMaster AS SM
                    ON SM.SID=CED.TestID
                    JOIN
                    M_SubDepartmentMaster AS SDM
                    ON SDM.SubDId = SM.SubDepartmentID
                    where CED.CaseID='${CaseID}' ORDER BY SubDepartmentID desc`
    const sub_department_query = `select DISTINCT SM.SubDepartmentID, SDM.SubDepartmentName from Trn_CaseEntryDetails AS CED
                            JOIN    M_ServiceMaster AS SM
                                    ON SM.SID=CED.TestID
                                    JOIN
                                    M_SubDepartmentMaster AS SDM
                                    ON SDM.SubDId = SM.SubDepartmentID
                                    where CaseID=${CaseID}`
    try {
        const sub_departments = await request.query(sub_department_query);
        const groupedData = {}; // Initialize an empty object to store grouped data

        for (const sub_department of sub_departments.recordset) {
            // Query the database for each SubDepartmentID
            const sub_department_entry = await request.query(`
                SELECT 
                    SM.SubDepartmentID, 
                    SDM.SubDepartmentName, 
                    SM.ServiceName,
                    CED.AID, 
                    CED.CaseID, 
                    CED.Rate, 
                    CED.Amount, 
                    CED.ActiveStatus, 
                    CED.DeleteStatus, 
                    CED.UserID, 
                    CED.TestCancel, 
                    CED.Discountper, 
                    CED.DiscountAmount 
                FROM Trn_CaseEntryDetails AS CED
                JOIN M_ServiceMaster AS SM ON SM.SID = CED.TestID
                JOIN M_SubDepartmentMaster AS SDM ON SDM.SubDId = SM.SubDepartmentID
                WHERE CED.CaseID = '${CaseID}' 
                AND SM.SubDepartmentID = ${sub_department.SubDepartmentID} 
            `);
        
            // Extract SubDepartmentID
            const subDepartmentName= sub_department.SubDepartmentName;
        
            // Initialize the entry if it doesn't exist
            if (!groupedData[subDepartmentName]) {
                groupedData[subDepartmentName] = { entries: [], Total_Rate: 0, Total_Amount: 0, Total_DiscountAmount: 0, Total_DiscountPer: 0 };
            }
        
            // Append the recordset data to the `entries` array
            groupedData[subDepartmentName].entries.push(...sub_department_entry.recordset);
        
            // Update the total for the SubDepartmentID
            const TotalQuery = `SELECT 
                    SUM(Rate) AS Total_Rate, SUM(Amount) AS Total_Amount, SUM(DiscountAmount) AS Total_DiscountAmount, SUM(DiscountPer) AS Total_DiscountPer
                FROM Trn_CaseEntryDetails AS CED
                JOIN M_ServiceMaster AS SM ON SM.SID = CED.TestID
                JOIN M_SubDepartmentMaster AS SDM ON SDM.SubDId = SM.SubDepartmentID
                WHERE CED.CaseID = '${CaseID}'
                AND SM.SubDepartmentID = ${sub_department.SubDepartmentID} `

            const sub_department_total = await request.query(TotalQuery);
            console.log(sub_department_total.recordset[0].Total_Rate)
            groupedData[subDepartmentName].Total_Rate += sub_department_total.recordset[0].Total_Rate;
            groupedData[subDepartmentName].Total_Amount += sub_department_total.recordset[0].Total_Amount;
            groupedData[subDepartmentName].Total_DiscountAmount += sub_department_total.recordset[0].Total_DiscountAmount;
            groupedData[subDepartmentName].Total_DiscountPer += sub_department_total.recordset[0].Total_DiscountPer;
        }
        
        // Log or use the grouped data as needed
        // console.log(groupedData);
        

        const CaseEntryDetatils = await request.query(query);
        res.status(200).json({ CaseEntryDetails: CaseEntryDetatils.recordset, groupedData: groupedData});
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

exports.deleteIPDCaseEntry = async(req, res) => {
        const {CaseID} = req.body;
        console.log("IPD NO", CaseID)
        const request = new sql.Request();
        const query1 = `update Trn_CaseEntry set CaseCancel='Y', CaseCancelUserID=1, ActiveStatus='N', DeleteStatus='Y'  where CaseID=${CaseID};`;
        const query2=`update Trn_CaseEntryDetails set ActiveStatus='N', DeleteStatus='Y', TestCancel='Y' where CaseID=${CaseID};`
        try{
            const deleteCaseEntry = await request.query(query1);
            const deleteCaseEntryDetails = await request.query(query2);
            if (deleteCaseEntry.rowsAffected[0] >= 1)
                res.json({ Status: true})
            else 
                res.json({ Status: false})
        }catch (err){
            res.status(500).json({error: "Database Error", Status: false})
        }
    }

    exports.IPDCaseEntryDetails = async(req, res) => {
        const {CaseID} = req.body;
        console.log("IPD NO", CaseID)
        const request = new sql.Request();
        const query1 = `select * from Trn_CaseEntryDetails where CaseID=${CaseID}`;
        try{
            const IPDCaseEntryDetails = await request.query(query1);
            res.json({ IPDCaseEntryDetails: IPDCaseEntryDetails.recordset})
        }catch (err){
            res.status(500).json({error: "Database Error", Status: false})
        }
    }