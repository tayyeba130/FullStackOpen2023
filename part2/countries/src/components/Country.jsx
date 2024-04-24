import { useEffect, useState } from "react";
import weatherApi from "../services/weather";

export const Country = ({ country }) => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const getWeatherDate = async () => {
            const data = await weatherApi.getWeather(country.capital[0]);
            setWeather(data.current);
        };
        getWeatherDate();
    }, [country.capital]);

    return (
        <div>
            <h1>{country.name.common}</h1>
            <div>capital {country.capital[0]}</div>
            <div>area {country.area}</div>
            <h2>languages</h2>
            <ul>
                {Object.values(country.languages).map((language, index) => (
                    <li key={index}>{language}</li>
                ))}
            </ul>
            <span style={{ fontSize: "125px" }}>{country.flag}</span>
            {weather && (
                <div>
                    <h1>Weather in {country.capital}</h1>
                    <p>temperature {weather.temp_c} Celcius</p>
                    <img
                        width="150px"
                        src={weather.condition.icon}
                        alt="Weather icon"
                    />
                    <p>wind {weather.wind_mph} m/h</p>
                </div>
            )}
        </div>
    );
};
