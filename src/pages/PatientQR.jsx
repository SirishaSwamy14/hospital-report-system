import { Link, useNavigate } from "react-router-dom";
import "./PatientQR.css";

export default function PatientQR() {

    const navigate = useNavigate();

    const patient = JSON.parse(localStorage.getItem("patient"));

    if (!patient) {

        navigate("/patient-login");

        return null;

    }

    return (

        <div className="qr-container">

            <div className="qr-box">

                <h2>🏥 Patient QR Code</h2>

                <h3>

                    Patient ID : {patient.patientId}

                </h3>

                <p className="subtitle">

                    Show this QR Code to the doctor.

                </p>

                <img

                    src={`https://hospital-report-system-xdai.onrender.comhospital-report-system-xdai.onrender.com/uploads/qr/${patient.patientId}.png`}

                    alt="Patient QR"

                    className="qr-image"

                />

                <a

                    href={`https://hospital-report-system-xdai.onrender.comhospital-report-system-xdai.onrender.com/uploads/qr/${patient.patientId}.png`}

                    download={`${patient.patientId}.png`}

                >

                    <button className="download-btn">

                        Download QR

                    </button>

                </a>

                <br />

                <Link

                    to="/patient-dashboard"

                    className="back-link"

                >

                    ← Back to Dashboard

                </Link>

            </div>

        </div>

    );

}