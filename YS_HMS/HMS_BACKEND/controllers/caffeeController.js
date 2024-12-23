const sql = require('mssql/msnodesqlv8');
const KotIdModifier = (KotID) => {
    let restaurantIDStr = KotID.toString();
    restaurantIDStr = restaurantIDStr.slice(0, 1) + '0' + restaurantIDStr.slice(1);
    KotID = parseInt(restaurantIDStr, 10); // Convert back to integer
    return KotID;
};

exports.getCaffeeCollection = async (req, res) => {
    const fromDate = req.body.fromDate;
    const toDate = req.body.toDate;
    // console.log(fromDate, toDate);

    const request = new sql.Request();
    const query1 = `SELECT * FROM Trn_BillPaymentDetails`;
    const query2 = `SELECT * FROM TrnKOT_BOTDetails WHERE IsUploadRTS BETWEEN '${fromDate} 00:00:00.000' AND '${toDate} 23:59:59.000'`;
    const query3 = `SELECT *
FROM Trn_RMoneyReceipt AS R
JOIN TrnKOT_BOTDetails AS K
ON R.ReceiptID = STUFF(CAST(K.KotID AS VARCHAR(7)), 2, 0, '0') where R.ReceiptDate BETWEEN '${fromDate} 00:00:00.000' AND '${toDate} 23:59:59.000';`

    try {
        // Execute first query
        const result1 = await request.query(query1);

        // Execute second query
        const result2 = await request.query(query2);

        const result3 = await request.query(query3);

        const uniqueAIDs = new Set();
        const MatchedBills = result2.recordset.flatMap(kot => {
            return result1.recordset.filter(bill => {
                if (bill.ReceiptID === KotIdModifier(kot.KotID) && !uniqueAIDs.has(bill.AID)) {
                    uniqueAIDs.add(bill.AID);
                    return true;
                }
                return false;
            });
        });
        const sumICICIBankAmounts = MatchedBills.reduce((sum, bill) => {
            return bill.Name === 'ICICI Bank' ? sum + bill.Amount : sum;
        }, 0);

        const sumCashAmounts = MatchedBills.reduce((sum, bill) => {
            return bill.Name === 'CASH CUSTOMER' ? sum + bill.Amount : sum;
        }, 0);

        const sumHDFCAmounts = MatchedBills.reduce((sum, bill) => {
            return bill.Name === 'HDFC Bank' ? sum + bill.Amount : sum;
        }, 0);

        const sumCreditAmounts = MatchedBills.reduce((sum, bill) => {
            return bill.Name === 'Credit' ? sum + bill.Amount : sum;
        }, 0);

        const combinedResults = {
            iciciBankTotalAmount: sumICICIBankAmounts,
            cashTotalAmount: sumCashAmounts,
            hdfcBankTotalAmount: sumHDFCAmounts,
            creditTotalAmount: sumCreditAmounts,
        };

        res.json(combinedResults);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Database query error" });
    }
};
