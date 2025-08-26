// models/todo.js
const mongoose = require("mongoose");

const bucketSchema = new mongoose.Schema(
    {
        text: { type: String, required: true, trim: true },  // 목표 제목
        isCompleted: { type: Boolean, default: false },
        date: { type: Date, default: Date.now },             // 생성일(기존)

        // ---- 버킷리스트 확장 필드 ----
        targetDate: { type: Date },                           // 달성 목표일
        category: { type: String, trim: true, default: "일반" }, // 여행/운동/학습 등
        memo: { type: String, trim: true },                  // 간단 메모
        progress: { type: Number, min: 0, max: 100, default: 0 }, // 진행률
        emoji: { type: String, trim: true, default: "🌱" },   // 카드 썸네일용
    },
    { timestamps: true }
);

module.exports = mongoose.model("Bucket", bucketSchema);
