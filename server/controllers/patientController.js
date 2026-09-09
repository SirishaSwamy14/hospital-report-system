const Patient = require("../models/Patient");
const Report = require("../models/Report");

const bcrypt = require("bcrypt");
const QRCode = require("qrcode");
const jwt = require("jsonwebtoken");


// =====================================================
// PATIENT REGISTRATION
// =====================================================

const registerPatient = async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            age,
            gender,
            bloodGroup,
            phone,
            address
        } = req.body;


        // -----------------------------------------------
        // VALIDATE REQUIRED VALUES
        // -----------------------------------------------

        if (
            !name ||
            !email ||
            !password
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Name, email and password are required"
            });

        }


        // -----------------------------------------------
        // NORMALIZE EMAIL
        // -----------------------------------------------

        const normalizedEmail =
            email.trim().toLowerCase();


        // -----------------------------------------------
        // CHECK EXISTING PATIENT
        // -----------------------------------------------

        const existingPatient =
            await Patient.findOne({
                email: normalizedEmail
            });


        if (existingPatient) {

            return res.status(400).json({
                success: false,
                message:
                    "Email already registered"
            });

        }


        // -----------------------------------------------
        // GENERATE PATIENT ID
        // -----------------------------------------------

        const totalPatients =
            await Patient.countDocuments();

        const patientId =
            "PAT" + (1001 + totalPatients);


        // -----------------------------------------------
        // HASH PASSWORD
        // -----------------------------------------------

        const hashedPassword =
            await bcrypt.hash(
                password,
                10
            );


        // -----------------------------------------------
        // GENERATE QR CODE
        // -----------------------------------------------

        const qrCode =
            await QRCode.toDataURL(
                patientId
            );


        // -----------------------------------------------
        // CREATE PATIENT
        // -----------------------------------------------

        const patient =
            new Patient({

                patientId,

                name: name.trim(),

                email: normalizedEmail,

                password: hashedPassword,

                age,

                gender,

                bloodGroup,

                phone,

                address,

                qrCode

            });


        // -----------------------------------------------
        // SAVE PATIENT
        // -----------------------------------------------

        await patient.save();


        console.log(
            "PATIENT REGISTERED:",
            patientId
        );


        // -----------------------------------------------
        // RESPONSE
        // -----------------------------------------------

        return res.status(201).json({

            success: true,

            message:
                "Patient Registered Successfully",

            patient

        });

    }

    catch (error) {

        console.error(
            "PATIENT REGISTER ERROR:",
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
// PATIENT LOGIN
// =====================================================

const loginPatient = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;


        // -----------------------------------------------
        // VALIDATE
        // -----------------------------------------------

        if (!email || !password) {

            return res.status(400).json({

                success: false,

                message:
                    "Email and password are required"

            });

        }


        // -----------------------------------------------
        // NORMALIZE EMAIL
        // -----------------------------------------------

        const normalizedEmail =
            email.trim().toLowerCase();


        console.log(
            "LOGIN EMAIL:",
            normalizedEmail
        );


        // -----------------------------------------------
        // FIND PATIENT
        // -----------------------------------------------

        const patient =
            await Patient.findOne({

                email:
                    normalizedEmail

            });


        if (!patient) {

            console.log(
                "PATIENT NOT FOUND"
            );


            return res.status(404).json({

                success: false,

                message:
                    "Patient Not Found"

            });

        }


        console.log(
            "PATIENT FOUND:",
            patient.email
        );


        // -----------------------------------------------
        // CHECK PASSWORD
        // -----------------------------------------------

        const passwordMatch =
            await bcrypt.compare(
                password,
                patient.password
            );


        console.log(
            "PASSWORD MATCH:",
            passwordMatch
        );


        if (!passwordMatch) {

            return res.status(400).json({

                success: false,

                message:
                    "Invalid Password"

            });

        }


        // -----------------------------------------------
        // GENERATE QR FOR OLD PATIENTS
        // -----------------------------------------------

        if (
            !patient.qrCode ||
            !patient.qrCode.startsWith(
                "data:image/"
            )
        ) {

            console.log(
                "Generating QR for existing patient"
            );


            patient.qrCode =
                await QRCode.toDataURL(
                    patient.patientId
                );


            await patient.save();


            console.log(
                "QR CODE UPDATED:",
                patient.patientId
            );

        }


        // -----------------------------------------------
        // JWT TOKEN
        // -----------------------------------------------

        const token =
            jwt.sign(

                {
                    patientId:
                        patient.patientId,

                    email:
                        patient.email
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

            token,

            patient

        });

    }

    catch (error) {

        console.error(
            "LOGIN ERROR:",
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
// UPLOAD MEDICAL REPORT
// =====================================================

const uploadReport = async (req, res) => {

    try {

        console.log(
            "========== UPLOAD REPORT =========="
        );

        console.log(
            "BODY:",
            req.body
        );

        console.log(
            "FILE:",
            req.file
        );


        // -----------------------------------------------
        // CHECK FILE
        // -----------------------------------------------

        if (!req.file) {

            return res.status(400).json({

                success: false,

                message:
                    "No report file was uploaded"

            });

        }


        // -----------------------------------------------
        // GET DATA
        // -----------------------------------------------

        const {
            patientId,
            reportName,
            reportType
        } = req.body;


        // -----------------------------------------------
        // VALIDATION
        // -----------------------------------------------

        if (!patientId) {

            return res.status(400).json({

                success: false,

                message:
                    "Patient ID is required"

            });

        }


        if (
            !reportName ||
            !reportName.trim()
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Report name is required"

            });

        }


        if (
            !reportType ||
            !reportType.trim()
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Report type is required"

            });

        }


        // -----------------------------------------------
        // CHECK PATIENT
        // -----------------------------------------------

        const patient =
            await Patient.findOne({

                patientId:
                    patientId

            });


        if (!patient) {

            return res.status(404).json({

                success: false,

                message:
                    "Patient not found"

            });

        }


        // -----------------------------------------------
        // PUBLIC FILE PATH
        // -----------------------------------------------

        const filePath =
            `/uploads/reports/${req.file.filename}`;


        // -----------------------------------------------
        // CREATE REPORT
        // -----------------------------------------------

        const report =
            new Report({

                patientId:
                    patientId,

                reportName:
                    reportName.trim(),

                reportType:
                    reportType.trim(),

                fileName:
                    req.file.filename,

                filePath:
                    filePath

            });


        // -----------------------------------------------
        // SAVE REPORT
        // -----------------------------------------------

        await report.save();


        console.log(
            "REPORT SAVED:",
            report._id
        );


        // -----------------------------------------------
        // RESPONSE
        // -----------------------------------------------

        return res.status(201).json({

            success: true,

            message:
                "Medical report uploaded successfully",

            report

        });

    }

    catch (error) {

        console.error(
            "UPLOAD REPORT ERROR:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                error.message ||
                "Failed to upload medical report"

        });

    }

};


// =====================================================
// GET PATIENT REPORTS
// =====================================================

const getPatientReports = async (req, res) => {

    try {

        const {
            patientId
        } = req.params;


        console.log(
            "GET REPORTS FOR:",
            patientId
        );


        const reports =
            await Report.find({

                patientId:
                    patientId

            })
            .sort({
                uploadedAt: -1
            });


        return res.status(200).json({

            success: true,

            reports:
                reports

        });

    }

    catch (error) {

        console.error(
            "GET REPORTS ERROR:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                error.message ||
                "Failed to fetch reports"

        });

    }

};


// =====================================================
// EXPORT
// =====================================================

module.exports = {

    registerPatient,

    loginPatient,

    uploadReport,

    getPatientReports

};