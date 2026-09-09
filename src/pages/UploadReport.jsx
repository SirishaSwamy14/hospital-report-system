import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./UploadReport.css";

export default function UploadReport() {

    const navigate = useNavigate();

    const patient =
        JSON.parse(
            localStorage.getItem("patient")
        );


    const [reportName, setReportName] =
        useState("");


    const [reportType, setReportType] =
        useState("Blood Test");


    const [file, setFile] =
        useState(null);


    const handleSubmit = async (e) => {

        e.preventDefault();


        // =============================================
        // CHECK PATIENT LOGIN
        // =============================================

        if (!patient) {

            alert(
                "Please login first"
            );

            navigate(
                "/patient-login"
            );

            return;

        }


        // =============================================
        // CHECK FILE
        // =============================================

        if (!file) {

            alert(
                "Please select a report"
            );

            return;

        }


        // =============================================
        // CREATE FORMDATA
        // =============================================

        const formData =
            new FormData();


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


        // =============================================
        // SEND TO BACKEND
        // =============================================

        try {

            console.log(
                "Uploading report..."
            );


            const res =
                await axios.post(

                    "https://hospital-report-system-xdai.onrender.com/patient/upload-report",

                    formData

                );


            console.log(
                "UPLOAD RESPONSE:",
                res.data
            );


            if (res.data.success) {

                alert(
                    "Medical report uploaded successfully"
                );


                setReportName("");

                setReportType(
                    "Blood Test"
                );

                setFile(null);


                navigate(
                    "/my-reports"
                );

            }

            else {

                alert(
                    res.data.message ||
                    "Upload failed"
                );

            }

        }

        catch (err) {

            console.error(
                "UPLOAD ERROR:",
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

                    "Upload Failed"

                );

            }

            else {

                alert(
                    "Unable to connect to server"
                );

            }

        }

    };


    return (

        <div className="upload-container">

            <div className="upload-box">

                <h2>
                    Upload Medical Report
                </h2>


                <form
                    onSubmit={handleSubmit}
                >

                    {/* REPORT NAME */}

                    <label>
                        Report Name
                    </label>


                    <input

                        type="text"

                        placeholder="Enter Report Name"

                        value={reportName}

                        onChange={(e) =>
                            setReportName(
                                e.target.value
                            )
                        }

                        required

                    />


                    {/* REPORT TYPE */}

                    <label>
                        Report Type
                    </label>


                    <select

                        value={reportType}

                        onChange={(e) =>
                            setReportType(
                                e.target.value
                            )
                        }

                    >

                        <option value="Blood Test">
                            Blood Test
                        </option>

                        <option value="X-Ray">
                            X-Ray
                        </option>

                        <option value="MRI Scan">
                            MRI Scan
                        </option>

                        <option value="CT Scan">
                            CT Scan
                        </option>

                        <option value="Prescription">
                            Prescription
                        </option>

                        <option value="Other">
                            Other
                        </option>

                    </select>


                    {/* FILE */}

                    <label>
                        Select Report
                    </label>


                    <input

                        type="file"

                        accept=".pdf,.jpg,.jpeg,.png"

                        onChange={(e) =>
                            setFile(
                                e.target.files[0]
                            )
                        }

                        required

                    />


                    {/* BUTTON */}

                    <button
                        type="submit"
                    >
                        Upload Report
                    </button>

                </form>


                <br />


                <Link
                    to="/patient-dashboard"
                >
                    ← Back to Dashboard
                </Link>

            </div>

        </div>

    );

}