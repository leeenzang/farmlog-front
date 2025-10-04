import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchDiaryByDate } from "../../../api/diary";
import DiaryDetailView from "../components/DiaryDetailView"; 

function DiaryDetailByDate() {
  const { date } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null); 

  useEffect(() => {
    if (!date) return; 
    fetchDiaryByDate(date)
      .then((res) => setData(res))
      .catch((err) => {
        console.error("❌ 일기 조회 실패:", err);
        setError(err);
      });
  }, [date]);

  if (error) return <p>❌ 일기를 불러오지 못했습니다.</p>;
  if (!data) return <p>로딩 중...</p>;

  return (
    <DiaryDetailView
      diary={data.today}
      pastDiaries={[data.lastYear, data.twoYearsAgo].filter(Boolean)}
      onEdit={() => console.log("수정 기능 추가 예정")}
      onDelete={() => console.log("삭제 기능 추가 예정")}
    />
  );
}

export default DiaryDetailByDate;