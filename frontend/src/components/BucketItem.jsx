// components/BucketItem.jsx
import React, { useEffect, useState } from 'react'
import "./BucketItem.css"

// D-DAY 계산 (목표일 없을 땐 null)
function dday(targetDate) {
    if (!targetDate) return null;
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const t = new Date(targetDate); t.setHours(0, 0, 0, 0);
    const diff = Math.ceil((t - today) / (1000 * 60 * 60 * 24));
    if (diff > 0) return `D-${diff}`;
    if (diff === 0) return 'D-DAY';
    return `D+${Math.abs(diff)}`;
}

// yyyy-mm-dd
const toYmd = (d) => new Date(d).toISOString().slice(0, 10);
// targetDate → date → createdAt → 오늘
const pickDate = (b) => b?.targetDate ?? b?.date ?? b?.createdAt ?? new Date();

// 안전한 날짜 출력
const fmtDate = (value) => {
    if (!value) return '-';
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? '-' : d.toLocaleDateString();
};

const BucketItem = ({ bucket, onDelete, onUpdateText, onUpdate, onUpdateChecked }) => {
    // 목표일을 우선하여 리본 계산
    const target = bucket.targetDate ?? bucket.date;
    const ribbon = dday(target);

    // 편집 상태
    const [editing, setEditing] = useState(false);
    const [text, setText] = useState(bucket.text);
    const [dateStr, setDateStr] = useState(toYmd(pickDate(bucket)));

    useEffect(() => {
        if (!editing) {
            setText(bucket.text);
            setDateStr(toYmd(pickDate(bucket)));
        }
    }, [bucket, editing]);

    const startEdit = () => {
        setText(bucket.text);
        setDateStr(toYmd(pickDate(bucket)));
        setEditing(true);
    };

    const cancelEdit = () => {
        setText(bucket.text);
        setEditing(false);
    };

    const saveEdit = async () => {
        const nextText = text.trim();
        const prevYmd = toYmd(pickDate(bucket));
        if (!nextText || (nextText === bucket.text && prevYmd === dateStr)) {
            return setEditing(false);
        }
        const nextDateISO = new Date(`${dateStr}T00:00:00`).toISOString();

        // ✅ 키 이름은 항상 targetDate
        if (onUpdate) {
            await onUpdate(bucket._id, { text: nextText, targetDate: nextDateISO });
        } else if (onUpdateText) {
            await onUpdateText(bucket._id, nextText);
        }
        setEditing(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') saveEdit();
        if (e.key === 'Escape') cancelEdit();
    };

    return (
        <div className={`BucketItem ${bucket.isCompleted ? 'isCompleted' : ''}`}>
            {/*  D-DAY 리본 */}
            {ribbon && <span className={`ribbon ${ribbon === 'D-DAY' ? 'today' : ''}`}>{ribbon}</span>}

            <input
                type="checkbox"
                checked={!!bucket.isCompleted}
                onChange={(e) => onUpdateChecked?.(bucket._id, e.target.checked)}
                aria-label="완료 체크"
            />

            {editing ? (
                <div className="edit-wrap">
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="수정할 내용을 입력하세요"
                    />
                    <div className="date">
                        <input
                            type="date"
                            value={dateStr}
                            onChange={(e) => setDateStr(e.target.value)}
                        />
                    </div>
                    <div className="btn-wrap">
                        <button className="updateBtn" onClick={saveEdit}>저장하기</button>
                        <button className="deleteBtn" onClick={cancelEdit}>취소</button>
                    </div>
                </div>
            ) : (
                <div className="content-wrap">
                    <div className="content">{bucket.text}</div>
                    {/* ✅ targetDate 우선, 안전 포맷터 사용 */}
                    <div className="date">{fmtDate(bucket.targetDate ?? bucket.date)}</div>
                    <div className="btn-wrap">
                        <button className="updateBtn" onClick={startEdit}>수정</button>
                        <button className="deleteBtn" onClick={() => onDelete(bucket._id)}>삭제</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BucketItem;