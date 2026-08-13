import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./PatientSignup.css";

export default function PatientSignup() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        age: "",
        gender: "",
        bloodGroup: "",
        phone: "",
        address: ""
    });

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

 const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        const response = await axios.post(
            "https://hospital-report-system-xdai.onrender.com/patient/register",
            formData
        );

        alert(response.data.message);

        navigate("/patient-login");

    } catch (error) {

        console.log(error);

        alert(
            error.response?.data?.message ||
            "Registration Failed"
        );

    }

};

    return (

        <div className="signup-container">

            <div className="signup-box">

                <h2>Patient Registration</h2>

                <form onSubmit={handleSubmit}>

                    <label>Name</label>

                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <label>Email</label>

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <label>Password</label>

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <label>Age</label>

                    <input
                        type="number"
                        name="age"
                        placeholder="Enter Age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                    />

                    <label>Gender</label>

                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </select>

                    <label>Blood Group</label>

                    <select
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Blood Group</option>
                        <option>A+</option>
                        <option>A-</option>
                        <option>B+</option>
                        <option>B-</option>
                        <option>AB+</option>
                        <option>AB-</option>
                        <option>O+</option>
                        <option>O-</option>
                    </select>

                    <label>Phone Number</label>

                    <input
                        type="text"
                        name="phone"
                        placeholder="Enter Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />

                    <label>Address</label>

                    <textarea
                        name="address"
                        placeholder="Enter Address"
                        value={formData.address}
                        onChange={handleChange}
                        rows="3"
                        required
                    ></textarea>

                    <button type="submit">

                        Register

                    </button>

                </form>

                <br />

                <p>

                    Already have an account?

                    <Link to="/patient-login">

                        Login

                    </Link>

                </p>

                <br />

                <Link to="/">

                    ← Back to Home

                </Link>

            </div>

        </div>

    );

}