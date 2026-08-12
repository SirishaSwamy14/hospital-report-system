const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
const Report = require("../models/Report");
const Prescription = require("../models/Prescription");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ================= REGISTER DOCTOR =================

const registerDoctor = async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            specialization,
            hospital
        } = req.body;

        const existingDoctor = await Doctor.findOne({ email });

        if (existingDoctor) {
            return res.status(400).json({
                message: "Doctor already registered"
            });
        }

        const totalDoctors = await Doctor.countDocuments();

        const doctorId = "DOC" + (1001 + totalDoctors);

        const hashedPassword = await bcrypt.hash(password, 10);

        const doctor = new Doctor({
            doctorId,
            name,
            email,
            password: hashedPassword,
            specialization,
            hospital
        });

        await doctor.save();

        res.status(201).json({
            success: true,
            message: "Doctor Registered Successfully",
            doctor
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// ================= LOGIN DOCTOR =================

const loginDoctor = async (req, res) => {

    try {

        const { email, password } = req.body;

        const doctor = await Doctor.findOne({ email });

        if (!doctor) {

            return res.status(404).json({
                message: "Doctor Not Found"
            });

        }

        const checkPassword = await bcrypt.compare(
            password,
            doctor.password
        );

        if (!checkPassword) {

            return res.status(400).json({
                message: "Invalid Password"
            });

        }

        const token = jwt.sign(

            {
                doctorId: doctor.doctorId,
                email: doctor.email
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "1d"
            }

        );

        res.json({

            success: true,
            token,
            doctor

        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// ================= GET PATIENT DETAILS =================

const getPatientDetails = async (req, res) => {

    try {

        const patientId = req.params.patientId;

        const patient = await Patient.findOne({ patientId });

        if (!patient) {

            return res.status(404).json({
                message: "Patient Not Found"
            });

        }

        const reports = await Report.find({ patientId });

        const prescriptions = await Prescription.find({ patientId });

        res.json({

            patient,
            reports,
            prescriptions

        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// ================= UPLOAD PRESCRIPTION =================

const uploadPrescription = async (req, res) => {

    try {

        const {

            patientId,
            doctorId,
            notes

        } = req.body;

        if (!req.file) {

            return res.status(400).json({
                message: "Please upload a prescription PDF"
            });

        }

        const prescription = new Prescription({

            patientId,

            doctorId,

            notes,

            filePath: req.file.path

        });

        await prescription.save();

        res.status(201).json({

            success: true,

            message: "Prescription Uploaded Successfully",

            prescription

        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

module.exports = {

    registerDoctor,

    loginDoctor,

    getPatientDetails,

    uploadPrescription

};