import React from 'react'
import './bucketList.css'
import bucketItem from './bucketItem'

const bucketList = ({ buckets, onDelete, onUpdateText, onUpdateChecked }) => {
    return (
        <div className='bucketList'>
            <h4>bucket List 🌱</h4>
            <input type="text" placeholder='검색어를 입력하세요' />
            <div className="buckets-wrapper">
                {buckets.map((bucket) => (
                    <bucketItem
                        key={bucket._id}
                        bucket={bucket}
                        onDelete={onDelete}
                        onUpdateText={onUpdateText}       /* ✅ props 내려줌 */
                        onUpdateChecked={onUpdateChecked} /* ✅ props 내려줌 */
                    />
                ))}
            </div>
        </div>
    )
}

export default bucketList
