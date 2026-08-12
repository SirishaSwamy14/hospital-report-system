import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./DoctorPatientReports.css";

export default function DoctorPatientReports() {

    const { patientId } = useParams();

    const [patient, setPatient] = useState(null);

    const [reports, setReports] = useState([]);

    useEffect(() => {

        fetchPatient();

    }, []);

    const fetchPatient = async () => {

        try {

            const res = await axios.get(

                `http://localhost:5000/doctor/patient/${patientId}`

            );

            setPatient(res.data.patient);

            setReports(res.data.reports);

        }

        catch(err){

            console.log(err);

            alert("Unable to fetch patient.");

        }

    };

    if(!patient){

        return <h2 style={{textAlign:"center"}}>Loading...</h2>;

    }

    return (

        <div className="patient-report-container">

            <div className="patient-card">

                <h1>Patient Details</h1>

                <p><strong>Patient ID :</strong> {patient.patientId}</p>

                <p><strong>Name :</strong> {patient.name}</p>

                <p><strong>Email :</strong> {patient.email}</p>

                <p><strong>Age :</strong> {patient.age}</p>

                <p><strong>Gender :</strong> {patient.gender}</p>

                <p><strong>Blood Group :</strong> {patient.bloodGroup}</p>

                <p><strong>Phone :</strong> {patient.phone}</p>

                <p><strong>Address :</strong> {patient.address}</p>

            </div>

            <div className="report-card">

                <h2>Medical Reports</h2>

                {

                    reports.length===0 ?

                    <p>No Reports Uploaded</p>

                    :

                    <table>

                        <thead>

                            <tr>

                                <th>Report</th>

                                <th>Type</th>

                                <th>View</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                reports.map((report)=>(

                                    <tr key={report._id}>

                                        <td>{report.reportName}</td>

                                        <td>{report.reportType}</td>

                                        <td>

                                            <a

                                                href={`http://localhost:5000/${report.filePath.replace(/\\/g,"/")}`}

                                                target="_blank"

                                                rel="noreferrer"

                                            >

                                                <button>

                                                    View

                                                </button>

                                            </a>

                                        </td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </table>

                }

            </div>

            <div className="buttons">

                <Link to="/doctor-dashboard">

                    <button>

                        Back Dashboard

                    </button>

                </Link>

                <Link to={`/upload-prescription/${patient.patientId}`}>

                    <button>

                        Upload Prescription

                    </button>

                </Link>

            </div>

        </div>

    );

}