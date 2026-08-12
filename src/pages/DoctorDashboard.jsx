import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./DoctorDashboard.css";

export default function DoctorDashboard() {

    const navigate = useNavigate();

    const doctor = JSON.parse(localStorage.getItem("doctor"));

    const [patientId, setPatientId] = useState("");

    if (!doctor) {

        navigate("/doctor-login");

        return null;

    }

    const logout = () => {

        localStorage.removeItem("doctor");
        localStorage.removeItem("doctorToken");

        navigate("/");

    };

    const searchPatient = () => {

        if (!patientId.trim()) {

            alert("Enter Patient ID");

            return;

        }

        navigate(`/doctor-patient/${patientId}`);

    };

    return (

        <div className="doctor-dashboard">

            {/* Sidebar */}

           {/* Sidebar */}

<div className="doctor-sidebar">

    <h2>🏥 Smart Hospital</h2>

    <div className="doctor-menu">

        <Link
            to="/doctor-dashboard"
            className="doctor-menu-item"
        >
            🏠 Dashboard
        </Link>

        <Link
            to="/doctor-scan"
            className="doctor-menu-item"
        >
            📷 Scan Patient QR
        </Link>

        <button
            className="doctor-logout-btn"
            onClick={logout}
        >
            🚪 Logout
        </button>

    </div>

</div>
            {/* Main */}

            <div className="doctor-content">

                <h1>

                    Welcome Dr. {doctor.name}

                </h1>

                <div className="doctor-card">

                    <h3>Doctor Information</h3>

                    <p>

                        <strong>Doctor ID :</strong> {doctor.doctorId}

                    </p>

                    <p>

                        <strong>Email :</strong> {doctor.email}

                    </p>

                    <p>

                        <strong>Specialization :</strong> {doctor.specialization}

                    </p>

                    <p>

                        <strong>Hospital :</strong> {doctor.hospital}

                    </p>

                </div>

                <div className="search-box">

                    <h2>Search Patient</h2>

                    <input

                        type="text"

                        placeholder="Enter Patient ID"

                        value={patientId}

                        onChange={(e)=>setPatientId(e.target.value)}

                    />

                    <button

                        onClick={searchPatient}

                    >

                        Search

                    </button>

                </div>

                <div className="scan-card">

                    <h2>

                        OR

                    </h2>

                    <Link to="/doctor-scan">

                        <button>

                            📷 Scan Patient QR

                        </button>

                    </Link>

                </div>

            </div>

        </div>

    );

}