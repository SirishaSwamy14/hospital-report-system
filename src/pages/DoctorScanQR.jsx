import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";
import "./DoctorScanQR.css";

export default function DoctorScanQR() {

    const navigate = useNavigate();

    useEffect(() => {

        const scanner =
            new Html5QrcodeScanner(
                "reader",
                {
                    fps: 10,
                    qrbox: {
                        width: 250,
                        height: 250
                    }
                },
                false
            );


        scanner.render(

            (decodedText) => {

                console.log(
                    "QR CODE SCANNED:",
                    decodedText
                );


                const patientId =
                    decodedText
                        .trim()
                        .toUpperCase();


                scanner
                    .clear()
                    .catch(() => {});


                // Open patient record
                navigate(
                    `/doctor-patient/${patientId}`
                );

            },

            () => {
                // Ignore scanning errors
            }

        );


        return () => {

            scanner
                .clear()
                .catch(() => {});

        };

    }, [navigate]);


    return (

        <div className="doctor-scan-page">

            <div className="doctor-scan-card">

                <div className="scan-top-icon">
                    📷
                </div>

                <span className="scan-label">
                    PATIENT IDENTIFICATION
                </span>

                <h1>
                    Scan Patient QR Code
                </h1>

                <p>
                    Place the patient's QR code
                    inside the scanning area.
                </p>


                <div
                    id="reader"
                    className="qr-reader"
                ></div>


                <Link
                    to="/doctor-dashboard"
                    className="scan-back-link"
                >
                    ← Back to Doctor Dashboard
                </Link>

            </div>

        </div>

    );
}