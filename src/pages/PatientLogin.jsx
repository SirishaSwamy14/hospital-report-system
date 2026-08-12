import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./PatientLogin.css";

export default function PatientLogin() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const res = await axios.post(
                "http://localhost:5000/patient/login",
                {
                    email,
                    password
                }
            );

            localStorage.setItem(
                "patient",
                JSON.stringify(res.data.patient)
            );

            localStorage.setItem(
                "token",
                res.data.token
            );

            alert("Login Successful");

            navigate("/patient-dashboard");

        }

        catch (err) {

            console.log(err);

            alert(
                err.response?.data?.message ||
                "Invalid Email or Password"
            );

        }

    };

    return (

        <div className="login-container">

            <div className="login-box">

                <h2>🏥 Patient Login</h2>

                <form onSubmit={handleLogin}>

                    <label>Email</label>

                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label>Password</label>

                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit">

                        Login

                    </button>

                </form>

                <p>

                    Don't have an account?

                    <Link to="/patient-signup">

                        Register

                    </Link>

                </p>

                <p>

                    <Link to="/">

                        ← Back to Home

                    </Link>

                </p>

            </div>

        </div>

    );

}