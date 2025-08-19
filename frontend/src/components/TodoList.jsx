import React from 'react'
import './TodoList.css'
import TodoItem from './TodoItem'

const TodoList = ({ todos, onDelete, onUpdateText, onUpdateChecked }) => {
    return (
        <div className='TodoList'>
            <h4>버킷리스트! ✈️</h4>
            <input type="text" placeholder='검색어를 입력하세요' />
            <div className="todos-wrapper">
                {todos.map((todo) => (
                    <TodoItem
                        key={todo._id}
                        todo={todo}
                        onDelete={onDelete}
                        onUpdateText={onUpdateText}       /* ✅ props 내려줌 */
                        onUpdateChecked={onUpdateChecked} /* ✅ props 내려줌 */
                    />
                ))}
            </div>
        </div>
    )
}

export default TodoList
