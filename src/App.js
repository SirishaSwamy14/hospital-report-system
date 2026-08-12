import { BrowserRouter, Routes, Route } from "react-router-dom";
import PatientDashboard from "./pages/PatientDashboard";
import Home from "./pages/Home";
import DoctorLogin from "./pages/DoctorLogin";
import PatientLogin from "./pages/PatientLogin";
import PatientSignup from "./pages/PatientSignup";
import DoctorDashboard from "./pages/DoctorDashboard";
import UploadReport from "./pages/UploadReport";
import PatientQR from "./pages/PatientQR";
import PatientProfile from "./pages/PatientProfile";
import MyReports from "./pages/MyReports";
import DoctorScanQR from "./pages/DoctorScanQR";
import DoctorPatientReports from "./pages/DoctorPatientReports";
import UploadPrescription from "./pages/UploadPrescription";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/" element={<Home />} />
        <Route path="/doctor-login" element={<DoctorLogin />} />
        <Route path="/patient-login" element={<PatientLogin />} />
        <Route path="/patient-signup" element={<PatientSignup />} />
        <Route path="/upload-report" element={<UploadReport />} />
        <Route path="/patient-qr" element={<PatientQR />} />
        <Route path="/patient-profile" element={<PatientProfile />} />
        <Route path="/my-reports" element={<MyReports />} />
        <Route path="/doctor-scan" element={<DoctorScanQR />} />
        <Route path="/doctor-patient-reports" element={<DoctorPatientReports />} />
<Route
    path="/upload-prescription/:patientId"
    element={<UploadPrescription />}
/>
<Route
    path="/doctor-patient/:patientId"
    element={<DoctorPatientReports/>}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;