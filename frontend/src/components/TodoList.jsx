// components/TodoList.jsx
import React, { useMemo, useState } from 'react'
import './TodoList.css'
import TodoItem from './TodoItem'

const TodoList = ({ todos, onDelete, onUpdateText, onUpdateChecked }) => {
    const [query, setQuery] = useState('')

    // 대소문자 구분 없이 텍스트 포함 검색
    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase()
        if (!q) return todos
        return todos.filter(t => (t?.text || '').toLowerCase().includes(q))
    }, [todos, query])

    return (
        <div className='TodoList'>
            <h4>✨💪🫵Bucket List🫵💪✨</h4>

            {/* 검색창 */}
            <input
                type="text"
                placeholder="나의 목표를 검색해보세요"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Escape') setQuery('')
                }}
            />

            <div className="todos-wrapper">
                {filtered.length === 0 ? (
                    <div style={{ color: '#505050FF', padding: '12px 0' }}>
                        검색 결과가 없어요. 다른 키워드로 시도해 보세요!
                    </div>
                ) : (
                    filtered.map((todo) => (
                        <TodoItem
                            key={todo._id}
                            todo={todo}
                            onDelete={onDelete}
                            onUpdateText={onUpdateText}
                            onUpdateChecked={onUpdateChecked}
                        />
                    ))
                )}
            </div>
        </div>
    )
}

export default TodoList
