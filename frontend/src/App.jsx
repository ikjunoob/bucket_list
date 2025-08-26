import { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';
import Header from './components/Header';
import BucketEditor from './components/BucketEditor';
import BucketList from './components/BucketList';

function App() {

  const [bucket, setBucket] = useState([])
  const API = `${import.meta.env.VITE_API_URL}/api/bucket`

  useEffect(() => {
    const fetchBucket = async () => {
      try {
        const res = await axios.get(API)
        const data = Array.isArray(res.data) ? res.data : res.data.bucket ?? []

        setBucket(data)
        console.log(data)

      } catch (error) {

      }
    }
    fetchBucket()
  }, [])

  const onCreate = async (bucketText) => {
    if (!bucketText.trim()) return

    try {

      const res = await axios.post(API, { text: bucketText.trim() })

      const created = res.data?.bucket ?? res.data

      if (Array.isArray(res.data?.bucket)) {
        setBucket(res.data.bucket)
      } else {
        setBucket(prev => [created, ...prev])
      }

    } catch (error) {
      console.log("추가 실패", error)
    }
  }

  const onDelete = async (id) => {
    try {
      if (!confirm('정말 삭제할까요?')) return

      const { data } = await axios.delete(`${API}/${id}`)

      if (Array.isArray(data?.bucket)) {
        setBucket(data.bucket)
        return
      }

      const deletedId = data?.deletedId ?? data?.bucket?._id ?? data?._id ?? id
      setBucket((prev) => prev.filter((t) => t._id !== deletedId))
    } catch (error) {
      console.log('삭제 실패', error)
    }
  }

  // 텍스트 수정
  const onUpdateText = async (id, newText) => {
    try {
      const { data } = await axios.patch(`${API}/${id}/text`, { text: newText });
      setBucket(prev => prev.map(t => (t._id === id ? data.bucket : t)));
    } catch (error) {
      console.log("수정 실패", error);
    }
  };

  const onUpdate = async (id, patch) => {
    try {
      const { data } = await axios.put(`${API}/${id}`, patch); // server: { bucket: updated }
      setBucket(prev => prev.map(b => (b._id === id ? data.bucket : b)));
    } catch (e) {
      console.log('수정 실패', e);
    }
  };

  // 체크박스 토글
  const onUpdateChecked = async (id, isCompleted) => {
    try {
      const { data } = await axios.patch(`${API}/${id}/check`, { isCompleted });
      setBucket(prev => prev.map(t => (t._id === id ? data.bucket : t)));
    } catch (error) {
      console.log("체크 수정 실패", error);
    }
  };



  return (
    <div className='App'>
      <Header />
      <BucketEditor onCreate={onCreate} />
      <BucketList
        buckets={Array.isArray(bucket) ? bucket : []}
        onDelete={onDelete}
        onUpdateText={onUpdateText}
        onUpdate={onUpdate}
        onUpdateChecked={onUpdateChecked}
      />
    </div>
  );
}

export default App;
