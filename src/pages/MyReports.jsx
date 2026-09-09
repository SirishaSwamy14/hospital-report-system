import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./MyReports.css";

export default function MyReports() {

    const navigate = useNavigate();

    const [reports, setReports] =
        useState([]);

    const [loading, setLoading] =
        useState(true);


    const patient =
        JSON.parse(
            localStorage.getItem("patient")
        );


    const BACKEND_URL =
        "https://hospital-report-system-xdai.onrender.com";


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

    }, []);


    const fetchReports = async () => {

        try {

            console.log(
                "Patient ID:",
                patient.patientId
            );


            const res =
                await axios.get(

                    `${BACKEND_URL}/patient/reports/${patient.patientId}`

                );


            console.log(
                "REPORT RESPONSE:",
                res.data
            );


            if (
                res.data.success
            ) {

                setReports(
                    res.data.reports || []
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

                alert(
                    error.response.data?.message ||
                    "Unable to fetch reports."
                );

            } else {

                alert(
                    "Unable to connect to server."
                );

            }

        }

        finally {

            setLoading(false);

        }

    };


    const getReportUrl =
        (filePath) => {

            if (!filePath) {
                return "#";
            }


            const cleanPath =
                filePath.replace(
                    /\\/g,
                    "/"
                );


            if (
                cleanPath.startsWith(
                    "http"
                )
            ) {

                return cleanPath;

            }


            if (
                cleanPath.startsWith(
                    "/"
                )
            ) {

                return (
                    `${BACKEND_URL}${cleanPath}`
                );

            }


            return (
                `${BACKEND_URL}/${cleanPath}`
            );

        };


    return (

        <div className="reports-container">

            <div className="reports-box">

                <div className="reports-header">

                    <div>

                        <h2>
                            My Medical Reports
                        </h2>

                        <p>
                            View your uploaded medical documents
                        </p>

                    </div>


                    <Link
                        to="/upload-report"
                        className="upload-new-btn"
                    >
                        + Upload Report
                    </Link>

                </div>


                {loading ? (

                    <div className="loading-reports">
                        Loading reports...
                    </div>

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
                                    Uploaded
                                </th>

                                <th>
                                    Action
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {reports.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="4"
                                    >

                                        No Reports Uploaded

                                    </td>

                                </tr>

                            ) : (

                                reports.map(
                                    (report) => (

                                        <tr
                                            key={
                                                report._id
                                            }
                                        >

                                            <td>
                                                {report.reportName}
                                            </td>

                                            <td>
                                                {report.reportType}
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
                                                    href={
                                                        getReportUrl(
                                                            report.filePath
                                                        )
                                                    }
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="view-btn"
                                                >
                                                    View
                                                </a>

                                            </td>

                                        </tr>

                                    )
                                )

                            )}

                        </tbody>

                    </table>

                )}


                <Link
                    to="/patient-dashboard"
                    className="back-dashboard"
                >
                    ← Back to Dashboard
                </Link>

            </div>

        </div>

    );
}