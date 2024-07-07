const mongoose = require("mongoose");


const ReportSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    productDescription: {
        type: String,
        required: true,
    },
    productRate: {
        type: Number,
        required: true,
    },
    productImageLink: {
        type: String,
        required: true,
    },
});

const reportSchema = mongoose.model('reportSchema', ReportSchema);

module.exports = reportSchema;
