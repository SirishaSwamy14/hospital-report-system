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
    const [loading, setLoading] = useState(true);

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
                "Patient data error:",
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

            const res = await axios.get(
                `${BACKEND_URL}/patient/reports/${patientId}`
            );

            if (res.data.success) {

                setReports(
                    res.data.reports || []
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

            setLoading(false);

        }
    };


    // =====================================================
    // QR URL
    // =====================================================

    const getQRUrl = () => {

        if (!patient?.qrCode) {
            return null;
        }

        const qrPath =
            patient.qrCode.replace(
                /\\/g,
                "/"
            );

        if (qrPath.startsWith("http")) {
            return qrPath;
        }

        if (qrPath.startsWith("/")) {
            return `${BACKEND_URL}${qrPath}`;
        }

        return `${BACKEND_URL}/${qrPath}`;

    };


    // =====================================================
    // REPORT URL
    // =====================================================

    const getReportUrl = (filePath) => {

        if (!filePath) {
            return "#";
        }

        const cleanPath =
            filePath.replace(
                /\\/g,
                "/"
            );

        if (cleanPath.startsWith("http")) {
            return cleanPath;
        }

        if (cleanPath.startsWith("/")) {
            return `${BACKEND_URL}${cleanPath}`;
        }

        return `${BACKEND_URL}/${cleanPath}`;

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
                <p>Loading dashboard...</p>
            </div>
        );

    }


    // =====================================================
    // DASHBOARD
    // =====================================================

    return (

        <div className="patient-dashboard">


            {/* =================================================
                TOP NAVBAR
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

                    <Link to="/patient-profile">
                        <button className="nav-profile-btn">
                            👤 My Profile
                        </button>
                    </Link>

                    <button
                        className="nav-logout-btn"
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

                        <p className="welcome-label">
                            PATIENT DASHBOARD
                        </p>

                        <h1>
                            Welcome back,{" "}
                            <span>
                                {patient.name}
                            </span>
                        </h1>

                        <p className="welcome-text">
                            Manage your medical information,
                            reports and patient records in one place.
                        </p>

                    </div>


                    <div className="patient-id-badge">

                        <span>
                            Patient ID
                        </span>

                        <strong>
                            {patient.patientId}
                        </strong>

                    </div>

                </section>


                {/* =================================================
                    QUICK STATS
                ================================================= */}

                <section className="stats-grid">


                    <div className="stat-card">

                        <div className="stat-icon blue">
                            🧾
                        </div>

                        <div>

                            <span>
                                Total Reports
                            </span>

                            <strong>
                                {reports.length}
                            </strong>

                        </div>

                    </div>


                    <div className="stat-card">

                        <div className="stat-icon green">
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


                    <div className="stat-card">

                        <div className="stat-icon purple">
                            ⚧
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


                    <div className="stat-card">

                        <div className="stat-icon orange">
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
                    MAIN GRID
                ================================================= */}

                <section className="dashboard-grid">


                    {/* =============================================
                        PATIENT INFORMATION
                    ============================================= */}

                    <div className="info-card">

                        <div className="card-heading">

                            <div>

                                <h2>
                                    Personal Information
                                </h2>

                                <p>
                                    Your registered patient details
                                </p>

                            </div>

                            <span className="heading-icon">
                                👤
                            </span>

                        </div>


                        <div className="info-list">


                            <div className="info-item">

                                <span>
                                    Full Name
                                </span>

                                <strong>
                                    {patient.name}
                                </strong>

                            </div>


                            <div className="info-item">

                                <span>
                                    Email Address
                                </span>

                                <strong>
                                    {patient.email}
                                </strong>

                            </div>


                            <div className="info-item">

                                <span>
                                    Phone Number
                                </span>

                                <strong>
                                    {patient.phone || "Not provided"}
                                </strong>

                            </div>


                            <div className="info-item">

                                <span>
                                    Address
                                </span>

                                <strong>
                                    {patient.address || "Not provided"}
                                </strong>

                            </div>

                        </div>


                        <Link
                            to="/patient-profile"
                            className="card-link"
                        >
                            View Full Profile →
                        </Link>

                    </div>


                    {/* =============================================
                        QR CODE
                    ============================================= */}

                    <div className="qr-card">

                        <div className="qr-header">

                            <div>

                                <h2>
                                    Patient QR Code
                                </h2>

                                <p>
                                    Quick access to your patient ID
                                </p>

                            </div>

                            <div className="qr-small-icon">
                                ▦
                            </div>

                        </div>


                        <div className="qr-body">

                            {getQRUrl() ? (

                                <>

                                    <div className="qr-image-wrapper">

                                        <img
                                            src={getQRUrl()}
                                            alt="Patient QR Code"
                                        />

                                    </div>

                                    <p className="qr-id">
                                        {patient.patientId}
                                    </p>

                                    <p className="qr-description">
                                        Show or scan this QR code
                                        for quick patient identification.
                                    </p>

                                    <a
                                        href={getQRUrl()}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="qr-button"
                                    >
                                        Open QR Code
                                    </a>

                                </>

                            ) : (

                                <div className="qr-unavailable">

                                    <div>
                                        ▦
                                    </div>

                                    <h3>
                                        QR Code Unavailable
                                    </h3>

                                    <p>
                                        Your QR code has not been generated yet.
                                    </p>

                                </div>

                            )}

                        </div>

                    </div>

                </section>


                {/* =================================================
                    ACTION BUTTONS
                ================================================= */}

                <section className="quick-actions">

                    <div className="section-title">

                        <div>

                            <h2>
                                Quick Actions
                            </h2>

                            <p>
                                Access your important healthcare features
                            </p>

                        </div>

                    </div>


                    <div className="action-grid">


                        <Link
                            to="/upload-report"
                            className="action-card upload"
                        >

                            <div className="action-icon">
                                ⬆️
                            </div>

                            <div>
                                <h3>
                                    Upload Report
                                </h3>

                                <p>
                                    Add a new medical report
                                </p>
                            </div>

                            <span>
                                →
                            </span>

                        </Link>


                        <Link
                            to="/my-reports"
                            className="action-card reports"
                        >

                            <div className="action-icon">
                                📄
                            </div>

                            <div>
                                <h3>
                                    My Reports
                                </h3>

                                <p>
                                    View your medical documents
                                </p>
                            </div>

                            <span>
                                →
                            </span>

                        </Link>


                        <Link
                            to="/patient-profile"
                            className="action-card profile"
                        >

                            <div className="action-icon">
                                👤
                            </div>

                            <div>
                                <h3>
                                    My Profile
                                </h3>

                                <p>
                                    View and manage your details
                                </p>
                            </div>

                            <span>
                                →
                            </span>

                        </Link>


                    </div>

                </section>


                {/* =================================================
                    RECENT MEDICAL REPORTS
                ================================================= */}

                <section className="reports-card">

                    <div className="reports-card-header">

                        <div>

                            <h2>
                                Recent Medical Reports
                            </h2>

                            <p>
                                Your latest uploaded medical documents
                            </p>

                        </div>


                        <Link
                            to="/my-reports"
                            className="view-all-link"
                        >
                            View All →
                        </Link>

                    </div>


                    {loading ? (

                        <div className="reports-loading">
                            Loading reports...
                        </div>

                    ) : reports.length === 0 ? (

                        <div className="empty-reports">

                            <div className="empty-icon">
                                📄
                            </div>

                            <h3>
                                No Reports Uploaded
                            </h3>

                            <p>
                                Your recently uploaded medical reports
                                will appear here.
                            </p>

                            <Link
                                to="/upload-report"
                                className="empty-button"
                            >
                                Upload Your First Report
                            </Link>

                        </div>

                    ) : (

                        <div className="report-table-wrapper">

                            <table className="report-table">

                                <thead>

                                    <tr>

                                        <th>
                                            Report
                                        </th>

                                        <th>
                                            Type
                                        </th>

                                        <th>
                                            Date
                                        </th>

                                        <th>
                                            Action
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {reports
                                        .slice(0, 5)
                                        .map((report) => (

                                            <tr
                                                key={report._id}
                                            >

                                                <td>

                                                    <div className="report-name">

                                                        <span className="file-icon">
                                                            📄
                                                        </span>

                                                        <strong>
                                                            {report.reportName}
                                                        </strong>

                                                    </div>

                                                </td>


                                                <td>

                                                    <span className="report-type">
                                                        {report.reportType}
                                                    </span>

                                                </td>


                                                <td>

                                                    {report.uploadedAt
                                                        ? new Date(
                                                            report.uploadedAt
                                                        ).toLocaleDateString()
                                                        : "N/A"}

                                                </td>


                                                <td>

                                                    <a
                                                        href={getReportUrl(
                                                            report.filePath
                                                        )}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="view-report-btn"
                                                    >
                                                        View
                                                    </a>

                                                </td>

                                            </tr>

                                        ))}

                                </tbody>

                            </table>

                        </div>

                    )}

                </section>


                {/* =================================================
                    FOOTER
                ================================================= */}

                <footer className="dashboard-footer">

                    <p>
                        © 2026 Smart Hospital Report Management System
                    </p>

                    <span>
                        Secure • Simple • Accessible
                    </span>

                </footer>


            </main>

        </div>
    );
}