import React from 'react'
import "./TodoItem.css"
const TodoItem = ({ todo, onDelete, onUpdateText, onUpdateChecked }) => {
    return (
        <div className='TodoItem'>
            <input
                type="checkbox"
                checked={todo.isCompleted}
                onChange={(e) => onUpdateChecked(todo._id, e.target.checked)}
            />
            <div className="content">{todo.text}</div>
            <div className="date">{new Date(todo.date).toLocaleDateString()}</div>
            <div className="btn-wrap">
                <button
                    className="updateBtn"
                    onClick={() => {
                        const newText = prompt("새 텍스트 입력:", todo.text);
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