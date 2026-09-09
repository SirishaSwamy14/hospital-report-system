const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
    {
        doctorId: {
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

        specialization: {
            type: String,
            required: true
        },

        hospital: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Doctor", doctorSchema);