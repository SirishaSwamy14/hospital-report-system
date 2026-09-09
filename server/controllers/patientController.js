const Patient = require("../models/Patient");
const Report = require("../models/Report");


// =====================================================
// UPLOAD MEDICAL REPORT
// =====================================================

const uploadReport = async (req, res) => {

    try {

        console.log("========== UPLOAD REPORT ==========");

        console.log("BODY:", req.body);
        console.log("FILE:", req.file);


        // -----------------------------------------------
        // CHECK FILE
        // -----------------------------------------------

        if (!req.file) {

            return res.status(400).json({
                success: false,
                message: "No report file was uploaded"
            });

        }


        // -----------------------------------------------
        // GET FORM DATA
        // -----------------------------------------------

        const {
            patientId,
            reportName,
            reportType
        } = req.body;


        // -----------------------------------------------
        // VALIDATE DATA
        // -----------------------------------------------

        if (!patientId) {

            return res.status(400).json({
                success: false,
                message: "Patient ID is required"
            });

        }


        if (!reportName) {

            return res.status(400).json({
                success: false,
                message: "Report name is required"
            });

        }


        if (!reportType) {

            return res.status(400).json({
                success: false,
                message: "Report type is required"
            });

        }


        // -----------------------------------------------
        // CHECK PATIENT
        // -----------------------------------------------

        const patient = await Patient.findOne({
            patientId: patientId
        });


        if (!patient) {

            return res.status(404).json({
                success: false,
                message: "Patient not found"
            });

        }


        // -----------------------------------------------
        // CREATE REPORT
        // -----------------------------------------------

        const report = new Report({

            patientId: patientId,

            reportName: reportName,

            reportType: reportType,

            fileName: req.file.filename,

            filePath: req.file.path

        });


        // -----------------------------------------------
        // SAVE TO MONGODB
        // -----------------------------------------------

        await report.save();


        console.log("REPORT SAVED:", report);


        // -----------------------------------------------
        // SUCCESS RESPONSE
        // -----------------------------------------------

        return res.status(201).json({

            success: true,

            message: "Medical report uploaded successfully",

            report: report

        });

    }

    catch (error) {

        console.error(
            "UPLOAD REPORT ERROR:",
            error
        );


        return res.status(500).json({

            success: false,

            message: error.message ||
                     "Failed to upload medical report"

        });

    }

};



// =====================================================
// GET PATIENT REPORTS
// =====================================================

const getPatientReports = async (req, res) => {

    try {

        const { patientId } = req.params;


        console.log(
            "GET REPORTS FOR PATIENT:",
            patientId
        );


        const reports = await Report.find({
            patientId: patientId
        }).sort({
            uploadedAt: -1
        });


        return res.status(200).json({

            success: true,

            reports: reports

        });

    }

    catch (error) {

        console.error(
            "GET REPORTS ERROR:",
            error
        );


        return res.status(500).json({

            success: false,

            message: error.message ||
                     "Failed to fetch reports"

        });

    }

};


module.exports = {
    registerPatient,
    loginPatient,
    uploadReport,
    getPatientReports
};