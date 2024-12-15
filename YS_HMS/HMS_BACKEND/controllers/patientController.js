const sql = require("mssql/msnodesqlv8");

exports.getIPDAdmissionDetails = async(req, res) => {
  // console.log(fromDate, toDate)
  const request = new sql.Request();
  const query1 = `select * from M_IPDAdmission where RegStatus='B'`;
//   const query2 = `select * from M_WardMaster where ActiveStatus='Y'`;
try {
  // Execute first query
  const result1 = await request.query(query1);
//   const result2 = await request.query(query2);
// Send combined results as JSON
const combinedResults = {
    IPDAdmission: result1.recordset,
//   WardMaster: result2.recordset
};
res.json(combinedResults);
} catch (err) {
    // console.log(err);
    res.status(500).json({ error: "Database query error" });
}
};