// src/pages/DiaryCreatePage.jsx
import DiaryForm from '../components/DiaryForm';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function DiaryCreatePage() {

  const navigate = useNavigate();
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await axios.get('/diary/search/?ordering=-created_at');
        setEntries(res.data);
      } catch (err) {
        if (err.response?.status === 401) {
          alert('세션이 만료되었습니다. 다시 로그인해주세요.');
          navigate('/login'); 
        }
      }
    };

    fetchEntries();
  }, []);

  return (
    <div className="diary-create-page">
      <DiaryForm />
    </div>
  );
}

export default DiaryCreatePage;