import './BucketEditor.css';
import React, { useState } from 'react';

const toYmd = (d) => new Date(d).toISOString().slice(0, 10);

const BucketEditor = ({ onCreate }) => {
    const [text, setText] = useState('');
    const [targetDate, setTargetDate] = useState(''); // yyyy-mm-dd 문자열(선택)

    const onSubmit = (e) => {
        e.preventDefault();
        const next = text.trim();
        if (!next) return;

        // 날짜 선택이 있으면 로컬자정 기준 ISO로 변환
        const payload = {
            text: next,
            ...(targetDate && {
                targetDate: new Date(`${targetDate}T00:00:00`).toISOString(),
            }),
        };

        onCreate(payload);
        setText('');
        setTargetDate('');
    };

    return (
        <form className="bucketEditor" onSubmit={onSubmit}>
            <input
                type="text"
                placeholder="새로운 bucket..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <input
                type="date"
                value={targetDate}
                min={toYmd(new Date())}              // 과거 선택 금지 원하면 유지, 아니면 지워도 됨
                onChange={(e) => setTargetDate(e.target.value)}
                aria-label="달성 목표일"
            />
            <button type="submit" disabled={!text.trim()}>추가</button>
        </form>
    );
};

export default BucketEditor;