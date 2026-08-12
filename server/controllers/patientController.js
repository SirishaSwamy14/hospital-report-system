const Patient = require("../models/Patient");
const Report = require("../models/Report");

const bcrypt = require("bcrypt");
const QRCode = require("qrcode");
const jwt = require("jsonwebtoken");

const fs = require("fs");
const path = require("path");


// ================= REGISTER PATIENT =================

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

        const existingPatient = await Patient.findOne({ email });

        if (existingPatient) {

            return res.status(400).json({
                message: "Email already registered"
            });

        }

        const totalPatients = await Patient.countDocuments();

        const patientId = "PAT" + (1001 + totalPatients);

        const hashedPassword = await bcrypt.hash(password, 10);

        const qrFolder = path.join(__dirname, "../uploads/qr");

        if (!fs.existsSync(qrFolder)) {

            fs.mkdirSync(qrFolder, { recursive: true });

        }

        const qrPath = path.join(qrFolder, `${patientId}.png`);

        await QRCode.toFile(qrPath, patientId);

        const patient = new Patient({

            patientId,

            name,

            email,

            password: hashedPassword,

            age,

            gender,

            bloodGroup,

            phone,

            address,

            qrCode: qrPath

        });

        await patient.save();

        res.status(201).json({

            success: true,

            message: "Patient Registered Successfully",

            patient

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            message: "Server Error"

        });

    }

};


// ================= LOGIN PATIENT =================

const loginPatient = async (req, res) => {

    try {

        const { email, password } = req.body;

        const patient = await Patient.findOne({ email });

        if (!patient) {

            return res.status(404).json({

                message: "Patient Not Found"

            });

        }

        const checkPassword = await bcrypt.compare(

            password,

            patient.password

        );

        if (!checkPassword) {

            return res.status(400).json({

                message: "Invalid Password"

            });

        }

        const token = jwt.sign(

            {

                patientId: patient.patientId,

                email: patient.email

            },

            process.env.JWT_SECRET,

            {

                expiresIn: "1d"

            }

        );

        res.json({

            success: true,

            token,

            patient

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            message: "Server Error"

        });

    }

};


// ================= UPLOAD REPORT =================

const uploadReport = async (req, res) => {

    try {

        const {

            patientId,

            reportName,

            reportType

        } = req.body;

        if (!req.file) {

            return res.status(400).json({

                message: "No File Uploaded"

            });

        }

        const report = new Report({

            patientId,

            reportName,

            reportType,

            fileName: req.file.filename,

            filePath: req.file.path

        });

        await report.save();

        res.status(201).json({

            success: true,

            message: "Report Uploaded Successfully",

            report

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            message: "Server Error"

        });

    }

};


// ================= GET PATIENT REPORTS =================

const getPatientReports = async (req, res) => {

    try {

        const patientId = req.params.patientId;

        const reports = await Report.find({

            patientId

        });

        res.status(200).json(reports);

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            message: "Server Error"

        });

    }

};


module.exports = {

    registerPatient,

    loginPatient,

    uploadReport,

    getPatientReports

};