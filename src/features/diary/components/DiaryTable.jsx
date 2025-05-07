// 📁 src/components/diary/DiaryTable.jsx
import './DiaryTable.css';
import { useState } from 'react';
import DiaryModal from './DiaryModal'; // 모달 컴포넌트 가져옴

function DiaryTable({ entries }) {
  const [selectedId, setSelectedId] = useState(null); // 어떤 일기 클릭했는지 기억
  if (!Array.isArray(entries)) {
    return <p>데이터를 불러오는 중입니다...</p>; // ✅ null 방어
  }
  return (
    <div className="diary-table-wrap">
      <table className="diary-table">
        <thead>
          <tr>
            <th>글 제목</th>
          </tr>
        </thead>
        <tbody>
          {entries.length === 0 ? (
            <tr>
              <td colSpan="2" style={{ textAlign: 'center' }}>일기가 없습니다.</td>
            </tr>
          ) : (
            entries.map((entry) => (
              <tr key={entry.id} onClick={() => setSelectedId(entry.id)} style={{ cursor: 'pointer' }}>
                <td>
                  {`${new Date(entry.date).getFullYear()}년 ${new Date(entry.date).getMonth() + 1}월 ${new Date(entry.date).getDate()}일의 일기`}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* ✅ 선택된 글이 있으면 모달 띄움 */}
      {selectedId && (
        <DiaryModal
          id={selectedId}
          onClose={() => setSelectedId(null)} // 닫기 누르면 ID 제거
        />
      )}
    </div>
  );
}

export default DiaryTable;