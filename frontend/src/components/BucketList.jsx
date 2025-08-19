import React from 'react'
import './BucketList.css'
import BucketItem from './BucketItem'

const BucketList = ({ buckets, onDelete, onUpdateText, onUpdateChecked }) => {
    return (
        <div className='bucketList'>
            <h4>이건 하고 죽을래 🤑😁</h4>
            <input type="text" placeholder='검색어를 입력하세요' />
            <div className="buckets-wrapper">
                {buckets.map((bucket) => (
                    <BucketItem
                        key={bucket._id}
                        bucket={bucket}
                        onDelete={onDelete}
                        onUpdateText={onUpdateText}
                        onUpdateChecked={onUpdateChecked}
                    />
                ))}
            </div>
        </div>
    )
}

export default BucketList
