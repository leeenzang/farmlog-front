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
        console.error(err);
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