// components/TodoItem.jsx
import React from 'react'
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

            <div className="btn-wrap">
                <button
                    className="updateBtn"
                    onClick={() => {
                        const newText = prompt("목표 수정:", todo.text);
                        if (newText && newText.trim()) {
                            onUpdateText(todo._id, newText.trim());
                        }
                    }}
                >
                    수정
                </button>
                <button className="deleteBtn" onClick={() => onDelete(todo._id)}>
                    삭제
                </button>
            </div>
        </div>
    )
}

export default TodoItem
