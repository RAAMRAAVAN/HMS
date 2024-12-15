

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
exports.fetchIPDDoctorVisitList = async(req, res) => {
    const {IPDID} = req.body;
    console.log("IPD NO", IPDID)
    const request = new sql.Request();
    const query = `select * from Trn_IPDDoctorVisit where IPDID='${IPDID}'`;

    try{
        const IPDDoctorVisitList = await request.query(query);
        res.json({ IPDDoctorVisitList: IPDDoctorVisitList.recordset})
    }catch (err){
        res.status(500).json({error: "Database Error"})
    }
}

exports.getVisitListDetails = async(req, res) => {
    const {ReceiptID} = req.body;
    console.log("ReceiptID", ReceiptID)
    const request = new sql.Request();
    const query = `select DM.DoctorName,IDVD.* from Trn_IPDDoctorVisitDetails AS  IDVD
join
M_DoctorMaster AS DM
ON DM.DrId = IDVD.DrID
where ReceiptID='${ReceiptID}'`;

    try{
        const IPDDoctorVisitListDetails = await request.query(query);
        res.json({ IPDDoctorVisitListDetails: IPDDoctorVisitListDetails.recordset})
    }catch (err){
        res.status(500).json({error: "Database Error"})
    }
}

exports.UpdateVisitDetails = async (req, res) => {
    const {AID, Date, NoOfVisit, Discount, Amount, Rate, User, ActiveStatus, DeleteStatus} = req.body;
    console.log("ReceiptID", AID, Date, NoOfVisit, Discount, Amount, Rate, User, ActiveStatus, DeleteStatus)
    const request = new sql.Request();
    const query = `update Trn_IPDDoctorVisitDetails set Date='${Date} 00:00:00.000', NoOfVisit=${NoOfVisit}, Discount='${Discount}', Amount=${Amount}, Rate='${Rate}', UserID='${User}', ActiveStatus='${ActiveStatus}', DeleteStatus='${DeleteStatus}' where AID='${AID}'`;
    // , NoOfVisit='${NoOfVisit}', Discount='${Discount}', Amount='${Amount}', Rate='${Rate}', User='${User}'

    try{
        const UpdateDoctorVisitListDetails = await request.query(query);
        res.json({ UpdateDoctorVisitListDetails: UpdateDoctorVisitListDetails})
    }catch (err){
        res.status(500).json({error: "Database Error"})
    }
}

exports.deleteDoctorVisitEntries = async (req, res) => {
    const {ReceiptID, ActiveStatus, DeleteStatus} = req.body;
    console.log(ReceiptID, ActiveStatus, DeleteStatus)
    const request = new sql.Request();
    const query=`update Trn_IPDDoctorVisitDetails set ActiveStatus='${ActiveStatus}', DeleteStatus='${DeleteStatus}' where ReceiptID='${ReceiptID}'`
    const query2 = `update Trn_IPDDoctorVisit set ActiveStatus='${ActiveStatus}', DeleteStatus='${DeleteStatus}', ReceiptCancel='${DeleteStatus}' where ReceiptID='${ReceiptID}'`
    try{
        const UpdateDoctorVisitListDetails = await request.query(query);
        const UpdateDoctorVisitDetails = await request.query(query2);
        res.json({UpdateDoctorVisitListDetails: UpdateDoctorVisitListDetails});
    } catch (err){
        res.status(500).json({err: err})
    }
}

exports.getDoctorList = async (req, res) => {
    const query= `SELECT DrId, DoctorName, VisitCharge FROM M_DoctorMaster where ActiveStatus='Y'`
    const request = new sql.Request();
    try{
        const DoctorList = await request.query(query);
        res.json({DoctorList: DoctorList.recordset});
    }catch (err){
        res.status(500).json({err: err});
    }
}

exports.AddDoctorVisit = async (req, res) => {
    const {ReceiptID, DrId, Date, NoOfVisit, Rate, Discount, Amount} = req.body;
    console.log(ReceiptID, DrId, Date, NoOfVisit, Rate, Discount, Amount)
    const query=`INSERT INTO Trn_IPDDoctorVisitDetails (BranchID, HospitalID, ReceiptID, DrID, Date, Time, NoOfVisit, Rate, Discount, Amount, Remark, FYearID, ActiveStatus, DeleteStatus, UserID, RTS, IPAddress, ModifyUserID, ModifyDate, IsUpload, IsUploadRTS)
VALUES ('1', '1000001', '${ReceiptID}', '${DrId}', '${Date} 00:00:00.000', '1900-01-01 17:32:00.000', '${NoOfVisit}', '${Rate}', '${Discount}', '${Amount}', '','1', 'Y', 'N', '1', '${Date} 17:33:56.307', '00-00-00-00', '0', '1900-01-01 00:00:00.000', 'Y', '${Date} 17:33:56.310')
`;
    const request = new sql.Request();
    try{
        const InsertDoctorVisit = await request.query(query);
        res.json({InsertDoctorVisit: InsertDoctorVisit})
    }catch (err){
        res.status(500).json({err: err});
    }
}

exports.CreateDoctorVisit = async (req, res) => {
    const {ReceiptDate, ReceiptTime, IPDID,DrId, Date, NoOfVisit, Rate, Discount, Amount} = req.body;
    console.log(ReceiptDate, ReceiptTime, IPDID,DrId, Date, NoOfVisit, Rate, Discount, Amount)
    const query = `INSERT INTO Trn_IPDDoctorVisit (BranchID, HospitalID, ReceiptDate, ReceiptTime, ReceiptID, ReceiptNo, HRNo, IPDID, IPDNo, Year, Month, Days, PackageID, BedID, PatientName, PhoneNo, GenderID, Address, Remark, ReceiptCancel, ReceiptCancelDate, ReceiptCancelUserID, ReceiptCancelRemark, EntryType, FYearID, ActiveStatus, DeleteStatus, UserID, RTS, IPAddress, ModifyUserID, ModifyDate, IsUpload, IsUploadRTS, PrintDVNo)
VALUES ('1', '1000001', '2024-04-23 00:00:00.000', '1900-01-01 07:40:00.000', '1433', 'DR-0001433', '13701', '1034','IPD/23-24/1034', '58', '0', '0', '0', '23', 'DHARANI BORA', '7002569438', 'M', 'DIMORUGURI,NAGAON', '','N', '2024-09-27 13:06:08.493', '0', '','N', '1','Y', 'N', '1', '2024-09-27 13:06:08.490', '08-BF-B8-74-07-C1', '0', '1900-01-01 00:00:00.000', 'Y', '2024-09-27 13:06:08.493', '1426')
`;
    const queryGetLastEntry = `select TOP 1 ReceiptID from Trn_IPDDoctorVisit ORDER BY ReceiptID DESC`;
    const queryGetPatientDetails = `select * from M_IPDAdmission where IPAID='${IPDID}'`
    const request = new sql.Request();
    try{
        const GetLastEntry = await request.query(queryGetLastEntry);
        const getPatientDetails = await request.query(queryGetPatientDetails);
        console.log(GetLastEntry.recordset[0].ReceiptID + 1, getPatientDetails.recordset[0]);
        CreateDoctorVisitList = await request.query(`INSERT INTO Trn_IPDDoctorVisit (BranchID, HospitalID, ReceiptDate, ReceiptTime, ReceiptID, ReceiptNo, HRNo, IPDID, IPDNo, Year, Month, Days, PackageID, BedID, PatientName, PhoneNo, GenderID, Address, Remark, ReceiptCancel, ReceiptCancelDate, ReceiptCancelUserID, ReceiptCancelRemark, EntryType, FYearID, ActiveStatus, DeleteStatus, UserID, RTS, IPAddress, ModifyUserID, ModifyDate, IsUpload, IsUploadRTS, PrintDVNo)
VALUES ('1', '1000001', '${ReceiptDate} 00:00:00.000', '1900-01-01 ${ReceiptTime}', '${GetLastEntry.recordset[0].ReceiptID + 1}', '${replaceDigits(GetLastEntry.recordset[0].ReceiptID + 1)}', '${getPatientDetails.recordset[0].HRNo}', '${getPatientDetails.recordset[0].IPAID}','${getPatientDetails.recordset[0].IPDNo}', '${getPatientDetails.recordset[0].Year}', '0', '0', '0', '${getPatientDetails.recordset[0].BedID}', '${getPatientDetails.recordset[0].PatientName}', '${getPatientDetails.recordset[0].PhoneNo}', '${getPatientDetails.recordset[0].Gender}', '${getPatientDetails.recordset[0].Address}', '','N', '${ReceiptDate} ${ReceiptTime}', '0', '','N', '1','Y', 'N', '1', '${ReceiptDate} ${ReceiptTime}', '08-BF-B8-74-07-C1', '0', '1900-01-01 00:00:00.000', 'Y', '${ReceiptDate} ${ReceiptTime}', '${GetLastEntry.recordset[0].ReceiptID + 1}')
`);
        const InsertDoctorVisit = await request.query(`INSERT INTO Trn_IPDDoctorVisitDetails (BranchID, HospitalID, ReceiptID, DrID, Date, Time, NoOfVisit, Rate, Discount, Amount, Remark, FYearID, ActiveStatus, DeleteStatus, UserID, RTS, IPAddress, ModifyUserID, ModifyDate, IsUpload, IsUploadRTS)
VALUES ('1', '1000001', '${GetLastEntry.recordset[0].ReceiptID + 1}', '${DrId}', '${Date} 00:00:00.000', '1900-01-01 17:32:00.000', '${NoOfVisit}', '${Rate}', '${Discount}', '${Amount}', '','1', 'Y', 'N', '1', '${Date} 17:33:56.307', '00-00-00-00', '0', '1900-01-01 00:00:00.000', 'Y', '${Date} 17:33:56.310')
`);
        res.json({CreateDoctorVisitList: CreateDoctorVisitList})
    }catch(err){
        res.status(500).json({err: err});
    }
}

exports.getDoctorVisitPermissions = async(req, res) => {
    const {Uid, MenuID} = req.body;
    const query = `select IsActive, U_View, U_Add, U_Update, U_Delete, U_Print from Tbl_UserRightDetails where UserId='${Uid}' AND MenuId='${MenuID}'`;
    const request = new sql.Request();
    try{
        const getPermissionList = await request.query(query);
        console.log(getPermissionList.recordset.length)
        if(getPermissionList.recordset.length === 0)
            res.json({PermissionStatus: "Declined"});
        else
            res.json({PermissionStatus: "Accepted", PermissionList: getPermissionList.recordset[0]});
    }catch(err){
        res.status(500).json({error: "Databaase Error"});
    }
}