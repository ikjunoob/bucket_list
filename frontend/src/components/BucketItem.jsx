// components/TodoItem.jsx
import React from 'react'
<<<<<<< HEAD:frontend/src/components/TodoItem.jsx
import "./TodoItem.css"

// ✅ D-DAY 계산 (목표일 없을 땐 null)
function dday(targetDate) {
    if (!targetDate) return null;
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const t = new Date(targetDate); t.setHours(0, 0, 0, 0);
    const diff = Math.ceil((t - today) / (1000 * 60 * 60 * 24));
    if (diff > 0) return `D-${diff}`;
    if (diff === 0) return "D-DAY";
    return `D+${Math.abs(diff)}`;
}

const TodoItem = ({ todo, onDelete, onUpdateText, onUpdateChecked }) => {
    // 서버의 todo.date를 목표일로 간주 (우린 백에서 date를 그대로 저장하므로 OK)
    const ribbon = dday(todo.date)

    return (
        <div className={`TodoItem ${todo.isCompleted ? 'isCompleted' : ''}`}>
            {/* D-DAY 리본 */}
            {ribbon && <span className={`ribbon ${ribbon === 'D-DAY' ? 'today' : ''}`}>{ribbon}</span>}

            <input
                type="checkbox"
                checked={todo.isCompleted}
                onChange={(e) => onUpdateChecked(todo._id, e.target.checked)}
                aria-label="완료 체크"
            />

            <div className="content">{todo.text}</div>

            <div className="date">
                {todo.date ? new Date(todo.date).toLocaleDateString() : '-'}
            </div>

=======
import "./BucketItem.css"

const BucketItem = ({ bucket, onDelete, onUpdateText, onUpdateChecked }) => {
    return (
        <div className='bucketItem'>
            <input
                type="checkbox"
                checked={bucket.isCompleted}
                onChange={(e) => onUpdateChecked(bucket._id, e.target.checked)}
            />
            <div className="content">{bucket.text}</div>
            <div className="date">{new Date(bucket.date).toLocaleDateString()}</div>
>>>>>>> origin/woojin0819:frontend/src/components/BucketItem.jsx
            <div className="btn-wrap">
                <button
                    className="updateBtn"
                    onClick={() => {
<<<<<<< HEAD:frontend/src/components/TodoItem.jsx
                        const newText = prompt("목표 수정:", todo.text);
=======
                        const newText = prompt("새 텍스트 입력:", bucket.text);
>>>>>>> origin/woojin0819:frontend/src/components/BucketItem.jsx
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

<<<<<<< HEAD:frontend/src/components/TodoItem.jsx
export default TodoItem
=======
export default BucketItem
>>>>>>> origin/woojin0819:frontend/src/components/BucketItem.jsx
