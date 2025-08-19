import { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';
import Header from './components/Header';
import bucketEditor from './components/bucketEditor';
import bucketList from './components/bucketList';

function App() {

  const [buckets, setbuckets] = useState([])
  const API = `${import.meta.env.VITE_API_URL}/api/buckets`

  useEffect(() => {
    const fetchbuckets = async () => {
      try {
        const res = await axios.get(API)
        const data = Array.isArray(res.data) ? res.data : res.data.buckets ?? []

        setbuckets(data)
        console.log(data)

      } catch (error) {

      }
    }
    fetchbuckets()
  }, [])

  const onCreate = async (bucketText) => {
    if (!bucketText.trim()) return

    try {

      const res = await axios.post(API, { text: bucketText.trim() })

      const created = res.data?.bucket ?? res.data

      if (Array.isArray(res.data?.buckets)) {
        setbuckets(res.data.buckets)
      } else {
        setbuckets(prev => [created, ...prev])
      }

    } catch (error) {
      console.log("추가 실패", error)
    }
  }

  const onDelete = async (id) => {
    try {
      if (!confirm('정말 삭제할까요?')) return

      const { data } = await axios.delete(`${API}/${id}`)

      if (Array.isArray(data?.buckets)) {
        setbuckets(data.buckets)
        return
      }

      const deletedId = data?.deletedId ?? data?.bucket?._id ?? data?._id ?? id
      setbuckets((prev) => prev.filter((t) => t._id !== deletedId))
    } catch (error) {
      console.log('삭제 실패', error)
    }
  }

  // 텍스트 수정
  const onUpdateText = async (id, newText) => {
    try {
      const { data } = await axios.patch(`${API}/${id}/text`, { text: newText });
      setbuckets(prev => prev.map(t => (t._id === id ? data.bucket : t)));
    } catch (error) {
      console.log("수정 실패", error);
    }
  };

  // 체크박스 토글
  const onUpdateChecked = async (id, isCompleted) => {
    try {
      const { data } = await axios.patch(`${API}/${id}/check`, { isCompleted });
      setbuckets(prev => prev.map(t => (t._id === id ? data.bucket : t)));
    } catch (error) {
      console.log("체크 수정 실패", error);
    }
  };



  return (
    <div className='App'>
      <Header />
      <bucketEditor onCreate={onCreate} />
      <bucketList
        buckets={Array.isArray(buckets) ? buckets : []}
        onDelete={onDelete}
      // onUpdateText={onUpdateText}
      // onUpdateChecked={onUpdateChecked}
      />
    </div>
  );
}

export default App;
