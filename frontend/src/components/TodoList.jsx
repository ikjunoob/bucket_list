// components/TodoList.jsx
import React from 'react'
import './TodoList.css'
import TodoItem from './TodoItem'

const TodoList = ({ todos, onDelete, onUpdateText, onUpdateChecked }) => {
    return (
        <div className='TodoList'>
            <h4>Bucket List ✨</h4>
            <input type="text" placeholder='목표를 검색해보세요' />
            <div className="todos-wrapper">
                {todos.map((todo) => (
                    <TodoItem
                        key={todo._id}
                        todo={todo}
                        onDelete={onDelete}
                        onUpdateText={onUpdateText}
                        onUpdateChecked={onUpdateChecked}
                    />
                ))}
            </div>
        </div>
    )
}

export default TodoList
