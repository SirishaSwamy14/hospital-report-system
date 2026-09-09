import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./DoctorDashboard.css";

export default function DoctorDashboard() {

    const navigate = useNavigate();

    const [doctor, setDoctor] = useState(null);
    const [patientId, setPatientId] = useState("");
    const [loading, setLoading] = useState(false);

    const BACKEND_URL =
        "https://hospital-report-system-xdai.onrender.com";

    useEffect(() => {

        const storedDoctor =
            localStorage.getItem("doctor");

        if (!storedDoctor) {

            navigate("/doctor-login");

            return;
        }

        try {

            setDoctor(
                JSON.parse(storedDoctor)
            );

        } catch (error) {

            localStorage.removeItem("doctor");
            localStorage.removeItem("doctorToken");

            navigate("/doctor-login");

        }

    }, [navigate]);


    // =====================================================
    // SEARCH PATIENT
    // =====================================================

    const searchPatient = async (e) => {

        e.preventDefault();

        if (!patientId.trim()) {

            alert(
                "Please enter Patient ID"
            );

            return;
        }

        const id =
            patientId.trim().toUpperCase();

        try {

            setLoading(true);

            const response =
                await axios.get(
                    `${BACKEND_URL}/doctor/patient/${id}`
                );

            if (
                response.data.success !== false
            ) {

                navigate(
                    `/doctor-patient/${id}`
                );

            } else {

                alert(
                    response.data.message ||
                    "Patient not found"
                );

            }

        } catch (error) {

            console.error(
                "PATIENT SEARCH ERROR:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Patient not found"
            );

        } finally {

            setLoading(false);

        }

    };


    // =====================================================
    // LOGOUT
    // =====================================================

    const handleLogout = () => {

        localStorage.removeItem("doctor");
        localStorage.removeItem("doctorToken");

        navigate("/doctor-login");

    };


    if (!doctor) {

        return (
            <div className="doctor-loading">
                Loading...
            </div>
        );

    }


    return (

        <div className="doctor-dashboard-page">


            {/* =================================================
                NAVBAR
            ================================================= */}

            <header className="doctor-navbar">

                <div className="doctor-brand">

                    <div className="doctor-brand-icon">
                        🏥
                    </div>

                    <div>

                        <h2>
                            Smart Hospital
                        </h2>

                        <span>
                            Doctor Portal
                        </span>

                    </div>

                </div>


                <div className="doctor-nav-right">

                    <div className="doctor-info">

                        <strong>
                            Dr. {doctor.name}
                        </strong>

                        <span>
                            {doctor.specialization}
                        </span>

                    </div>


                    <button
                        onClick={handleLogout}
                        className="doctor-logout"
                    >
                        Logout
                    </button>

                </div>

            </header>


            {/* =================================================
                MAIN
            ================================================= */}

            <main className="doctor-dashboard-main">


                {/* =================================================
                    WELCOME
                ================================================= */}

                <section className="doctor-welcome">

                    <div>

                        <span>
                            DOCTOR DASHBOARD
                        </span>

                        <h1>
                            Welcome, Dr. {doctor.name}
                        </h1>

                        <p>
                            Search patient records or scan a
                            patient's QR code to access medical reports.
                        </p>

                    </div>


                    <div className="doctor-id-box">

                        <small>
                            Doctor ID
                        </small>

                        <strong>
                            {doctor.doctorId}
                        </strong>

                    </div>

                </section>


                {/* =================================================
                    SEARCH + QR
                ================================================= */}

                <section className="doctor-actions-grid">


                    {/* SEARCH */}

                    <div className="doctor-action-card">

                        <div className="doctor-action-icon">
                            🔎
                        </div>

                        <h2>
                            Search Patient
                        </h2>

                        <p>
                            Enter the patient's ID to view
                            their medical record.
                        </p>


                        <form onSubmit={searchPatient}>

                            <input
                                type="text"
                                placeholder="Example: PAT1002"
                                value={patientId}
                                onChange={(e) =>
                                    setPatientId(
                                        e.target.value
                                    )
                                }
                            />

                            <button
                                type="submit"
                                disabled={loading}
                            >

                                {loading
                                    ? "Searching..."
                                    : "Search Patient"}

                            </button>

                        </form>

                    </div>


                    {/* QR */}

                    <div className="doctor-action-card qr-action">

                        <div className="doctor-action-icon">
                            📷
                        </div>

                        <h2>
                            Scan Patient QR
                        </h2>

                        <p>
                            Scan the patient's QR code
                            for quick record access.
                        </p>


                        <Link
                            to="/doctor-scan-qr"
                            className="scan-patient-button"
                        >
                            Scan QR Code
                        </Link>

                    </div>

                </section>


                {/* =================================================
                    FEATURES
                ================================================= */}

                <section className="doctor-features">

                    <div className="feature-card">

                        <div>
                            👤
                        </div>

                        <h3>
                            Patient Details
                        </h3>

                        <p>
                            View patient information
                            and medical history.
                        </p>

                    </div>


                    <div className="feature-card">

                        <div>
                            📄
                        </div>

                        <h3>
                            Medical Reports
                        </h3>

                        <p>
                            Access reports uploaded
                            by the patient.
                        </p>

                    </div>


                    <div className="feature-card">

                        <div>
                            💊
                        </div>

                        <h3>
                            Prescription
                        </h3>

                        <p>
                            Upload prescriptions for
                            the selected patient.
                        </p>

                    </div>

                </section>


                {/* =================================================
                    FOOTER
                ================================================= */}

                <footer className="doctor-footer">

                    Smart Hospital Report Management System
                    <span>
                        Doctor Portal
                    </span>

                </footer>

            </main>

        </div>

    );
}