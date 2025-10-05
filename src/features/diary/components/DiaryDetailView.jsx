import { useState } from "react";
import { updateDiary, deleteDiary } from "../../../api/diary";
import "./DiaryDetailView.css";

function DiaryDetailView({ diary, collapsible = false, showActions = true }) {
  if (!diary) return <p>일기를 불러오는 중...</p>;

  const [isOpen, setIsOpen] = useState(!collapsible);
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(diary.content);

  const handleEdit = async () => {
    // ✏️ 수정 모드 → 저장
    if (isEditing) {
      try {
        await updateDiary(diary.id, { content });
        alert("수정 완료!");
        setIsEditing(false);
        window.location.reload();
      } catch (err) {
        console.error("❌ 수정 실패:", err);
        alert("수정 실패함...");
      }
    } else {
      // 보기 모드 → 수정모드 전환
      setIsEditing(true);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("정말 삭제할까요?")) return;

    try {
      await deleteDiary(diary.id);
      alert("삭제 완료!");
      window.location.reload();
    } catch (err) {
      console.error("❌ 삭제 실패:", err);
      alert("삭제 실패함...");
    }
  };

  const date = new Date(diary.date);
  const formattedDate = date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="diary-detail-container">
      {/* 제목 줄 */}
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

      {/* 내용 */}
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
            {isEditing ? (
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
                className="diary-edit-textarea"
              />
            ) : (
              [...content.split("\n"), ...Array(9 - content.split("\n").length).fill("")]
                .slice(0, 6)
                .map((line, i) => <p key={i}>{line || "\u00A0"}</p>)
            )}
          </div>

          {showActions && (
            <div className="diary-actions">
              {isEditing ? (
                <>
                  <button onClick={() => setIsEditing(false)}>취소</button>
                  <button onClick={handleEdit}>저장</button>
                </>
              ) : (
                <>
                  <button onClick={handleEdit}>수정하기</button>
                  <button onClick={handleDelete}>삭제하기</button>
                </>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default DiaryDetailView;