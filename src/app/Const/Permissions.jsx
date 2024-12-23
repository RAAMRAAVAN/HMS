import axios from "axios";

export const getPermissions = async (UserID, MenuID) => {
    if(UserID == undefined || UserID == null)
        return(false)
    try {
        let result = await axios.post("http://localhost:5000/getDoctorVisitPermissions", { Uid: UserID, MenuID: MenuID })
        // console.log("Permissions=", result.status);
        if (result.status === 200) {
            // alert("200")
            if (result.data.PermissionStatus === "Accepted") {
                // alert("accepted")
                if (result.data.PermissionList.U_View === "True")
                    {   
                        // alert("True")
                        return("True")
                    }
                else{
                    // alert("False")
                    return("False")
                }
            }
            else{
                // alert("False")
                return("False")
            }
        }else{
            // alert("False")
            return("False")
        }
    } catch (err) {
        // alert("False")
        return("False")
    }
}