import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./UploadReport.css";

export default function UploadReport() {

    const navigate = useNavigate();

    const patient = JSON.parse(localStorage.getItem("patient"));

    const [reportName, setReportName] = useState("");

    const [reportType, setReportType] = useState("Blood Test");

    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!file) {

            alert("Please select a report");

            return;

        }

        const formData = new FormData();

        formData.append(

            "patientId",

            patient.patientId

        );

        formData.append(

            "reportName",

            reportName

        );

        formData.append(

            "reportType",

            reportType

        );

        formData.append(

            "report",

            file

        );

        try {

            const res = await axios.post(

                "https://hospital-report-system-xdai.onrender.com/patient/upload-report",

                formData,

                {

                    headers: {

                        "Content-Type": "multipart/form-data"

                    }

                }

            );

            alert(res.data.message);

            navigate("/my-reports");

        }

        catch (err) {

            console.log(err);

            alert("Upload Failed");

        }

    };

    return (

        <div className="upload-container">

            <div className="upload-box">

                <h2>Upload Medical Report</h2>

                <form onSubmit={handleSubmit}>

                    <label>

                        Report Name

                    </label>

                    <input

                        type="text"

                        placeholder="Enter Report Name"

                        value={reportName}

                        onChange={(e)=>setReportName(e.target.value)}

                        required

                    />

                    <label>

                        Report Type

                    </label>

                    <select

                        value={reportType}

                        onChange={(e)=>setReportType(e.target.value)}

                    >

                        <option>

                            Blood Test

                        </option>

                        <option>

                            X-Ray

                        </option>

                        <option>

                            MRI Scan

                        </option>

                        <option>

                            CT Scan

                        </option>

                        <option>

                            Prescription

                        </option>

                        <option>

                            Other

                        </option>

                    </select>

                    <label>

                        Select Report

                    </label>

                    <input

                        type="file"

                        accept=".pdf,.jpg,.jpeg,.png"

                        onChange={(e)=>setFile(e.target.files[0])}

                        required

                    />

                    <button

                        type="submit"

                    >

                        Upload Report

                    </button>

                </form>

                <br/>

                <Link to="/patient-dashboard">

                    ← Back to Dashboard

                </Link>

            </div>

        </div>

    );

}