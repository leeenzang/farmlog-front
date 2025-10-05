import "./DiaryDetailView.css";

function DiaryDetailView({ diary, onEdit, onDelete }) {
  if (!diary) return <p>일기를 불러오는 중...</p>;

  return (
    <div className="diary-detail-container">
      {/* 제목 */}
      <div className="diary-title">
        {new Date(diary.date).toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}{" "}
        일기
      </div>

      {/* 양력 / 음력 줄 */}
      <div className="diary-row">
        <div className="label">양력</div>
        <div className="value">{diary.date}</div>
        <div className="label">음력</div>
        <div className="value">{diary.lunarDate}</div>
      </div>

        {/* 날씨 줄 */}
        <div className="diary-row">
            <div className="label">날씨</div>
            <div className="value">{diary.weather || "정보 없음"}</div>
        </div>

        {/* 본문 */}
        <div className="diary-content">
        {[...diary.content.split("\n"), ...Array(9 - diary.content.split("\n").length).fill("")]
            .slice(0, 6)
            .map((line, i) => (
            <p key={i}>{line || "\u00A0"}</p> // 내용 없으면 빈칸으로 줄 유지
            ))}
        </div>

      {/* 버튼 */}
      <div className="diary-actions">
        <button onClick={onEdit}>수정하기</button>
        <button onClick={onDelete}>삭제하기</button>
      </div>
    </div>
  );
}

export default DiaryDetailView;