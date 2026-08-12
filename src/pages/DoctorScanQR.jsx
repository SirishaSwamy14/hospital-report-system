import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";
import "./DoctorScanQR.css";

export default function DoctorScanQR() {

    const navigate = useNavigate();

    useEffect(() => {

        const scanner = new Html5QrcodeScanner(

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

                scanner.clear();

                // decodedText = PAT1007

                navigate(`/doctor-patient/${decodedText}`);

            },

            (error) => {

                // Ignore scan errors

            }

        );

        return () => {

            scanner.clear().catch(() => {});

        };

    }, []);

    return (

        <div className="scan-container">

            <div className="scan-box">

                <h2>📷 Scan Patient QR Code</h2>

                <p>

                    Place the patient's QR code in front of the camera.

                </p>

                <div id="reader"></div>

                <br />

                <Link to="/doctor-dashboard">

                    ← Back to Dashboard

                </Link>

            </div>

        </div>

    );

}