import { Fullscreen, Minimize, Mouse } from "@mui/icons-material"
import { Box, Typography } from "@mui/material"
import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigation } from "react-router-dom";

const today = new Date();
  
  // Get the day, month, and year
  const day = String(today.getDate()).padStart(2, '0'); // Adds leading 0 if needed
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so we add 1
  const year = today.getFullYear();
  
  // Format the date as DD-MM-YYYY
  const formattedDate = `${day}-${month}-${year}`;

export const TodayCollection = () => {
  const today = new Date().toISOString().split('T')[0]; // Format today's date as YYYY-MM-DD
  // const Navigation = useNavigation();

  const [frontDeskData, setFrontDeskData] = useState([]);
  const [frontDeskCash, setFrontDeskCash] = useState(0);
  const [frontDeskCard, setFrontDeskCard] = useState(0);
  const [frontDeskUPI, setFrontDeskUPI] = useState(0);
  const [frontDeskCredit, setFrontDeskCredit] = useState(0);
  const [frontDeskNB, setFrontDeskNB] = useState(0);
  const [frontDeskBTC, setFrontDeskBTC] = useState(0);
  const [frontDeskTotal, setFrontDeskTotal] = useState(0);

  const [LABData, setLABData] = useState([]);
  const [LABCash, setLABCash] = useState(0);
  const [LABCard, setLABCard] = useState(0);
  const [LABUPI, setLABUPI] = useState(0);
  const [LABCredit, setLABCredit] = useState(0);
  const [LABIPD, setLABIPD] = useState(0);
  const [LABTotal, setLABTotal] = useState(0);

  const [IPDData, setIPDData] = useState([]);
  const [IPDCash, setIPDCash] = useState(0);
  const [IPDCard, setIPDCard] = useState(0);
  const [IPDUPI, setIPDUPI] = useState(0);
  const [IPDCredit, setIPDCredit] = useState(0);
  const [IPDNB, setIPDNB] = useState(0);
  const [IPDBTC, setIPDBTC] = useState(0);
  const [IPDTotal, setIPDTotal] = useState(0);

  const [PharmacyData, setPharmacyData] = useState([]);
  const [PharmacyCash, setPharmacyCash] = useState(0);
  const [PharmacyCard, setPharmacyCard] = useState(0);
  const [PharmacyUPI, setPharmacyUPI] = useState(0);
  const [PharmacyCredit, setPharmacyCredit] = useState(0);
  const [PharmacyTotal, setPharmacyTotal] = useState(0);

  const [CaffeteriaData, setCaffeteriaData] = useState([]);
  

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fromDate, setFromDate] = useState(today); // Initialize with today's date
  const [toDate, setToDate] = useState(today); // Initialize with today's date

  useEffect(() => {
    const fetchFrontDesk = async () => {
      try {
        const response = await axios.post('http://192.168.1.32:5000/get-FrontdeskCollection', {fromDate: new Date().toISOString().split('T')[0], toDate: new Date().toISOString().split('T')[0]});
        // console.log("total",response.data.find(item => item.MOD === null).TotalRate);
        if(response!=[]){
          setFrontDeskData(response.data); // Update state with the fetched data
          setFrontDeskTotal(response.data.find(item => item.MOD === null)?response.data.find(item => item.MOD === null).TotalRate: 0)
          setFrontDeskCash(response.data.find(item => item.MOD === "C")?response.data.find(item => item.MOD === "C").TotalRate: 0)
          setFrontDeskCard(response.data.find(item => item.MOD === "CA")?response.data.find(item => item.MOD === "CA").TotalRate: 0)
          setFrontDeskUPI(response.data.find(item => item.MOD === "CH")?response.data.find(item => item.MOD === "CH").TotalRate: 0)
          setFrontDeskCredit(response.data.find(item => item.MOD === "CR")?response.data.find(item => item.MOD === "CR").TotalRate: 0)
          setFrontDeskNB(response.data.find(item => item.MOD === "NB")?response.data.find(item => item.MOD === "NB").TotalRate: 0)
          setFrontDeskBTC(response.data.find(item => item.MOD === "B")?response.data.find(item => item.MOD === "B").TotalRate: 0)
      }
      } catch (error) {
        setError(error); // Handle error
      } finally {
        setLoading(false); // Set loading to false after request completes
      }
    };
    const fetchLAB = async () => {
      try {
        const response = await axios.post('http://192.168.1.32:5000/get-PathologyCollection', {fromDate: fromDate, toDate: (fromDate<=toDate) ?toDate:fromDate});
        if(response!=[]){
        setLABData(response.data); // Update state with the fetched data
        setLABTotal(response.data.find(item => item.MOD === null)?response.data.find(item => item.MOD === null).TotalRate: 0)
        setLABCash(response.data.find(item => item.MOD === "C")?response.data.find(item => item.MOD === "C").TotalRate: 0)
        setLABCard(response.data.find(item => item.MOD === "CA")?response.data.find(item => item.MOD === "CA").TotalRate: 0)
        setLABUPI(response.data.find(item => item.MOD === "CH")?response.data.find(item => item.MOD === "CH").TotalRate: 0)
        setLABCredit(response.data.find(item => item.MOD === "CR")?response.data.find(item => item.MOD === "CR").TotalRate: 0)
      }

      } catch (error) {
        setError(error); // Handle error
      } finally {
        setLoading(false); // Set loading to false after request completes
      }
    };

    const fetchIPD = async () => {
      try {
        const response = await axios.post('http://192.168.1.32:5000/get-IPDCollection', {fromDate: new Date().toISOString().split('T')[0], toDate: new Date().toISOString().split('T')[0]});
        // console.log("total",response.data.find(item => item.MOD === null).TotalRate);
        if(response!=[]){
          setIPDData(response.data); // Update state with the fetched data
          setIPDTotal(response.data.find(item => item.MOD === null)?response.data.find(item => item.MOD === null).TotalRate: 0)
          setIPDCash(response.data.find(item => item.MOD === "C")?response.data.find(item => item.MOD === "C").TotalRate: 0)
          setIPDCard(response.data.find(item => item.MOD === "CA")?response.data.find(item => item.MOD === "CA").TotalRate: 0)
          setIPDUPI(response.data.find(item => item.MOD === "CH")?response.data.find(item => item.MOD === "CH").TotalRate: 0)
          setIPDCredit(response.data.find(item => item.MOD === "CR")?response.data.find(item => item.MOD === "CR").TotalRate: 0)
          setIPDBTC(response.data.find(item => item.MOD === "B")?response.data.find(item => item.MOD === "B").TotalRate: 0)
          setIPDNB(response.data.find(item => item.MOD === "NB")?response.data.find(item => item.MOD === "NB").TotalRate: 0)
      }
      } catch (error) {
        setError(error); // Handle error
      } finally {
        setLoading(false); // Set loading to false after request completes
      }
    };

    const fetchIPDLAB = async () => {
      try {
        const response = await axios.post('http://192.168.1.32:5000/get-PathologyIPDCollection', {fromDate: fromDate, toDate: (fromDate<=toDate) ?toDate:fromDate});
        if(response!=null){
          setLABIPD(response.data[0].TotalRate!=null?response.data[0].TotalRate:0); // Update state with the fetched data
          console.log(response.data[0].TotalRate!=null?response.data[0].TotalRate:0)
          
      }

      } catch (error) {
        setError(error); // Handle error
      } finally {
        setLoading(false); // Set loading to false after request completes
      }
    };

    const fetchCaffee = async () => {
      try {
        const response = await axios.post('http://192.168.1.32:5000/get-caffeeCollection', {fromDate: fromDate, toDate: (fromDate<=toDate) ?toDate:fromDate});
        console.log(response);
        if(response!=[]){
        setCaffeteriaData(response.data)}
      } catch (error) {
        setError(error); // Handle error
      } finally {
        setLoading(false); // Set loading to false after request completes
      }
    };

    const fetchPharmacy = async () => {
      try {
        const response = await axios.post('http://192.168.1.32:5000/get-pharmacyCollection', {fromDate: fromDate, toDate: (fromDate<=toDate) ?toDate:fromDate});
        console.log(response);
        if(response!=[]){
          setPharmacyData(response.data)
          setPharmacyCash(response.data.cashTotalAmount);
          setPharmacyCard(response.data.hdfcBankTotalAmount);
          setPharmacyUPI(response.data.iciciBankTotalAmount);
          setPharmacyCredit(response.data.creditTotalAmount);
          setPharmacyTotal(response.data.cashTotalAmount + response.data.hdfcBankTotalAmount + response.data.iciciBankTotalAmount);
        }
      } catch (error) {
        setError(error); // Handle error
      } finally {
        setLoading(false); // Set loading to false after request completes
      }
    };

    fetchFrontDesk();
    fetchLAB();
    fetchIPD();
    fetchIPDLAB();
    fetchCaffee();
    fetchPharmacy();
  }, []);
  console.log("PharmacyData=", PharmacyData)
    return(<>
    <Box
          display="flex"
          border="1px black solid"
          borderRadius="5px"
          flexDirection="column"
          padding="0px"
          margin={1}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            backgroundColor="#ecc71d"
            alignItems="center"
            border="1px black solid"
            borderRadius="3px 3px 0% 0% "
          >
            <Typography color="white" paddingX={1} fontWeight="bold">
              Today's Collection Details
            </Typography>
            <Box paddingX={1}>
              <Fullscreen />
              <Minimize />
            </Box>
          </Box>
          <Grid2 container>
            <Grid2
              item
              sm={1}
              border="1px black solid"
              paddingX={1}
              fontWeight="bold"
            >
              Date
            </Grid2>
            <Grid2
              item
              sm={3}
              border="1px black solid"
              paddingX={1}
              fontWeight="bold"
            >
              Hospital Name
            </Grid2>
            
            <Grid2
              item
              sm={1}
              border="1px black solid"
              paddingX={1}
              fontWeight="bold"
              style={{cursor:"pointer"}}
            >
              OPD
            </Grid2>
            <Grid2
              item
              sm={1}
              border="1px black solid"
              paddingX={1}
              fontWeight="bold"
              style={{cursor:"pointer"}}
            >
              IPD
            </Grid2>
            <Grid2
              item
              sm={1}
              border="1px black solid"
              paddingX={1}
              fontWeight="bold"
              style={{cursor:"pointer"}}
            >
              LAB
            </Grid2>
            <Grid2
              item
              sm={1}
              border="1px black solid"
              paddingX={1}
              fontWeight="bold"
              style={{cursor:"pointer"}}
            >
              Pharmacy
            </Grid2>
            <Grid2
              item
              sm={1}
              border="1px black solid"
              paddingX={1}
              fontWeight="bold"
              style={{cursor:"pointer"}}
            >
              Caffeteria
            </Grid2>
            <Grid2
              item
              sm={1}
              border="1px black solid"
              paddingX={1}
              fontWeight="bold"
              style={{cursor:"pointer"}}
            >
              Refund
            </Grid2>
            <Grid2
              item
              sm={1}
              border="1px black solid"
              paddingX={1}
              fontWeight="bold"
            >
              MOD
            </Grid2>
            <Grid2
              item
              sm={1}
              border="1px black solid"
              paddingX={1}
              fontWeight="bold"
            >
              Total
            </Grid2>
          </Grid2>
          <Grid2 container>
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
              {formattedDate}
            </Grid2>
            <Grid2 item sm={3} border="1px black solid" paddingX={1}>
              INSTITUTE OF UROLOGY AND KIDNEY DISEASES
            </Grid2>
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
              {frontDeskCash}
            </Grid2>
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
              {IPDCash}
            </Grid2>
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
              {LABCash}
            </Grid2>
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
            {PharmacyCash}
            </Grid2>
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
              {/* {CaffeteriaData.cashTotalAmount} */}
            </Grid2>
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
              0
            </Grid2>
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
              Cash
            </Grid2>
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
              {frontDeskCash+IPDCash+LABCash+PharmacyCash}
            </Grid2>
          </Grid2>

          <Grid2 container>
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
            {formattedDate}
            </Grid2>
            <Grid2 item sm={3} border="1px black solid" paddingX={1}>
              INSTITUTE OF UROLOGY AND KIDNEY DISEASES
            </Grid2>
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
              {frontDeskCard}
            </Grid2>
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
              {IPDCard}
            </Grid2>
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
              {LABCard}
            </Grid2>
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
              {PharmacyCard}
            </Grid2>
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
              
              {/* {CaffeteriaData.hdfcBankTotalAmount} */}
            </Grid2>
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
              0
            </Grid2>
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
              Card
            </Grid2>
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
              {frontDeskCard+IPDCard+LABCard+PharmacyCard}
            </Grid2>
          </Grid2>
          <Grid2 container>
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
            {formattedDate}
            </Grid2>
            <Grid2 item sm={3} border="1px black solid" paddingX={1}>
              INSTITUTE OF UROLOGY AND KIDNEY DISEASES
            </Grid2>
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
            {frontDeskUPI}
            </Grid2>
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
              {IPDUPI}
            </Grid2>
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
              {LABUPI}
            </Grid2>
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
              {PharmacyUPI}
            </Grid2>
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
            {/* {CaffeteriaData.iciciBankTotalAmount} */}0
            </Grid2>
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
              0
            </Grid2>
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
              UPI
            </Grid2>
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
              {frontDeskUPI+IPDUPI+LABUPI+PharmacyUPI}
            </Grid2>
          </Grid2>

          <Grid2 container>
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
            {formattedDate}
            </Grid2>
            <Grid2 item sm={3} border="1px black solid" paddingX={1}>
              INSTITUTE OF UROLOGY AND KIDNEY DISEASES
            </Grid2>
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
              {frontDeskNB}
            </Grid2>
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
              {IPDNB}
            </Grid2>
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
              0
            </Grid2>
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
              0
            </Grid2>
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
              0
            </Grid2>
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
              0
            </Grid2>
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
              Net Banking
            </Grid2>
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
              0
            </Grid2>
          </Grid2>

          <Grid2 container>
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
            {formattedDate}
            </Grid2>
            <Grid2 item sm={3} border="1px black solid" paddingX={1}>
              INSTITUTE OF UROLOGY AND KIDNEY DISEASES
            </Grid2>
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
              {frontDeskCredit}
            </Grid2>
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
              {IPDCredit}
            </Grid2>
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
              0
            </Grid2>
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
              {PharmacyCredit}
            </Grid2>
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
              0
            </Grid2>
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
              0
            </Grid2>
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
              Credit
            </Grid2>
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
              {frontDeskCredit+ PharmacyCredit + IPDCredit}
            </Grid2>
          </Grid2>

          <Grid2 container>
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
            {formattedDate}
            </Grid2>
            <Grid2 item sm={3} border="1px black solid" paddingX={1}>
              INSTITUTE OF UROLOGY AND KIDNEY DISEASES
            </Grid2>
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
              {frontDeskBTC}
            </Grid2>
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
              {IPDBTC}
            </Grid2>
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
              0
            </Grid2>
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
              0
            </Grid2>
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
              0
            </Grid2>
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
              0
            </Grid2>
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
              BTC
            </Grid2>
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
            {frontDeskBTC+IPDBTC}
            </Grid2>
          </Grid2>
          <Grid2 container fontWeight="bold">
            <Grid2 item sm={4} border="1px black solid" paddingX={1} justifyContent="center" display='flex' fontWeight="bold">
              Total
            </Grid2>
            {/* <Grid2 item sm={3} border="1px black solid" paddingX={1}>
              INSTITUTE OF UROLOGY AND KIDNEY DISEASES
            </Grid2> */}
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
              {frontDeskTotal}
            </Grid2>
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
              {IPDTotal}
            </Grid2>
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
              {LABTotal}
            </Grid2>
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
            {PharmacyTotal}
            </Grid2>
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
              0
            </Grid2>
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
              0
            </Grid2>
            <Grid2 item sm={1} border="1px black solid" paddingX={1} fontWeight="bold">
              Grand Total
            </Grid2>
            <Grid2 item sm={1} border="1px black solid" paddingX={1}>
              {frontDeskCash+IPDCash+LABCash+PharmacyCash + frontDeskCard+IPDCard+LABCard+PharmacyCard + frontDeskUPI+IPDUPI+LABUPI+PharmacyUPI }
            </Grid2>
          </Grid2>
        </Box>
    </>)
}