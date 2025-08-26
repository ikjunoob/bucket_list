const express = require("express")
const router = express.Router();
const Bucket = require("../models/bucket");
const { default: mongoose } = require("mongoose");

const ensureObjectId = (id, res) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {

        res.status(400).json({ message: "유효하지 않은 ID 형식입니다." })
        return false;
    }
    return true
}

// 할 일 추가하기
router.post("/", async (req, res) => {
    try {
        const newBucket = new Bucket(req.body);
        const savedBucket = await newBucket.save();
        res.status(201).json(savedBucket);
    } catch (err) {
        res.status(400).json({ error: "버킷리스트를 저장하지 못했습니다." });
    }
});

// 전체 불러오기
router.get("/", async (req, res) => {
    try {
        const bucket = await Bucket.find().sort({ createdAt: -1 })
        res.status(200).json({ message: " todo 전체 불러오기 성공.", bucket })
    } catch (error) {
        res.status(500).json({ message: "데이터를 불러오지 못했습니다.", error })
    }
})

// 한개 불러오기
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params

        if (!ensureObjectId(id, res)) return;
        const bucket = await Bucket.findById(id)

        if (!bucket) {
            return res.status(404).json({ message: "해당 ID의 todo가 없습니다." })
        }


        res.status(200).json({ message: "1개  todo 불러오기 성공.", bucket })


    } catch (error) {
        res.status(500).json({ message: "데이터를 불러오지 못했습니다.", error })
    }
})

// 한개 객체 모두 수정하기
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params

        const updateData = req.body

        if (!ensureObjectId(id, res)) return;

        const updated = await Bucket.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true
        })

        if (!updated) {
            return res.status(404).json({ message: "해당 ID의 todo가 없습니다." })
        }

        res.status(200).json({ message: "1개  수정하기 성공.", bucket: updated })

    } catch (error) {
        res.status(500).json({ message: "데이터를 불러오지 못했습니다.", error })
    }
})

// 체크만 수정하기
router.patch("/:id/check", async (req, res) => {
    try {
        const { id } = req.params;

        const { isCompleted } = req.body
        if (!ensureObjectId(id, res)) return;

        if (typeof isCompleted !== 'boolean') {
            return res.status(400).json({ message: "isCompleted는 boolean이어야 합니다." })
        }

        const updated = await Bucket.findByIdAndUpdate(
            id,
            { isCompleted },
            {
                new: true,
                runValidators: true,
                context: 'query'
            }
        )
        if (!updated) {
            return res.status(404).json({ message: "해당 ID의 버킷리스트가 없습니다." })
        }
        return res.status(200).json({ message: "체크상태 수정 성공", bucket: updated })

    } catch (error) {

        return res.status(500).json({ message: "수정 중 오류 발생", error })

    }
})

// text만 수정하기
router.patch("/:id/text", async (req, res) => {
    try {
        const { id } = req.params;

        const { text } = req.body
        if (!ensureObjectId(id, res)) return;

        if (!text || !text.trim()) {
            return res.status(400).json({ message: "text는 필수 입니다." })
        }

        const updated = await Bucket.findByIdAndUpdate(
            id,
            { text: text.trim() },
            {
                new: true,
                runValidators: true,
                context: 'query'
            }
        )
        if (!updated) {
            return res.status(404).json({ message: "해당 ID의 버킷리스트가 없습니다." })
        }
        return res.status(200).json({ message: "텍스트 수정 성공", bucket: updated })

    } catch (error) {

        return res.status(500).json({ message: "수정 중 오류 발생", error })

    }
})

// 한개 삭제하기
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {

            res.status(400).json({ message: "유효하지 않은 ID 형식입니다." })
        }
        const deleted = await Bucket.findByIdAndDelete(id)


        if (!deleted) {
            return res.status(404).json({ message: "해당 ID의 bucketlist가 없습니다." })
        }

        const remaining = await Bucket.find().sort({ createdAt: -1 })
        res.status(200).json({
            message: "1개  삭제하기 성공.",
            deletedId: deleted._id,
            bucket: remaining
        })

    } catch (error) {
        res.status(500).json({ message: "데이터를 불러오지 못했습니다.", error })
    }
})

module.exports = router