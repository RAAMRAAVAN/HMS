const sql = require("mssql/msnodesqlv8");

exports.getWardCollection = async(req, res) => {
  // console.log(fromDate, toDate)
  const request = new sql.Request();
  const query1 = `SELECT 
    BM.BedID,
    BM.IPDHRNo, 
    IAD.PatientName, 
    IAD.IPDNo, 
	IAD.IPAID,
    IAD.Date,
    BM.BedNo, 
    IAD.CompanyID, 
    BM.WardID,
    BM.BedStatus,
    IAD.Discharge
FROM 
    M_BedMaster AS BM
LEFT JOIN 
    M_IPDAdmission AS IAD 
ON 
    BM.IPDHRNo = IAD.HRNo 
AND 
    IAD.RegStatus = 'B'
WHERE 
    BM.ActiveStatus = 'Y';
`;
  const query2 = `select WardID, WardName from M_WardMaster where ActiveStatus='Y'`;
try {
  // Execute first query
  const result1 = await request.query(query1);
  const result2 = await request.query(query2);
// Send combined results as JSON
const combinedResults = {
  BedMaster: result1.recordset,
  WardMaster: result2.recordset
};
res.json(combinedResults);
} catch (err) {
    // console.log(err);
    res.status(500).json({ error: "Database query error" });
}
};