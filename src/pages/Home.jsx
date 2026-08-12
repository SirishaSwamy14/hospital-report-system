import "./Home.css";
import { useNavigate } from "react-router-dom";
import { FaUserMd, FaUser, FaUserPlus } from "react-icons/fa";

import doctor from "../assets/images/doctor.png";
import logo from "../assets/images/hospital_logo.png";

export default function Home() {

    const navigate = useNavigate();

    return (

        <div className="home">

            {/* Navigation Bar */}

            <nav>

                <div className="logo">

                    <img src={logo} alt="Hospital Logo" />

                    <h2>Smart Hospital</h2>

                </div>

               

            </nav>

            {/* Hero Section */}

            <section id="home" className="hero">

                <div className="left">

                    <h1>

                        Smart Hospital Report
                        <br />
                        Management System

                    </h1>

                    <p>

                        Securely upload medical reports,
                        generate unique QR Codes,
                        and allow doctors to instantly
                        access patient records by scanning
                        patient QR Codes.

                    </p>

                    <div className="buttons">

                        <button
                            className="doctor"
                            onClick={() => navigate("/doctor-login")}
                        >
                            <FaUserMd />
                            Doctor Login
                        </button>

                        <button
                            className="patient"
                            onClick={() => navigate("/patient-login")}
                        >
                            <FaUser />
                            Patient Login
                        </button>

                        <button
                            className="signup"
                            onClick={() => navigate("/patient-signup")}
                        >
                            <FaUserPlus />
                            Patient Sign Up
                        </button>

                    </div>

                </div>

                <div className="right">

                    <img
                        src={doctor}
                        alt="Doctor"
                    />

                </div>

            </section>

            {/* About */}

            <section id="about" className="about">

                <h2>About Smart Hospital</h2>

                <p>

                    Smart Hospital Report Management System is a secure,
                    QR-code-based healthcare platform designed to simplify
                    medical record management.

                    Patients can securely upload reports, access their
                    records anytime, and receive digital prescriptions.

                    Doctors can instantly retrieve patient reports by
                    scanning a QR code, reducing paperwork and improving
                    healthcare efficiency.

                </p>

            </section>

            {/* Services */}

            <section id="services" className="services">

                <h2>Our Services</h2>

                <div className="service-container">

                    <div className="service-card">

                        <h3>📄 Medical Reports</h3>

                        <p>

                            Upload and securely store
                            all your medical reports online.

                        </p>

                    </div>

                    <div className="service-card">

                        <h3>📷 QR Code Access</h3>

                        <p>

                            Doctors can instantly access
                            patient reports using QR codes.

                        </p>

                    </div>

                    <div className="service-card">

                        <h3>💊 Digital Prescriptions</h3>

                        <p>

                            Doctors can upload prescriptions
                            digitally for easy access.

                        </p>

                    </div>

                    <div className="service-card">

                        <h3>🔒 Secure Records</h3>

                        <p>

                            Patient information is protected
                            using secure authentication.

                        </p>

                    </div>

                </div>

            </section>

            {/* Contact */}

            <section id="contact" className="contact">

                <h2>Contact Us</h2>

                <div className="contact-box">

                    <p>
                        🏥 <strong>Smart Hospital</strong>
                    </p>

                    <p>
                        📍 Visakhapatnam, Andhra Pradesh, India
                    </p>

                    <p>
                        📞 +91 9346252681
                    </p>

                    <p>
                        ✉ support@smarthospital.com
                    </p>

                    <p>
                        🕘 Monday - Saturday : 9:00 AM - 6:00 PM
                    </p>

                </div>

            </section>

        </div>

    );

}


























