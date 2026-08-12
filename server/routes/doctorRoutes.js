const express = require("express");
const multer = require("multer");

const router = express.Router();

const {
    registerDoctor,
    loginDoctor,
    getPatientDetails,
    uploadPrescription
} = require("../controllers/doctorController");

// Storage for prescriptions
const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, "uploads/prescriptions");

    },

    filename: (req, file, cb) => {

        cb(null, Date.now() + "-" + file.originalname);

    }

});

const upload = multer({ storage });

router.post("/register", registerDoctor);

router.post("/login", loginDoctor);

router.get("/patient/:patientId", getPatientDetails);

router.post(
    "/upload-prescription",
    upload.single("prescription"),
    uploadPrescription
);

module.exports = router;