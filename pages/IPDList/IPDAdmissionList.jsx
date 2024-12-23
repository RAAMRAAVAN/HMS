import {
  Autocomplete,
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchbedStatus, setIPDNO } from "../../redux";
import { genderList, maritialStatusList, relationList, relegionList, titleList } from "../../Const/Const";
import { setRelationValue, setRelegionValue, setTitleValue } from "./SelectListValues";
import { useNavigate } from "react-router-dom";


export const IPDAdmissionList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bedDetails = useSelector((state) => state.bedStatus.bedDetails);
  console.log("bedDetails=", bedDetails);

  const wardDetails = useSelector((state) => state.bedStatus.wardDetails);
  console.log("Ward=", wardDetails);
  const [ipdNo, setIpdNo] = useState("");
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
  const [relegion, setRelegion] = useState({ id: 23, label: "Hindu" });
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [days, setDays] = useState("");
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
  const [religion, setReligion] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [refDate, setRefDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [insurance, setInsurance] = useState(false);
  const [insuranceId, setInsuranceId] = useState("");
  const [financeCompany, setFinanceCompany] = useState({
    AID: 18070,
    Code: "110",
    LedgerName: "AYUSHMAN",
  });
  const [admitType, setAdmitType] = useState({});
  const [relation, setRelation] = useState({ AID: 35, label: "None." });
  const [relationName, setRelationName] = useState("");
  const [age, setAge] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [wardName, setWardName] = useState('');
  const [bedNo, setBedNo] = useState("");
  console.log("wardName, bedNo= ",wardName, bedNo);
  
  const [medicalDr, setMedicalDr] = useState({});
  const [underDr, setUnderDr] = useState({});
  const [occupation, setOccupation] = useState({OID: '' ,OccupationName: ''});
  const [occupation_list, setOccupationList] = useState([]);
  const [admitTypeList, setAdmitTypeList] = useState([]);
  const [insuranceCompanyList, setInsuranceCompanyList] = useState([]);
  const [doctorList, setDoctorList] = useState([]);
  const [patientList, setPatientList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [newAdmissionData, setNewAdmissionData] = useState({});
  console.log("MaritialStatus=", MaritialStatus)
  const [errors, setErrors] = useState({});
  const [alreadyAdmitted, setAlreadyAdmitted] = useState(true);

  // Handle save button click
  const handleSave = () => {
    let tempErrors = {};

    // Check each field and set an error if it's empty
    // if (!ipdNo) tempErrors.ipdNo = true;
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
      setIPDAdmission({
        HospitalID: '1000001',
        BranchID: '1',
        HRNo: hrno? hrno: '',
        Date: date,
        Time: time,
        OPDStatus: 'Y',
        Patient: patientName,
        OPDNo: opdNo? opdNo: '',
        TitleID: Title.AID,
        PatientName: patientName,
        OccupationID: occupation.OID,
        Gender: Gender.id,
        MaritialStatus: MaritialStatus.id,
        Age: 0,
        Year: year,
        Month: month,
        Days: days,
        DOB:'1950-08-29 00:00:00.000',
        Address: address,
        Pincode: pinCode,
        RelegionID: relegion.id,
        CityID: 0,
        DistrictID: district.DID,
        In_Insurance:'N',
        InsuranceID: insuranceId,
        InsRefDate: date,
        RelationName: relationName,
        RelationID: relation.AID,
        PhoneNo: phoneNo,
        CompanyID: financeCompany.Code,
        AdmitType: admitType.ID,
        BedID: bedNo.BedID,
        WardID: wardName.WardID,
        MedicalDr: underDr.DrId,
        UnderDr: underDr.DrId,
        UnderDr_2: underDr.DrId,
        RefDrID: "18",
        ShiftID: '0',
        PackageID: '0',
        ImagePath:'../ItemImages/No-image-found.jpg',
        ActiveStatus: "Y",
        DeleteStatus: "N",
        UserID: '1',
        RTS: date+time,
        IPAddress: '00-15-5D-F1-68-98',
        ModifyUser:'0',
        ModifyDate: null,
        IsUpload: 'Y',
        IsUploadRTS: date+time,
        FYearID: '1',
        Discharge: 'N',
        IsFinalBill: 'N',
        DischargeDateTime: null,
        PackageRate: '0',
        RegStatus: 'O',
        InsurCompID:'0',
        PO: po,
        PS: ps
      })
    // }
  };

  const getAdmissionResources = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/admission_resources"
      );
      console.log(response);
      setOccupationList(response.data.occupations);
      setOccupation(response.data.occupations[17]);
      setAdmitTypeList(response.data.admitType);
      setInsuranceCompanyList(response.data.insuranceCompany);
      setDoctorList(response.data.doctorName);
      setMedicalDr(response.data.doctorName[18]);
      setUnderDr(response.data.doctorName[18]);
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
        "http://localhost:5000/filtered_patient",
        {
          like_name: input,
        }
      );
      setPatientList(response.data.filtered_patients);
    } catch (error) {
      console.log(error);
    }
  };

  const setIPDAdmission = async (input) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/post-admission",input
      );
      console.log("POST Result",response);
      if(response.data.InsertStatus.rowsAffected[0] === 1)
        {alert("Patient Admitted Successfully")
          dispatch(setIPDNO(response.data.newIPAID));
          navigate(`/IPDModule`)
        }
      else
        alert("Database Error")
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAdmissionResources();
    if (bedDetails.length === 0) {
      console.log("fetch");
      dispatch(fetchbedStatus());
    }
  }, []);

  useEffect(() => {
    if (selectedPatient != null) {
      CheckPatientAlreadyAdmitted();
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
      setRelation(setRelegionValue(selectedPatient.religionID))
      setOccupation({OID: selectedPatient.OccupationID, OccupationName: selectedPatient.OccupationName})
      setRelation(setRelationValue(selectedPatient.RelationID))
    }
  }, [selectedPatient]);

  const CheckPatientAlreadyAdmitted = async() => {
    if (selectedPatient != null){
    try{
      let result = await axios.post("http://localhost:5000/checkAdmissionStatus", {HRNo: selectedPatient.HRNo})
      console.log(result.data.NoOfAdmission);
      if(result.data.NoOfAdmission === 0)
        setAlreadyAdmitted(false)
      else{
        alert("Patient Already Admitted")
      }
    }catch(err){
      alert(err)
    }}
  }

  console.log("newAdmissionData=", newAdmissionData)
  return (
    <>
      <Box paddingX={5} paddingY={5}>
        <Grid container marginY={1} display="flex"  width="100%">
          <Grid item xs={1} alignItems="center" paddingX={1}>
            <Typography fontSize="13px" fontWeight="bold">
              IPD NO:
            </Typography>
            <TextField
              size="small"
              onChange={(e) => setIpdNo(e.target.value)}
              value={ipdNo}
              error={!!errors.ipdNo}
              disabled
            />
          </Grid>

          <Grid item xs={2} paddingX={1} alignItems="center" >
            <Typography fontSize="13px" fontWeight="bold">
              Date:
            </Typography>
            <TextField
              type="date"
              size="small"
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
              
            />
          </Grid>

          <Grid item xs={2} paddingX={1} alignItems="center" >
            <Typography fontSize="13px" fontWeight="bold">
              Time:
            </Typography>
            <TextField
              type="time"
              size="small"
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
              fullWidth
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
              getOptionLabel={(option) =>
                `${option.HRNo} - ${option.PatientName}`
              } // Specify which property to use as the label
              value={selectedPatient}
              onChange={(event, newValue) => {
                setSelectedPatient(newValue); // Update the state variable when the value changes
                // CheckPatientAlreadyAdmitted();
              }}
              onInputChange={(event, newInputValue) => {
                getFilteredPatients(newInputValue); // Call the function while typing
              }}
              renderInput={(params) => <TextField {...params} />}
              sx={{ width: "100%" }}
              size="small"
            />
          </Grid>

          <Grid item xs={2} alignItems="center" paddingX={1}>
            <Typography fontSize="13px" fontWeight="bold">
              OPD NO:
            </Typography>
            <TextField
              size="small"
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
              getOptionLabel={(option) => option.label} // Specify which property to use as the label
              value={Title}
              onChange={(event, newValue) => {
                setTitle(newValue); // Update the state variable when the value changes
              }}
              renderInput={(params) => <TextField {...params} />}
              sx={{ width: "100%" }}
              size="small"
            />
          </Grid>

          <Grid item xs={3} alignItems="center" width="300px" paddingX={1}>
            <Typography fontSize="13px" fontWeight="bold">
              * Name:
            </Typography>
            <TextField
              size="small"
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
              getOptionLabel={(option) => option.label} // Specify which property to use as the label
              value={Gender}
              onChange={(event, newValue) => {
                setGender(newValue); // Update the state variable when the value changes
              }}
              renderInput={(params) => <TextField {...params} />}
              sx={{ width: "100%" }}
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
              getOptionLabel={(option) => option.OccupationName} // Specify which property to use as the label
              value={occupation}
              onChange={(event, newValue) => {
                setOccupation(newValue); // Update the state variable when the value changes
              }}
              renderInput={(params) => <TextField {...params} />}
              sx={{ width: "100%" }}
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
              getOptionLabel={(option) => option.DistrictName} // Specify which property to use as the label
              value={district}
              onChange={(event, newValue) => {
                setDistrict(newValue); // Update the state variable when the value changes
                console.log("State=", newValue);
                setState(newValue.StateName);
              }}
              renderInput={(params) => <TextField {...params} />}
              sx={{ width: "100%" }}
              size="small"
            />
          </Grid>

          <Grid list xs={2} alignItems="center" paddingX={1}>
            <Typography fontSize="13px" fontWeight="bold">
              State:
            </Typography>
            <TextField
              size="small"
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
              getOptionLabel={(option) => option.label} // Specify which property to use as the label
              value={relegion}
              onChange={(event, newValue) => {
                setRelegion(newValue); // Update the state variable when the value changes
              }}
              renderInput={(params) => <TextField {...params} />}
              sx={{ width: "100%" }}
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
            <Select
              value={financeCompany}
              onChange={(event) => setFinanceCompany(event.target.value)}
              size="small"
              sx={{ width: "100%" }}
              // placeholder="select"
            >
              {insuranceCompanyList.map((title, index) => {
                return <MenuItem value={title}>{title.LedgerName}</MenuItem>;
              })}
            </Select>
          </Grid>
          
          <Grid list xs={2} alignItems="center" paddingX={1}>
            <Typography fontSize="13px" fontWeight="bold">
              Maritial Status:
            </Typography>
            <Autocomplete
              fullWidth
              options={maritialStatusList}
              getOptionLabel={(option) => option.label} // Specify which property to use as the label
              value={MaritialStatus}
              onChange={(event, newValue) => {
                setMaritialStatus(newValue); // Update the state variable when the value changes
              }}
              renderInput={(params) => <TextField {...params} />}
              sx={{ width: "100%" }}
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
              sx={{ width: "100%" }}
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
              getOptionLabel={(option) => option.DoctorName} // Specify which property to use as the label
              value={underDr}
              onChange={(event, newValue) => {
                setUnderDr(newValue); // Update the state variable when the value changes
              }}
              renderInput={(params) => <TextField {...params} />}
              sx={{ width: "100%" }}
              size="small"
            />
          </Grid>
        </Grid>

        <Grid container marginY={2} display="flex"  width="100%">
          <Grid item xs={2} alignItems="center" paddingX={1}>
            <Typography fontSize="13px" fontWeight="bold">
              Relation:
            </Typography>
            <Autocomplete
              fullWidth
              options={relationList}
              getOptionLabel={(option) => option.label} // Specify which property to use as the label
              value={relation}
              onChange={(event, newValue) => {
                setRelation(newValue); // Update the state variable when the value changes
              }}
              renderInput={(params) => <TextField {...params} />}
              sx={{ width: "100%" }}
              size="small"
            />
          </Grid>

          <Grid item xs={3} alignItems="center" paddingX={1}>
            <Typography fontSize="13px" fontWeight="bold">
              Relation Name:
            </Typography>
            <TextField
              size="small"
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
            <Select
              value={wardName}
              onChange={(event) => setWardName(event.target.value)}
              size="small"
              sx={{ width: "100%" }}
            >
              {wardDetails.map((title, index) => {
                return <MenuItem value={title}>{title.WardName}</MenuItem>;
              })}
            </Select>
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
            <Select
              value={bedNo}
              onChange={(event) => setBedNo(event.target.value)}
              size="small"
              sx={{ width: "100%" }}
            >
              {bedDetails.map((title, index) => {
                if (wardName.WardID === title.WardID && title.BedStatus === "O")
                  return <MenuItem value={title}>{title.BedNo}</MenuItem>;
              })}
            </Select>
          </Grid>
        </Grid>

        <Box paddingX={1} marginY={5} display="flex">
          <Button
            variant="contained"
            color="success"
            onClick={handleSave}
            disabled={alreadyAdmitted}
          >
            Save
          </Button>
          <Button variant="contained" sx={{ marginX: "5px" }} disabled={alreadyAdmitted}>
            Save & Print
          </Button>
          <Button variant="contained" sx={{ marginX: "5px" }} color="warning" onClick={()=>{setSelectedPatient(null)}}>
            Clear
          </Button>
          <Button variant="contained" sx={{ marginX: "5px" }} color="error">
            Cancel
          </Button>
        </Box>
      </Box>
    </>
  );
};
