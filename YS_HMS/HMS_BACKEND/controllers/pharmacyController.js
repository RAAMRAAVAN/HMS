const sql = require("mssql/msnodesqlv8");

exports.getPharmacyCollection = async(req, res) => {
  const fromDate = req.body.fromDate;
  const toDate = req.body.toDate;
  const userID = req.body.Uid;
  // console.log(fromDate, toDate)
  const request = new sql.Request();
  const query1 = `select sum(TotalAmount) as TotalAmount from TrnSales AS S
JOIN Trn_SalePaymentDetails AS PD
ON PD.ReceiptID = S.SaleID where S.ActiveStatus='Y' and S.IsDelete='N' and S.InvoiceDate BETWEEN '${fromDate} 00:00:00.000' AND '${toDate} 23:59:59.000' and PD.Name='CASH CUSTOMER' AND S.UserID='${userID}';`;

const query2 = `select sum(TotalAmount) as TotalAmount from TrnSales AS S
JOIN Trn_SalePaymentDetails AS PD
ON PD.ReceiptID = S.SaleID where S.ActiveStatus='Y' and S.IsDelete='N' and S.InvoiceDate BETWEEN '${fromDate} 00:00:00.000' AND '${toDate} 23:59:59.000' and PD.Name='ICICI Bank' AND S.UserID='${userID}';`;

const query3 = `select sum(TotalAmount) as TotalAmount from TrnSales AS S
JOIN Trn_SalePaymentDetails AS PD
ON PD.ReceiptID = S.SaleID where S.ActiveStatus='Y' and S.IsDelete='N' and S.InvoiceDate BETWEEN '${fromDate} 00:00:00.000' AND '${toDate} 23:59:59.000' and PD.Name='HDFC Bank' AND S.UserID='${userID}';`;

const query4 = `select sum(TotalAmount) as TotalAmount from TrnSales AS S
JOIN Trn_SalePaymentDetails AS PD
ON PD.ReceiptID = S.SaleID where S.ActiveStatus='Y' and S.IsDelete='N' and S.InvoiceDate BETWEEN '${fromDate} 00:00:00.000' AND '${toDate} 23:59:59.000' and PD.Name='Credit' AND S.UserID='${userID}';`;
try {
  // Execute first query
  const result1 = await request.query(query1);
  const result2 = await request.query(query2);
  const result3 = await request.query(query3);
  const result4 = await request.query(query4);
// Send combined results as JSON
const combinedResults = {
  
  cashTotalAmount: result1.recordset[0].TotalAmount || 0,
  iciciBankTotalAmount: result2.recordset[0].TotalAmount || 0,
  hdfcBankTotalAmount: result3.recordset[0].TotalAmount || 0,
  creditTotalAmount: result4.recordset[0].TotalAmount || 0,
};
res.json(combinedResults);
} catch (err) {
    // console.log(err);
    res.status(500).json({ error: "Database query error" });
}
};