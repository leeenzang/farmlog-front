import WeatherCardContainer from './WeatherCardContainer';
import WeatherIcon from './WeatherIcon';

function TomorrowWeatherCard({ weather }) {
  if (!weather) return null;

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const month = (tomorrow.getMonth() + 1).toString().padStart(2, '0');
  const date = tomorrow.getDate().toString().padStart(2, '0');
  const formattedDate = `${month}.${date}`; // 👉 05.10

  return (
    <WeatherCardContainer
      title="내일"
      date={formattedDate}
      children={{
        top: (
          <>
            <WeatherIcon pty={weather.pty} sky={weather.sky} size={64} />
            <div className='temperature'>
                최저 {weather.lowestTemp ?? '-'}° / 최고 {weather.highestTemp ?? '-'}°
            </div>
          </>
        ),
        meta: (
            <>
                <div>
                    <div className="label">상태</div>
                    <div className="value">
                    {weather.weatherStatus}
                    </div>
                </div>
                <div>
                    <div className="label">강수확률</div>
                    <div className="value">{weather.precipitationProbability}%</div>
                </div>

            </>
        )
      }}
    />
  );
}

export default TomorrowWeatherCard;