import axios from "axios";

const getWeather = (capital) => {
    const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const url = `http://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${capital}&aqi=no`;
    const request = axios.get(url);
    return request.then((response) => response.data);
};

export default { getWeather };
