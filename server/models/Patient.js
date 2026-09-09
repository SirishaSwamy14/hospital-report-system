const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
    {
        patientId: {
            type: String,
            unique: true,
            required: true
        },

        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            unique: true,
            required: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },

        age: {
            type: Number
        },

        gender: {
            type: String
        },

        bloodGroup: {
            type: String
        },

        phone: {
            type: String
        },

        address: {
            type: String
        },

        // QR code stored as a Data URL
        qrCode: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Patient", patientSchema);