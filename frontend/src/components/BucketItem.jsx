// components/BucketItem.jsx
import React from 'react'
import "./BucketItem.css"

// D-DAY 계산 (목표일 없을 땐 null)
function dday(targetDate) {
    if (!targetDate) return null;
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const t = new Date(targetDate); t.setHours(0, 0, 0, 0);
    const diff = Math.ceil((t - today) / (1000 * 60 * 60 * 24));
    if (diff > 0) return `D-${diff}`;
    if (diff === 0) return "D-DAY";
    return `D+${Math.abs(diff)}`;
}

const BucketItem = ({ bucket, onDelete, onUpdateText, onUpdateChecked }) => {
    // 서버의 bucket.date를 목표일로 간주
    const ribbon = dday(bucket.date)

    return (
        <div className={`BucketItem ${bucket.isCompleted ? 'isCompleted' : ''}`}>
            {/*  D-DAY 리본 */}
            {ribbon && <span className={`ribbon ${ribbon === 'D-DAY' ? 'today' : ''}`}>{ribbon}</span>}

            <input
                type="checkbox"
                checked={bucket.isCompleted}
                onChange={(e) => onUpdateChecked(bucket._id, e.target.checked)}
                aria-label="완료 체크"
            />

            <div className="content">{bucket.text}</div>

            <div className="date">
                {bucket.date ? new Date(bucket.date).toLocaleDateString() : '-'}
            </div>

            <div className="btn-wrap">
                <button
                    className="updateBtn"
                    onClick={() => {
                        const newText = prompt("목표 수정:", bucket.text);
                        if (newText && newText.trim()) {
                            onUpdateText(bucket._id, newText.trim());
                        }
                    }}
                >
                    수정
                </button>
                <button className="deleteBtn" onClick={() => onDelete(bucket._id)}>
                    삭제
                </button>
            </div>
        </div>
    )
}

export default BucketItem
