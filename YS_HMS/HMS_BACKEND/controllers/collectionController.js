const sql = require('mssql/msnodesqlv8');

exports.getCollection = async (req, res) => {
  const fromDate = req.body.fromDate;
  const toDate = req.body.toDate;
  const userID = req.body.Uid;
  // console.log(fromDate, toDate)
  const request = new sql.Request();
  const FrontdeskCollectionQuery = `SELECT MOD, SUM(RecAmount) AS TotalRate
  FROM [KH_20232024].[dbo].[Trn_MoneyReceipt]
  WHERE ReceiptCancel = 'N' 
    AND ActiveStatus = 'Y' 
    AND ReceiptDate BETWEEN '${fromDate} 00:00:00.000' AND '${toDate} 23:59:59.000' AND UserID='${userID}'
  GROUP BY MOD WITH ROLLUP;`;

  const PathologyCollectionQuery =  `SELECT MOD, SUM(RecAmount) AS TotalRate
  FROM Trn_LabMoneyReceipt
  WHERE ActiveStatus = 'Y' AND ReceiptCancel='N'
    AND CaseDate BETWEEN '${fromDate} 00:00:00.000' AND '${toDate} 23:59:59.000' AND UserID='${userID}'
  GROUP BY MOD WITH ROLLUP;`;

  const IPDCollectionQuery =  `/****** Script for SelectTopNRows command from SSMS  ******/
  SELECT MOD, SUM(RecAmount) as TotalRate FROM [KH_20232024].[dbo].[Trn_IPDMoneyReceipt] 
  where ActiveStatus='Y' AND DeleteStatus='N' AND ReceiptCancel='N' AND
  ReceiptDate BETWEEN '${fromDate} 00:00:00.000' AND '${toDate} 23:59:59.000' AND UserID='${userID}'
  Group By MOD with rollup`;

    const PharmacyCollectionQuery1 = `select sum(TotalAmount) as TotalAmount from TrnSales AS S
    JOIN Trn_SalePaymentDetails AS PD
    ON PD.ReceiptID = S.SaleID where S.ActiveStatus='Y' and S.IsDelete='N' and S.InvoiceDate BETWEEN '${fromDate} 00:00:00.000' AND '${toDate} 23:59:59.000' and PD.Name='CASH CUSTOMER' AND S.UserID='${userID}';`;

    const PharmacyCollectionQuery2 = `select sum(TotalAmount) as TotalAmount from TrnSales AS S
    JOIN Trn_SalePaymentDetails AS PD
    ON PD.ReceiptID = S.SaleID where S.ActiveStatus='Y' and S.IsDelete='N' and S.InvoiceDate BETWEEN '${fromDate} 00:00:00.000' AND '${toDate} 23:59:59.000' and PD.Name='ICICI Bank' AND S.UserID='${userID}';`;

    const PharmacyCollectionQuery3 = `select sum(TotalAmount) as TotalAmount from TrnSales AS S
    JOIN Trn_SalePaymentDetails AS PD
    ON PD.ReceiptID = S.SaleID where S.ActiveStatus='Y' and S.IsDelete='N' and S.InvoiceDate BETWEEN '${fromDate} 00:00:00.000' AND '${toDate} 23:59:59.000' and PD.Name='HDFC Bank' AND S.UserID='${userID}';`;

    const PharmacyCollectionQuery4 = `select sum(TotalAmount) as TotalAmount from TrnSales AS S
    JOIN Trn_SalePaymentDetails AS PD
    ON PD.ReceiptID = S.SaleID where S.ActiveStatus='Y' and S.IsDelete='N' and S.InvoiceDate BETWEEN '${fromDate} 00:00:00.000' AND '${toDate} 23:59:59.000' and PD.Name='Credit' AND S.UserID='${userID}';`;

  const PathologyIPDCollectionQuery =  `select SUM(BalanceAmount) AS TotalRate from Trn_CaseEntry WHERE PatientType='I' AND CaseDate BETWEEN '${fromDate} 00:00:00.000' AND '${toDate} 23:59:59.000' AND UserID='${userID}'`;

    try{
        const FrontdeskCollection = await request.query(FrontdeskCollectionQuery);
        const PathologyCollection = await request.query(PathologyCollectionQuery);
        const IPDCollection = await request.query(IPDCollectionQuery);
        const PathologyIPDCollection = await request.query(PathologyIPDCollectionQuery);

        const PharmacyCollectionResult1 = await request.query(PharmacyCollectionQuery1);
        const PharmacyCollectionResult2 = await request.query(PharmacyCollectionQuery2);
        const PharmacyCollectionResult3 = await request.query(PharmacyCollectionQuery3);
        const PharmacyCollectionResult4 = await request.query(PharmacyCollectionQuery4);

        const PharmacyCollectionCombinedResults = {
            cashTotalAmount: PharmacyCollectionResult1.recordset[0].TotalAmount || 0,
            iciciBankTotalAmount: PharmacyCollectionResult2.recordset[0].TotalAmount || 0,
            hdfcBankTotalAmount: PharmacyCollectionResult3.recordset[0].TotalAmount || 0,
            creditTotalAmount: PharmacyCollectionResult4.recordset[0].TotalAmount || 0,
          };

        res.json({ FrontdeskCollection: FrontdeskCollection.recordset, PathologyCollection: PathologyCollection.recordset, IPDCollection: IPDCollection.recordset, PathologyIPDCollection: PathologyIPDCollection.recordset, PharmacyCollection: PharmacyCollectionCombinedResults})
    }catch (err){
        res.status(500).json({error: "Database Error"})
    }
};