import { useState } from "react";
import "./DiaryDetailView.css";

function DiaryDetailView({ diary, onEdit, onDelete, collapsible = false, showActions = true }) {
  if (!diary) return <p>일기를 불러오는 중...</p>;

  const [isOpen, setIsOpen] = useState(!collapsible); // 접힘 여부 제어
  const date = new Date(diary.date);
  const formattedDate = date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="diary-detail-container">
      {/* 제목 줄 (일기 제목이 버튼인지 일반 텍스트인지) */}
      {collapsible ? (
        <button
          className={`diary-title-button ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {formattedDate} 일기
          <span className={`arrow ${isOpen ? "open" : ""}`}></span>
        </button>
      ) : (
        <div className="diary-title">{formattedDate} 일기</div>
      )}

      {/* 내용: 접힘 여부에 따라 표시 */}
      {isOpen && (
        <>
          <div className="diary-row">
            <div className="label">양력</div>
            <div className="value">{diary.date}</div>
            <div className="label">음력</div>
            <div className="value">{diary.lunarDate}</div>
          </div>

          <div className="diary-row">
            <div className="label">날씨</div>
            <div className="value">{diary.weather || "정보 없음"}</div>
          </div>

          <div className="diary-content">
            {[...diary.content.split("\n"), ...Array(9 - diary.content.split("\n").length).fill("")]
              .slice(0, 6)
              .map((line, i) => (
                <p key={i}>{line || "\u00A0"}</p>
              ))}
          </div>

          {showActions && (
            <div className="diary-actions">
              <button onClick={onEdit}>수정하기</button>
              <button onClick={onDelete}>삭제하기</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default DiaryDetailView;