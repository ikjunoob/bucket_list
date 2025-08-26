// models/todo.js
const mongoose = require("mongoose");

const bucketSchema = new mongoose.Schema(
    {
        text: { type: String, required: true, trim: true },  // 목표 제목
        isCompleted: { type: Boolean, default: false },
        date: { type: Date, default: Date.now },             // 생성일(기존)

        // ---- 버킷리스트 확장 필드 ----
        targetDate: { type: Date },                           // 달성 목표일
        
    },
    { timestamps: true }
);

module.exports = mongoose.model("Bucket", bucketSchema);
