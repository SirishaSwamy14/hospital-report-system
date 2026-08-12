const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({

    patientId: String,

    doctorId: String,

    notes: String,

    filePath: String,

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("Prescription", prescriptionSchema);