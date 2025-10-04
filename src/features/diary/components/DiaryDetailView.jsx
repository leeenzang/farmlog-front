import "./DiaryDetailView.css";

function DiaryDetailView({ diary, pastDiaries, onEdit, onDelete }) {
  if (!diary) return <p>일기를 불러오는 중입니다...</p>;

  return (
    <div className="diary-detail-container">
      <h2 className="diary-detail-title">
        {new Date(diary.date).toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}{" "}
        의 일기
      </h2>

      <div className="diary-detail-meta">
        <span>양력: {diary.date}</span>
        <span>음력: {diary.lunarDate}</span>
        <span>날씨: {diary.weather || "정보 없음"}</span>
      </div>

      <div className="diary-detail-content">{diary.content}</div>

      <div className="diary-detail-actions">
        <button onClick={onEdit}>수정하기</button>
        <button onClick={onDelete}>삭제하기</button>
      </div>

      {pastDiaries?.length > 0 &&
        pastDiaries.map((past, idx) => (
          <details key={idx} className="past-diary-section">
            <summary className="past-diary-toggle">{past.title}</summary>
            <div className="past-diary-content">{past.content}</div>
          </details>
        ))}
    </div>
  );
}

export default DiaryDetailView;