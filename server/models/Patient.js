const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({

    patientId: {
        type: String,
        unique: true
    },

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    age: Number,

    gender: String,

    bloodGroup: String,

    phone: String,

    address: String,

    qrCode: String

}, {
    timestamps: true
});

module.exports = mongoose.model("Patient", patientSchema);