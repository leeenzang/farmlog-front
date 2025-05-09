import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // 기본 스타일 (필수)
import './DashboardCalendar.css'; 

function DashboardCalendar() {
  const today = new Date();

  return (
    <div className="calendar-wrapper">
      <Calendar
        value={today}
        onClickDay={() => {}}
        calendarType="gregory"
        locale="ko-KR"
        tileDisabled={() => true}
      />
    </div>
  );
}

export default DashboardCalendar;