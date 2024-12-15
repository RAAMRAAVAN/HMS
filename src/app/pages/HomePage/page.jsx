'use client';
import { useEffect, useState } from "react";
// import { getBedStatusAsync } from "../lib/features/bedStatus/bedStatusSlice";
import { useDispatch, useSelector } from "react-redux";
// import { getUserDetailsAsync, selectuserID } from "../lib/features/userLoginDetails/userSlice";
import { HomePage } from "./HomePage";
import { LoginPage } from "../../LoginPage";
import { getUserDetailsAsync, selectuserID } from "@/src/lib/features/userLoginDetails/userSlice";
import { getBedStatusAsync } from "@/src/lib/features/bedStatus/bedStatusSlice";
import { TopNav } from "../../components/NavBar/TopNav";
// import { useDispatch } from "react-redux";
// import { getUserDetailsAsync } from "../lib/features/userLoginDetails/userSlice";

export default function IndexPage() {
  const dispatch = useDispatch();
  const [Login, setLogin] = useState(false);
  console.log("Login=", Login);
  const [loading, setLoading] = useState("loading");
  const [userName, setUserName] = useState("");
  const UserID=useSelector(selectuserID);
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
      // console.log("User Founed", storedValue)
    }
    else {
      setLoading("Not_Found")
    }
  }, []);

  useEffect(() => {
    if (Login === true) {
      dispatch(getBedStatusAsync());
      console.log("userid", UserID)
      if(UserID === null)
        dispatch(getUserDetailsAsync(userName, ""));
      // dispatch(getUserDetailsAsync(userName, ""));
    }
  }, [Login])

  useEffect(()=>{
    if(UserID !== null)
      { 
        setLoading("Found_User")
        setLogin(true);}
  },[UserID])

  return loading === "loading" ? (<>Loading...</>) : loading === "Found_User" ? (<><TopNav /> <HomePage /></>) : (<LoginPage setLogin={setLogin} setLoading={setLoading} />)
}
