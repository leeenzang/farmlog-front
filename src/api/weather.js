import axios from './axios';

export const fetchTodayWeather = async () => {
    const res = await axios.get('/dashboard/weather/today/');
    return res.data;
};

export const fetchTomorrowWeather = async () => {
    const res = await axios.get('/dashboard/weather/tomorrow/');
    return res.data;
};