const express = require("express");

const router = express.Router();

const {
    registerDoctor,
    loginDoctor,
    getPatientById
} = require("../controllers/doctorController");


// =====================================================
// DOCTOR REGISTRATION
// =====================================================

router.post(
    "/register",
    registerDoctor
);


// =====================================================
// DOCTOR LOGIN
// =====================================================

router.post(
    "/login",
    loginDoctor
);


// =====================================================
// SEARCH PATIENT
// =====================================================

router.get(
    "/patient/:patientId",
    getPatientById
);


module.exports = router;