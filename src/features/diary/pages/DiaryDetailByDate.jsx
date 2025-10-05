import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchDiaryByDate } from "../../../api/diary";
import DiaryDetailView from "../components/DiaryDetailView";
import "./DiaryDetailByDate.css"; // ✅ 페이지 스타일

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
    <div className="diary-page-wrapper">
      {/* ✅ 오늘 일기 */}
      <div className="diary-container">
        <DiaryDetailView
          diary={data.today}
          onEdit={() => console.log("수정 기능 추가 예정")}
          onDelete={() => console.log("삭제 기능 추가 예정")}
          collapsible={false}
          showActions={true}
        />
      </div>

      {/* ✅ 작년 일기 */}
      {data.lastYear && (
        <div className="diary-container">
          <DiaryDetailView
            diary={data.lastYear}
            collapsible={true}
            showActions={false}
          />
        </div>
      )}

      {/* ✅ 재작년 일기 */}
      {data.twoYearsAgo && (
        <div className="diary-container">
          <DiaryDetailView
            diary={data.twoYearsAgo}
            collapsible={true}
            showActions={false}
          />
        </div>
      )}
    </div>
  );
}

export default DiaryDetailByDate;