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
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');

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

  const handleEditClick = () => {
    setEditedContent(diary.content); // 기존 내용 세팅
    setIsEditing(true);              // 수정모드 ON
  };

  const handleEditSubmit = async () => {
    try {
      await updateDiary(id, { content: editedContent });
      alert('수정 완료!');
      setIsEditing(false);
      onClose();
      window.location.reload();
    } catch (err) {
      console.error('❌ 수정 실패:', err);
      alert('수정 실패함...');
    }
  };

  const handleEditCancel = () => {
    setIsEditing(false);
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
                <td>{diary.lunarDate}</td>
              </tr>
              <tr>
                <th>날씨</th>
                <td colSpan="3">{diary.weather}</td>
              </tr>
            </tbody>
          </table>

          <div className="modal-content-body">
            {isEditing ? (
              <textarea
                className="edit-textarea"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                rows={9}
              />
            ) : (
              [...diary.content.split('\n'), ...Array(9 - diary.content.split('\n').length).fill('')]
                .slice(0, 9)
                .map((line, i) => <p key={i}>{line || '\u00A0'}</p>)
            )}
          </div>

          <div className="modal-buttons">
            {isEditing ? (
              <>
                <Button text="취소" onClick={handleEditCancel} variant="ghost" />
                <Button text="저장" onClick={handleEditSubmit} variant="outline" />
              </>
            ) : (
              <>
                <Button text="수정하기" onClick={handleEditClick} variant="outline" />
                <Button text="삭제하기" onClick={handleDelete} variant="ghost" />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiaryModal;