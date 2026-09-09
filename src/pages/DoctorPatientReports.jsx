import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./DoctorPatientReports.css";

export default function DoctorPatientReports() {

    const { patientId } = useParams();

    const [patient, setPatient] = useState(null);
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    const BACKEND_URL =
        "https://hospital-report-system-xdai.onrender.com";


    // =====================================================
    // FETCH PATIENT
    // =====================================================

    useEffect(() => {

        fetchPatient();

    }, [patientId]);


    const fetchPatient = async () => {

        try {

            const response =
                await axios.get(
                    `${BACKEND_URL}/doctor/patient/${patientId}`
                );


            console.log(
                "PATIENT RESPONSE:",
                response.data
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


            setPatient(
                response.data.patient
            );


            setReports(
                response.data.reports || []
            );

        }

        catch (error) {

            console.error(
                "FETCH PATIENT ERROR:",
                error
            );


            alert(
                error.response?.data?.message ||
                "Unable to fetch patient."
            );

        }

        finally {

            setLoading(false);

        }

    };


    // =====================================================
    // OPEN REPORT
    // =====================================================

    const openReport = (report) => {

        try {

            if (
                !report ||
                !report.fileData
            ) {

                alert(
                    "Report file is not available."
                );

                return;

            }


            const commaIndex =
                report.fileData.indexOf(",");


            if (commaIndex === -1) {

                alert(
                    "Invalid report file data."
                );

                return;

            }


            // ---------------------------------------------
            // MIME TYPE
            // ---------------------------------------------

            const header =
                report.fileData.substring(
                    5,
                    commaIndex
                );


            const mimeType =
                header.split(";")[0];


            // ---------------------------------------------
            // BASE64
            // ---------------------------------------------

            const base64Data =
                report.fileData.substring(
                    commaIndex + 1
                );


            // ---------------------------------------------
            // CONVERT BASE64 TO BINARY
            // ---------------------------------------------

            const byteCharacters =
                atob(base64Data);


            const byteNumbers =
                new Array(
                    byteCharacters.length
                );


            for (
                let i = 0;
                i < byteCharacters.length;
                i++
            ) {

                byteNumbers[i] =
                    byteCharacters.charCodeAt(i);

            }


            const byteArray =
                new Uint8Array(
                    byteNumbers
                );


            // ---------------------------------------------
            // CREATE BLOB
            // ---------------------------------------------

            const blob =
                new Blob(
                    [byteArray],
                    {
                        type: mimeType
                    }
                );


            const blobUrl =
                URL.createObjectURL(
                    blob
                );


            // ---------------------------------------------
            // OPEN
            // ---------------------------------------------

            const newWindow =
                window.open(
                    blobUrl,
                    "_blank"
                );


            if (!newWindow) {

                alert(
                    "Please allow pop-ups to view the report."
                );

            }

        }

        catch (error) {

            console.error(
                "OPEN REPORT ERROR:",
                error
            );

            alert(
                "Unable to open report."
            );

        }

    };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="doctor-page-loading">

                <div className="doctor-loader"></div>

                <p>
                    Loading patient record...
                </p>

            </div>

        );

    }


    // =====================================================
    // PATIENT NOT FOUND
    // =====================================================

    if (!patient) {

        return (

            <div className="doctor-page-loading">

                <h2>
                    Patient Not Found
                </h2>

                <Link to="/doctor-dashboard">
                    ← Back to Doctor Dashboard
                </Link>

            </div>

        );

    }


    // =====================================================
    // PAGE
    // =====================================================

    return (

        <div className="doctor-patient-page">


            {/* HEADER */}

            <header className="doctor-patient-navbar">

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


                <Link
                    to="/doctor-dashboard"
                    className="doctor-back-link"
                >
                    ← Dashboard
                </Link>

            </header>


            <main className="doctor-patient-main">


                {/* PAGE TITLE */}

                <div className="doctor-page-title">

                    <span>
                        PATIENT RECORD
                    </span>

                    <h1>
                        Patient Medical Record
                    </h1>

                    <p>
                        View patient information and uploaded medical reports.
                    </p>

                </div>


                {/* PATIENT */}

                <section className="doctor-patient-card">

                    <div className="doctor-card-header">

                        <div>

                            <span>
                                PATIENT
                            </span>

                            <h2>
                                {patient.name}
                            </h2>

                        </div>


                        <div className="doctor-patient-id">
                            {patient.patientId}
                        </div>

                    </div>


                    <div className="doctor-details-grid">


                        <div className="doctor-detail">

                            <span>
                                Patient ID
                            </span>

                            <strong>
                                {patient.patientId}
                            </strong>

                        </div>


                        <div className="doctor-detail">

                            <span>
                                Email
                            </span>

                            <strong>
                                {patient.email}
                            </strong>

                        </div>


                        <div className="doctor-detail">

                            <span>
                                Age
                            </span>

                            <strong>
                                {patient.age || "N/A"}
                            </strong>

                        </div>


                        <div className="doctor-detail">

                            <span>
                                Gender
                            </span>

                            <strong>
                                {patient.gender || "N/A"}
                            </strong>

                        </div>


                        <div className="doctor-detail">

                            <span>
                                Blood Group
                            </span>

                            <strong>
                                {patient.bloodGroup || "N/A"}
                            </strong>

                        </div>


                        <div className="doctor-detail">

                            <span>
                                Phone
                            </span>

                            <strong>
                                {patient.phone || "N/A"}
                            </strong>

                        </div>


                        <div className="doctor-detail address-detail">

                            <span>
                                Address
                            </span>

                            <strong>
                                {patient.address || "N/A"}
                            </strong>

                        </div>

                    </div>

                </section>


                {/* REPORTS */}

                <section className="doctor-reports-card">

                    <div className="doctor-reports-header">

                        <div>

                            <span>
                                MEDICAL DOCUMENTS
                            </span>

                            <h2>
                                Medical Reports
                            </h2>

                            <p>
                                Reports uploaded by this patient
                            </p>

                        </div>


                        <div className="reports-count">

                            {reports.length}

                            <small>
                                Reports
                            </small>

                        </div>

                    </div>


                    {reports.length === 0 ? (

                        <div className="doctor-no-reports">

                            <div>
                                📄
                            </div>

                            <h3>
                                No Reports Uploaded
                            </h3>

                            <p>
                                No medical reports are available for this patient.
                            </p>

                        </div>

                    ) : (

                        <div className="doctor-report-list">

                            {reports.map(
                                (report) => (

                                    <div
                                        className="doctor-report-item"
                                        key={report._id}
                                    >

                                        <div className="doctor-report-info">

                                            <div className="doctor-file-icon">
                                                📄
                                            </div>

                                            <div>

                                                <h3>
                                                    {report.reportName}
                                                </h3>

                                                <span>
                                                    {report.reportType}
                                                </span>

                                            </div>

                                        </div>


                                        <div className="doctor-report-date">

                                            <small>
                                                Uploaded
                                            </small>

                                            <strong>

                                                {report.uploadedAt
                                                    ? new Date(
                                                        report.uploadedAt
                                                    ).toLocaleDateString()
                                                    : "N/A"}

                                            </strong>

                                        </div>


                                        <button
                                            className="doctor-view-button"
                                            onClick={() =>
                                                openReport(
                                                    report
                                                )
                                            }
                                        >
                                            View Report
                                        </button>

                                    </div>

                                )
                            )}

                        </div>

                    )}

                </section>


                {/* ACTIONS */}

                <div className="doctor-page-actions">

                    <Link
                        to="/doctor-dashboard"
                    >

                        <button className="back-button">
                            ← Back to Dashboard
                        </button>

                    </Link>


                    <Link
                        to={`/upload-prescription/${patient.patientId}`}
                    >

                        <button className="prescription-button">
                            + Upload Prescription
                        </button>

                    </Link>

                </div>

            </main>

        </div>

    );
}