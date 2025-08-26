// App.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import BucketEditor from './components/BucketEditor';
import BucketList from './components/BucketList';

function App() {
<<<<<<< HEAD
  const [todos, setTodos] = useState([])
  const API = `${import.meta.env.VITE_API_URL}/api/todos`
=======
  const [buckets, setbuckets] = useState([]);
  const API = `${import.meta.env.VITE_API_URL}/api/buckets`;
>>>>>>> origin/woojin0819

  useEffect(() => {
    const fetchbuckets = async () => {
      try {
<<<<<<< HEAD
        const res = await axios.get(API)
        const data = Array.isArray(res.data) ? res.data : res.data.todos ?? []
        setTodos(data)
      } catch (error) {
        console.log(error)
=======
        const res = await axios.get(API);
        const data = Array.isArray(res.data) ? res.data : res.data.buckets ?? [];
        setbuckets(data);
        console.log(data);
      } catch (error) {
        console.log('가져오기 실패', error);
>>>>>>> origin/woojin0819
      }
    };
    fetchbuckets();
  }, []);

<<<<<<< HEAD
  // ✅ 날짜까지 함께 보낼 수 있도록 약간만 확장
  const onCreate = async (todoText, targetDate) => {
    if (!todoText.trim()) return
    try {
      const payload = { text: todoText.trim() }
      if (targetDate) payload.date = targetDate   // ← 백엔드가 date 필드 받음

      const res = await axios.post(API, payload)
      const created = res.data?.todo ?? res.data

      if (Array.isArray(res.data?.todos)) {
        setTodos(res.data.todos)
=======
  const onCreate = async (bucketText) => {
    if (!bucketText.trim()) return;

    try {
      const res = await axios.post(API, { text: bucketText.trim() });
      const created = res.data?.bucket ?? res.data;

      if (Array.isArray(res.data?.buckets)) {
        setbuckets(res.data.buckets);
>>>>>>> origin/woojin0819
      } else {
        setbuckets((prev) => [created, ...prev]);
      }
    } catch (error) {
      console.log('추가 실패', error);
    }
  };

  const onDelete = async (id) => {
    try {
<<<<<<< HEAD
      if (!confirm('정말 삭제할까요?')) return
      const { data } = await axios.delete(`${API}/${id}`)
      if (Array.isArray(data?.todos)) {
        setTodos(data.todos)
        return
      }
      const deletedId = data?.deletedId ?? data?.todo?._id ?? data?._id ?? id
      setTodos((prev) => prev.filter((t) => t._id !== deletedId))
=======
      if (!confirm('정말 삭제할까요?')) return;

      const { data } = await axios.delete(`${API}/${id}`);

      if (Array.isArray(data?.buckets)) {
        setbuckets(data.buckets);
        return;
      }

      const deletedId = data?.deletedId ?? data?.bucket?._id ?? data?._id ?? id;
      setbuckets((prev) => prev.filter((t) => t._id !== deletedId));
>>>>>>> origin/woojin0819
    } catch (error) {
      console.log('삭제 실패', error);
    }
  };

  // ✅ 주석 해제 (버튼 동작 위해)
  const onUpdateText = async (id, newText) => {
    try {
      const { data } = await axios.patch(`${API}/${id}/text`, { text: newText });
      setbuckets((prev) => prev.map((t) => (t._id === id ? data.bucket : t)));
    } catch (error) {
      console.log('수정 실패', error);
    }
  };

  const onUpdateChecked = async (id, isCompleted) => {
    try {
      const { data } = await axios.patch(`${API}/${id}/check`, { isCompleted });
      setbuckets((prev) => prev.map((t) => (t._id === id ? data.bucket : t)));
    } catch (error) {
      console.log('체크 수정 실패', error);
    }
  };

  return (
    <div className="App">

      <Header />
      <BucketEditor onCreate={onCreate} />
      <BucketList
        buckets={Array.isArray(buckets) ? buckets : []}
        onDelete={onDelete}
        onUpdateText={onUpdateText}
        onUpdateChecked={onUpdateChecked}
      />
    </div>

  );
}
export default App;
