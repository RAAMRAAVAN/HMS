import logo from './logo.svg';
import './App.css';
import { LoginPage } from './Pages/LoginPage';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from './Pages/HomePage/HomePage';
import { TopNav } from './components/TopNav';
import { BedStatus } from './Pages/BedStatus/BedStatus';
import { IPDModule } from './Pages/IPDModule/IPDModule';
// import { IPDAdmissionList } from './Pages/IPDList/IPDAdmissionList';
import { IPDModuleList } from './Pages/IPDList/IPDModuleList';
import { IPDBillPrint } from './Pages/IPDModule/BillPrint/IPDBillPrint';
import { PrintOTDischarge } from './Pages/IPDModule/OTDischarge/PrintOTDischarge';
import { MRDForm } from './Pages/IPDModule/Forms/MRDForm';
import { AdmissionForm } from './Pages/IPDModule/Forms/AdmissionForm';
import { PrintIPDMoneyReceipt } from './Pages/IPDModule/MoneyReceipt/PrintIPDMoneyReceipt';

function App() {
  return (
    <BrowserRouter>
            <div className="app">
              <main className="content">
                {/* <TopNav/> */}
                <Routes>
                  <Route path="/" element={<LoginPage />} />
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/bedstatus" element={<BedStatus/>}/>
                  <Route path="/IPDModule" element={<IPDModule/>}/>
                  <Route path="/IPDList" element={<IPDModuleList/>}/>
                  <Route path="/IPD-Bill-Print" element={<IPDBillPrint/>}/>
                  <Route path="/OT-Discharge-Print" element={<PrintOTDischarge/>}/>
                  {/* Forms */}
                  <Route path="/MRD-form" element={<MRDForm/>}/>
                  <Route path="/Admission-form" element={<AdmissionForm/>}/>
                  <Route path="/IPD-MoneyReceipt-Print" element={<PrintIPDMoneyReceipt/>}/>
                </Routes>
              </main>
            </div>
      </BrowserRouter>
  );
}

export default App;
