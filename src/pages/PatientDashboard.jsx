import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./PatientDashboard.css";

export default function PatientDashboard() {

    const navigate = useNavigate();

    const patient = JSON.parse(localStorage.getItem("patient"));

    const [reports, setReports] = useState([]);

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

                `http://https://hospital-report-system-xdai.onrender.com/patient/reports/${patient.patientId}`

            );

            setReports(res.data);

        }

        catch (err) {

            console.log(err);

        }

    };

    const logout = () => {

        localStorage.removeItem("patient");

        localStorage.removeItem("token");

        navigate("/");

    };

    return (

        <div className="dashboard">

            {/* Sidebar */}

           <div className="sidebar">

    <h2>🏥 Smart Hospital</h2>

    <div className="menu">

        <Link to="/patient-dashboard" className="menu-item">
            🏠 Dashboard
        </Link>

        <Link to="/upload-report" className="menu-item">
            📄 Upload Report
        </Link>

        <Link to="/my-reports" className="menu-item">
            📁 My Reports
        </Link>

        <Link to="/patient-qr" className="menu-item">
            🔳 My QR Code
        </Link>

        <Link to="/patient-profile" className="menu-item">
            👤 My Profile
        </Link>

        <button
            className="logout-btn"
            onClick={logout}
        >
            🚪 Logout
        </button>

    </div>

</div>

            {/* Main Content */}

            <div className="content">

                <h1>

                    Welcome, {patient.name}

                </h1>

                <div className="patient-details">

    <div className="detail-card">
        <span>Patient ID</span>
        <h3>{patient.patientId}</h3>
    </div>

    <div className="detail-card">
        <span>Email</span>
        <h3>{patient.email}</h3>
    </div>

    <div className="detail-card">
        <span>Age</span>
        <h3>{patient.age}</h3>
    </div>

    <div className="detail-card">
        <span>Gender</span>
        <h3>{patient.gender}</h3>
    </div>

    <div className="detail-card">
        <span>Blood Group</span>
        <h3>{patient.bloodGroup}</h3>
    </div>

    <div className="detail-card">
        <span>Phone</span>
        <h3>{patient.phone}</h3>
    </div>

    <div className="detail-card detail-full">
        <span>Address</span>
        <h3>{patient.address}</h3>
    </div>

</div>
                {/* Recent Reports */}

                <div className="recent-reports">

                    <h2>

                        Recent Medical Reports

                    </h2>

                    {

                        reports.length === 0 ?

                        (

                            <p>

                                No Reports Uploaded

                            </p>

                        )

                        :

                        (

                            <table>

                                <thead>

                                    <tr>

                                        <th>

                                            Report Name

                                        </th>

                                        <th>

                                            Type

                                        </th>

                                        <th>

                                            View

                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

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

                                                        href={`http://https://hospital-report-system-xdai.onrender.com/${report.filePath.replace(/\\/g, "/")}`}

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

                        )

                    }

                </div>

                {/* Cards */}

                <div className="cards">

                    <div className="card">

                        <h3>

                            📄 Upload Report

                        </h3>

                        <p>

                            Upload new medical reports.

                        </p>

                        <Link to="/upload-report">

                            <button>

                                Upload

                            </button>

                        </Link>

                    </div>

                    <div className="card">

                        <h3>

                            📁 My Reports

                        </h3>

                        <p>

                            View all uploaded reports.

                        </p>

                        <Link to="/my-reports">

                            <button>

                                Open

                            </button>

                        </Link>

                    </div>

                    <div className="card">

                        <h3>

                            🔳 My QR Code

                        </h3>

                        <p>

                            View your permanent QR Code.

                        </p>

                        <Link to="/patient-qr">

                            <button>

                                QR Code

                            </button>

                        </Link>

                    </div>

                    <div className="card">

                        <h3>

                            👤 My Profile

                        </h3>

                        <p>

                            Update your personal details.

                        </p>

                        <Link to="/patient-profile">

                            <button>

                                Profile

                            </button>

                        </Link>

                    </div>

                </div>

            </div>

        </div>

    );

}