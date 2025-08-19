// models/bucket.js
const mongoose = require("mongoose");

const bucketSchema = new mongoose.Schema(
    {
        text: { type: String, required: true, trim: true },
        isCompleted: { type: Boolean, default: false },
        date: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

module.exports = mongoose.model("bucket", bucketSchema);
