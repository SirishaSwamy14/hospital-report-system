import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./MyReports.css";

export default function MyReports() {

    const navigate = useNavigate();

    const BACKEND_URL =
        "https://hospital-report-system-xdai.onrender.com";

    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    const patient =
        JSON.parse(
            localStorage.getItem("patient")
        );


    // =====================================================
    // FETCH REPORTS
    // =====================================================

    useEffect(() => {

        if (
            !patient ||
            !patient.patientId
        ) {

            navigate(
                "/patient-login"
            );

            return;

        }

        fetchReports();

    }, [navigate]);


    const fetchReports = async () => {

        try {

            console.log(
                "Fetching reports for:",
                patient.patientId
            );


            const response =
                await axios.get(

                    `${BACKEND_URL}/patient/reports/${patient.patientId}`

                );


            console.log(
                "Reports response:",
                response.data
            );


            if (
                response.data.success
            ) {

                setReports(
                    response.data.reports || []
                );

            } else {

                setReports([]);

            }

        }

        catch (error) {

            console.error(
                "FETCH REPORTS ERROR:",
                error
            );


            if (
                error.response
            ) {

                console.error(
                    "STATUS:",
                    error.response.status
                );


                console.error(
                    "SERVER RESPONSE:",
                    error.response.data
                );


                alert(

                    error.response.data?.message ||

                    "Unable to fetch reports."

                );

            }

            else {

                alert(
                    "Unable to connect to server."
                );

            }

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


            /*
             * Example:
             *
             * data:application/pdf;base64,JVBERi0xLjQ...
             *
             */


            const commaIndex =
                report.fileData.indexOf(",");


            if (
                commaIndex === -1
            ) {

                alert(
                    "Invalid report file data."
                );

                return;

            }


            // Get MIME type
            const header =
                report.fileData.substring(
                    5,
                    commaIndex
                );


            const mimeType =
                header.split(";")[0];


            // Get Base64 section
            const base64Data =
                report.fileData.substring(
                    commaIndex + 1
                );


            // Convert Base64 into bytes
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


            // Create Blob
            const blob =
                new Blob(
                    [byteArray],
                    {
                        type: mimeType
                    }
                );


            // Temporary URL
            const blobUrl =
                URL.createObjectURL(blob);


            // Open in new tab
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


    return (

        <div className="reports-container">

            <div className="reports-box">


                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="reports-header">

                    <div>

                        <span className="reports-label">
                            MEDICAL RECORDS
                        </span>

                        <h2>
                            My Medical Reports
                        </h2>

                        <p>
                            View and access your uploaded
                            medical documents.
                        </p>

                    </div>


                    <Link
                        to="/upload-report"
                        className="upload-new-btn"
                    >
                        + Upload Report
                    </Link>

                </div>


                {/* =================================================
                    CONTENT
                ================================================= */}

                {loading ? (

                    <div className="loading-reports">

                        <div className="reports-spinner"></div>

                        <p>
                            Loading your reports...
                        </p>

                    </div>

                ) : reports.length === 0 ? (

                    <div className="no-reports">

                        <div className="no-reports-icon">
                            📄
                        </div>

                        <h3>
                            No Reports Uploaded
                        </h3>

                        <p>
                            Your uploaded medical reports
                            will appear here.
                        </p>


                        <Link
                            to="/upload-report"
                            className="upload-empty-btn"
                        >
                            Upload Medical Report
                        </Link>

                    </div>

                ) : (

                    <div className="reports-table-wrapper">

                        <table className="reports-table">

                            <thead>

                                <tr>

                                    <th>
                                        Report
                                    </th>

                                    <th>
                                        Type
                                    </th>

                                    <th>
                                        Uploaded
                                    </th>

                                    <th>
                                        Action
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {reports.map(
                                    (report) => (

                                        <tr
                                            key={
                                                report._id
                                            }
                                        >

                                            <td>

                                                <div className="report-name-cell">

                                                    <div className="report-icon">
                                                        📄
                                                    </div>

                                                    <div>

                                                        <strong>
                                                            {report.reportName}
                                                        </strong>

                                                        <span>
                                                            {report.fileName}
                                                        </span>

                                                    </div>

                                                </div>

                                            </td>


                                            <td>

                                                <span className="type-badge">
                                                    {report.reportType}
                                                </span>

                                            </td>


                                            <td>

                                                <span className="date-text">

                                                    {report.uploadedAt
                                                        ? new Date(
                                                            report.uploadedAt
                                                        ).toLocaleDateString()
                                                        : "N/A"}

                                                </span>

                                            </td>


                                            <td>

                                                <button
                                                    className="view-btn"
                                                    onClick={() =>
                                                        openReport(
                                                            report
                                                        )
                                                    }
                                                >
                                                    View
                                                </button>

                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                )}


                {/* =================================================
                    FOOTER LINK
                ================================================= */}

                <div className="reports-footer">

                    <Link
                        to="/patient-dashboard"
                        className="back-dashboard"
                    >
                        ← Back to Dashboard
                    </Link>

                </div>

            </div>

        </div>

    );

}