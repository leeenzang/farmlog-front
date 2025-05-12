// features/dashboard/components/TodayWeatherCard.jsx
import WeatherCardContainer from './WeatherCardContainer';
import WeatherIcon from './WeatherIcon';

function TodayWeatherCard({ weather }) {

  if (!weather) return null;

  const today = new Date();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const date = today.getDate().toString().padStart(2, '0');
    const formattedDate = `${month}.${date}`; // 👉 05.10
    console.log(typeof weather.weatherStatus, weather.weatherStatus);
  return (
    <WeatherCardContainer
    title="오늘"
    date={formattedDate}
    children={{
        top: (
        <>
            <WeatherIcon pty={weather.pty} sky={weather.sky} size={64} />
            <div style={{ fontSize: '1.8rem', marginTop: '0.5rem' }}>
            {weather.temperature}°C
            </div>
        </>
        ),
        meta: (
        <>
            <div>
            <div className="label">상태</div>
            <div className="value">{weather.weatherStatus}</div>
            </div>
            <div>
            <div className="label">습도</div>
            <div className="value">{weather.humidity}%</div>
            </div>
        </>
        )
    }}
    />
  )
}

export default TodayWeatherCard;