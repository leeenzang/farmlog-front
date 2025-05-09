// features/dashboard/components/WeatherIcon.jsx
import clear from '../../../assets/weather/clear.png';
import cloudy from '../../../assets/weather/cloudy.png';
import overcast from '../../../assets/weather/overcast.png';
import rain from '../../../assets/weather/rain.png';
import snow from '../../../assets/weather/snow.png';
import sleet from '../../../assets/weather/sleet.png';
import shower from '../../../assets/weather/shower.png';


const PTY_MAP = {
    '1': rain,
    '2': sleet,
    '3': snow,
    '4': shower,
    '5': rain,
    '6': sleet,
    '7': snow
  };
  
  const SKY_MAP = {
    '1': clear,
    '3': cloudy,
    '4': overcast
  };

  function WeatherIcon({ pty, sky, size = 64, alt = '' }) {
    const isPrecip = pty && pty !== '0';
    const icon = isPrecip
      ? PTY_MAP[pty] || clear
      : SKY_MAP[sky] || clear;
  
    return (
      <img
        src={icon}
        alt={alt}
        width={size}
        height={size}
        style={{ display: 'block', margin: '0 auto' }}
      />
    );
  }
  
  export default WeatherIcon;