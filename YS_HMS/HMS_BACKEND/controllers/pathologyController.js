const sql = require('mssql/msnodesqlv8');

exports.getPathologyCollection = (req, res) => {
  const fromDate=req.body.fromDate;
  const toDate=req.body.toDate;
  const userID = req.body.Uid;
  console.log(fromDate, toDate)
  const request = new sql.Request();
  const query =  `SELECT MOD, SUM(RecAmount) AS TotalRate
  FROM Trn_LabMoneyReceipt
  WHERE ActiveStatus = 'Y' AND ReceiptCancel='N'
    AND CaseDate BETWEEN '${fromDate} 00:00:00.000' AND '${toDate} 23:59:59.000' AND UserID='${userID}'
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



exports.getPathologyIPDCollection = (req, res) => {
  const fromDate=req.body.fromDate;
  const toDate=req.body.toDate;
  const userID = req.body.Uid;
  // console.log(fromDate, toDate)
  const request = new sql.Request();
  const query =  `select SUM(BalanceAmount) AS TotalRate from Trn_CaseEntry WHERE PatientType='I' AND CaseDate BETWEEN '${fromDate} 00:00:00.000' AND '${toDate} 23:59:59.000' AND UserID='${userID}'`;

   

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


exports.getCaseEntries = async(req, res) => {
  // console.log(fromDate, toDate)
  const fromDate = req.body.fromDate;
  const toDate = req.body.toDate;
  const request = new sql.Request();
  const query1 = `SELECT lr.*, sm.ReportingName,
  cd.Amount, cd.TestCancel, um.FirstName
FROM Trn_LabMoneyReceipt lr
LEFT JOIN Trn_CaseEntryDetails cd ON lr.CaseID = cd.CaseID
LEFT JOIN M_ServiceMaster sm ON cd.TestID = sm.SID
LEFT JOIN M_UserMaster um ON lr.UserID = um.UId
WHERE lr.ReceiptCancel = 'N' 
  AND lr.ActiveStatus = 'Y' 
  AND lr.EntryType = 'C'
  AND lr.ReceiptDate BETWEEN '${fromDate} 00:00:00.000' AND '${toDate} 23:59:59.000'

UNION ALL

SELECT 
    lr.*, 
    CASE 
        WHEN lr.RecAmount < 0 THEN 'Refund'
        WHEN lr.RecAmount > 0 THEN 'Due Collect'
        ELSE NULL 
    END AS ReportingName,
    NULL AS Amount,
    NULL AS TestCancel,
    um.FirstName
FROM Trn_LabMoneyReceipt lr
LEFT JOIN M_UserMaster um ON lr.UserID = um.UId
WHERE lr.ReceiptCancel = 'N' 
  AND lr.ActiveStatus = 'Y' 
  AND lr.EntryType != 'C'
  AND lr.ReceiptDate BETWEEN '${fromDate} 00:00:00.000' AND '${toDate} 23:59:59.000'
  ORDER BY lr.CaseNo
    `;
  const query2=`select * from Trn_LabMoneyReceipt lr
  JOIN
    M_UserMaster um ON lr.UserID = um.UId
    WHERE lr.ReceiptCancel = 'N' 
    AND lr.ActiveStatus = 'Y' 
    AND lr.EntryType='R'
    AND lr.ReceiptDate BETWEEN '${fromDate} 00:00:00.000' AND '${toDate} 23:59:59.000'`
try {
  // Execute first query
  const result1 = await request.query(query1);
  const result2 = await request.query(query2);
  // Combine results
  const combinedResults = [...result1.recordset, ...result2.recordset];

// Send combined results as JSON
res.json({caseEntries: result1.recordset, dueCollect: result2.recordset});
}catch (err) {
  // console.log(err);
  res.status(500).json({ error: "Database query error" });
}
};


exports.fetchIPDCaseEntry = async(req, res) => {
  const {IPAID} = req.body;
  const request = new sql.Request();
  const query = `select CE.CaseID, CE.CaseNo, CE.CaseDate, CE.GrandTotal, CE.NetAmount,CE.CaseTime,DiscountRs, CE.LabSINo, DM.DoctorName, UM.FirstName, MOD from Trn_CaseEntry AS CE
join 
M_DoctorMaster AS DM
ON DM.DrId = CE.DoctorID
join
M_UserMaster AS UM
ON UM.UId = CE.UserID
where CE.IPDID='${IPAID}' AND CE.ActiveStatus='Y' AND CE.DeleteStatus='N' AND CE.CaseCancel='N'`
  try{
    const IPDCaseEntry = await request.query(query);
    res.json({IPDCaseEntry: IPDCaseEntry.recordset})
  }catch(err){
    res.status(500).json({error: err})
  }
}