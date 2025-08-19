import React from 'react'
import "./bucketItem.css"
const bucketItem = ({ bucket, onDelete, onUpdateText, onUpdateChecked }) => {
    return (
        <div className='bucketItem'>
            <input
                type="checkbox"
                checked={bucket.isCompleted}
                onChange={(e) => onUpdateChecked(bucket._id, e.target.checked)}
            />
            <div className="content">{bucket.text}</div>
            <div className="date">{new Date(bucket.date).toLocaleDateString()}</div>
            <div className="btn-wrap">
                <button
                    className="updateBtn"
                    onClick={() => {
                        const newText = prompt("새 텍스트 입력:", bucket.text);
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



export default bucketItem