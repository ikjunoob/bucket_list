import React, { useState, useEffect } from 'react'
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

// 로컬 yyyy-mm-dd
const toYmdLocal = (d) => {
    const dt = new Date(d);
    const y = dt.getFullYear();
    const m = String(dt.getMonth() + 1).padStart(2, '0');
    const day = String(dt.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
};

// 표시/편집 기본 날짜: targetDate 우선, 없으면 date(생성일), 둘 다 없으면 오늘
const pickDate = (t) => t?.targetDate ?? t?.date ?? t?.createdAt ?? new Date();

const BucketItem = ({ bucket, onDelete, onUpdateChecked, onUpdateTodo }) => {
    const [editing, setEditing] = useState(false);
    const [text, setText] = useState(bucket.text);
    const isCompleted = !!bucket.isCompleted;

    const [dateStr, setDateStr] = useState(toYmdLocal(pickDate(bucket)));

    useEffect(() => {
        if (!editing) {
            setText(bucket.text);
            setDateStr(toYmdLocal(pickDate(bucket)));
        }
    }, [bucket, editing]);

    const startEdit = () => {
        setText(bucket.text);
        setDateStr(toYmdLocal(pickDate(bucket)));
        setEditing(true);
    };

    const cancelEdit = () => {
        setText(bucket.text);
        setDateStr(toYmdLocal(pickDate(bucket)));
        setEditing(false);
    };

    const saveEdit = async () => {
        const next = text.trim();
        const prevYmd = toYmdLocal(pickDate(bucket));
        if (!next || (next === bucket.text && prevYmd === dateStr)) {
            return setEditing(false);
        }
        const nextTargetISO = new Date(`${dateStr}T00:00:00`).toISOString();
        await onUpdateTodo(bucket._id, { text: next, targetDate: nextTargetISO });
        setEditing(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') saveEdit();
        if (e.key === 'Escape') cancelEdit();
    };

    const ribbon = dday(bucket.targetDate ?? bucket.date);

    return (
        <div className={`BucketItem ${isCompleted ? 'isCompleted' : ''}`}>
            {/* D-DAY 리본 */}
            {ribbon && <span className={`ribbon ${ribbon === 'D-DAY' ? 'today' : ''}`}>{ribbon}</span>}

            <input
                type="checkbox"
                checked={bucket.isCompleted}
                onChange={() => onUpdateChecked(bucket._id, !bucket.isCompleted)}
                readOnly
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
                    <div className="date">
                        {(bucket.targetDate ?? bucket.date)
                            ? new Date(bucket.targetDate ?? bucket.date).toLocaleDateString()
                            : '-'}
                    </div>
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
