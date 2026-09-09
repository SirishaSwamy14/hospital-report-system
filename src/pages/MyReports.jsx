import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./MyReports.css";

export default function MyReports() {

    const navigate = useNavigate();

    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    const patient = JSON.parse(
        localStorage.getItem("patient")
    );

    useEffect(() => {

        if (!patient || !patient.patientId) {

            navigate("/patient-login");

            return;
        }

        fetchReports();

    }, []);

    const fetchReports = async () => {

        try {

            console.log(
                "Patient ID:",
                patient.patientId
            );

            const res = await axios.get(
                `https://hospital-report-system-xdai.onrender.com/patient/reports/${patient.patientId}`
            );

            console.log(
                "Reports Response:",
                res.data
            );

            if (res.data.success) {

                setReports(
                    res.data.reports || []
                );

            } else {

                setReports([]);

                alert(
                    res.data.message ||
                    "Unable to fetch reports."
                );
            }

        } catch (err) {

            console.error(
                "FETCH REPORTS ERROR:",
                err
            );

            if (err.response) {

                console.error(
                    "STATUS:",
                    err.response.status
                );

                console.error(
                    "SERVER RESPONSE:",
                    err.response.data
                );

                alert(
                    err.response.data?.message ||
                    "Unable to fetch reports."
                );

            } else {

                alert(
                    "Unable to connect to server."
                );
            }

        } finally {

            setLoading(false);
        }
    };


    const getReportUrl = (filePath) => {

        if (!filePath) {
            return "#";
        }

        // Convert Windows slashes to normal URL slashes
        const cleanPath =
            filePath.replace(/\\/g, "/");

        // If the stored path already begins with /uploads
        if (cleanPath.startsWith("/uploads")) {

            return `https://hospital-report-system-xdai.onrender.com${cleanPath}`;

        }

        // If old records contain uploads/...
        if (cleanPath.startsWith("uploads/")) {

            return `https://hospital-report-system-xdai.onrender.com/${cleanPath}`;

        }

        // Fallback
        return `https://hospital-report-system-xdai.onrender.com/${cleanPath}`;
    };


    return (

        <div className="reports-container">

            <div className="reports-box">

                <h2>
                    My Medical Reports
                </h2>


                {loading ? (

                    <p>
                        Loading reports...
                    </p>

                ) : (

                    <table>

                        <thead>

                            <tr>

                                <th>
                                    Report Name
                                </th>

                                <th>
                                    Report Type
                                </th>

                                <th>
                                    Action
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {reports.length === 0 ? (

                                <tr>

                                    <td colSpan="3">
                                        No Reports Uploaded
                                    </td>

                                </tr>

                            ) : (

                                reports.map((report) => (

                                    <tr
                                        key={report._id}
                                    >

                                        <td>
                                            {report.reportName}
                                        </td>


                                        <td>
                                            {report.reportType}
                                        </td>


                                        <td>

                                            <a
                                                href={getReportUrl(
                                                    report.filePath
                                                )}
                                                target="_blank"
                                                rel="noreferrer"
                                            >

                                                <button
                                                    type="button"
                                                >
                                                    View
                                                </button>

                                            </a>

                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>
                )}


                <br />


                <Link to="/patient-dashboard">

                    ← Back to Dashboard

                </Link>

            </div>

        </div>
    );
}