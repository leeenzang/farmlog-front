import './DiaryModal.css';
import { useEffect, useState } from 'react';
import Button from '../../../components/Button';
import {
  fetchDiaryDetail,
  updateDiary,
  deleteDiary
} from '../../../api/diary'; 

function DiaryModal({ id, onClose }) {
  const [diary, setDiary] = useState(null);

  useEffect(() => {
    const getDiary = async () => {
      try {
        const data = await fetchDiaryDetail(id); 
        setDiary(data);
      } catch (err) {
        console.error('❌ 일기 불러오기 실패:', err);
      }
    };
    getDiary();
  }, [id]);

  const handleEdit = async () => {
    const newContent = prompt('새로운 내용을 입력하세요:', diary.content);
    if (!newContent || newContent === diary.content) return;

    try {
      await updateDiary(id, { content: newContent }); // ✅ axios → 함수로 변경
      alert('수정 완료!');
      onClose();
      window.location.reload();
    } catch (err) {
      console.error('❌ 수정 실패:', err);
      alert('수정 실패함...');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('정말 삭제할까요?')) return;

    try {
      await deleteDiary(id);
      alert('삭제 완료!');
      onClose();
      window.location.reload();
    } catch (err) {
      console.error('❌ 삭제 실패:', err);
      alert('삭제 실패함...');
    }
  };

  if (!diary) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{new Date(diary.date).toLocaleDateString()} 일기입니다.</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className='modal-inner'>
          <table className="modal-table">
            <tbody>
              <tr>
                <th>양력</th>
                <td>{diary.date}</td>
                <th>음력</th>
                <td>{diary.lunar_date}</td>
              </tr>
              <tr>
                <th>날씨</th>
                <td colSpan="3">{diary.weather}</td>
              </tr>
            </tbody>
          </table>
          <div className="modal-content-body">
            {[
              ...diary.content.split('\n'),
              ...Array(9 - diary.content.split('\n').length).fill('')  // 빈 줄로 채우기
            ].slice(0, 9).map((line, i) => (
              <p key={i}>{line || '\u00A0'}</p>  // 공백 문자로 줄 유지
            ))}
          </div>
          <div className="modal-buttons">
            <Button
              text="수정하기"
              onClick={handleEdit}
              variant="outline"
            />
            <Button
              text="삭제하기"
              onClick={handleDelete}
              variant="ghost"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiaryModal;