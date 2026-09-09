const express = require("express");
const router = express.Router();

const multer = require("multer");
const fs = require("fs");
const path = require("path");

const {
    registerPatient,
    loginPatient,
    uploadReport,
    getPatientReports
} = require("../controllers/patientController");


// =====================================================
// CREATE UPLOAD DIRECTORY
// =====================================================

const uploadDir = path.join(__dirname, "../uploads/reports");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, {
        recursive: true
    });
}


// =====================================================
// MULTER STORAGE
// =====================================================

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },

    filename: function (req, file, cb) {

        const uniqueName =
            Date.now() +
            "-" +
            file.originalname.replace(/\s+/g, "_");

        cb(null, uniqueName);
    }
});


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
// PATIENT ROUTES
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
// MULTER ERROR HANDLER
// =====================================================

router.use((err, req, res, next) => {

    console.log("UPLOAD MIDDLEWARE ERROR:", err);

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