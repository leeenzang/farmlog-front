// 일기 목록을 테이블 형태로 보여줌
// 📁 DiaryTable.jsx
import './DiaryTable.css';
import { Link } from 'react-router-dom'; // 👈 추가

function DiaryTable({ entries }) {

    return (
        <div className="diary-table-wrap">
            <table className="diary-table">
            <thead>
                <tr>
                <th>글 제목</th>
                <th>날짜</th>
                </tr>
            </thead>
            <tbody>
                {entries.length === 0 ? (
                <tr>
                    <td colSpan="2" style={{ textAlign: 'center' }}>일기가 없습니다.</td>
                </tr>
                ) : (
                entries.map((entry) => (
                    <tr key={entry.id}>
                    <td>
                    <Link to={`/diary/search/${entry.id}`}>
                        {`${new Date(entry.date).getFullYear()}년 ${new Date(entry.date).getMonth() + 1}월 ${new Date(entry.date).getDate()}일의 일기`}
                    </Link>
                    </td>
                    <td>{entry.date}</td>
                    </tr>
                ))
                )}
            </tbody>
            </table>
        </div>
    );
}

export default DiaryTable;