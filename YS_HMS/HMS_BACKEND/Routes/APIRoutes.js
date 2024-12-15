const express = require('express');
const router = express.Router();

const frontdeskController = require("../controllers/frontdeskController")
const phatologyController = require("../controllers/pathologyController")
const caffeeController = require("../controllers/caffeeController")
const IPDController = require("../controllers/ipdController");
const { getPharmacyCollection } = require('../controllers/pharmacyController');
const { getWardCollection } = require('../controllers/wardController');
const { getIPDAdmissionDetails } = require('../controllers/patientController');
const { IPDBillDetails, fetchDoctorVisits, fetchOtherServices, fetchPharmacyBills, fetchDiagonasticCharges, fetchOTBills, fetchAssistantSurgeonCharge, fetchAnesthesiaCharge, fetchOTServiceCharge } = require('../controllers/ipdBillController');
const { fetchOtDischarge, fetchOtDischargeDetails, getOTDischargeFormats, updateOTDischargeDate } = require('../controllers/otDischargeController');
const {fetchUserDetails} = require('../controllers/userController')
const { fetchIPDMoneyReceipts, fetchIPDBillDetails, fetchIPDBillDet, fetchIPDMoneyReceiptDetails, deleteIPDMoneyReceipt, addMoneyReceipt, getMoneyReceiptDetails, updateMoneyReceipt } = require('../controllers/ipdMoneyReceiptController');
const { fetchIPDDoctorVisitList, getVisitListDetails, UpdateVisitDetails, deleteDoctorVisitEntries, getDoctorList, AddDoctorVisit, CreateDoctorVisit, getDoctorVisitPermissions } = require('../controllers/ipdDoctorVisit');
const { fetchOtherServicesList, getServiceListDetails, UpdateServiceDetails, getServiceList, AddService, deleteOtherServiceEntries, CreateOtherService } = require('../controllers/ipdOtherServices');
const { filterServiceMaster, createCaseEntry, fetchCaseEntry, fetchCaseEntryDetails, deleteIPDCaseEntry, IPDCaseEntryDetails } = require('../controllers/CaseEntryController');

// User Details
router.post('/fetchUserDetails', fetchUserDetails)

router.post('/get-FrontdeskCollection', frontdeskController.getFrontdeskCollection)
router.post('/get-FrontdeskBills', frontdeskController.getFrontdeskBills)
// router.post('/get-FrontdeskRefundBills', frontdeskController.getFrontdeskRefundBills)


router.post('/get-PathologyCollection', phatologyController.getPathologyCollection)
router.post('/get-PathologyIPDCollection', phatologyController.getPathologyIPDCollection)
router.post('/get-CaseEntries', phatologyController.getCaseEntries)


router.post('/get-IPDCollection', IPDController.getIPDCollection)
router.post('/checkAdmissionStatus', IPDController.checkAdmissionStatus)
router.post('/admission_resources', IPDController.patientAdmissionResources)
router.post('/filtered_patient', IPDController.filterPatient)
router.post('/filterIPDPatientAuto', IPDController.filterIPDPatientAuto)
router.post('/filterIPDPatient', IPDController.filterIPDPatient)
router.post('/post-admission', IPDController.postIPDAdmission)
router.post('/update-ipd-details', IPDController.updateIPDAdmission)
router.post('/fetchIPDPatientDetails', IPDController.fetchIPDPatient)

router.post('/get-caffeeCollection', caffeeController.getCaffeeCollection)

router.post('/get-pharmacyCollection', getPharmacyCollection)

router.post('/getWardCollection', getWardCollection)

router.post('/getIPDAdmissionDetails', getIPDAdmissionDetails)

router.post('/fetchIPDBillDetails', IPDBillDetails)
router.post('/fetchDoctorVisits', fetchDoctorVisits)
router.post('/fetchOtherServices', fetchOtherServices)
router.post('/fetchPharmacyBills', fetchPharmacyBills)
router.post('/fetchDiagonasticCharges', fetchDiagonasticCharges)
router.post('/fetchOTBills', fetchOTBills);
router.post('/fetchAssistantSurgeonCharge', fetchAssistantSurgeonCharge)
router.post('/fetchAnesthesiaCharge', fetchAnesthesiaCharge)
router.post('/fetchOTServiceCharge', fetchOTServiceCharge)

router.post('/fetchOtDischarge', fetchOtDischarge)
router.post('/fetchOtDischargeDetails', fetchOtDischargeDetails)
router.get('/getOTDischargeFormats', getOTDischargeFormats);
router.post('/updateOTDischargeDate', updateOTDischargeDate)

router.post('/fetchIPDMoneyReceipts', fetchIPDMoneyReceipts)
router.post('/fetchIPDMoneyReceiptDetails', fetchIPDMoneyReceiptDetails)
router.post('/deleteIPDMoneyReceipt', deleteIPDMoneyReceipt);
router.post('/addMoneyReceipt', addMoneyReceipt);
router.post('/getMoneyReceiptDetails', getMoneyReceiptDetails);
router.post('/updateMoneyReceipt', updateMoneyReceipt);

router.post('/fetchIPDDoctorVisitList', fetchIPDDoctorVisitList)
router.post('/getVisitListDetails', getVisitListDetails)
router.post('/UpdateVisitDetails', UpdateVisitDetails)
router.post('/deleteDoctorVisitEntries', deleteDoctorVisitEntries)
router.get('/getDoctorList', getDoctorList)
router.post('/AddDoctorVisit', AddDoctorVisit);
router.post('/CreateDoctorVisit', CreateDoctorVisit)
router.post('/getDoctorVisitPermissions', getDoctorVisitPermissions)

router.post('/OtherServicesList', fetchOtherServicesList)
router.post('/getServiceListDetails', getServiceListDetails)
router.post('/UpdateServiceDetails', UpdateServiceDetails)
router.get('/getServiceList', getServiceList)
router.post('/AddService', AddService)
router.post('/deleteOtherServiceEntries', deleteOtherServiceEntries)
router.post('/CreateOtherService', CreateOtherService)

//CASE ENTRY
router.post('/fetchIPDCaseEntry', phatologyController.fetchIPDCaseEntry)
router.post('/filterServiceMaster', filterServiceMaster)
router.post('/createCaseEntry', createCaseEntry)
router.post('/fetchCaseEntry', fetchCaseEntry)
router.post('/fetchCaseEntryDetails', fetchCaseEntryDetails)
router.post('/deleteIPDCaseEntry', deleteIPDCaseEntry)
router.post('/IPDCaseEntryDetails', IPDCaseEntryDetails);
module.exports = router;
