const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
    {
        patientId: {
            type: String,
            required: true
        },

        reportName: {
            type: String,
            required: true
        },

        reportType: {
            type: String,
            required: true
        },

        fileName: {
            type: String,
            required: true
        },

        // Store complete file as a Data URL
        fileData: {
            type: String,
            required: true
        },

        uploadedAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Report", reportSchema);