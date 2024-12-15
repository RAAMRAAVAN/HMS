
const { request } = require('express');
const sql = require('mssql/msnodesqlv8');

const replaceDigits = (b) => {
    let a="IMR-0000000000";
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

  const replaceDigits2 = (b) => {
    let a='10000000';
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
  

exports.fetchIPDMoneyReceipts = async(req, res) => {
    const {IPDID} = req.body;
    // console.log("IPD NO", IPDNo)
    const request = new sql.Request();
    const query = `select UM.FirstName,IMR.* from Trn_IPDMoneyReceipt IMR
join
M_UserMaster AS UM
ON UM.UId=IMR.UserID
where IPDID='${IPDID}' AND IMR.ActiveStatus='Y' AND IMR.DeleteStatus='N'`
    try{
        const IPDMoneyReceiptList = await request.query(query);
        //   const doctorVisits = await request.query(query2);
        res.json({ IPDMoneyReceiptList: IPDMoneyReceiptList.recordset})
    }catch (err){
        res.status(500).json({error: "Database Error"})
    }
}

exports.fetchIPDMoneyReceiptDetails = async(req, res) => {
        const {ReceiptID} = req.body;
        // console.log("IPD NO")
        const request = new sql.Request();
        const query = `select BM.BedNo,IAD.Date AS AdmDate, IAD.Time AS AdmTime, IAD.Year, IAD.Month, IAD.Days, IAD.PhoneNo,UM.FirstName,IMR.* from Trn_IPDMoneyReceipt IMR
    join
    M_UserMaster AS UM
    ON UM.UId=IMR.UserID
	join
	M_IPDAdmission AS IAD
	ON IAD.IPDNo=IMR.IPDNo
	join
	M_BedMaster AS BM
	ON BM.IPDHRNo=IAD.HRNo
    where ReceiptID='${ReceiptID}'`
        try{
            const IPDMoneyReceipt = await request.query(query);
            //   const doctorVisits = await request.query(query2);
            res.json({ IPDMoneyReceipt: IPDMoneyReceipt.recordset[0]})
        }catch (err){
            res.status(500).json({error: "Database Error"})
        }
    }

    exports.deleteIPDMoneyReceipt = async(req, res) => {
        const {ReceiptID} = req.body;
        // console.log("IPD NO", ReceiptID)
        const request = new sql.Request();
        const query = `update Trn_IPDMoneyReceipt set ReceiptCancel='Y' where ReceiptID='${ReceiptID}'`
        try{
            const status = await request.query(query);
            //   const doctorVisits = await request.query(query2);
            // console.log(status.rowsAffected[0] >= 1)
            if (status.rowsAffected[0] >= 1)
                res.json({ Status: true})
            else 
                res.json({ Status: false})
        }catch (err){
            res.status(500).json({error: "Database Error", Status: false})
        }
    }


exports.addMoneyReceipt = async(req, res) => {
    const {ReceiptDate, ReceiptTime, AdmitDate, HRNo, UserID,WardID, BedID, PatientName, IPDNo, Address, TotalAmount, Remark, MOD, AccountNo, IPDID, BankID} = req.body;
    const request = new sql.Request();
    const LastMoneyReceiptQuery = `select TOP 1 * from Trn_IPDMoneyReceipt ORDER BY ReceiptID DESC `
    // console.log(ReceiptDate, ReceiptTime, AdmitDate, HRNo, WardID, BedID, PatientName, IPDNo, Address, TotalAmount, Remark, MOD, AccountNo, IPDID, BankID)
    
try{
    const LastMoneyReceipt = await request.query(LastMoneyReceiptQuery);
    // console.log("Last=", `INSERT INTO Trn_IPDMoneyReceipt (BranchID, HospitalID,ReceiptID, ReceiptNo, ReceiptDate, ReceiptTime, ReceiptType, AdmitDate, HRNo, WardID, BedID, Age, PatientName, IPDNo, Address, TotalAmount, DiscountAmount, NetAmount, RecAmount, DueAmount, Remark, ReceiptCancel, ReceiptCancelDate, ReceiptCancelUserID, EntryType, FYearID, ActiveStatus, DeleteStatus, UserID, RTS, IPAddress, ModifyUserID, ModifyDate, IsUpload, IsUploadRTS, MOD, BankID, AccountNo, IPDID, PrintReceiptNo, CheckTrnsDate, CompanyType, CompanyID) 
    // VALUES('1', '1000001', '${LastMoneyReceipt.recordset[0].ReceiptID + 1}', 'IMR-0000000000', '${ReceiptDate} 00:00:00.000', '1900-01-01 ${ReceiptTime}', 'RA', '${AdmitDate} 00:00:00.000', '${HRNo}', '${WardID}', '${BedID}', '0', '${PatientName}', '${IPDNo}', '${Address}', '${TotalAmount}', '0.00', '${TotalAmount}', '${TotalAmount}', '0.00', '${Remark}','N', '2024-09-28 08:55:22.470', '0', 'N', '1', 'Y', 'N', '1', '${ReceiptDate} ${ReceiptTime}', '08-BF-B8-74-07-C1', '0', '1900-01-01 00:00:00.000', 'Y', '${ReceiptDate} ${ReceiptTime}', '${MOD}', '${BankID}', '${AccountNo}', '${IPDID}', '10000000', '${ReceiptDate} 00:00:00.000', 'N', '0')
    // `);
    const status = await request.query(`INSERT INTO Trn_IPDMoneyReceipt (BranchID, HospitalID,ReceiptID, ReceiptNo, ReceiptDate, ReceiptTime, ReceiptType, AdmitDate, HRNo, WardID, BedID, Age, PatientName, IPDNo, Address, TotalAmount, DiscountAmount, NetAmount, RecAmount, DueAmount, Remark, ReceiptCancel, ReceiptCancelDate, ReceiptCancelUserID, EntryType, FYearID, ActiveStatus, DeleteStatus, UserID, RTS, IPAddress, ModifyUserID, ModifyDate, IsUpload, IsUploadRTS, MOD, BankID, AccountNo, IPDID, PrintReceiptNo, CheckTrnsDate, CompanyType, CompanyID) 
VALUES('1', '1000001', '${LastMoneyReceipt.recordset[0].ReceiptID + 1}', '${replaceDigits(LastMoneyReceipt.recordset[0].ReceiptID + 1)}', '${ReceiptDate} 00:00:00.000', '1900-01-01 ${ReceiptTime}', 'RA', '${AdmitDate} 00:00:00.000', '${HRNo}', '${WardID}', '${BedID}', '0', '${PatientName}', 'IPD/23-24/${IPDNo}', '${Address}', '${TotalAmount}', '0.00', '${TotalAmount}', '${TotalAmount}', '0.00', '${Remark}','N', '2024-09-28 08:55:22.470', '0', 'N', '1', 'Y', 'N', '${UserID}', '${ReceiptDate} ${ReceiptTime}', '08-BF-B8-74-07-C1', '0', '1900-01-01 00:00:00.000', 'Y', '${ReceiptDate} ${ReceiptTime}', '${MOD}', '${BankID}', '${AccountNo}', '${IPDID}', '${replaceDigits2(LastMoneyReceipt.recordset[0].ReceiptID + 1)}', '${ReceiptDate} 00:00:00.000', 'N', '0')
`);
  res.status(200).json({ReceipdID: LastMoneyReceipt.recordset[0].ReceiptID + 1})
}catch (err) {
    res.status(500).json({error: "Database Error"})
}
}

exports.updateMoneyReceipt = async (req, res) => {
    const {ReceiptDate, ReceiptTime, TotalAmount, Remark,MOD, AccountNo, ReceiptID, BankID} = req.body;
    const request = new sql.Request();
    // console.log(ReceiptDate, ReceiptTime, TotalAmount, Remark, MOD, AccountNo, ReceiptID, BankID)
    
try{
    const status = await request.query(`UPDATE Trn_IPDMoneyReceipt SET ReceiptDate='${ReceiptDate} 00:00:00.000', ReceiptTime='1900-01-01 ${ReceiptTime}', TotalAmount='${TotalAmount}',NetAmount='${TotalAmount}', RecAmount='${TotalAmount}', Remark='${Remark}', MOD='${MOD}', BankID='${BankID}', AccountNo='${AccountNo}' WHERE ReceiptID='${ReceiptID}'`);
    // console.log(status)
  res.status(200).json({status: status, ReceiptID: ReceiptID})
}catch (err) {
    res.status(500).json({error: "Database Error"})
}
}

exports.getMoneyReceiptDetails = async (req, res) => {
    const {ReceiptID} = req.body;
    const request = new sql.Request();
    const query = `select * from Trn_IPDMoneyReceipt where ReceiptID ='${ReceiptID}'`;
    try{
        const MoneyReceiptDetatils = await request.query(query);
        res.status(200).json({MoneyReceiptDetatils: MoneyReceiptDetatils.recordset[0]});
    }catch (err){
        res.status(500).json({error: err});
    }

}