import { Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
// import { useFetcher, useLocation } from "react-router-dom";
import {
  convertTimeTo12HourFormat,
  setFinanceCompanyValue,
  setGenderValue,
} from "../SelectValues";
import { BedCharges } from "./BedCharges";
import { DoctorVisit } from "./DoctorVisits";
import { MedicalServices } from "./MedicalServices";
import { PharmacyBills } from "./PharmacyBills";
import { DiagonasticCharges } from "./DiagonasticCharges";
import { OTBills } from "./OTBills/OTBills";
import { useSelector } from "react-redux";
import { MoneyReceipt } from "./MoneyReceipts";
import Image from "next/image";

export const IPDBillPrint = (props) => {
  // const location = useLocation();
  const IPAID = new URLSearchParams(location.search).get("IPAID");
  const [patientName, setPatientName] = useState("");
  const [hrno, setHrno] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [po, setPo] = useState("");
  const [ps, setPs] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [stateName, setStateName] = useState("");
  const [pinCode, setPinCode] = useState("");

  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [days, setDays] = useState(0);
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [financeCompany, setFinanceCompany] = useState("");
  // const [IPAID, setIPAID] = useState();
  const [IPDID, setIPDID] = useState();

  const [TotalBedRent, setTotalBedRent] = useState(0);
  const [TotalConsultantFees, setTotalConsultantFees] = useState(0);
  const [TotalDiagonasticCharge, setTotalDiagonasticCharge] = useState(0);
  const [TotalMedicalServices, setTotalMedicalServices] = useState(0);
  const [TotalPharmacyBill, setTotalPharmacyBill] = useState(0);
  const [TotalOTBill, setTotalOTBill] = useState(0);
  const [TotalBill, setTotalBill] = useState(TotalBedRent + TotalConsultantFees + TotalDiagonasticCharge + TotalMedicalServices + TotalPharmacyBill + TotalOTBill)

  const [DiscountBedRent, setDiscountBedRent] = useState(0);
  const [DiscountConsultantFees, setDiscountConsultantFees] = useState(0);
  const [DiscountDiagonasticCharge, setDiscountDiagonasticCharge] = useState(0);
  const [DiscountMedicalServices, setDiscountMedicalServices] = useState(0);
  const [DiscountPharmacyBill, setDiscountPharmacyBill] = useState(0);
  const [DiscountOTBill, setDiscountOTBill] = useState([]);
  const [TotalDiscount, setTotalDiscount] = useState(DiscountBedRent + DiscountConsultantFees + DiscountDiagonasticCharge + DiscountMedicalServices + DiscountPharmacyBill + DiscountOTBill);
  // let DiscountOTBill= useSelector(state=>state.ipdBillReducer.ItemDiscountOT);

  const [BillAmountBedRent, setBillAmountBedRent] = useState(0);
  const [BillAmountConsultantFees, setBillAmountConsultantFees] = useState(0);
  const [BillAmountDiagonasticCharge, setBillAmountDiagonasticCharge] = useState(0);
  const [BillAmountMedicalServices, setBillAmountMedicalServices] = useState(0);
  const [BillAmountPharmacyBill, setBillAmountPharmacyBill] = useState(0);
  const [BillAmountOTBill, setBillAmountOTBill] = useState(0);
  const [TotalBillAmount, setTotalBillAmount] = useState(BillAmountBedRent + BillAmountConsultantFees + BillAmountDiagonasticCharge + BillAmountMedicalServices + BillAmountPharmacyBill + BillAmountOTBill);

  const [RecAmount, setRecAmount] = useState(0);

  // console.log("OT BIll=", TotalOTBill);

  const getIPDAdmissionDetails = async (input) => {
    try {
      const response = await axios.post(
        "http://192.168.1.32:5000/fetchIPDPatientDetails",
        {
          IPDNo: input,
        }
      );
      console.log("Patient Found = ", response.data[0]);
      setPatientName(response.data[0].PatientName);
      setHrno(response.data[0].HRNo);
      setPhoneNo(response.data[0].PhoneNo);
      setAddress(response.data[0].Address);
      setPo(response.data[0].PO);
      setPs(response.data[0].PS);
      setDistrictName(response.data[0].DistrictName);
      setStateName(response.data[0].StateName);
      setPinCode(response.data[0].Pincode);

      setYear(response.data[0].Year);
      setMonth(response.data[0].Month);
      setDays(response.data[0].Days);
      setGender(setGenderValue(response.data[0].Gender).label);
      setDate(new Date(response.data[0].Date).toISOString().split("T")[0]);
      setTime(
        convertTimeTo12HourFormat(
          new Date(response.data[0].Time).toTimeString().split(" ")[0]
        )
      );
      setFinanceCompany(
        setFinanceCompanyValue(response.data[0].CompanyID).Code
      );

      // setIPAID(response.data[0].IPAID);
      setIPDID(response.data[0].PrintIPDNo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getIPDAdmissionDetails(IPAID);
  }, []);

  useEffect(()=>{
    setTotalBill(TotalBedRent + TotalConsultantFees + TotalDiagonasticCharge + TotalMedicalServices + TotalPharmacyBill + TotalOTBill);
  },[TotalBedRent, TotalConsultantFees ,TotalDiagonasticCharge, TotalMedicalServices ,TotalPharmacyBill, TotalOTBill])

  useEffect(()=>{
    setTotalDiscount(DiscountBedRent + DiscountConsultantFees + DiscountDiagonasticCharge + DiscountMedicalServices + DiscountPharmacyBill + DiscountOTBill);
  },[DiscountBedRent, DiscountConsultantFees, DiscountDiagonasticCharge, DiscountMedicalServices, DiscountPharmacyBill, DiscountOTBill])

  useEffect(()=>{
    setTotalBillAmount(BillAmountBedRent + BillAmountConsultantFees + BillAmountDiagonasticCharge + BillAmountMedicalServices + BillAmountPharmacyBill + BillAmountOTBill);
  }, [BillAmountBedRent, BillAmountConsultantFees, BillAmountDiagonasticCharge, BillAmountMedicalServices, BillAmountPharmacyBill, BillAmountOTBill])
  return (
    <>
      <Grid container>
        <Grid container>
          <Grid xs={2} item display="flex" justifyContent="start">
          <Image src="/images/logo.jpg" width={250} height={100}/>
          </Grid>
          <Grid
            xs={8}
            item
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Typography fontWeight="bold" fontSize={18}>
              Institute of Urology & Kidney Diseases (IUKD)
            </Typography>
            <Typography fontSize={12}>
              (A Unit of Mednomic Healthcare Pvt. Ltd)
            </Typography>
            <Typography fontSize={12}>
              {" "}
              Nazirakhat, Sonapur, Kamrup (M), Assam - 782402
            </Typography>
            <Typography fontSize={12}>
              Phone: +91 9864104444/ +91 8822721671
            </Typography>
            <Typography fontSize={12}>
              Email: iukd.india@gmail.com, Web: www.iukdindia.com
            </Typography>
            <Typography fontWeight="bold">Final Bill/ Receipt</Typography>
          </Grid>
          <Grid xs={2} item display="flex" justifyContent="end">
            
          </Grid>
        </Grid>
        <Grid
          container
          border="1px black solid"
          padding={1}
          justifyContent="space-between"
        >
          <Grid xs={6} container>
            <Grid item container display="flex">
              <Grid xs={3} item>
                <Typography fontWeight="bold" fontSize={12}>
                  Bill No
                </Typography>
              </Grid>
              <Grid xs={9} item>
                <Typography fontSize={12}>: </Typography>
              </Grid>
            </Grid>

            <Grid item container display="flex">
              <Grid xs={3} item>
                <Typography fontWeight="bold" fontSize={12}>
                  Name
                </Typography>
              </Grid>
              <Grid xs={9} item>
                <Typography fontSize={12}>: Mr. {patientName}</Typography>
              </Grid>
            </Grid>

            <Grid item container display="flex">
              <Grid xs={3} item>
                <Typography fontWeight="bold" fontSize={12}>
                  UHID
                </Typography>
              </Grid>
              <Grid xs={9} item>
                <Typography fontSize={12}>: IUKD-{hrno}</Typography>
              </Grid>
            </Grid>

            <Grid item container display="flex">
              <Grid xs={3} item>
                <Typography fontWeight="bold" fontSize={12}>
                  Consultant
                </Typography>
              </Grid>
              <Grid xs={9} item>
                <Typography fontSize={12}>
                  : DR. ARUP KUMAR NATH & UROLOGY TEAM
                </Typography>
              </Grid>
            </Grid>

            <Grid item container display="flex">
              <Grid xs={3} item>
                <Typography fontWeight="bold" fontSize={12}>
                  Contact No
                </Typography>
              </Grid>
              <Grid xs={9} item>
                <Typography fontSize={12}>: +91 {phoneNo}</Typography>
              </Grid>
            </Grid>

            <Grid item container display="flex">
              <Grid xs={3} item>
                <Typography fontWeight="bold" fontSize={12}>
                  Address
                </Typography>
              </Grid>
              <Grid xs={9} item>
                <Typography fontSize={12}>
                  : {address}, {po}, {ps}, {districtName}, {stateName} -{" "}
                  {pinCode}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid xs={5} container>
            <Grid item container display="flex">
              <Grid xs={6} item>
                <Typography fontWeight="bold" fontSize={12}>
                  Bill Date
                </Typography>
              </Grid>
              <Grid xs={6} item>
                <Typography fontSize={12}>: </Typography>
              </Grid>
            </Grid>

            <Grid item container display="flex">
              <Grid xs={6} item>
                <Typography fontWeight="bold" fontSize={12}>
                  Age/Gender
                </Typography>
              </Grid>
              <Grid xs={6} item>
                <Typography fontSize={12}>
                  : {year}Y {month}M {days}D/ {gender}
                </Typography>
              </Grid>
            </Grid>

            <Grid item container display="flex">
              <Grid xs={6} item>
                <Typography fontWeight="bold" fontSize={12}>
                  IPD No
                </Typography>
              </Grid>
              <Grid xs={6} item>
                <Typography fontSize={12}>: IPD/23-24/{IPAID}</Typography>
              </Grid>
            </Grid>

            <Grid item container display="flex">
              <Grid xs={6} item>
                <Typography fontWeight="bold" fontSize={12}>
                  Admit Date & Time
                </Typography>
              </Grid>
              <Grid xs={6} item>
                <Typography fontSize={12}>
                  : {date} {time}
                </Typography>
              </Grid>
            </Grid>

            <Grid item container display="flex">
              <Grid xs={6} item>
                <Typography fontWeight="bold" fontSize={12}>
                  Discharge Date & Time
                </Typography>
              </Grid>
              <Grid xs={6} item>
                <Typography fontSize={12}>: </Typography>
              </Grid>
            </Grid>

            <Grid item container display="flex">
              <Grid xs={6} item>
                <Typography fontWeight="bold" fontSize={12}>
                  Patient Category
                </Typography>
              </Grid>
              <Grid xs={6} item>
                <Typography fontSize={12}>
                  : {financeCompany == "110" ? "Ayushman" : "General"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          <Grid
            container
            borderBottom="1px black solid"
            justifyContent="space-between"
          >
            <Grid xs={6} item>
              <Typography>Particulars</Typography>
            </Grid>
            <Grid xs={1} item>
              <Typography>Rate</Typography>
            </Grid>
            <Grid xs={1} item>
              <Typography>Qty</Typography>
            </Grid>
            <Grid xs={1} item>
              <Typography>Amount</Typography>
            </Grid>
            <Grid xs={1} item display="flex" justifyContent="end">
              <Typography>Disc</Typography>
            </Grid>
            <Grid xs={2} item display="flex" justifyContent="end">
              <Typography>Net Amount</Typography>
            </Grid>
          </Grid>
        </Grid>
        <BedCharges IPAID={IPAID} setTotalBedRent={setTotalBedRent} setDiscountBedRent={setDiscountBedRent} setBillAmountBedRent={setBillAmountBedRent}/>
        <DoctorVisit IPAID={IPAID} setTotalConsultantFees={setTotalConsultantFees} setDiscountConsultantFees={setDiscountConsultantFees} setBillAmountConsultantFees={setBillAmountConsultantFees}/>
        <OTBills IPDID={IPAID} setDiscountOTBill = {setDiscountOTBill} setTotalOTBill={setTotalOTBill} setBillAmountOTBill = {setBillAmountOTBill}/>
        <MedicalServices IPAID={IPAID} setTotalMedicalServices={setTotalMedicalServices} setDiscountMedicalServices={setDiscountMedicalServices} setBillAmountMedicalServices={setBillAmountMedicalServices}/>
        <DiagonasticCharges IPDID={IPAID} setTotalDiagonasticCharge={setTotalDiagonasticCharge} setDiscountDiagonasticCharge={setDiscountDiagonasticCharge} setBillAmountDiagonasticCharge={setBillAmountDiagonasticCharge}/>
        <PharmacyBills IPAID={IPAID} setTotalPharmacyBill = {setTotalPharmacyBill} setDiscountPharmacyBill = {setDiscountPharmacyBill} setBillAmountPharmacyBill = {setBillAmountPharmacyBill}/>
        
      </Grid>
      <Grid container marginTop={4}>
        <Grid item xs={9}>
          <MoneyReceipt IPAID={IPAID} setRecAmount = {setRecAmount} RecAmount={RecAmount}/>
        </Grid>
        <Grid item xs={3}>
          <Grid item xs={12} display="flex" justifyContent="space-between">
            <Typography fontSize={12} fontWeight="bold">
              Total Amount:
            </Typography>
            <Typography fontSize={12} fontWeight="bold">
              {TotalBill.toFixed(0)}.00
            </Typography>
          </Grid>
          

          <Grid item xs={12} display="flex" justifyContent="space-between">
            <Typography fontSize={12} fontWeight="bold">
              Discount Amount:
            </Typography>
            <Typography fontSize={12} fontWeight="bold">
            {Number(TotalDiscount).toFixed(0)}.00
            </Typography>
          </Grid>

          <Grid item xs={12} display="flex" justifyContent="space-between">
            <Typography fontSize={12} fontWeight="bold">
              Bill Amount:
            </Typography>
            <Typography fontSize={12} fontWeight="bold">
              {TotalBillAmount.toFixed(0)}.00
            </Typography>
          </Grid>


          <Grid item xs={12} display="flex" justifyContent="space-between">
            <Typography fontSize={12} fontWeight="bold">
              Rec Amount:
            </Typography>
            <Typography fontSize={12} fontWeight="bold">
              {RecAmount.toFixed(0)}.00
            </Typography>
          </Grid>

          <Grid item xs={12}  justifyContent="space-between" style={(TotalBillAmount - RecAmount).toFixed(0) != 0?{display:"flex"}:{display:"none"}}>
            <Typography fontSize={12} fontWeight="bold">
              Due Amount:
            </Typography>
            <Typography fontSize={12} fontWeight="bold">
              {(TotalBillAmount - RecAmount).toFixed(0)}.00
            </Typography>
          </Grid>
        </Grid>
      </Grid> 
    </>
  );
};
