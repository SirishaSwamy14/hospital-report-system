const express = require("express");

const router = express.Router();

const multer = require("multer");


const {

registerPatient,

loginPatient,

uploadReport,

getPatientReports

}=require("../controllers/patientController");

const storage = multer.diskStorage({

    destination: function (req, file, cb) {

        cb(null, "uploads/reports");

    },

    filename: function (req, file, cb) {

        cb(null, Date.now() + "-" + file.originalname);

    }

});


const upload = multer({

    storage

});



router.post("/register", registerPatient);

router.post("/login", loginPatient);

router.post("/upload-report",
upload.single("report"),
uploadReport);

router.get("/reports/:patientId", getPatientReports);
module.exports = router;