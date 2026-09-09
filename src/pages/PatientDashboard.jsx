import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./PatientDashboard.css";

export default function PatientDashboard() {

    const navigate = useNavigate();

    const [patient, setPatient] = useState(null);
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    const BACKEND_URL =
        "https://hospital-report-system-xdai.onrender.com";


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

        const patientData =
            JSON.parse(storedPatient);

        setPatient(patientData);

        fetchReports(patientData.patientId);

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

            const res = await axios.get(
                `${BACKEND_URL}/patient/reports/${patientId}`
            );

            console.log(
                "Reports response:",
                res.data
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
    // QR CODE URL
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
            <div>
                Loading...
            </div>
        );
    }


    // =====================================================
    // DASHBOARD
    // =====================================================

    return (

        <div className="dashboard-container">

            <h1>
                Welcome, {patient.name}
            </h1>


            {/* =================================================
                PATIENT DETAILS
            ================================================= */}

            <div className="details-grid">

                <div className="detail-card">

                    <span>
                        Patient ID
                    </span>

                    <strong>
                        {patient.patientId}
                    </strong>

                </div>


                <div className="detail-card">

                    <span>
                        Email
                    </span>

                    <strong>
                        {patient.email}
                    </strong>

                </div>


                <div className="detail-card">

                    <span>
                        Age
                    </span>

                    <strong>
                        {patient.age}
                    </strong>

                </div>


                <div className="detail-card">

                    <span>
                        Gender
                    </span>

                    <strong>
                        {patient.gender}
                    </strong>

                </div>


                <div className="detail-card">

                    <span>
                        Blood Group
                    </span>

                    <strong>
                        {patient.bloodGroup}
                    </strong>

                </div>


                <div className="detail-card">

                    <span>
                        Phone
                    </span>

                    <strong>
                        {patient.phone}
                    </strong>

                </div>


                <div className="detail-card full-width">

                    <span>
                        Address
                    </span>

                    <strong>
                        {patient.address}
                    </strong>

                </div>

            </div>


            {/* =================================================
                QR CODE
            ================================================= */}

            <div className="qr-section">

                <h2>
                    My Patient QR Code
                </h2>


                {getQRUrl() ? (

                    <>

                        <img
                            src={getQRUrl()}
                            alt="Patient QR Code"
                            className="patient-qr"
                        />


                        <p>
                            Scan this QR code to access
                            your patient information.
                        </p>


                        <a
                            href={getQRUrl()}
                            target="_blank"
                            rel="noreferrer"
                        >

                            <button>
                                Open QR Code
                            </button>

                        </a>

                    </>

                ) : (

                    <p>
                        QR Code is not available.
                    </p>

                )}

            </div>


            {/* =================================================
                RECENT REPORTS
            ================================================= */}

            <div className="reports-section">

                <h2>
                    Recent Medical Reports
                </h2>


                {loading ? (

                    <p>
                        Loading reports...
                    </p>

                ) : reports.length === 0 ? (

                    <p>
                        No Reports Uploaded
                    </p>

                ) : (

                    <div className="reports-list">

                        {reports.slice(0, 5).map(
                            (report) => (

                                <div
                                    className="report-card"
                                    key={report._id}
                                >

                                    <div>

                                        <h3>
                                            {report.reportName}
                                        </h3>

                                        <p>
                                            Type:
                                            {" "}
                                            {report.reportType}
                                        </p>

                                        <p>
                                            Uploaded:
                                            {" "}
                                            {report.uploadedAt
                                                ? new Date(
                                                    report.uploadedAt
                                                ).toLocaleDateString()
                                                : "N/A"}
                                        </p>

                                    </div>


                                    <a
                                        href={getReportUrl(
                                            report.filePath
                                        )}
                                        target="_blank"
                                        rel="noreferrer"
                                    >

                                        <button>
                                            View Report
                                        </button>

                                    </a>

                                </div>

                            )
                        )}

                    </div>

                )}


                <br />


                <Link to="/my-reports">

                    View All Reports

                </Link>

            </div>


            {/* =================================================
                ACTIONS
            ================================================= */}

            <div className="dashboard-actions">

                <Link to="/upload-report">

                    <button>
                        Upload Medical Report
                    </button>

                </Link>


                <Link to="/patient-profile">

                    <button>
                        My Profile
                    </button>

                </Link>


                <button
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

        </div>
    );
}