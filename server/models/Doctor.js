const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({

    doctorId: String,

    name: String,

    email: String,

    password: String,

    specialization: String,

    hospital: String

}, {
    timestamps: true
});

module.exports = mongoose.model("Doctor", doctorSchema);