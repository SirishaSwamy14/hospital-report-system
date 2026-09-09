import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";


// Patient pages
import PatientDashboard from "./pages/PatientDashboard";
import PatientLogin from "./pages/PatientLogin";
import PatientSignup from "./pages/PatientSignup";
import UploadReport from "./pages/UploadReport";
import PatientQR from "./pages/PatientQR";
import PatientProfile from "./pages/PatientProfile";
import MyReports from "./pages/MyReports";


// Doctor pages
import DoctorLogin from "./pages/DoctorLogin";
import DoctorDashboard from "./pages/DoctorDashboard";
import DoctorScanQR from "./pages/DoctorScanQR";
import DoctorPatientReports from "./pages/DoctorPatientReports";
import UploadPrescription from "./pages/UploadPrescription";


function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* =========================================
                    HOME
                ========================================= */}

                <Route
                    path="/"
                    element={<Home />}
                />


                {/* =========================================
                    PATIENT
                ========================================= */}

                <Route
                    path="/patient-login"
                    element={<PatientLogin />}
                />

                <Route
                    path="/patient-signup"
                    element={<PatientSignup />}
                />

                <Route
                    path="/patient-dashboard"
                    element={<PatientDashboard />}
                />

                <Route
                    path="/upload-report"
                    element={<UploadReport />}
                />

                <Route
                    path="/patient-qr"
                    element={<PatientQR />}
                />

                <Route
                    path="/patient-profile"
                    element={<PatientProfile />}
                />

                <Route
                    path="/my-reports"
                    element={<MyReports />}
                />


                {/* =========================================
                    DOCTOR
                ========================================= */}

                <Route
                    path="/doctor-login"
                    element={<DoctorLogin />}
                />

                <Route
                    path="/doctor-dashboard"
                    element={<DoctorDashboard />}
                />

                {/* QR Scanner */}
                <Route
                    path="/doctor-scan-qr"
                    element={<DoctorScanQR />}
                />

                {/* Optional old URL support */}
                <Route
                    path="/doctor-scan"
                    element={<DoctorScanQR />}
                />


                {/* Patient record after search / QR scan */}
                <Route
                    path="/doctor-patient/:patientId"
                    element={<DoctorPatientReports />}
                />


                {/* Upload prescription */}
                <Route
                    path="/upload-prescription/:patientId"
                    element={<UploadPrescription />}
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;