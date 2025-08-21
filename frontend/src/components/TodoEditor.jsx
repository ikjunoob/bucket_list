// components/TodoEditor.jsx
import './TodoEditor.css';
import React, { useState } from 'react';

const TodoEditor = ({ onCreate }) => {
    const [text, setText] = useState('')
    const [date, setDate] = useState('') // ✅ 목표일(선택)

    const onSubmit = (e) => {
        e.preventDefault()
        if (!text.trim()) return
        onCreate(text.trim(), date || undefined) // ✅ 날짜 함께 전달
        setText('')
        setDate('')
    }

    return (
        <form className="TodoEditor" onSubmit={onSubmit}>
            <input
                type='text'
                placeholder="버킷 목표를 입력하세요 (예: 일본 여행 가기 ✈️)"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bucket-date"
                aria-label="목표일"
            />
            <button type='submit' disabled={!text.trim()}>추가</button>
        </form>
    );
};

export default TodoEditor;
