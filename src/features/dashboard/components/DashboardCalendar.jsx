import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./DashboardCalendar.css";
import { fetchDiaryDatesOfMonth } from "../../../api/diary";

function DashboardCalendar() {
  const today = new Date();
  const [markedDates, setMarkedDates] = useState([]);
  const [activeMonth, setActiveMonth] = useState(today); // 현재 보고 있는 달

  // 달력 월이 바뀔 때 실행되는 함수
  const handleMonthChange = ({ activeStartDate }) => {
    setActiveMonth(activeStartDate);
  };

  // activeMonth가 바뀔 때마다 API 호출
  useEffect(() => {
    const year = activeMonth.getFullYear();
    const month = activeMonth.getMonth() + 1;

    fetchDiaryDatesOfMonth(year, month)
      .then((data) => setMarkedDates(data.dates))
      .catch((err) => console.error("❌ 달력 데이터 불러오기 실패:", err));
  }, [activeMonth]);

  return (
    <div className="calendar-wrapper">
      <Calendar
        value={today}
        calendarType="gregory"
        locale="ko-KR"
        formatDay={(locale, date) => date.getDate()}
        tileContent={({ date, view }) => {
          const dateStr = date.toLocaleDateString("sv-SE"); // ✅ UTC 문제 해결
          const hasDiary = markedDates.includes(dateStr);
          return view === "month" && hasDiary ? <div className="dot"></div> : null;
        }}
        onActiveStartDateChange={handleMonthChange}
      />
    </div>
  );
}

export default DashboardCalendar;