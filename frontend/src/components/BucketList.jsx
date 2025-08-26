// components/BucketList.jsx
import React, { useMemo, useState } from 'react'
import './BucketList.css'
import BucketItem from './BucketItem'

const BucketList = ({ buckets = [], onDelete, onUpdateText, onUpdateChecked }) => {
    const [query, setQuery] = useState('')

    // 대소문자 구분 없이 텍스트 포함 검색
    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase()
        if (!q) return buckets
        return buckets.filter(b => (b?.text || '').toLowerCase().includes(q))
    }, [buckets, query])

    return (
        <div className='BucketList'>
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

            <div className="buckets-wrapper">
                {filtered.length === 0 ? (
                    <div style={{ color: '#505050FF', padding: '12px 0' }}>
                        검색 결과가 없어요. 다른 키워드로 시도해 보세요!
                    </div>
                ) : (
                    filtered.map((bucket) => (
                        <BucketItem
                            key={bucket._id}
                            bucket={bucket}
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

export default BucketList
