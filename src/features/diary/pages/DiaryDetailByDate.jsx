import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchDiaryByDate } from "../../../api/diary";
import DiaryDetailView from "../components/DiaryDetailView"; 

function DiaryDetailByDate() {
  const { date } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDiaryByDate(date)
      .then((res) => setData(res))
      .catch((err) => console.error("❌ 일기 조회 실패:", err));
  }, [date]);

  if (!data) return <p>로딩 중...</p>;

  return (
    <div className="diary-detail-container">
      {/* 오늘 일기 */}
      <DiaryDetailView
        diary={data.today}
        onEdit={() => console.log("수정 기능 추가 예정")}
        onDelete={() => console.log("삭제 기능 추가 예정")}
      />

      {/* 작년 일기 */}
      {data.lastYear && (
        <details className="past-diary-section">
          <summary className="past-diary-toggle">
            {new Date(data.lastYear.date).getFullYear()}년{" "}
            {new Date(data.lastYear.date).getMonth() + 1}월{" "}
            {new Date(data.lastYear.date).getDate()}일의 일기
          </summary>
          <div className="past-diary-content">
            <DiaryDetailView diary={data.lastYear} />
          </div>
        </details>
      )}

      {/* 재작년 일기 */}
      {data.twoYearsAgo && (
        <details className="past-diary-section">
          <summary className="past-diary-toggle">
            {new Date(data.twoYearsAgo.date).getFullYear()}년{" "}
            {new Date(data.twoYearsAgo.date).getMonth() + 1}월{" "}
            {new Date(data.twoYearsAgo.date).getDate()}일의 일기
          </summary>
          <div className="past-diary-content">
            <DiaryDetailView diary={data.twoYearsAgo} />
          </div>
        </details>
      )}
    </div>
  );
}

export default DiaryDetailByDate;