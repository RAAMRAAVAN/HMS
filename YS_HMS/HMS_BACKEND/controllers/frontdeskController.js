const sql = require("mssql/msnodesqlv8");

exports.getFrontdeskCollection = (req, res) => {
  const fromDate = req.body.fromDate;
  const toDate = req.body.toDate;
  const userID = req.body.Uid;
  // console.log(fromDate, toDate)
  const request = new sql.Request();
  const query = `SELECT MOD, SUM(RecAmount) AS TotalRate
  FROM [KH_20232024].[dbo].[Trn_MoneyReceipt]
  WHERE ReceiptCancel = 'N' 
    AND ActiveStatus = 'Y' 
    AND ReceiptDate BETWEEN '${fromDate} 00:00:00.000' AND '${toDate} 23:59:59.000' AND UserID='${userID}'
  GROUP BY MOD WITH ROLLUP;`;

  request.query(query, (err, result) => {
    if (err) {
      // console.log(err);
      return res.status(500).json({ error: "Database query error" });
    } else {
      // console.log(result);
      return res.json(result.recordset);
    }
  });
};

exports.getFrontdeskBills = async(req, res) => {
  // console.log(fromDate, toDate)
  const fromDate = req.body.fromDate;
  const userID = req.body.Uid;
  const toDate = req.body.toDate;
  const request = new sql.Request();
  const query = `SELECT
  mr.AID,
  mr.ReceiptNo,
  mr.HRNO,
  mr.PatientName,
  mr.ActiveStatus,
  mr.DeleteStatus,
  mr.ReceiptCancel,
  dm.DoctorName,  -- Get the doctor name from M_DoctorMaster
  mr.ContactNo,
  mr.ActiveStatus,
  mr.DeleteStatus,
  mr.ReceiptID,
  mr.ReceiptDate,
  mr.MOD,
  mr.ReceiptCancel,
  um.FirstName,
  um.UId,
  sm.ServiceName,
  mrd.NetAmount
FROM
  Trn_MoneyReceipt mr
JOIN
  Trn_MoneyReceiptDetails mrd ON mr.ReceiptID = mrd.ReceiptID
JOIN
  M_DoctorMaster dm ON mr.DoctorId = dm.DrId  -- Join with M_DoctorMaster to get the doctor name
JOIN
  M_UserMaster um ON mr.UserID = um.UId  -- Join with M_UserMaster to get the user name
  JOIN
  M_ServiceMaster sm ON mrd.Sid = sm.SID  -- Join with M_UserMaster to get the user name
WHERE
  mr.ReceiptDate BETWEEN '${fromDate} 00:00:00.000' AND '${toDate} 23:59:59.000' AND mr.UserID='${userID}';

`;
  const query2 = `SELECT rl.ReceiptNo, rl.AID, rl.HRNo as HRNO, rl.PatientName, rl.ActiveStatus, rl.DeleteStatus, rl.ContactNo, rl.PrintReceiptNo, rl.ReceiptDate, rl.MOD, rl.ReceiptCancel, um.FirstName, um.UId, rl.RecAmount as NetAmount   FROM V#RefundReceiptList rl
Join
 M_UserMaster um ON rl.UserID = um.UId
where ReceiptDate between '${fromDate} 00:00:00.000' and '${toDate} 00:00:00.000' AND rlUserID='${userID}'`;

try {
  // Execute first query
  const result1 = await request.query(query);
  const result2 = await request.query(query2);
  // Combine results
  const combinedResults = [...result1.recordset, ...result2.recordset];

// Send combined results as JSON
res.json(combinedResults);
}catch (err) {
  console.log(err);
  res.status(500).json({ error: "Database query error" });
}
};
