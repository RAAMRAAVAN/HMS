

const { request } = require('express');
const { query } = require('msnodesqlv8');
const replaceDigits = (b) => {
    let a="DR-0000000";
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
const sql = require('mssql/msnodesqlv8');
exports.fetchOtherServicesList = async(req, res) => {
    const {IPDID} = req.body;
    // console.log("IPD NO", IPDNo)
    const request = new sql.Request();
    const query = `select * from Trn_IPDOtherService where IPDID='${IPDID}'`;

    try{
        const OtherServicesList = await request.query(query);
        res.json({ OtherServicesList: OtherServicesList.recordset})
    }catch (err){
        res.status(500).json({error: "Database Error"})
    }
}

exports.getServiceListDetails = async(req, res) => {
    const {OSID} = req.body;
    // console.log("OSID", OSID)
    const request = new sql.Request();
    const query = `select SM.ReportingName,IDVD.* from Trn_IPDOtherServiceDetails AS  IDVD
join
M_ServiceMaster AS SM
ON SM.SID = IDVD.SId
where OSID='${OSID}'`;

    try{
        const IPDDoctorVisitListDetails = await request.query(query);
        res.json({ IPDDoctorVisitListDetails: IPDDoctorVisitListDetails.recordset})
    }catch (err){
        res.status(500).json({error: "Database Error"})
    }
}

exports.UpdateServiceDetails = async (req, res) => {
    const {AID, OSID,Qty, Discount, Amount, Rate, User, ActiveStatus, DeleteStatus, NetAmount} = req.body;
    // console.log("ReceiptID", AID, Qty, Discount, Amount, Rate, User, ActiveStatus, DeleteStatus)
    const request = new sql.Request();
    const query = `update Trn_IPDOtherServiceDetails set Qty='${Qty}', Discount='${Discount}', NetAmount=${NetAmount}, Rate='${Rate}', GrossAmount='${Amount}',UserID='${User}', ActiveStatus='${ActiveStatus}', DeleteStatus='${DeleteStatus}' where AID='${AID}'`;
    const query2 = `select Sum(GrossAmount) AS Sum from Trn_IPDOtherServiceDetails where OSID='${OSID}' AND ActiveStatus='Y'`;
    // , NoOfVisit='${NoOfVisit}', Discount='${Discount}', Amount='${Amount}', Rate='${Rate}', User='${User}'
    let AmountUpdate;
    try{
        const UpdateServiceDetails = await request.query(query);
        if(UpdateServiceDetails.rowsAffected[0]){
            const Sum= await request.query(query2);
            AmountUpdate = await request.query(`update Trn_IPDOtherService set TotalAmount='${Sum.recordset[0].Sum}', NetAmount='${Sum.recordset[0].Sum}', RecAmount='${Sum.recordset[0].Sum}' where OSID='${OSID}'`)
            // console.log("Sum=",Sum.recordset[0].Sum);
        }
        // console.log(UpdateServiceDetails.rowsAffected[0]);
        res.json({ UpdateServiceDetails: UpdateServiceDetails})
    }catch (err){
        res.status(500).json({error: "Database Error"})
    }
}

exports.deleteOtherServiceEntries = async (req, res) => {
    const {OSID, ActiveStatus, DeleteStatus} = req.body;
    // console.log(OSID, ActiveStatus, DeleteStatus)
    const request = new sql.Request();
    const query=`update Trn_IPDOtherService set ReceiptCancel='${DeleteStatus}', ActiveStatus='${ActiveStatus}', DeleteStatus='${DeleteStatus}' where OSID='${OSID}'`
    const query2 = `update Trn_IPDOtherServiceDetails set ActiveStatus='${ActiveStatus}', DeleteStatus='${DeleteStatus}' where OSID='${OSID}'`
    try{
        const deleteOtherServiceEntries1 = await request.query(query);
        const deleteOtherServiceEntries2 = await request.query(query2);
        res.json({deleteOtherServiceEntries: deleteOtherServiceEntries1});
    } catch (err){
        res.status(500).json({err: err})
    }
}

exports.getServiceList = async (req, res) => {
    const query= `select SM.SID, SM.ServiceName, SMD.Rate,SM.SubDepartmentID from M_ServiceMaster AS SM
join 
M_ServiceMasterDetails AS SMD
ON SMD.SID=SM.SID
where SM.ActiveStatus='Y'`
    const request = new sql.Request();
    try{
        const ServiceList = await request.query(query);
        res.json({ServiceList: ServiceList.recordset});
    }catch (err){
        res.status(500).json({err: err});
    }
}

exports.AddService = async (req, res) => {
    // props.OSID,Service.SID, Qty, Rate, Amount, Discount, '1'
    const {OSID, SID, Qty, Rate, Discount, Amount, UserID, NetAmount} = req.body;
    // console.log(OSID, SID, Qty, Rate, Discount, Amount, UserID)
    const query=`INSERT INTO Trn_IPDOtherServiceDetails (BranchID, HospitalID,OSID, SId, Rate, GSTPer, NetAmount, EntryType, FYearID, ActiveStatus, DeleteStatus, UserID, RTS, IPAddress, ModifyUserID, ModifyDate, IsUpload, IsUploadRTS, Qty, Discount, DiscountPer, GSTAmount, GSTAccountID, GrossAmount)
VALUES ('1', '1000001', '${OSID}', '${SID}', '${Rate}', '0', '${NetAmount}', 'N','1','Y', 'N', '1', '2024-10-08 17:27:06.197', '00-00-00-00', '0', '1900-01-01 00:00:00.000', 'Y', '2024-10-08 17:27:06.207', '${Qty}', '${Discount}', '0', '0', '0', '${Amount}')
`;
    const query2 = `select Sum(GrossAmount) AS Sum from Trn_IPDOtherServiceDetails where OSID='${OSID}' AND ActiveStatus='Y'`;

    const request = new sql.Request();
    try{
        // const fetchOtherService = await request.query(query3);
        // console.log("fetchOtherService", fetchOtherService.recordset[0].TotalAmount);
        const InsertService = await request.query(query);
        let AmountUpdate;
        if(InsertService.rowsAffected[0]){
            const Sum= await request.query(query2);
            AmountUpdate = await request.query(`update Trn_IPDOtherService set TotalAmount='${Sum.recordset[0].Sum}', NetAmount='${Sum.recordset[0].Sum}', RecAmount='${Sum.recordset[0].Sum}' where OSID='${OSID}'`)
            // console.log("Sum=",Sum.recordset[0].Sum);
        }
        // const UpdateOtherService = await request.query(`update Trn_IPDOtherService set TotalAmount='${fetchOtherService.recordset[0].TotalAmount + Amount}', NetAmount='${fetchOtherService.recordset[0].TotalAmount + Amount}', RecAmount='${fetchOtherService.recordset[0].TotalAmount + Amount}' where OSID='${OSID}'`)
        res.json({InsertService: InsertService})
    }catch (err){
        res.status(500).json({err: err});
    }
}

exports.CreateOtherService = async (req, res) => {
    const {ReceiptDate, ReceiptTime, IPDID,SID,Qty, Rate, Discount, Amount, NetAmount} = req.body;
    // console.log(ReceiptDate, ReceiptTime, IPDNo,SID,Qty, Rate, Discount, Amount)

    const queryGetLastEntry = `select TOP 1 OSID from Trn_IPDOtherService ORDER BY OSID DESC`;
    const queryGetPatientDetails = `select * from M_IPDAdmission where IPAID='${IPDID}'`
    const request = new sql.Request();
    try{
        const GetLastEntry = await request.query(queryGetLastEntry);
        const getPatientDetails = await request.query(queryGetPatientDetails);
        // console.log(GetLastEntry.recordset[0].OSID + 1, getPatientDetails.recordset[0]);
        CreateDoctorVisitList = await request.query(`INSERT INTO Trn_IPDOtherService (OSID, SeriesID, BranchID, HospitalID, OCNo, Date, Time, HRNo, Age, MaritalStatus, IPDID, IPDNo, Gender, AdmitDate, PackageID, CompanyID, PatientName, Complementry, TotalAmount, DiscountAmount, NetAmount, RecAmount, BalanceAmount, Remark, ReceiptCancel, ReceiptCancelDate, ReceiptCancelUserID, ReceiptCancelRemark, EntryType, FYearID, ActiveStatus, DeleteStatus, UserID, RTS, IPAddress, ModifyUserID, ModifyDate, IsUpload, IsUploadRTS, PrintOSNo)
VALUES ('${GetLastEntry.recordset[0].OSID + 1}', '1', '1', '1000001', 'OC-000${GetLastEntry.recordset[0].OSID + 1}', '${ReceiptDate} 00:00:00.000', '1900-01-01 ${ReceiptTime}', '${getPatientDetails.recordset[0].HRNo}', '${getPatientDetails.recordset[0].Year}', '${getPatientDetails.recordset[0].MaritalStatus}', '${getPatientDetails.recordset[0].IPAID}', '${getPatientDetails.recordset[0].IPDNo}', '${getPatientDetails.recordset[0].Gender}', '${getPatientDetails.recordset[0].Date.toISOString().split("T")[0]} 00:00:00.000', '0', '${getPatientDetails.recordset[0].CompanyID}', '${getPatientDetails.recordset[0].PatientName}', 'N', '${Amount}', '0', '${Amount}', '${Amount}', '0', '', 'N', null, '0','', 'O', '1', 'Y', 'N', '1', '${ReceiptDate} ${ReceiptTime}', '192.168.1.6', '0', null, 'Y', '${ReceiptDate} ${ReceiptTime}', '${GetLastEntry.recordset[0].OSID + 1}')
`);         
        const InsertOtherServices = await request.query(`INSERT INTO Trn_IPDOtherServiceDetails (BranchID, HospitalID,OSID, SId, Rate, GSTPer, NetAmount, EntryType, FYearID, ActiveStatus, DeleteStatus, UserID, RTS, IPAddress, ModifyUserID, ModifyDate, IsUpload, IsUploadRTS, Qty, Discount, DiscountPer, GSTAmount, GSTAccountID, GrossAmount)
VALUES ('1', '1000001', '${GetLastEntry.recordset[0].OSID + 1}', '${SID}', '${Rate}', '0', '${NetAmount}', 'N','1','Y', 'N', '1', '2024-10-08 17:27:06.197', '00-00-00-00', '0', '1900-01-01 00:00:00.000', 'Y', '2024-10-08 17:27:06.207', '${Qty}', '${Discount}', '0', '0', '0', '${Amount}')
`);
        res.json({CreateDoctorVisitList: CreateDoctorVisitList})
    }catch(err){
        res.status(500).json({err: err});
    }
}
