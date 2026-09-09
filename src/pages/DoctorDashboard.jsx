import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./DoctorDashboard.css";

export default function DoctorDashboard() {

    const navigate = useNavigate();

    const BACKEND_URL =
        "https://hospital-report-system-xdai.onrender.com";

    const [doctor, setDoctor] = useState(null);
    const [patientId, setPatientId] = useState("");
    const [searching, setSearching] = useState(false);


    // =====================================================
    // LOAD DOCTOR
    // =====================================================

    useEffect(() => {

        const storedDoctor =
            localStorage.getItem("doctor");

        if (!storedDoctor) {

            navigate("/doctor-login");

            return;

        }

        try {

            const doctorData =
                JSON.parse(storedDoctor);

            setDoctor(doctorData);

        } catch (error) {

            console.error(
                "DOCTOR DATA ERROR:",
                error
            );

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

        const id =
            patientId.trim().toUpperCase();


        if (!id) {

            alert(
                "Please enter Patient ID"
            );

            return;

        }


        try {

            setSearching(true);


            const response =
                await axios.get(
                    `${BACKEND_URL}/doctor/patient/${id}`
                );


            if (
                response.data.success === false
            ) {

                alert(
                    response.data.message ||
                    "Patient not found"
                );

                return;

            }


            navigate(
                `/doctor-patient/${id}`
            );

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

            setSearching(false);

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


    // =====================================================
    // LOADING
    // =====================================================

    if (!doctor) {

        return (

            <div className="doctor-dashboard-loading">

                <div className="doctor-loading-spinner"></div>

                <p>
                    Loading doctor portal...
                </p>

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


                    <div className="doctor-profile">

                        <div className="doctor-avatar">
                            Dr
                        </div>

                        <div>

                            <strong>
                                Dr. {doctor.name}
                            </strong>

                            <span>
                                {doctor.specialization}
                            </span>

                        </div>

                    </div>


                    <button
                        className="doctor-logout"
                        onClick={handleLogout}
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

                    <div className="doctor-welcome-content">

                        <span className="doctor-welcome-label">
                            CLINICAL WORKSPACE
                        </span>

                        <h1>
                            Welcome,{" "}
                            <span>
                                Dr. {doctor.name}
                            </span>
                        </h1>

                        <p>
                            Securely search patient records,
                            scan patient QR codes, review medical
                            reports and manage prescriptions.
                        </p>

                    </div>


                    <div className="doctor-id-card">

                        <span>
                            DOCTOR ID
                        </span>

                        <strong>
                            {doctor.doctorId}
                        </strong>

                    </div>

                </section>


                {/* =================================================
                    SEARCH + SCAN
                ================================================= */}

                <section className="clinical-actions">


                    {/* SEARCH */}

                    <div className="clinical-card search-card">

                        <div className="clinical-card-top">

                            <div className="clinical-icon search-icon">
                                🔎
                            </div>

                            <span>
                                PATIENT SEARCH
                            </span>

                        </div>


                        <h2>
                            Find Patient
                        </h2>


                        <p>
                            Enter a Patient ID to open
                            the patient's medical record.
                        </p>


                        <form
                            onSubmit={searchPatient}
                            className="patient-search-form"
                        >

                            <div className="patient-input-wrapper">

                                <span>
                                    #
                                </span>

                                <input
                                    type="text"
                                    placeholder="PAT1002"
                                    value={patientId}
                                    onChange={(e) =>
                                        setPatientId(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>


                            <button
                                type="submit"
                                disabled={searching}
                            >

                                {searching
                                    ? "Searching..."
                                    : "Search Patient"}

                            </button>

                        </form>

                    </div>


                    {/* QR */}

                    <div className="clinical-card scan-card">

                        <div className="clinical-card-top">

                            <div className="clinical-icon scan-icon">
                                📷
                            </div>

                            <span>
                                QR IDENTIFICATION
                            </span>

                        </div>


                        <h2>
                            Scan Patient QR
                        </h2>


                        <p>
                            Scan the patient's QR code
                            for instant record access.
                        </p>


                        <Link
                            to="/doctor-scan-qr"
                            className="scan-button"
                        >
                            <span>
                                Scan QR Code
                            </span>

                            <strong>
                                →
                            </strong>

                        </Link>

                    </div>

                </section>


                {/* =================================================
                    CLINICAL FEATURES
                ================================================= */}

                <section className="clinical-section">


                    <div className="section-heading">

                        <div>

                            <span>
                                DOCTOR TOOLS
                            </span>

                            <h2>
                                Clinical Actions
                            </h2>

                            <p>
                                Access the tools required for patient care.
                            </p>

                        </div>

                    </div>


                    <div className="feature-grid">


                        <div className="feature-card">

                            <div className="feature-icon patient-feature">
                                👤
                            </div>

                            <h3>
                                Patient Records
                            </h3>

                            <p>
                                Search and review patient
                                information and history.
                            </p>

                        </div>


                        <div className="feature-card">

                            <div className="feature-icon report-feature">
                                📄
                            </div>

                            <h3>
                                Medical Reports
                            </h3>

                            <p>
                                Access patient-uploaded
                                reports securely.
                            </p>

                        </div>


                        <div className="feature-card">

                            <div className="feature-icon prescription-feature">
                                💊
                            </div>

                            <h3>
                                Prescriptions
                            </h3>

                            <p>
                                Create and upload prescriptions
                                for patients.
                            </p>

                        </div>

                    </div>

                </section>


                {/* =================================================
                    HOW IT WORKS
                ================================================= */}

                <section className="workflow-section">

                    <div className="workflow-heading">

                        <span>
                            SIMPLE WORKFLOW
                        </span>

                        <h2>
                            Access Patient Records
                        </h2>

                    </div>


                    <div className="workflow">

                        <div className="workflow-step">

                            <div>
                                01
                            </div>

                            <strong>
                                Identify Patient
                            </strong>

                            <p>
                                Search using Patient ID
                                or scan the QR code.
                            </p>

                        </div>


                        <div className="workflow-line">
                            →
                        </div>


                        <div className="workflow-step">

                            <div>
                                02
                            </div>

                            <strong>
                                Review Record
                            </strong>

                            <p>
                                View patient information
                                and medical reports.
                            </p>

                        </div>


                        <div className="workflow-line">
                            →
                        </div>


                        <div className="workflow-step">

                            <div>
                                03
                            </div>

                            <strong>
                                Provide Care
                            </strong>

                            <p>
                                Review reports and
                                upload prescriptions.
                            </p>

                        </div>

                    </div>

                </section>


                {/* =================================================
                    FOOTER
                ================================================= */}

                <footer className="doctor-footer">

                    <span>
                        © 2026 Smart Hospital Report Management System
                    </span>

                    <span>
                        Doctor Portal • Secure Clinical Access
                    </span>

                </footer>

            </main>

        </div>
    );
}