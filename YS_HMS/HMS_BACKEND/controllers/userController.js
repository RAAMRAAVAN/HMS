const { request } = require('express');
const sql = require('mssql/msnodesqlv8');
exports.fetchUserDetails = async(req, res) => {
    const {userLoginID} = req.body;
    console.log("userLoginID", userLoginID)
    const request = new sql.Request();
    const query = `select  UId, UserLoginID, FirstName, IsActive from M_UserMaster where UserLoginID='${userLoginID}' AND IsActive='Y'`
    try{
        const userDetails = await request.query(query);
        //   const doctorVisits = await request.query(query2);
        res.json({userDetails: userDetails.recordset})
    }catch (err){
        res.status(500).json({error: "Database Error"})
    }
}