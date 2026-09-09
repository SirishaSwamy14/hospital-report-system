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

    const [uploading, setUploading] =
        useState(false);


    // =====================================================
    // FILE SELECT
    // =====================================================

    const handleFileChange = (e) => {

        const selectedFile =
            e.target.files[0];

        if (!selectedFile) {
            setFile(null);
            return;
        }


        // Maximum 10 MB
        if (
            selectedFile.size >
            10 * 1024 * 1024
        ) {

            alert(
                "File size must be less than 10 MB."
            );

            e.target.value = "";

            setFile(null);

            return;
        }


        setFile(
            selectedFile
        );
    };


    // =====================================================
    // SUBMIT
    // =====================================================

    const handleSubmit = async (e) => {

        e.preventDefault();


        // Patient check
        if (
            !patient ||
            !patient.patientId
        ) {

            alert(
                "Please login first."
            );

            navigate(
                "/patient-login"
            );

            return;
        }


        // Report name check
        if (
            !reportName.trim()
        ) {

            alert(
                "Please enter report name."
            );

            return;
        }


        // File check
        if (!file) {

            alert(
                "Please select a medical report."
            );

            return;
        }


        // =================================================
        // FORMDATA
        // =================================================

        const formData =
            new FormData();


        formData.append(
            "patientId",
            patient.patientId
        );


        formData.append(
            "reportName",
            reportName.trim()
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

            setUploading(true);


            console.log(
                "Uploading report..."
            );


            const response =
                await axios.post(

                    "https://hospital-report-system-xdai.onrender.com/patient/upload-report",

                    formData

                );


            console.log(
                "Upload response:",
                response.data
            );


            if (
                response.data.success
            ) {

                alert(
                    "Medical report uploaded successfully!"
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
                    response.data.message ||
                    "Upload failed."
                );

            }

        }

        catch (error) {

            console.error(
                "UPLOAD ERROR:",
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
                    "SERVER:",
                    error.response.data
                );


                alert(

                    error.response.data?.message ||

                    "Upload failed."

                );

            }

            else {

                alert(
                    "Unable to connect to server."
                );

            }

        }

        finally {

            setUploading(false);

        }

    };


    // =====================================================
    // UI
    // =====================================================

    return (

        <div className="upload-page">


            {/* =================================================
                HEADER
            ================================================= */}

            <header className="upload-navbar">

                <div className="upload-brand">

                    <div className="upload-brand-icon">
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


                <Link
                    to="/patient-dashboard"
                    className="dashboard-link"
                >
                    ← Dashboard
                </Link>

            </header>


            {/* =================================================
                MAIN
            ================================================= */}

            <main className="upload-main">


                <div className="upload-heading">

                    <span>
                        MEDICAL RECORDS
                    </span>

                    <h1>
                        Upload Medical Report
                    </h1>

                    <p>
                        Securely add your medical document
                        to your patient record.
                    </p>

                </div>


                {/* =================================================
                    FORM
                ================================================= */}

                <div className="upload-card">


                    <div className="upload-card-header">

                        <div className="upload-document-icon">
                            📄
                        </div>

                        <div>

                            <h2>
                                Report Details
                            </h2>

                            <p>
                                Enter the details and choose your document.
                            </p>

                        </div>

                    </div>


                    <form
                        onSubmit={handleSubmit}
                        className="upload-form"
                    >


                        {/* REPORT NAME */}

                        <div className="form-group">

                            <label>
                                Report Name
                            </label>

                            <input
                                type="text"
                                placeholder="Example: Blood Sugar Test"
                                value={reportName}
                                onChange={(e) =>
                                    setReportName(
                                        e.target.value
                                    )
                                }
                                required
                            />

                        </div>


                        {/* REPORT TYPE */}

                        <div className="form-group">

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

                        </div>


                        {/* FILE */}

                        <div className="form-group">

                            <label>
                                Medical Report
                            </label>


                            <div className="file-input-wrapper">

                                <input
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={handleFileChange}
                                    required
                                />

                            </div>


                            <small>
                                Accepted formats: PDF, JPG, JPEG, PNG
                                • Maximum size: 10 MB
                            </small>

                        </div>


                        {/* FILE NAME */}

                        {file && (

                            <div className="selected-file-box">

                                <span className="selected-file-icon">
                                    ✓
                                </span>

                                <div>

                                    <strong>
                                        {file.name}
                                    </strong>

                                    <span>
                                        Selected successfully
                                    </span>

                                </div>

                            </div>

                        )}


                        {/* SUBMIT */}

                        <button
                            type="submit"
                            className="upload-submit-button"
                            disabled={uploading}
                        >

                            {uploading ? (

                                <>
                                    <span className="button-spinner"></span>
                                    Uploading...
                                </>

                            ) : (

                                <>
                                    ⬆ Upload Medical Report
                                </>

                            )}

                        </button>


                    </form>


                    <div className="upload-security-note">

                        <span>
                            🔒
                        </span>

                        <p>
                            Your report is associated with
                            Patient ID <strong>{patient?.patientId}</strong>.
                        </p>

                    </div>


                </div>


                <Link
                    to="/patient-dashboard"
                    className="back-dashboard-link"
                >
                    ← Back to Patient Dashboard
                </Link>


            </main>

        </div>
    );
}