// 📄 src/pages/DiaryCreatePage.jsx

import DiaryForm from '../components/DiaryForm';
import { useNavigate } from 'react-router-dom';
import { createDiary } from '../../../api/diary';

function DiaryCreatePage() {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    console.log('🔥 formData:', formData); // 디버깅용
    try {
      await createDiary(formData);
      alert('작성 완료!');
      navigate('/diary'); // ✅ 성공 시 목록 페이지로 이동
    } catch (err) {
      console.error('❌ 등록 실패:', err.response?.data || err.message);
      alert('등록에 실패했어요.');
    }
  };

  return (
    <div className="diary-create-page">
      <h2>📌 일기 작성</h2>
      <DiaryForm onSubmit={handleSubmit} />
    </div>
  );
}

export default DiaryCreatePage;