const { request, query } = require('express');
const sql = require('mssql/msnodesqlv8');
exports.IPDBillDetails = async(req, res) => {
       const {IPAID, IPDNo} = req.body;
    //    console.log("IPAID",req.body)
       const query1=`SELECT WM.WardName, final_result.* FROM (
    SELECT IPAID, BedCheckIn, BedCheckOut, BedID, BedNo, 
           '0' AS SID, 'Bed Charge' AS ServiceName, BedRate, DiscAmount, Disc, 
           Amount, GST, GSTAmount  
    FROM M_IPDAdmissionBedDetails 
    WHERE IPAID = '${IPAID}'

    UNION

    SELECT SD.IPAID, 
           (SELECT IBD.BedCheckIn FROM M_IPDAdmissionBedDetails IBD WHERE IPAID = '${IPAID}' AND SD.BedID = IBD.BedID) AS BedCheckIn, 
           (SELECT IBD.BedCheckOut FROM M_IPDAdmissionBedDetails IBD WHERE IPAID = '${IPAID}' AND SD.BedID = IBD.BedID) AS BedCheckOut, 
           SD.BedID, 
           (SELECT IBD.BedNo FROM M_IPDAdmissionBedDetails IBD WHERE IPAID = '${IPAID}' AND SD.BedID = IBD.BedID) AS BedNo, 
           SD.SID, SM.ServiceName, 
           SD.ServiceRate AS BedRate, NULL AS DiscAmount, NULL AS Disc, 
           SD.ServiceRate AS Amount, SD.SaleTaxPre AS GST, SD.SaleTaxAmount AS GSTAmount  
           FROM M_IPDAdmissionServiceDetails AS SD
           JOIN M_ServiceMaster AS SM ON SM.SID = SD.SID
           WHERE SD.IPAID = '${IPAID}'
       ) AS final_result
        join
        M_BedMaster AS BM
        ON BM.BedID = final_result.BedID
        join 
        M_WardMaster AS WM
        ON WM.WardID = BM.WardID
        WHERE BedCheckOut IS NULL
        OR DATEDIFF(HOUR, BedCheckIn, BedCheckOut) >= 24 
        ORDER BY final_result.BedID, BedCheckIn;`
          const request = new sql.Request();

          try{
              const bedCharges = await request.query(query1);
              res.json({BedCharges: bedCharges.recordset})
          }catch (err){
              res.status(500).json({error: "Database Error"})
          }

}

exports.fetchDoctorVisits = async(req, res) => {
    const {IPAID} = req.body;
    // console.log("IPD NO", IPDNo)
    const request = new sql.Request();
    const query = `select IDV.ReceiptID, IDV.ReceiptNo, IDV.ReceiptDate, IDV.ReceiptTime,DM.DoctorName, IDVD.Rate, IDVD.NoOfVisit, IDVD.Discount,IDVD.Amount from Trn_IPDDoctorVisit as  IDV
                        join 
                        Trn_IPDDoctorVisitDetails as IDVD
                        ON IDV.ReceiptID=IDVD.ReceiptID
                        join
                        M_DoctorMaster AS DM
                        ON DM.DrId = IDVD.DrID
                        where IPDID='${IPAID}' and IDVD.ActiveStatus='Y' and IDV.ActiveStatus='Y'
                        ORDER BY ReceiptDate,ReceiptTime, ReceiptNo`
    try{
        const doctorVisits = await request.query(query);
        //   const doctorVisits = await request.query(query2);
        res.json({doctorVisits: doctorVisits.recordset})
    }catch (err){
        res.status(500).json({error: "Database Error"})
    }
}



exports.fetchOtherServices = async(req, res) => {
    const {IPAID} = req.body;
    // console.log("IPD NO", IPDNo)
    const request = new sql.Request();
    const query = `select OS.Date, OS.OCNO, SM.ServiceName, OSD.Rate, OSD.Qty, OSD.NetAmount,OSD.Discount, OSD.GrossAmount from Trn_IPDOtherService AS OS
                    join 
                    Trn_IPDOtherServiceDetails AS OSD
                    ON OS.OSID = OSD.OSID 
                    join 
                    M_ServiceMaster AS SM
                    ON
                    SM.SID = OSD.SId
                    where OS.IPDID='${IPAID}' AND OS.ActiveStatus='Y' and OSD.ActiveStatus='Y'`
    try{
        const otherServices = await request.query(query);
        //   const doctorVisits = await request.query(query2);
        res.json({otherServices: otherServices.recordset})
    }catch (err){
        res.status(500).json({error: "Database Error"})
    }
}

exports.fetchPharmacyBills = async(req, res) => {
    const {IPDID} = req.body;
    console.log("IPD NO", IPDID)
    const request = new sql.Request();
    const query = `select PS.SaleID AS InvoiceNo, PS.InvoiceDate, PS.InvoiceTime, PSD.ItemName, PSD.Rate, PSD.Qty, PSD.GSTPer, PSD.Disc, PS.TotalDisc, PSD.TotAmt, PS.ReceivedAmount from TrnSales AS PS
                    join
                    TrnSalesDetails AS PSD
                    ON PSD.SaleID = PS.SaleID
                    where PS.IPDID='${IPDID}' AND PS.ActiveStatus='Y' AND PS.ReceivedAmount='0' AND PSD.ActiveStatus='Y' AND PS.MOP='CR'`
    const query1 = `select SUM(Balance) AS GrossAmount from TrnSales AS PS where PS.IPDID='${IPDID}' AND PS.ActiveStatus='Y' AND PS.ReceivedAmount='0' AND PS.MOP='CR'`                
    try{
        const pharmacyBills = await request.query(query);
        const GrossAmount = await request.query(query1);
        res.json({pharmacyBills: pharmacyBills.recordset, GrossAmount: GrossAmount.recordset})
    }catch (err){
        res.status(500).json({error: "Database Error"})
    }
}

exports.fetchDiagonasticCharges = async(req, res) => {
    const { IPDID } = req.body;
    console.log("IPD NO", IPDID);
    const request = new sql.Request();
    
    const query = `SELECT CE.CaseNo, CE.CaseDate, CE.CaseTime, SM.ServiceName, SM.SubDepartmentID, 
                          SDM.SubDepartmentName, CED.Rate, '1' AS Qty, CED.DiscountAmount, 
                          CED.Amount, CE.BalanceAmount AS GrossAmount 
                   FROM Trn_CaseEntry AS CE
                   JOIN Trn_CaseEntryDetails AS CED ON CE.CaseID = CED.CaseID
                   JOIN M_ServiceMaster AS SM ON CED.TestID = SM.SID
                   JOIN M_SubDepartmentMaster AS SDM ON SM.SubDepartmentID = SDM.SubDId
                   WHERE CE.IPDID = '${IPDID}' 
                   AND CE.PatientType = 'I' 
                   AND CE.MOD = 'CR' 
                   AND CE.ActiveStatus = 'Y' 
                   AND CE.CaseCancel='N'
                   AND CED.TestCancel = 'N' 
                   AND CED.ActiveStatus = 'Y'
                   ORDER BY SM.SubDepartmentID, CaseDate, CE.CaseTime`;

    const query1 = `select SUM(NetAmount) AS BalanceAmount, SUM(Total) AS GrandTotal, SUM(DiscountRs) AS FinalDiscount from Trn_CaseEntry AS CE where CE.IPDID='${IPDID}' AND CE.PatientType='I' AND CE.MOD='CR' AND CE.ActiveStatus='Y'`;
    
    try {
        const DiagonasticCharges = await request.query(query);
        const GrossAmount = await request.query(query1);
        
        // Group by SubDepartmentName instead of SubDepartmentID
        const groupedCharges = DiagonasticCharges.recordset.reduce((acc, charge) => {
            const { SubDepartmentName } = charge;
            
            // Find existing sub-department in the accumulator array
            let department = acc.find(item => item.SubDepartmentName === SubDepartmentName);
            
            // If not found, create a new entry for the department
            if (!department) {
                department = {
                    SubDepartmentName,
                    services: []
                };
                acc.push(department);
            }
            
            // Push the charge data into the services array
            department.services.push(charge);
            return acc;
        }, []);
        
        res.json({
            DiagonasticCharges: groupedCharges,
            GrossAmount: GrossAmount.recordset
        });
    } catch (err) {
        res.status(500).json({ error: "Database Error" });
    }
};

exports.fetchOTBills = async(req, res) => {
    const { IPDID } = req.body;
    const OTBillQuery=`select OTB.* from Trn_OTBilling AS OTB
where IPDID='${IPDID}' AND OTB.ActiveStatus='Y' AND OTB.OTCancel='N'`
    const request = new sql.Request();
    try{
        const getOTBills = await request.query(OTBillQuery);
        res.json({OTBills: getOTBills.recordset});
    }catch(err){
        res.status(500).json({err: err});
    }
}

exports.fetchAssistantSurgeonCharge = async(req, res) => {
    const {OTID} = req.body;
    const request = new sql.Request();
    const query = `select * from Trn_OTBillingSurgeonDoctor where OTID='${OTID}' AND ActiveStatus='Y' AND DeleteStatus='N'`
    try{
        const AssistantSurgeons = await request.query(query);
        res.json({AssistantSurgeons: AssistantSurgeons.recordset});
    }catch(err){
        res.status(500).json({err: err});
    }
}

exports.fetchAnesthesiaCharge = async(req, res) => {
    const {OTID} = req.body;
    const request = new sql.Request();
    const query = `select * from Trn_OTBillingAthensiaDoctor where OTID='${OTID}' AND ActiveStatus='Y' AND DeleteStatus='N'`
    try{
        const AnesthesiaCharge = await request.query(query);
        res.json({AnesthesiaCharge: AnesthesiaCharge.recordset});
    }catch(err){
        res.status(500).json({err: err});
    }
}

exports.fetchOTServiceCharge = async(req, res) => {
    const {OTID} = req.body;
    const request = new sql.Request();
    const query = `select * from Trn_OTBillingDetails where OTID='${OTID}' AND ActiveStatus='Y' AND DeleteStatus='N'`
    try{
        const OTServiceCharge = await request.query(query);
        res.json({OTServiceCharge: OTServiceCharge.recordset});
    }catch(err){
        res.status(500).json({err: err});
    }
}