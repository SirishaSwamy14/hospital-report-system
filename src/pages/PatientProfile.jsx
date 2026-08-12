import { Link } from "react-router-dom";

export default function PatientProfile() {

    return (

        <div style={{textAlign:"center",marginTop:"80px"}}>

            <h2>Patient Profile</h2>

            <p>Name : Sathvika</p>

            <p>Email : patient@gmail.com</p>

            <p>Phone : 9876543210</p>

            <p>Blood Group : O+</p>

            <p>Age : 20</p>

            <br />

            <Link to="/patient-dashboard">

                Back

            </Link>

        </div>

    );

}