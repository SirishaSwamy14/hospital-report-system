const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
const Report = require("../models/Report");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// =====================================================
// DOCTOR REGISTRATION
// =====================================================

const registerDoctor = async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            specialization,
            hospital
        } = req.body;


        // -----------------------------------------------
        // VALIDATION
        // -----------------------------------------------

        if (
            !name ||
            !email ||
            !password ||
            !specialization ||
            !hospital
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Name, email, password, specialization and hospital are required"
            });

        }


        // -----------------------------------------------
        // NORMALIZE EMAIL
        // -----------------------------------------------

        const normalizedEmail =
            email.trim().toLowerCase();


        // -----------------------------------------------
        // CHECK EXISTING DOCTOR
        // -----------------------------------------------

        const existingDoctor =
            await Doctor.findOne({
                email: normalizedEmail
            });


        if (existingDoctor) {

            return res.status(400).json({
                success: false,
                message:
                    "Doctor email already registered"
            });

        }


        // -----------------------------------------------
        // GENERATE DOCTOR ID
        // -----------------------------------------------

        const totalDoctors =
            await Doctor.countDocuments();

        const doctorId =
            "DOC" + (1001 + totalDoctors);


        // -----------------------------------------------
        // HASH PASSWORD
        // -----------------------------------------------

        const hashedPassword =
            await bcrypt.hash(
                password,
                10
            );


        // -----------------------------------------------
        // CREATE DOCTOR
        // -----------------------------------------------

        const doctor =
            new Doctor({

                doctorId,

                name: name.trim(),

                email: normalizedEmail,

                password: hashedPassword,

                specialization:
                    specialization.trim(),

                hospital:
                    hospital.trim()

            });


        // -----------------------------------------------
        // SAVE DOCTOR
        // -----------------------------------------------

        await doctor.save();


        console.log(
            "DOCTOR REGISTERED:",
            doctorId
        );


        // -----------------------------------------------
        // RESPONSE
        // -----------------------------------------------

        return res.status(201).json({

            success: true,

            message:
                "Doctor Registered Successfully",

            doctor: {

                doctorId:
                    doctor.doctorId,

                name:
                    doctor.name,

                email:
                    doctor.email,

                specialization:
                    doctor.specialization,

                hospital:
                    doctor.hospital

            }

        });

    }

    catch (error) {

        console.error(
            "DOCTOR REGISTER ERROR:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                error.message ||
                "Server Error"

        });

    }

};


// =====================================================
// DOCTOR LOGIN
// =====================================================

const loginDoctor = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;


        if (
            !email ||
            !password
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Email and password are required"

            });

        }


        const normalizedEmail =
            email.trim().toLowerCase();


        console.log(
            "DOCTOR LOGIN:",
            normalizedEmail
        );


        // -----------------------------------------------
        // FIND DOCTOR
        // -----------------------------------------------

        const doctor =
            await Doctor.findOne({
                email: normalizedEmail
            });


        if (!doctor) {

            return res.status(404).json({

                success: false,

                message:
                    "Doctor Not Found"

            });

        }


        // -----------------------------------------------
        // CHECK PASSWORD
        // -----------------------------------------------

        const passwordMatch =
            await bcrypt.compare(
                password,
                doctor.password
            );


        if (!passwordMatch) {

            return res.status(400).json({

                success: false,

                message:
                    "Invalid Password"

            });

        }


        // -----------------------------------------------
        // CREATE JWT
        // -----------------------------------------------

        const token =
            jwt.sign(

                {
                    doctorId:
                        doctor.doctorId,

                    email:
                        doctor.email
                },

                process.env.JWT_SECRET,

                {
                    expiresIn:
                        "1d"
                }

            );


        // -----------------------------------------------
        // RESPONSE
        // -----------------------------------------------

        return res.json({

            success: true,

            message:
                "Doctor Login Successful",

            token,

            doctor: {

                doctorId:
                    doctor.doctorId,

                name:
                    doctor.name,

                email:
                    doctor.email,

                specialization:
                    doctor.specialization,

                hospital:
                    doctor.hospital

            }

        });

    }

    catch (error) {

        console.error(
            "DOCTOR LOGIN ERROR:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                error.message ||
                "Server Error"

        });

    }

};


// =====================================================
// GET PATIENT BY PATIENT ID
// =====================================================

const getPatientById = async (req, res) => {

    try {

        const {
            patientId
        } = req.params;


        const patient =
            await Patient.findOne({
                patientId: patientId
            }).select("-password");


        if (!patient) {

            return res.status(404).json({

                success: false,

                message:
                    "Patient Not Found"

            });

        }


        const reports =
            await Report.find({
                patientId: patientId
            }).sort({
                uploadedAt: -1
            });


        return res.json({

            success: true,

            patient,

            reports

        });

    }

    catch (error) {

        console.error(
            "GET PATIENT ERROR:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                error.message ||
                "Server Error"

        });

    }

};


// =====================================================
// EXPORT
// =====================================================

module.exports = {

    registerDoctor,

    loginDoctor,

    getPatientById

};