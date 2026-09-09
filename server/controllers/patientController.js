const Patient = require("../models/Patient");
const Report = require("../models/Report");

const bcrypt = require("bcrypt");
const QRCode = require("qrcode");
const jwt = require("jsonwebtoken");

const fs = require("fs");
const path = require("path");


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


        // Normalize email
        const normalizedEmail =
            email.trim().toLowerCase();


        // Check existing patient
        const existingPatient =
            await Patient.findOne({
                email: normalizedEmail
            });


        if (existingPatient) {

            return res.status(400).json({
                success: false,
                message: "Email already registered"
            });

        }


        // Generate patient ID
        const totalPatients =
            await Patient.countDocuments();

        const patientId =
            "PAT" + (1001 + totalPatients);


        // Hash password
        const hashedPassword =
            await bcrypt.hash(password, 10);


        // =================================================
        // QR CODE FOLDER
        // =================================================

        const qrFolder = path.join(
            __dirname,
            "../uploads/qr"
        );


        if (!fs.existsSync(qrFolder)) {

            fs.mkdirSync(
                qrFolder,
                {
                    recursive: true
                }
            );

        }


        // QR filename
        const qrFileName =
            `${patientId}.png`;


        const qrFilePath =
            path.join(
                qrFolder,
                qrFileName
            );


        // Generate QR code
        await QRCode.toFile(
            qrFilePath,
            patientId
        );


        // Browser-accessible QR path
        const qrCode =
            `/uploads/qr/${qrFileName}`;


        // =================================================
        // CREATE PATIENT
        // =================================================

        const patient = new Patient({

            patientId,

            name,

            email: normalizedEmail,

            password: hashedPassword,

            age,

            gender,

            bloodGroup,

            phone,

            address,

            qrCode

        });


        // Save patient
        await patient.save();


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


        // Normalize email
        const normalizedEmail =
            email.trim().toLowerCase();


        console.log(
            "LOGIN EMAIL:",
            normalizedEmail
        );


        // Find patient
        const patient =
            await Patient.findOne({
                email: normalizedEmail
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


        // Compare password
        const checkPassword =
            await bcrypt.compare(
                password,
                patient.password
            );


        console.log(
            "PASSWORD MATCH:",
            checkPassword
        );


        if (!checkPassword) {

            return res.status(400).json({

                success: false,

                message:
                    "Invalid Password"

            });

        }


        // Create JWT token
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
                    expiresIn: "1d"
                }

            );


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


        // =================================================
        // CHECK FILE
        // =================================================

        if (!req.file) {

            return res.status(400).json({

                success: false,

                message:
                    "No report file was uploaded"

            });

        }


        // =================================================
        // FORM DATA
        // =================================================

        const {
            patientId,
            reportName,
            reportType
        } = req.body;


        // =================================================
        // VALIDATION
        // =================================================

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


        // =================================================
        // CHECK PATIENT
        // =================================================

        const patient =
            await Patient.findOne({
                patientId: patientId
            });


        if (!patient) {

            return res.status(404).json({

                success: false,

                message:
                    "Patient not found"

            });

        }


        // =================================================
        // PUBLIC FILE PATH
        // =================================================

        const filePath =
            `/uploads/reports/${req.file.filename}`;


        // =================================================
        // CREATE REPORT
        // =================================================

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


        // =================================================
        // SAVE REPORT
        // =================================================

        await report.save();


        console.log(
            "REPORT SAVED SUCCESSFULLY:",
            report._id
        );


        // =================================================
        // RESPONSE
        // =================================================

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
            "GET REPORTS FOR PATIENT:",
            patientId
        );


        const reports =
            await Report.find({
                patientId: patientId
            })
            .sort({
                uploadedAt: -1
            });


        return res.status(200).json({

            success: true,

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