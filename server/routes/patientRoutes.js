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
// MULTER
// =====================================================

const upload = multer({
    storage: storage,

    fileFilter: fileFilter,

    limits: {
        fileSize: 10 * 1024 * 1024
    }
});


// =====================================================
// ROUTES
// =====================================================

router.post(
    "/register",
    registerPatient
);

router.post(
    "/login",
    loginPatient
);

router.post(
    "/upload-report",
    upload.single("report"),
    uploadReport
);

router.get(
    "/reports/:patientId",
    getPatientReports
);


// =====================================================
// ERROR HANDLER
// =====================================================

router.use((err, req, res, next) => {

    console.error(
        "UPLOAD ERROR:",
        err
    );

    res.status(400).json({
        success: false,
        message: err.message
    });

});


module.exports = router;