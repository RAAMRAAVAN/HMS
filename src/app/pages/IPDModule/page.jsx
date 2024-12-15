'use client';

import { useEffect, useState } from "react";
// import { BedStatus } from "./BedStatus";
import { getUserDetailsAsync, selectuserID } from "@/src/lib/features/userLoginDetails/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { LoginPage } from "../../LoginPage";
// import { getBedStatusAsync } from "@/src/lib/features/bedStatus/bedStatusSlice";
import { TopNav } from "../../components/NavBar/TopNav";
import { Box, CircularProgress } from "@mui/material";
import { IPDModule } from "./IPDModule";

export default function page() {
    const dispatch = useDispatch();
    const [Login, setLogin] = useState(false);
    console.log("Login=", Login);
    const [loading, setLoading] = useState("loading");
    const [userName, setUserName] = useState("");

    const UserID = useSelector(selectuserID);

    // Get value from sessionStorage
    const getFromSessionStorage = (key) => {
        if (typeof window !== 'undefined') {
            return sessionStorage.getItem(key);
        }
        return null;
    };

    useEffect(() => {
        // Retrieve the value from sessionStorage when the component mounts
        const storedValue = getFromSessionStorage('userName');
        console.log("stored value=", storedValue)
        if (storedValue != "" && storedValue != undefined) {
            setUserName(storedValue);
            setLogin(true);
            // setLoading("Found_User");
            console.log("User Founed", storedValue)
        }
        else {
            setLoading("Not_Found")
        }
    }, []);

    useEffect(() => {
        if (Login === true) {
            // dispatch(getBedStatusAsync());
            console.log("userid", UserID)
            if (UserID === null)
                dispatch(getUserDetailsAsync(userName, ""));
        }
    }, [Login])

    useEffect(() => {
        if (UserID !== null) {
            console.log("userid2", UserID)
            setLoading("Found_User")
            setLogin(true);
        }
    }, [UserID])
    return loading === "loading" ? (<Box display="flex" width="100vw" height="100vh" justifyContent="center" alignItems="center"><CircularProgress size={100} color="inherit" /></Box>) : loading === "Found_User" ? (<><TopNav />
        <IPDModule />
    </>) : (<LoginPage setLogin={setLogin} setLoading={setLoading} />)
}
