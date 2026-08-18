import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./UploadPrescription.css";

export default function UploadPrescription() {

    const { patientId } = useParams();

    const navigate = useNavigate();

    const doctor = JSON.parse(localStorage.getItem("doctor"));

    const [notes, setNotes] = useState("");

    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!file) {

            alert("Please choose a PDF");

            return;

        }

        const formData = new FormData();

        formData.append("patientId", patientId);

        formData.append("doctorId", doctor.doctorId);

        formData.append("notes", notes);

        formData.append("prescription", file);

        try {

            const res = await axios.post(

                "https://hospital-report-system-xdai.onrender.comhospital-report-system-xdai.onrender.com/doctor/upload-prescription",

                formData,

                {

                    headers: {

                        "Content-Type": "multipart/form-data"

                    }

                }

            );

            alert(res.data.message);

            navigate(`/doctor-patient/${patientId}`);

        }

        catch(err){

            console.log(err);

            alert("Upload Failed");

        }

    };

    return (

        <div className="prescription-container">

            <div className="prescription-box">

                <h2>

                    Upload Prescription

                </h2>

                <form onSubmit={handleSubmit}>

                    <label>

                        Patient ID

                    </label>

                    <input

                        value={patientId}

                        readOnly

                    />

                    <label>

                        Prescription Notes

                    </label>

                    <textarea

                        rows="6"

                        value={notes}

                        onChange={(e)=>setNotes(e.target.value)}

                    />

                    <label>

                        Upload PDF

                    </label>

                    <input

                        type="file"

                        accept=".pdf"

                        onChange={(e)=>setFile(e.target.files[0])}

                    />

                    <button type="submit">

                        Save Prescription

                    </button>

                </form>

                <br/>

                <Link to={`/doctor-patient/${patientId}`}>

                    Back

                </Link>

            </div>

        </div>

    );

}