import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchbedStatus } from "../../redux";
import { FinanceCompany, genderList, maritialStatusList, relationList, relegionList, titleList } from "../../Const/Const";
import { setFinanceCompanyValue, setGenderValue, setMaritialStatusValue, setRelationValue, setRelegionValue, setTitleValue } from "./SelectValues";
import { getBedStatusAsync, selectBedDetails, selectWardDetails } from "@/src/lib/features/bedStatus/bedStatusSlice";
import { selectIPDNo } from "@/src/lib/features/IPDPatient/IpdPatientSlice";


export const IPDAdmission = (props) => {
  const dispatch = useDispatch();
  const bedDetails = useSelector(selectBedDetails);
  console.log("bedDetails=", bedDetails);

  const wardDetails = useSelector(selectWardDetails);
  console.log("Ward=", wardDetails);
  const [loading, setLoading] = useState("loading");
  // const [DoctorList, setDoctorList] = useState([]);
  const [fetchedPatient, setFetchedPatient] = useState({});
  const IPDNo = useSelector(selectIPDNo)
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState(new Date().toTimeString().split(" ")[0]);
  const [opdPatient, setOpdPatient] = useState(true);
  const [hrno, setHrno] = useState();
  const [patientName, setPatientName] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [opdNo, setOpdNo] = useState("");
  const [Title, setTitle] = useState({ AID: 13, label: "Mr." });
  const [Gender, setGender] = useState({ id: "M", label: "Male" });
  const [MaritialStatus, setMaritialStatus] = useState(
    maritialStatusList[0]
  );
  const [relegion, setRelegion] = useState({});
  console.log("relegion=", relegion)
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [days, setDays] = useState(0);
  console.log("days=", days)
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [po, setPo] = useState("");
  const [ps, setPs] = useState("");
  const [district, setDistrict] = useState({
    AID: "",
    CountryId: "",
    DID: "",
    DistrictName: "",
    StateId: "",
    StateName: "",
  });
  const [state, setState] = useState("");
  const [pinCode, setPinCode] = useState("");
  // const [religion, setReligion] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [refDate, setRefDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [insurance, setInsurance] = useState(false);
  const [insuranceId, setInsuranceId] = useState("");
  const [financeCompany, setFinanceCompany] = useState({ Code: '0', LedgerName: 'None' });
  console.log("company=", financeCompany)
  const [admitType, setAdmitType] = useState({});
  const [relation, setRelation] = useState({ AID: 35, label: "None." });
  const [relationName, setRelationName] = useState("");
  const [age, setAge] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [wardName, setWardName] = useState({});
  const [bedNo, setBedNo] = useState({});
  console.log("ward=", wardName, "bedno=", bedNo)
  const [medicalDr, setMedicalDr] = useState({});
  const [underDr, setUnderDr] = useState({});
  console.log("Under dr=", underDr);
  const [occupation, setOccupation] = useState({});
  const [occupation_list, setOccupationList] = useState([]);
  console.log("Occupation=", occupation)
  const [admitTypeList, setAdmitTypeList] = useState([]);
  const [insuranceCompanyList, setInsuranceCompanyList] = useState(FinanceCompany);
  const [doctorList, setDoctorList] = useState([]);
  const [patientList, setPatientList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [newAdmissionData, setNewAdmissionData] = useState({});
  console.log("MaritialStatus=", MaritialStatus)
  const [errors, setErrors] = useState({});

  // Handle save button click
  const handleSave = () => {
    let tempErrors = {};

    // Check each field and set an error if it's empty
    // if (!IPDNo) tempErrors.IPDNo = true;
    // if (!date) tempErrors.date = true;
    // if (!time) tempErrors.time = true;
    // if (!opdPatient) tempErrors.opdPatient = true;
    // if (!hrno) tempErrors.hrno = true;
    // if (!patientName) tempErrors.patientName = true;
    // if (!opdNo) tempErrors.opdNo = true;
    // if (!year) tempErrors.year = true;
    // if (!month) tempErrors.month = true;
    // if (!days) tempErrors.days = true;
    // if (!dob) tempErrors.dob = true;
    // if (!address) tempErrors.address = true;
    // if (!po) tempErrors.po = true;
    // if (!ps) tempErrors.ps = true;
    // if (!district) tempErrors.district = true;
    // if (!state) tempErrors.state = true;
    // if (!pinCode) tempErrors.pinCode = true;
    // if (!religion) tempErrors.religion = true;
    // if (!height) tempErrors.height = true;
    // if (!weight) tempErrors.weight = true;
    // if (!refDate) tempErrors.refDate = true;
    // if (!insurance) tempErrors.insurance = true;
    // if (!insuranceId) tempErrors.insuranceId = true;
    // if (!financeCompany) tempErrors.financeCompany = true;
    // if (!admitType) tempErrors.admitType = true;
    // if (!relation) tempErrors.relation = true;
    // if (!relationName) tempErrors.relationName = true;
    // if (!age) tempErrors.age = true;
    // if (!phoneNo) tempErrors.phoneNo = true;
    // if (!wardName) tempErrors.wardName = true;
    // if (!bedNo) tempErrors.bedNo = true;
    // if (!medicalDr) tempErrors.medicalDr = true;
    // if (!underDr) tempErrors.underDr = true;

    setErrors(tempErrors);

    // Perform further actions if all fields are valid (like sending data)
    // if (tempErrors == {}) {
    //   console.log("All fields are filled. Submitting data...");
    // Perform submit action
   
    updateIPDAdmission({
      HRNo: hrno,
      IPDNo: `IPD/23-24/${IPDNo}`,
      Patient: patientName,
      TitleID: Title.AID,
      PatientName: patientName,
      OccupationID: occupation ? occupation.OID : '17',
      Gender: Gender.id,
      MaritialStatus: MaritialStatus.id,
      Age: 0,
      Year: year,
      Month: month,
      Days: days,
      DOB: '1950-08-29 00:00:00.000',
      Address: address,
      Pincode: pinCode,
      RelegionID: relegion.id,
      CityID: 0,
      DistrictID: district.DID,
      In_Insurance: insurance ? 'Y' : 'N',
      InsuranceID: insuranceId,
      RelationName: relationName,
      RelationID: relation.AID,
      PhoneNo: phoneNo,
      CompanyID: financeCompany.Code,
      UnderDr: underDr.DrId,
      PO: po,
      PS: ps
    })
  };

  const getAdmissionResources = async () => {

    try {
      const response = await axios.post(
        "http://192.168.1.32:5000/admission_resources"
      );
      console.log(response);
      setOccupationList(response.data.occupations);
      // setOccupation(response.data.occupations[17]);
      setAdmitTypeList(response.data.admitType);
      // setInsuranceCompanyList(response.data.insuranceCompany);
      setDoctorList(response.data.doctorName);
      setMedicalDr(response.data.doctorName[18]);
      // setUnderDr(response.data.doctorName[18]);
      setAdmitType(response.data.admitType[8]);
      setDistrictList(response.data.District);

      // setPatientList(response.data.PatientList)
    } catch (error) {
      console.log("error");
    }
  };
  const getFilteredPatients = async (input) => {
    try {
      const response = await axios.post(
        "http://192.168.1.32:5000/filtered_patient",
        {
          like_name: input,
        }
      );
      setPatientList(response.data.filtered_patients);
    } catch (error) {
      console.log(error);
    }
  };

  const updateIPDAdmission = async (input) => {
    try {
      const response = await axios.post(
        "http://192.168.1.32:5000/update-ipd-details", input
      );
      console.log("POST Result", response);
      if (response.data.UpdateStatus.rowsAffected[0] >= 1)
        alert("Details Updated Successfully")
      else
        alert("Database Error")
    } catch (error) {
      console.log(error);
    }
  };
  const getIPDAdmissionDetails = async (input) => {
    try {
      const response = await axios.post(
        "http://192.168.1.32:5000/fetchIPDPatientDetails",
        {
          IPDNo: input,
        }
      );
      console.log("Patient Found = ", response.data[0])
      setDate(new Date(response.data[0].Date).toISOString().split("T")[0])
      console.log("Date=", new Date(response.data[0].Date).toISOString().split("T")[0])
      setTime(new Date(response.data[0].Time).toISOString().split("T")[1].split("Z")[0])
      setTitle(setTitleValue(response.data[0].TitelID))
      // setIpdNo(response.data[0].IPDNo)
      setPatientName(response.data[0].PatientName)
      setHrno(response.data[0].HRNo)
      setOpdNo(response.data[0].OPDNo)
      setYear(response.data[0].Year)
      setMonth(response.data[0].Month)
      setDays(response.data[0].Days)
      setGender(setGenderValue(response.data[0].Gender))
      // setOccupation()
      setAddress(response.data[0].Address)
      setPo(response.data[0].PO)
      setPs(response.data[0].PS)
      // setDistrict(response.data[0].District)
      setDistrict({
        AID: response.data[0].AID,
        CountryId: response.data[0].CountryId,
        DID: response.data[0].DID,
        DistrictName: response.data[0].DistrictName,
        StateId: response.data[0].StateId,
        StateName: response.data[0].StateName,
      })
      setState(response.data[0].StateName)
      setPinCode(response.data[0].Pincode)
      setRelegion(setRelegionValue(response.data[0].ReligionID))
      setInsurance(response.data[0].In_Insurance === 'N' ? false : true)
      setInsuranceId(response.data[0].InsuranceID)
      setFinanceCompany(setFinanceCompanyValue(response.data[0].CompanyID))
      setOccupation({ OID: response.data[0].OccupationID, OccupationName: response.data[0].OccupationName })
      // console.log("Occupation",{OID: response.data[0].OccupationID, OccupationName: response.data[0].OccupationName})
      setRelation(setRelationValue(response.data[0].RelationID))
      setRelationName(response.data[0].RelationName)
      setPhoneNo(response.data[0].PhoneNo)
      setMaritialStatus(setMaritialStatusValue(response.data[0].MaritalStatus))
      setWardName({ WardId: response.data[0].WardID, WardName: response.data[0].WardName })
      setBedNo(response.data[0].BedNo)
      getAdmissionResources();
      setUnderDr({AID: response.data[0].AID, DrId: response.data[0].UnderDr, DoctorName: response.data[0].DoctorName})
      setLoading("Found_User");
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (IPDNo != null) {
      getIPDAdmissionDetails(IPDNo);
    }
  }, [IPDNo]);

  useEffect(() => {
    if (selectedPatient != null) {
      setHrno(selectedPatient.HRNo)
      setTitle(setTitleValue(selectedPatient.TitleID))
      setPatientName(selectedPatient.PatientName);
      setYear(selectedPatient.Year);
      setMonth(selectedPatient.Month);
      setDays(selectedPatient.Days);
      switch (selectedPatient.Gender) {
        case "M":
          setGender({ id: "M", label: "Male" });
          break;
        case "F":
          setGender({ id: "F", label: "Female" });
          break;
      }
      setOpdNo(selectedPatient.OPDNo);
      setAddress(selectedPatient.Address);
      setPo(selectedPatient.PO);
      setPs(selectedPatient.PS);
      setPinCode(selectedPatient.PinCode);
      setPhoneNo(selectedPatient.ContactNo);
      setRelationName(selectedPatient.RelationName);
      setAge(selectedPatient.RelationAge);
      // setOccupation({})
      setDistrict({
        AID: selectedPatient.AID,
        CountryId: selectedPatient.CountryId,
        DID: selectedPatient.DID,
        DistrictName: selectedPatient.DistrictName,
        StateId: selectedPatient.StateId,
        StateName: selectedPatient.StateName,
      });
      setState(selectedPatient.StateName)
      // setRelation(setRelationValue(selectedPatient.religionID))
      setOccupation({ OID: selectedPatient.OccupationID, OccupationName: selectedPatient.OccupationName })
      // setRelation(setRelationValue(selectedPatient.RelationID))
    }
  }, [selectedPatient]);

  const handleMRDClick = (IPDNo) => {
    const url = `/pages/IPDModule/Forms/MRDForm?IPDNo=${IPDNo}`;
    window.open(url, "_blank"); // Opens in a new tab
  };

  const handleAdmissionClick = (IPDNo) => {
    const url = `/pages/IPDModule/Forms/AdmissionForm?IPDNo=${IPDNo}`;
    window.open(url, "_blank"); // Opens in a new tab
  };

  console.log("newAdmissionData=", newAdmissionData)
  return loading === "loading" ? (<Box display="flex" width="100vw" height="70vh" justifyContent="center" alignItems="center"><CircularProgress size={50} color="inherit"/></Box>):(
    <>
      <Box paddingX={5} paddingY={5}>
        <Grid container marginY={1} display="flex" width="100%">
          <Grid item xs={2} alignItems="center" paddingX={1}>
            <Typography fontSize="13px" fontWeight="bold">
              IPD NO:
            </Typography>
            <TextField
              size="small"
              fontSize="12"
              sx={{
                width: "100%",
                '& .MuiInputBase-root': {
                  fontSize: "14px",
                  padding: "0px",  // Adjust padding for custom height
                },
              }}
              // onChange={(e) => setIpdNo(e.target.value)}
              value={`IPD/23-24/${IPDNo}`}
              error={!!errors.IPDNo}
              disabled
            />
          </Grid>

          <Grid item xs={1} paddingX={0} alignItems="center">
            <Typography fontSize="13px" fontWeight="bold">
              Date:
            </Typography>
            <TextField
              type="date"
              size="small"
              fontSize="11"
              sx={{
                width: "100%",
                '& .MuiInputBase-root': {
                  fontSize: "14px",
                  padding: "0px",  // Adjust padding for custom height
                  display:"flex",
                  height:"37px"
                },
              }}
              onChange={(e) => setDate(e.target.value)}
              value={date}
              error={!!errors.date}
              helperText={errors.date ? "Compulsory Field" : ""}
              FormHelperTextProps={{
                style: {
                  display: "flex",
                  width: "200px",
                  position: "absolute",
                  top: "35px",
                }, // Custom styles
              }}
              fullWidth
              disabled
            />
          </Grid>

          <Grid item xs={1} paddingX={0} alignItems="center" >
            <Typography fontSize="13px" fontWeight="bold">
              Time:
            </Typography>
            <TextField
              type="time"
              size="small"
            fontSize="11"
            sx={{
                width: "100%", 
                '& .MuiInputBase-root': { 
                  fontSize: "14px",
                  padding: "0px",  // Adjust padding for custom height
                  display:"flex",
                  height:"37px"
                },
              }}
              onChange={(e) => setTime(e.target.value)}
              value={time}
              error={!!errors.time}
              helperText={errors.time ? "Compulsory Field" : ""}
              FormHelperTextProps={{
                style: {
                  display: "flex",
                  width: "200px",
                  position: "absolute",
                  top: "35px",
                }, // Custom styles
              }}
              fullWidth
              disabled
            />
          </Grid>

          <Grid item xs={1} alignItems="center" paddingX={1}>
            <Typography fontSize="13px" fontWeight="bold">
              OPD Patient:
            </Typography>
            <Select
              value={opdPatient}
              onChange={(event) => setOpdPatient(event.target.value)}
              size="small"
              sx={{ width: "100%", display:"flex", height:"37px", fontSize: "14px" }}
              fullWidth
              disabled
            >
              <MenuItem value={false}>No</MenuItem>
              <MenuItem value={true}>Yes</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={4} alignItems="center" paddingX={1}>
            <Typography fontSize="13px" fontWeight="bold">
              UHID - Patient Name:
            </Typography>
            <Autocomplete
              fullWidth
              options={patientList}

              renderOption={(props, option) => (
                <li {...props}>
                  <Typography style={{ fontSize: "14px" }}>
                    {`${option.HRNo} - ${option.PatientName}`}
                  </Typography>
                </li>
              )}

              getOptionLabel={(option) =>
                `${option.HRNo} - ${option.PatientName}`
              } // Specify which property to use as the label
              value={selectedPatient}
              onChange={(event, newValue) => {
                setSelectedPatient(newValue); // Update the state variable when the value changes
              }}
              onInputChange={(event, newInputValue) => {
                getFilteredPatients(newInputValue); // Call the function while typing
              }}
              renderInput={(params) => <TextField {...params} sx={{ input: { fontSize: 14, height:"21px", padding:"0", margin:"0" } }}/>}
              sx={{display:"flex", width: "100%", fontSize: "14px"}}
              size="small"
              disabled
            />
          </Grid>

          <Grid item xs={1} alignItems="center" paddingX={1}>
            <Typography fontSize="13px" fontWeight="bold">
              OPD NO:
            </Typography>
            <TextField
              size="small"
              fontSize="11"
              sx={{
                  width: "100%", 
                  '& .MuiInputBase-root': { 
                    fontSize: "14px",
                    padding: "0px",  // Adjust padding for custom height
                    display:"flex",
                  height:"37px"
                  },
                }}
              onChange={(e) => setOpdNo(e.target.value)}
              value={opdNo}
              error={!!errors.opdNo}
              helperText={errors.opdNo ? "Compulsory Field" : ""}
              FormHelperTextProps={{
                style: {
                  display: "flex",
                  width: "200px",
                  position: "absolute",
                  top: "35px",
                }, // Custom styles
              }}
              disabled
            />
          </Grid>

          <Grid item xs={1} alignItems="center" paddingX={1}>
            <Typography fontSize="13px" fontWeight="bold">
              HRNO:
            </Typography>
            <TextField
              size="small"
              fontSize="11"
              sx={{
                  width: "100%", 
                  '& .MuiInputBase-root': { 
                    fontSize: "14px",
                    padding: "0px",  // Adjust padding for custom height
                    display:"flex",
                  height:"37px"
                  },
                }}
              onChange={(e) => setHrno(e.target.value)}
              value={hrno}
              error={!!errors.hrno}
              helperText={errors.hrno ? "Compulsory Field" : ""}
              FormHelperTextProps={{
                style: {
                  display: "flex",
                  width: "200px",
                  position: "absolute",
                  top: "35px",
                }, // Custom styles
              }}
              disabled
            />
          </Grid>
        </Grid>

        <Grid container marginY={2} display="flex" width="100%">
          <Grid item xs={2} alignItems="center" width="100px" paddingX={1}>
            <Typography fontSize="13px" fontWeight="bold">
              Title:
            </Typography>
            <Autocomplete
              fullWidth
              options={titleList}
              renderOption={(props, option) => (
                <li {...props}>
                  <Typography style={{ fontSize: "14px" }}>
                    {option.label}
                  </Typography>
                </li>
              )}
              getOptionLabel={(option) => option.label} // Specify which property to use as the label
              value={Title}
              onChange={(event, newValue) => {
                setTitle(newValue); // Update the state variable when the value changes
              }}
              renderInput={(params) => <TextField {...params} sx={{ input: { fontSize: 14, height: "21px", padding: "0", margin: "0" } }} />}
              sx={{ display: "flex", width: "100%", fontSize: "14px" }}
              size="small"
            />
          </Grid>

          <Grid item xs={3} alignItems="center" width="300px" paddingX={1}>
            <Typography fontSize="13px" fontWeight="bold">
              * Name:
            </Typography>
            <TextField
              size="small"
              fontSize="11"
              sx={{
                  width: "100%", 
                  '& .MuiInputBase-root': { 
                    fontSize: "14px",
                    padding: "0px",  // Adjust padding for custom height
                    display:"flex",
                  height:"37px"
                  },
                }}
              fullWidth
              onChange={(e) => setPatientName(e.target.value)}
              value={patientName}
              error={!!errors.patientName}
              helperText={errors.patientName ? "Compulsory Field" : ""}
              FormHelperTextProps={{
                style: {
                  display: "flex",
                  width: "200px",
                  position: "absolute",
                  top: "35px",
                }, // Custom styles
              }}
            />
          </Grid>

          <Grid item xs={1}
            alignItems="center"
            width="100px"
            paddingX={1}
            position="relative"
          >
            <Typography fontSize="13px" fontWeight="bold">
              Year:
            </Typography>
            <TextField
              size="small"
              fontSize="11"
              sx={{
                  width: "100%", 
                  '& .MuiInputBase-root': { 
                    fontSize: "14px",
                    padding: "0px",  // Adjust padding for custom height
                    display:"flex",
                  height:"37px"
                  },
                }}
              type="number"
              onChange={(e) => setYear(e.target.value)}
              value={year}
              error={!!errors.year}
              helperText={errors.year ? "Compulsory Field" : ""}
              FormHelperTextProps={{
                style: {
                  display: "flex",
                  width: "200px",
                  position: "absolute",
                  top: "35px",
                }, // Custom styles
              }}
            />
          </Grid>

          <Grid item xs={1} alignItems="center" width="100px" paddingX={1}>
            <Typography fontSize="13px" fontWeight="bold">
              Month:
            </Typography>
            <TextField
              size="small"
              fontSize="11"
              sx={{
                  width: "100%", 
                  '& .MuiInputBase-root': { 
                    fontSize: "14px",
                    padding: "0px",  // Adjust padding for custom height
                    display:"flex",
                  height:"37px"
                  },
                }}
              display="flex"
              width="10px"
              onChange={(e) => setMonth(e.target.value)}
              value={month}
              error={!!errors.month}
              helperText={errors.month ? "Compulsory Field" : ""}
              FormHelperTextProps={{
                style: {
                  display: "flex",
                  width: "200px",
                  position: "absolute",
                  top: "35px",
                }, // Custom styles
              }}
              type="number"
            />
          </Grid>

          <Grid item xs={1} alignItems="center" width="100px" paddingX={1}>
            <Typography fontSize="13px" fontWeight="bold">
              Days:
            </Typography>
            <TextField
              size="small"
              fontSize="11"
              sx={{
                  width: "100%", 
                  '& .MuiInputBase-root': { 
                    fontSize: "14px",
                    padding: "0px",  // Adjust padding for custom height
                    display:"flex",
                  height:"37px"
                  },
                }}
              onChange={(e) => setDays(e.target.value)}
              value={days}
              error={!!errors.days}
              helperText={errors.days ? "Compulsory Field" : ""}
              FormHelperTextProps={{
                style: {
                  display: "flex",
                  width: "200px",
                  position: "absolute",
                  top: "35px",
                }, // Custom styles
              }}
              type="number"
            />
          </Grid>

          <Grid item xs={2} alignItems="center" paddingX={1}>
            <Typography fontSize="13px" fontWeight="bold">
              Gender:
            </Typography>
            <Autocomplete
              fullWidth
              options={genderList}
              renderOption={(props, option) => (
                <li {...props}>
                  <Typography style={{ fontSize: "14px" }}>
                    {option.label}
                  </Typography>
                </li>
              )}
              getOptionLabel={(option) => option.label} // Specify which property to use as the label
              value={Gender}
              onChange={(event, newValue) => {
                setGender(newValue); // Update the state variable when the value changes
              }}
              renderInput={(params) => <TextField {...params} sx={{ input: { fontSize: 14, height: "21px", padding: "0", margin: "0" } }} />}
              sx={{ display: "flex", width: "100%", fontSize: "14px" }}
              size="small"
            />
          </Grid>

          <Grid item xs={2} alignItems="center" paddingX={1}>
            <Typography fontSize="13px" fontWeight="bold">
              Occupation:
            </Typography>
            <Autocomplete
              fullWidth
              options={occupation_list}
              renderOption={(props, option) => (
                <li {...props}>
                  <Typography style={{ fontSize: "14px" }}>
                    {option.OccupationName}
                  </Typography>
                </li>
              )}
              getOptionLabel={(option) => option.OccupationName} // Specify which property to use as the label
              value={occupation}
              onChange={(event, newValue) => {
                setOccupation(newValue); // Update the state variable when the value changes
              }}
              renderInput={(params) => <TextField {...params} sx={{ input: { fontSize: 14, height: "21px", padding: "0", margin: "0" } }} />}
              sx={{ display: "flex", width: "100%", fontSize: "14px" }}
              size="small"
            />
          </Grid>
        </Grid>

        <Grid container marginY={2} display="flex" width="100%">
          <Grid list xs={3} alignItems="center" paddingX={1} width="300px">
            <Typography fontSize="13px" fontWeight="bold">
              Address:
            </Typography>
            <TextField
              size="small"
              fontSize="11"
              sx={{
                  width: "100%", 
                  '& .MuiInputBase-root': { 
                    fontSize: "14px",
                    padding: "0px",  // Adjust padding for custom height
                    display:"flex",
                  height:"37px"
                  },
                }}
              fullWidth
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              error={!!errors.address}
              helperText={errors.address ? "Compulsory Field" : ""}
              FormHelperTextProps={{
                style: {
                  display: "flex",
                  width: "200px",
                  position: "absolute",
                  top: "35px",
                }, // Custom styles
              }}
            />
          </Grid>

          <Grid list xs={1} alignItems="center" paddingX={1}>
            <Typography fontSize="13px" fontWeight="bold">
              PO:
            </Typography>
            <TextField
              size="small"
              fontSize="11"
              sx={{
                  width: "100%", 
                  '& .MuiInputBase-root': { 
                    fontSize: "14px",
                    padding: "0px",  // Adjust padding for custom height
                    display:"flex",
                  height:"37px"
                  },
                }}
              onChange={(e) => setPo(e.target.value)}
              value={po}
              error={!!errors.po}
              helperText={errors.po ? "Compulsory Field" : ""}
              FormHelperTextProps={{
                style: {
                  display: "flex",
                  width: "200px",
                  position: "absolute",
                  top: "35px",
                }, // Custom styles
              }}
            />
          </Grid>

          <Grid list xs={1} alignItems="center" paddingX={1}>
            <Typography fontSize="13px" fontWeight="bold">
              PS:
            </Typography>
            <TextField
              size="small"
              fontSize="11"
              sx={{
                  width: "100%", 
                  '& .MuiInputBase-root': { 
                    fontSize: "14px",
                    padding: "0px",  // Adjust padding for custom height
                    display:"flex",
                  height:"37px"
                  },
                }}
              onChange={(e) => setPs(e.target.value)}
              value={ps}
              error={!!errors.ps}
              helperText={errors.ps ? "Compulsory Field" : ""}
              FormHelperTextProps={{
                style: {
                  display: "flex",
                  width: "200px",
                  position: "absolute",
                  top: "35px",
                }, // Custom styles
              }}
            />
          </Grid>

          <Grid list xs={2} alignItems="center" paddingX={1}>
            <Typography fontSize="13px" fontWeight="bold">
              District:
            </Typography>
            <Autocomplete
              fullWidth
              options={districtList}
              renderOption={(props, option) => (
                <li {...props}>
                  <Typography style={{ fontSize: "14px" }}>
                    {option.DistrictName}
                  </Typography>
                </li>
              )}
              getOptionLabel={(option) => option.DistrictName} // Specify which property to use as the label
              value={district}
              onChange={(event, newValue) => {
                setDistrict(newValue); // Update the state variable when the value changes
                console.log("State=", newValue);
                setState(newValue.StateName);
              }}
              renderInput={(params) => <TextField {...params} sx={{ input: { fontSize: 14, height: "21px", padding: "0", margin: "0" } }} />}
              sx={{ display: "flex", width: "100%", fontSize: "14px" }}
              size="small"
            />
          </Grid>

          <Grid list xs={2} alignItems="center" paddingX={1}>
            <Typography fontSize="13px" fontWeight="bold">
              State:
            </Typography>
            <TextField
              size="small"
              fontSize="11"
              sx={{
                  width: "100%", 
                  '& .MuiInputBase-root': { 
                    fontSize: "14px",
                    padding: "0px",  // Adjust padding for custom height
                    display:"flex",
                  height:"37px"
                  },
                }}
              // onChange={(e) => setPatientName(e.target.value)}
              disabled
              value={state}
              error={!!errors.state}
              helperText={errors.state ? "Compulsory Field" : ""}
              FormHelperTextProps={{
                style: {
                  display: "flex",
                  width: "200px",
                  position: "absolute",
                  top: "35px",
                }, // Custom styles
              }}
            />
          </Grid>

          <Grid list xs={1} alignItems="center" paddingX={1}>
            <Typography fontSize="13px" fontWeight="bold">
              Pin Code:
            </Typography>
            <TextField
              size="small"
              fontSize="11"
              sx={{
                  width: "100%", 
                  '& .MuiInputBase-root': { 
                    fontSize: "14px",
                    padding: "0px",  // Adjust padding for custom height
                    display:"flex",
                  height:"37px"
                  },
                }}
              onChange={(e) => setPinCode(e.target.value)}
              value={pinCode}
              error={!!errors.pinCode}
              helperText={errors.pinCode ? "Compulsory Field" : ""}
              FormHelperTextProps={{
                style: {
                  display: "flex",
                  width: "200px",
                  position: "absolute",
                  top: "35px",
                }, // Custom styles
              }}
            />
          </Grid>

          <Grid list xs={2} alignItems="center" paddingX={1}>
            <Typography fontSize="13px" fontWeight="bold">
              Relegion:
            </Typography>
            <Autocomplete
              fullWidth
              options={relegionList}
              renderOption={(props, option) => (
                <li {...props}>
                  <Typography style={{ fontSize: "14px" }}>
                    {option.label}
                  </Typography>
                </li>
              )}
              getOptionLabel={(option) => option.label} // Specify which property to use as the label
              value={relegion}
              onChange={(event, newValue) => {
                setRelegion(newValue); // Update the state variable when the value changes
              }}
              renderInput={(params) => <TextField {...params} sx={{ input: { fontSize: 14, height: "21px", padding: "0", margin: "0" } }} />}
              sx={{ display: "flex", width: "100%", fontSize: "14px" }}
              size="small"
            />
          </Grid>
        </Grid>

        <Grid container marginY={2} display="flex" width="100%">
          <Grid item xs={1} alignItems="center" paddingX={1}>
            <Typography fontSize="13px" fontWeight="bold">
              Insurance:
            </Typography>
            <Select
              value={insurance}
              onChange={(event) => setInsurance(event.target.value)}
              size="small"
              sx={{ width: "100%", display:"flex", height:"37px", fontSize: "14px" }}
              fullWidth
            >
              <MenuItem value={false}>No</MenuItem>
              <MenuItem value={true}>Yes</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={2} alignItems="center" paddingX={1}>
            <Typography fontSize="13px" fontWeight="bold">
              Insurance Id:
            </Typography>
            <TextField
              size="small"
              fontSize="11"
              sx={{
                  width: "100%", 
                  '& .MuiInputBase-root': { 
                    fontSize: "14px",
                    padding: "0px",  // Adjust padding for custom height
                    display:"flex",
                  height:"37px"
                  },
                }}
              onChange={(e) => setInsuranceId(e.target.value)}
              value={insuranceId}
              error={!!errors.insuranceId}
              helperText={errors.insuranceId ? "Compulsory Field" : ""}
              FormHelperTextProps={{
                style: {
                  display: "flex",
                  width: "200px",
                  position: "absolute",
                  top: "35px",
                }, // Custom styles
              }}
            />
          </Grid>

          <Grid item xs={2} alignItems="center" paddingX={1}>
            <Typography fontSize="13px" fontWeight="bold">
              Finance Company:
            </Typography>
            <Autocomplete
              fullWidth
              options={insuranceCompanyList}
              renderOption={(props, option) => (
                <li {...props}>
                  <Typography style={{ fontSize: "14px" }}>
                    {option.LedgerName}
                  </Typography>
                </li>
              )}
              getOptionLabel={(option) => option.LedgerName} // Specify which property to use as the label
              value={financeCompany}
              onChange={(event, newValue) => {
                setFinanceCompany(newValue); // Update the state variable when the value changes
              }}
              renderInput={(params) => <TextField {...params} sx={{ input: { fontSize: 14, height: "21px", padding: "0", margin: "0" } }} />}
              sx={{ display: "flex", width: "100%", fontSize: "14px" }}
              size="small"
            />
          </Grid>

          <Grid list xs={2} alignItems="center" paddingX={1}>
            <Typography fontSize="13px" fontWeight="bold">
              Maritial Status:
            </Typography>
            <Autocomplete
              fullWidth
              options={maritialStatusList}
              renderOption={(props, option) => (
                <li {...props}>
                  <Typography style={{ fontSize: "14px" }}>
                    {option.label}
                  </Typography>
                </li>
              )}
              getOptionLabel={(option) => option.label} // Specify which property to use as the label
              value={MaritialStatus}
              onChange={(event, newValue) => {
                setMaritialStatus(newValue); // Update the state variable when the value changes
              }}
              renderInput={(params) => <TextField {...params} sx={{ input: { fontSize: 14, height: "21px", padding: "0", margin: "0" } }} />}
              sx={{ display: "flex", width: "100%", fontSize: "14px" }}
              size="small"
            />
          </Grid>

          <Grid item xs={2} alignItems="center" paddingX={1}>
            <Typography fontSize="13px" fontWeight="bold">
              Admit Type:
            </Typography>
            <Select
              value={admitType}
              onChange={(event) => setAdmitType(event.target.value)}
              size="small"
              sx={{ width: "100%", display:"flex", height:"37px", fontSize: "14px" }}
              disabled
            >
              {admitTypeList.map((title, index) => {
                return <MenuItem value={title}>{title.label}</MenuItem>;
              })}
            </Select>
          </Grid>

          <Grid item xs={3} alignItems="center" paddingX={1}>
            <Typography fontSize="13px" fontWeight="bold">
              Under Dr:
            </Typography>
            <Autocomplete
              fullWidth
              options={doctorList}
              renderOption={(props, option) => (
                <li {...props}>
                  <Typography style={{ fontSize: "14px" }}>
                    {option.DoctorName}
                  </Typography>
                </li>
              )}
              getOptionLabel={(option) => option.DoctorName} // Specify which property to use as the label
              value={underDr}
              onChange={(event, newValue) => {
                setUnderDr(newValue); // Update the state variable when the value changes
              }}
              renderInput={(params) => <TextField {...params} sx={{ input: { fontSize: 14, height: "21px", padding: "0", margin: "0" } }} />}
              sx={{ display: "flex", width: "100%", fontSize: "14px" }}
              size="small"
            />
          </Grid>
        </Grid>

        <Grid container marginY={2} display="flex" width="100%">
          <Grid item xs={2} alignItems="center" paddingX={1}>
            <Typography fontSize="13px" fontWeight="bold">
              Relation:
            </Typography>
            <Autocomplete
              fullWidth
              options={relationList}
              renderOption={(props, option) => (
                <li {...props}>
                  <Typography style={{ fontSize: "14px" }}>
                    {option.label}
                  </Typography>
                </li>
              )}
              getOptionLabel={(option) => option.label} // Specify which property to use as the label
              value={relation}
              onChange={(event, newValue) => {
                setRelation(newValue); // Update the state variable when the value changes
              }}
              renderInput={(params) => <TextField {...params} sx={{ input: { fontSize: 14, height: "21px", padding: "0", margin: "0" } }} />}
              sx={{ display: "flex", width: "100%", fontSize: "14px" }}
              size="small"
            />
          </Grid>

          <Grid item xs={3} alignItems="center" paddingX={1}>
            <Typography fontSize="13px" fontWeight="bold">
              Relation Name:
            </Typography>
            <TextField
              size="small"
              fontSize="11"
              sx={{
                  width: "100%", 
                  '& .MuiInputBase-root': { 
                    fontSize: "14px",
                    padding: "0px",  // Adjust padding for custom height
                    display:"flex",
                  height:"37px"
                  },
                }}
              onChange={(e) => setRelationName(e.target.value)}
              value={relationName}
              error={!!errors.relationName}
              helperText={errors.relationName ? "Compulsory Field" : ""}
              FormHelperTextProps={{
                style: {
                  display: "flex",
                  width: "200px",
                  position: "absolute",
                  top: "35px",
                }, // Custom styles
              }}
              fullWidth
            />
          </Grid>

          <Grid item xs={1} alignItems="center" paddingX={1}>
            <Typography fontSize="13px" fontWeight="bold">
              Age:
            </Typography>
            <TextField
              size="small"
              fontSize="11"
              sx={{
                  width: "100%", 
                  '& .MuiInputBase-root': { 
                    fontSize: "14px",
                    padding: "0px",  // Adjust padding for custom height
                    display:"flex",
                  height:"37px"
                  },
                }}
              type="number"
              onChange={(e) => setAge(e.target.value)}
              value={age}
              error={!!errors.age}
              helperText={errors.age ? "Compulsory Field" : ""}
              FormHelperTextProps={{
                style: {
                  display: "flex",
                  width: "200px",
                  position: "absolute",
                  top: "35px",
                }, // Custom styles
              }}
            />
          </Grid>

          <Grid item xs={2} alignItems="center" paddingX={1}>
            <Typography fontSize="13px" fontWeight="bold">
              Phone No:
            </Typography>
            <TextField
              size="small"
              fontSize="11"
              sx={{
                  width: "100%", 
                  '& .MuiInputBase-root': { 
                    fontSize: "14px",
                    padding: "0px",  // Adjust padding for custom height
                    display:"flex",
                  height:"37px"
                  },
                }}
              onChange={(e) => setPhoneNo(e.target.value)}
              value={phoneNo}
              error={!!errors.phoneNo}
              helperText={errors.phoneNo ? "Compulsory Field" : ""}
              FormHelperTextProps={{
                style: {
                  display: "flex",
                  width: "200px",
                  position: "absolute",
                  top: "35px",
                }, // Custom styles
              }}
            />
          </Grid>

          <Grid item xs={3} alignItems="center" paddingX={1}>
            <Typography fontSize="13px" fontWeight="bold">
              Ward Name:
            </Typography>
            <Autocomplete
              fullWidth
              options={wardDetails}
              renderOption={(props, option) => (
                <li {...props}>
                  <Typography style={{ fontSize: "14px" }}>
                    {option.WardName}
                  </Typography>
                </li>
              )}
              getOptionLabel={(option) => option.WardName} // Specify which property to use as the label
              value={wardName}
              onChange={(event, newValue) => {
                setWardName(newValue); // Update the state variable when the value changes
              }}
              renderInput={(params) => <TextField {...params} sx={{ input: { fontSize: 14, height: "21px", padding: "0", margin: "0" } }} />}
              sx={{ display: "flex", width: "100%", fontSize: "14px" }}
              size="small"
              disabled
            />
          </Grid>

          <Grid
            item
            xs={1}
            // alignItems="center"
            paddingX={1}
            display="flex"
            width="100px"
            flexDirection="column"
          >
            <Typography fontSize="13px" fontWeight="bold">
              Bed No:
            </Typography>

            <TextField value={bedNo} size="small"
              fontSize="11"
              sx={{
                width: "100%",
                '& .MuiInputBase-root': {
                  fontSize: "14px",
                  padding: "0px",  // Adjust padding for custom height
                  display:"flex",
                  height:"37px"
                },
              }} disabled />

          </Grid>
        </Grid>

        <Box paddingX={1} marginY={5} display="flex">
          <Button
            variant="contained"
            color="success"
            onClick={handleSave}
          >
            Update
          </Button>
          <Button variant="contained" onClick={() => handleMRDClick(IPDNo)} sx={{ marginX: "5px" }}>
            MRD Form
          </Button>
          <Button variant="contained" onClick={() => handleAdmissionClick(IPDNo)} sx={{ marginX: "5px" }}>
            Admission Form
          </Button>
          <Button variant="contained" sx={{ marginX: "5px" }} color="warning">
            Prescription
          </Button>
          <Button variant="contained" sx={{ marginX: "5px" }} color="error">
            Cancel
          </Button>
        </Box>
      </Box>
    </>
  );
};
