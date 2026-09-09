const express = require("express");
const router = express.Router();

const multer = require("multer");

const {
    registerPatient,
    loginPatient,
    uploadReport,
    getPatientReports
} = require("../controllers/patientController");


// =====================================================
// MULTER MEMORY STORAGE
// =====================================================

const storage = multer.memoryStorage();


// =====================================================
// FILE FILTER
// =====================================================

const fileFilter = (req, file, cb) => {

    const allowedTypes = [
        "application/pdf",
        "image/jpeg",
        "image/jpg",
        "image/png"
    ];

    if (allowedTypes.includes(file.mimetype)) {

        cb(null, true);

    } else {

        cb(
            new Error(
                "Only PDF, JPG, JPEG and PNG files are allowed"
            ),
            false
        );

    }
};


// =====================================================
// MULTER CONFIGURATION
// =====================================================

const upload = multer({

    storage: storage,

    fileFilter: fileFilter,

    limits: {
        fileSize: 10 * 1024 * 1024
    }

});


// =====================================================
// PATIENT REGISTER
// =====================================================

router.post(
    "/register",
    registerPatient
);


// =====================================================
// PATIENT LOGIN
// =====================================================

router.post(
    "/login",
    loginPatient
);


// =====================================================
// UPLOAD REPORT
// =====================================================

router.post(
    "/upload-report",
    upload.single("report"),
    uploadReport
);


// =====================================================
// GET REPORTS
// =====================================================

router.get(
    "/reports/:patientId",
    getPatientReports
);


// =====================================================
// MULTER ERROR HANDLER
// =====================================================

router.use((err, req, res, next) => {

    console.error(
        "UPLOAD MIDDLEWARE ERROR:",
        err
    );

    if (err instanceof multer.MulterError) {

        return res.status(400).json({
            success: false,
            message: err.message
        });

    }

    if (err) {

        return res.status(400).json({
            success: false,
            message: err.message
        });

    }

    next();

});


module.exports = router;