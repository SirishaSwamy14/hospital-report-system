import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./DoctorLogin.css";

export default function DoctorLogin() {

    const navigate = useNavigate();

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [loading, setLoading] =
        useState(false);


    const handleLogin = async (e) => {

        e.preventDefault();

        setLoading(true);


        try {

            const response =
                await axios.post(

                    "https://hospital-report-system-xdai.onrender.com/doctor/login",

                    {
                        email:
                            email.trim().toLowerCase(),

                        password:
                            password
                    }

                );


            if (
                response.data.success
            ) {

                localStorage.setItem(
                    "doctor",
                    JSON.stringify(
                        response.data.doctor
                    )
                );


                localStorage.setItem(
                    "doctorToken",
                    response.data.token
                );


                alert(
                    "Doctor Login Successful"
                );


                navigate(
                    "/doctor-dashboard"
                );

            }

        }

        catch (error) {

            console.error(
                "DOCTOR LOGIN ERROR:",
                error
            );


            alert(

                error.response?.data?.message ||

                "Unable to login"

            );

        }

        finally {

            setLoading(false);

        }

    };


    return (

        <div className="doctor-login-page">

            <div className="doctor-login-card">

                <div className="doctor-login-icon">
                    🩺
                </div>


                <h1>
                    Doctor Login
                </h1>


                <p>
                    Sign in to access the doctor portal
                </p>


                <form
                    onSubmit={handleLogin}
                >


                    <label>
                        Email
                    </label>


                    <input
                        type="email"
                        placeholder="Enter doctor email"
                        value={email}
                        onChange={(e) =>
                            setEmail(
                                e.target.value
                            )
                        }
                        required
                    />


                    <label>
                        Password
                    </label>


                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) =>
                            setPassword(
                                e.target.value
                            )
                        }
                        required
                    />


                    <button
                        type="submit"
                        disabled={loading}
                    >

                        {loading
                            ? "Signing in..."
                            : "Login"}

                    </button>

                </form>


                <p className="doctor-login-note">
                    Doctor accounts are created by the
                    hospital administrator.
                </p>


                <Link
                    to="/"
                    className="doctor-home-link"
                >
                    ← Back to Home
                </Link>

            </div>

        </div>

    );
}