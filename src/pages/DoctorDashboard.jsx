import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./PatientDashboard.css";

export default function PatientDashboard() {

    const navigate = useNavigate();

    const BACKEND_URL =
        "https://hospital-report-system-xdai.onrender.com";

    const [patient, setPatient] = useState(null);
    const [reports, setReports] = useState([]);
    const [loadingReports, setLoadingReports] = useState(true);

    // =====================================================
    // LOAD PATIENT
    // =====================================================

    useEffect(() => {

        const storedPatient =
            localStorage.getItem("patient");

        if (!storedPatient) {
            navigate("/patient-login");
            return;
        }

        try {

            const patientData =
                JSON.parse(storedPatient);

            setPatient(patientData);

            fetchReports(patientData.patientId);

        } catch (error) {

            console.error(
                "PATIENT DATA ERROR:",
                error
            );

            localStorage.removeItem("patient");
            localStorage.removeItem("token");

            navigate("/patient-login");
        }

    }, [navigate]);


    // =====================================================
    // FETCH REPORTS
    // =====================================================

    const fetchReports = async (patientId) => {

        try {

            console.log(
                "Fetching reports for:",
                patientId
            );

            const response = await axios.get(
                `${BACKEND_URL}/patient/reports/${patientId}`
            );

            console.log(
                "Reports response:",
                response.data
            );

            if (response.data.success) {

                setReports(
                    response.data.reports || []
                );

            } else {

                setReports([]);

            }

        } catch (error) {

            console.error(
                "FETCH REPORTS ERROR:",
                error
            );

            setReports([]);

        } finally {

            setLoadingReports(false);

        }
    };


    // =====================================================
    // OPEN REPORT
    // =====================================================

    const openReport = (report) => {

        if (!report.fileData) {

            alert(
                "Report file is not available."
            );

            return;
        }

        const newWindow =
            window.open();

        if (!newWindow) {

            alert(
                "Please allow pop-ups to view the report."
            );

            return;
        }

        newWindow.location.href =
            report.fileData;
    };


    // =====================================================
    // LOGOUT
    // =====================================================

    const handleLogout = () => {

        localStorage.removeItem("patient");
        localStorage.removeItem("token");

        navigate("/patient-login");

    };


    // =====================================================
    // LOADING
    // =====================================================

    if (!patient) {

        return (
            <div className="dashboard-loading">

                <div className="loading-spinner"></div>

                <p>
                    Loading dashboard...
                </p>

            </div>
        );

    }


    // =====================================================
    // DASHBOARD
    // =====================================================

    return (

        <div className="patient-dashboard">

            {/* =================================================
                NAVBAR
            ================================================= */}

            <header className="dashboard-navbar">

                <div className="brand-section">

                    <div className="brand-icon">
                        🏥
                    </div>

                    <div>

                        <h2>
                            Smart Hospital
                        </h2>

                        <span>
                            Patient Portal
                        </span>

                    </div>

                </div>


                <div className="nav-actions">

                    <Link
                        to="/patient-profile"
                        className="nav-link"
                    >
                        👤 My Profile
                    </Link>

                    <button
                        className="logout-button"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </header>


            {/* =================================================
                MAIN CONTENT
            ================================================= */}

            <main className="dashboard-main">


                {/* =================================================
                    WELCOME BANNER
                ================================================= */}

                <section className="welcome-banner">

                    <div className="welcome-content">

                        <span className="welcome-tag">
                            PATIENT DASHBOARD
                        </span>

                        <h1>
                            Welcome back,{" "}
                            <span>
                                {patient.name}
                            </span>
                        </h1>

                        <p>
                            Manage your patient information,
                            medical reports and QR identification
                            from one secure place.
                        </p>

                    </div>


                    <div className="patient-id-box">

                        <span>
                            Patient ID
                        </span>

                        <strong>
                            {patient.patientId}
                        </strong>

                    </div>

                </section>


                {/* =================================================
                    SUMMARY CARDS
                ================================================= */}

                <section className="summary-grid">


                    <div className="summary-card">

                        <div className="summary-icon blue-icon">
                            📄
                        </div>

                        <div>

                            <span>
                                Medical Reports
                            </span>

                            <strong>
                                {reports.length}
                            </strong>

                        </div>

                    </div>


                    <div className="summary-card">

                        <div className="summary-icon red-icon">
                            🩸
                        </div>

                        <div>

                            <span>
                                Blood Group
                            </span>

                            <strong>
                                {patient.bloodGroup || "N/A"}
                            </strong>

                        </div>

                    </div>


                    <div className="summary-card">

                        <div className="summary-icon purple-icon">
                            ⚕
                        </div>

                        <div>

                            <span>
                                Gender
                            </span>

                            <strong>
                                {patient.gender || "N/A"}
                            </strong>

                        </div>

                    </div>


                    <div className="summary-card">

                        <div className="summary-icon orange-icon">
                            🎂
                        </div>

                        <div>

                            <span>
                                Age
                            </span>

                            <strong>
                                {patient.age || "N/A"}
                            </strong>

                        </div>

                    </div>

                </section>


                {/* =================================================
                    PROFILE + QR
                ================================================= */}

                <section className="main-card-grid">


                    {/* =================================================
                        PROFILE CARD
                    ================================================= */}

                    <div className="profile-card">

                        <div className="section-header">

                            <div>

                                <h2>
                                    Personal Information
                                </h2>

                                <p>
                                    Your registered patient details
                                </p>

                            </div>

                            <div className="section-icon">
                                👤
                            </div>

                        </div>


                        <div className="profile-details">


                            <div className="profile-row">

                                <span>
                                    Full Name
                                </span>

                                <strong>
                                    {patient.name}
                                </strong>

                            </div>


                            <div className="profile-row">

                                <span>
                                    Email
                                </span>

                                <strong>
                                    {patient.email}
                                </strong>

                            </div>


                            <div className="profile-row">

                                <span>
                                    Phone
                                </span>

                                <strong>
                                    {patient.phone || "Not provided"}
                                </strong>

                            </div>


                            <div className="profile-row">

                                <span>
                                    Address
                                </span>

                                <strong>
                                    {patient.address || "Not provided"}
                                </strong>

                            </div>


                            <div className="profile-row">

                                <span>
                                    Patient ID
                                </span>

                                <strong>
                                    {patient.patientId}
                                </strong>

                            </div>

                        </div>


                        <Link
                            to="/patient-profile"
                            className="profile-link"
                        >
                            View Full Profile →
                        </Link>

                    </div>


                    {/* =================================================
                        QR CARD
                    ================================================= */}

                    <div className="qr-card">

                        <div className="section-header">

                            <div>

                                <h2>
                                    Patient QR Code
                                </h2>

                                <p>
                                    Quick patient identification
                                </p>

                            </div>

                            <div className="section-icon">
                                ▦
                            </div>

                        </div>


                        <div className="qr-content">

                            {patient.qrCode ? (

                                <>

                                    <div className="qr-image-container">

                                        <img
                                            src={patient.qrCode}
                                            alt="Patient QR Code"
                                        />

                                    </div>


                                    <div className="qr-patient-id">

                                        {patient.patientId}

                                    </div>


                                    <p className="qr-help-text">

                                        Show this QR code to authorized
                                        hospital staff for quick identification.

                                    </p>


                                    <button
                                        className="qr-open-button"
                                        onClick={() => {

                                            const newWindow =
                                                window.open();

                                            if (newWindow) {
                                                newWindow.location.href =
                                                    patient.qrCode;
                                            }

                                        }}
                                    >
                                        Open QR Code
                                    </button>

                                </>

                            ) : (

                                <div className="qr-empty">

                                    <div className="qr-empty-icon">
                                        ▦
                                    </div>

                                    <h3>
                                        QR Code Unavailable
                                    </h3>

                                    <p>
                                        Please logout and login again
                                        to refresh your patient information.
                                    </p>

                                </div>

                            )}

                        </div>

                    </div>

                </section>


                {/* =================================================
                    QUICK ACTIONS
                ================================================= */}

                <section className="actions-section">

                    <div className="section-title">

                        <h2>
                            Quick Actions
                        </h2>

                        <p>
                            Manage your medical records
                        </p>

                    </div>


                    <div className="actions-grid">


                        <Link
                            to="/upload-report"
                            className="action-card"
                        >

                            <div className="action-card-icon upload-icon">
                                ⬆
                            </div>

                            <div className="action-text">

                                <h3>
                                    Upload Report
                                </h3>

                                <p>
                                    Add a new medical report
                                </p>

                            </div>

                            <span className="action-arrow">
                                →
                            </span>

                        </Link>


                        <Link
                            to="/my-reports"
                            className="action-card"
                        >

                            <div className="action-card-icon report-icon">
                                📄
                            </div>

                            <div className="action-text">

                                <h3>
                                    My Reports
                                </h3>

                                <p>
                                    View your medical documents
                                </p>

                            </div>

                            <span className="action-arrow">
                                →
                            </span>

                        </Link>


                        <Link
                            to="/patient-profile"
                            className="action-card"
                        >

                            <div className="action-card-icon profile-icon">
                                👤
                            </div>

                            <div className="action-text">

                                <h3>
                                    My Profile
                                </h3>

                                <p>
                                    View your personal details
                                </p>

                            </div>

                            <span className="action-arrow">
                                →
                            </span>

                        </Link>

                    </div>

                </section>


                {/* =================================================
                    RECENT REPORTS
                ================================================= */}

                <section className="recent-reports-card">

                    <div className="recent-header">

                        <div>

                            <h2>
                                Recent Medical Reports
                            </h2>

                            <p>
                                Your latest uploaded documents
                            </p>

                        </div>


                        <Link
                            to="/my-reports"
                            className="view-all-link"
                        >
                            View All →
                        </Link>

                    </div>


                    {loadingReports ? (

                        <div className="reports-loading">

                            <div className="small-spinner"></div>

                            <span>
                                Loading reports...
                            </span>

                        </div>

                    ) : reports.length === 0 ? (

                        <div className="empty-reports">

                            <div className="empty-report-icon">
                                📄
                            </div>

                            <h3>
                                No Reports Uploaded
                            </h3>

                            <p>
                                Your medical reports will appear here
                                after you upload them.
                            </p>

                            <Link
                                to="/upload-report"
                                className="upload-first-button"
                            >
                                Upload Your First Report
                            </Link>

                        </div>

                    ) : (

                        <div className="report-list">

                            {reports
                                .slice(0, 5)
                                .map((report) => (

                                    <div
                                        className="report-item"
                                        key={report._id}
                                    >

                                        <div className="report-left">

                                            <div className="report-file-icon">
                                                📄
                                            </div>

                                            <div>

                                                <h3>
                                                    {report.reportName}
                                                </h3>

                                                <p>
                                                    {report.reportType}
                                                </p>

                                            </div>

                                        </div>


                                        <div className="report-middle">

                                            <span>
                                                Uploaded
                                            </span>

                                            <strong>
                                                {report.uploadedAt
                                                    ? new Date(
                                                        report.uploadedAt
                                                    ).toLocaleDateString()
                                                    : "N/A"}
                                            </strong>

                                        </div>


                                        <button
                                            className="view-report-button"
                                            onClick={() =>
                                                openReport(report)
                                            }
                                        >
                                            View
                                        </button>

                                    </div>

                                ))}

                        </div>

                    )}

                </section>


                {/* =================================================
                    FOOTER
                ================================================= */}

                <footer className="dashboard-footer">

                    <div>
                        © 2026 Smart Hospital Report Management System
                    </div>

                    <div>
                        Secure • Simple • Accessible
                    </div>

                </footer>

            </main>

        </div>
    );
}