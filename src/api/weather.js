import axios from './axios';

export const fetchTodayWeather = async () => {
    const res = await axios.get('/api/weather/today');
    return res.data;
};

export const fetchTomorrowWeather = async () => {
    const res = await axios.get('/api/weather/tomorrow');
    return res.data;
};