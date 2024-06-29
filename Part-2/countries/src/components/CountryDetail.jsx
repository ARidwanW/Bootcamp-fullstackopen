// import { fetchWeatherApi } from "openmeteo";
import { useEffect, useState } from "react";
import weatherService from "../services/weathers";

const CountryDetail = ({ country }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const params = {
      latitude: country.capitalInfo.latlng[0],
      longitude: country.capitalInfo.latlng[1],
      current: ["temperature_2m", "weather_code", "wind_speed_10m"],
      wind_speed_unit: "ms",
    };

    console.log(params);

    weatherService
      .getWeather(params)
      .then((data) => {
        setWeatherData(data);
        console.log(data);
      })
      .catch((error) => console.log("error weather", error));
  }, [country]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const { temperature2m, weatherCode, windSpeed10m } = weatherData.current;

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>
        <div>capital {country.capital}</div>
        <div>area {country.area}</div>
      </div>
      <div>
        <h3>languages:</h3>
        <ul>
          {Object.keys(country.languages || {}).map((langCode) => (
            <li key={langCode}>{country.languages[langCode]}</li>
          ))}
        </ul>
      </div>
      <div className="flag">
        <img src={country.flags.svg} alt={country.flags.alt} />
      </div>
      <div>
        <h1>Weather in {country.name.common}</h1>
        <p>Temperature: {temperature2m}°C</p>
        <img src={weatherCode} />
        <p>Wind Speed: {windSpeed10m} m/s</p>
      </div>
    </div>
  );
};

export default CountryDetail;
