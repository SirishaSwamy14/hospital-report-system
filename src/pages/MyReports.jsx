import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./MyReports.css";

export default function MyReports() {

    const navigate = useNavigate();

    const [reports, setReports] = useState([]);

    const patient = JSON.parse(localStorage.getItem("patient"));

    useEffect(() => {

        if (!patient) {
            navigate("/patient-login");
            return;
        }

        fetchReports();

    }, []);

    const fetchReports = async () => {

        try {

            const res = await axios.get(

                `http://localhost:5000/patient/reports/${patient.patientId}`

            );

            console.log(res.data);

            setReports(res.data);

        }

        catch (err) {

            console.log(err);

            alert("Unable to fetch reports.");

        }

    };

    return (

        <div className="reports-container">

            <div className="reports-box">

                <h2>My Medical Reports</h2>

                <table>

                    <thead>

                        <tr>

                            <th>Report Name</th>

                            <th>Report Type</th>

                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            reports.length === 0 ?

                                (

                                    <tr>

                                        <td colSpan="3">

                                            No Reports Uploaded

                                        </td>

                                    </tr>

                                )

                                :

                                reports.map((report) => (

                                    <tr key={report._id}>

                                        <td>

                                            {report.reportName}

                                        </td>

                                        <td>

                                            {report.reportType}

                                        </td>

                                        <td>

                                            <a

                                                href={`http://localhost:5000/${report.filePath.replace(/\\/g, "/")}`}

                                                target="_blank"

                                                rel="noreferrer"

                                            >

                                                <button>

                                                    View

                                                </button>

                                            </a>

                                        </td>

                                    </tr>

                                ))

                        }

                    </tbody>

                </table>

                <br/>

                <Link to="/patient-dashboard">

                    ← Back to Dashboard

                </Link>

            </div>

        </div>

    );

}